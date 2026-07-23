---
title: "Analisis Data AgriSense — Pipeline Python untuk Stakeholder Non-Teknis"
date: 2026-07-23
summary: Workflow end-to-end: ingest sensor IoT, exploratory analysis, feature engineering, model training, dashboard reporting. Fokus: hasil yang bisa dibaca petani, bukan cuma metrik ML.
---

# Konteks: AgriSense

**AgriSense** adalah proyek smart agriculture. Sensor IoT di lapangan mengirim data: kelembapan tanah, suhu udara, curah hujan, pH tanah, intensitas cahaya. Tujuan: prediksi waktu tanam optimal, deteksi dini hama, rekomendasi irigasi.

Aku berkontribusi di sisi analisis data untuk pengembangan model AI. Tapi challenge sebenarnya bukan modelnya — melainkan **bagaimana hasil analisis bisa dipahami oleh stakeholder non-teknis**: petani, penyuluh lapangan, manajer koperasi.

---

# Pipeline: 5 Tahap

```
[Ingest] → [EDA + Cleaning] → [Feature Engineering] → [Modeling] → [Reporting]
```

## 1. Data Ingest

Sensor mengirim via MQTT ke backend. Data mentah disimpan di PostgreSQL.

```python
import pandas as pd
from sqlalchemy import create_engine

engine = create_engine('postgresql://user:pass@localhost:5432/agrisense')

query = """
SELECT 
    s.timestamp,
    s.sensor_id,
    f.farm_name,
    f.region,
    s.soil_moisture_pct,
    s.temperature_c,
    s.humidity_pct,
    s.rainfall_mm,
    s.soil_ph,
    s.light_lux,
    s.crop_type,
    s.yield_kg_ha
FROM sensor_readings s
JOIN farms f ON s.farm_id = f.id
WHERE s.timestamp BETWEEN '2025-01-01' AND '2026-04-01'
"""

df = pd.read_sql(query, engine)
print(f"Raw records: {len(df):,}")
print(f"Farms: {df['farm_name'].nunique()}")
print(f"Sensors: {df['sensor_id'].nunique()}")
```

## 2. EDA + Cleaning

Masalah umum data sensor IoT: missing values (sensor offline), outlier (hujan deras), duplicate readings.

```python
# Missing values — sensor offline
missing = df.isnull().sum()
print("Missing values:")
print(missing[missing > 0])

# Strategy: interpolasi linear untuk gap ≤ 2 jam, drop untuk gap besar
df = df.sort_values(['sensor_id', 'timestamp'])
df['soil_moisture_pct'] = df.groupby('sensor_id')['soil_moisture_pct'].transform(
    lambda x: x.interpolate(method='linear', limit=24)  # max 24 readings (2 jam)
)

# Outlier detection: IQR method
def flag_outliers(series):
    Q1, Q3 = series.quantile(0.25), series.quantile(0.75)
    IQR = Q3 - Q1
    return (series < Q1 - 1.5 * IQR) | (series > Q3 + 1.5 * IQR)

for col in ['temperature_c', 'rainfall_mm', 'soil_ph']:
    outlier_mask = flag_outliers(df[col])
    pct = outlier_mask.sum() / len(df) * 100
    print(f"{col}: {pct:.2f}% outliers")
    # Flag, jangan langsung drop — mungkin kejadian cuaca ekstrem valid
    df[f'{col}_outlier'] = outlier_mask.astype(int)
```

## 3. Feature Engineering

Bukan cuma metrik mentah — buat **agronomic features** yang bermakna:

```python
# Akumulasi curah hujan 7 hari
df['rainfall_7day'] = df.groupby('sensor_id')['rainfall_mm'].transform(
    lambda x: x.rolling(7, min_periods=1).sum()
)

# Defisit kelembapan (VPD — Vapor Pressure Deficit)
# VPD ≈ (1 - humidity/100) * saturated_vapor_pressure(temperature)
df['vpd_kpa'] = (1 - df['humidity_pct'] / 100) * (
    0.6108 * np.exp(17.27 * df['temperature_c'] / (df['temperature_c'] + 237.3))
)

# Soil moisture stress index
# di bawah 30% = stress, 30-60% = normal, di atas 60% = jenuh
df['moisture_stress'] = pd.cut(
    df['soil_moisture_pct'],
    bins=[0, 30, 60, 100],
    labels=['stress', 'normal', 'saturated']
)

# Crop growth stage berbasis hari tanam
from datetime import datetime
df['days_since_planting'] = (
    df['timestamp'] - pd.to_datetime('2025-01-01')
).dt.days % 120  # asumsi siklus 120 hari
df['growth_stage'] = pd.cut(
    df['days_since_planting'],
    bins=[0, 30, 60, 90, 120],
    labels=['vegetative', 'flowering', 'grain_fill', 'maturity']
)

# Interaksi: kelembapan × growth_stage
df['moisture_x_stage'] = (
    df['soil_moisture_pct'].astype(str) + '_' + df['growth_stage'].astype(str)
)
```

Kenapa feature agronomic? Karena ML engineer biasa cuma bikin `rolling_mean` dan `lag`. Agronomic features (VPD, moisture stress, growth stage) langsung bermakna ke petani — bisa dijelaskan: _"Kelembapan tanah di bawah 30% saat fase flowering → risiko gagal panen tinggi."_

## 4. Modeling

Target: prediksi yield (kg/ha). Model: XGBoost dengan interpretasi SHAP.

```python
import xgboost as xgb
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder

# Encoding categorical
df['crop_type_enc'] = LabelEncoder().fit_transform(df['crop_type'])
df['growth_stage_enc'] = LabelEncoder().fit_transform(df['growth_stage'].astype(str))

features = [
    'soil_moisture_pct', 'temperature_c', 'humidity_pct',
    'rainfall_7day', 'soil_ph', 'light_lux',
    'vpd_kpa', 'crop_type_enc', 'growth_stage_enc',
]

X = df[features]
y = df['yield_kg_ha']

# Time-series split, bukan random
split_idx = int(len(df) * 0.8)
X_train, X_test = X.iloc[:split_idx], X.iloc[split_idx:]
y_train, y_test = y.iloc[:split_idx], y.iloc[split_idx:]

model = xgb.XGBRegressor(
    n_estimators=200, max_depth=6, learning_rate=0.05,
    subsample=0.8, colsample_bytree=0.8,
    random_state=42
)
model.fit(X_train, y_train)

from sklearn.metrics import mean_absolute_error, r2_score
preds = model.predict(X_test)
mae = mean_absolute_error(y_test, preds)
r2 = r2_score(y_test, preds)
print(f"MAE: {mae:.2f} kg/ha")
print(f"R²: {r2:.3f}")
```

## 5. Reporting (untuk non-teknis!)

Ini bagian paling penting. Insight model harus dikomunikasikan dalam bahasa petani.

### SHAP — Feature Importance yang Bisa Diceritakan

```python
import shap

explainer = shap.TreeExplainer(model)
shap_values = explainer.shap_values(X_test.iloc[:1000])

# Top 3 feature berdasarkan mean |SHAP|
importance = pd.DataFrame({
    'feature': features,
    'importance': np.abs(shap_values).mean(axis=0)
}).sort_values('importance', ascending=False)

print("Top 3 factors memengaruhi yield:")
for _, row in importance.head(3).iterrows():
    print(f"  • {row['feature']}")
```

### Generate Rekomendasi Otomatis dalam Teks

```python
def generate_recommendation(row):
    """Ubah data sensor jadi kalimat rekomendasi."""
    recs = []
    
    if row['soil_moisture_pct'] < 30 and row['growth_stage'] == 'flowering':
        recs.append("⚠️ Kelembapan tanah rendah saat fase berbunga. Risiko gagal panen tinggi. Segera irigasi.")
    elif row['soil_moisture_pct'] > 60:
        recs.append("💧 Tanah terlalu basah. Hentikan irigasi 3-5 hari. Akar bisa membusuk.")
    
    if row['vpd_kpa'] > 2.0:
        recs.append("🌡️ Udara terlalu kering (VPD tinggi). Tanaman stres transpirasi. Pertimbangkan mulsa.")
    
    if row['rainfall_7day'] > 100:
        recs.append("☔ Curah hujan tinggi 7 hari terakhir. Tunda pemupukan — pupuk tercuci air.")
    
    if not recs:
        recs.append("✅ Kondisi optimal. Lanjutkan monitoring rutin.")
    
    return recs

# Contoh output untuk 5 sensor
sample = X_test.iloc[:5].copy()
sample['recommendations'] = sample.apply(generate_recommendation, axis=1)
for _, row in sample.iterrows():
    print(f"\n--- {row.name} ---")
    for rec in row['recommendations']:
        print(rec)
```

Contoh output:

```
⚠️ Kelembapan tanah rendah saat fase berbunga. Risiko gagal panen tinggi. Segera irigasi.
🌡️ Udara terlalu kering (VPD tinggi). Tanaman stres transpirasi. Pertimbangkan mulsa.
```

Ini bukan _"AUC 0.87, precision 0.82"_ — ini kalimat yang bisa dibaca petani via WhatsApp.

---

# Pelajaran

1. **EDA sensor IoT ≠ EDA dataset bersih.** Missing value, outlier, duplicate, sensor drift — semuanya harus ditangani dengan konteks domain.
2. **Feature engineering harus agronomic.** Rolling mean 7 hari = _"akumulasi hujan seminggu"_ — petani langsung paham. PCA component = petani bingung.
3. **SHAP > feature importance bawaan XGBoost.** SHAP bisa menjelaskan satu prediksi spesifik — _"kenapa field A diprediksi gagal panen?"_ — bukan cuma _"secara umum, moisture penting."_
4. **Output model harus teks naratif.** Metrik ML untuk internal. Kalimat rekomendasi untuk stakeholder. Jangan campur.