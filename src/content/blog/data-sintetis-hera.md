---
title: "Data Sintetis untuk Model AI — Workflow dari Nol di Proyek HERA"
date: 2026-07-23
summary: Membangun dataset sintetis untuk Heavy Element Risk Analyzer. Dari definisi parameter fisik sampai validasi statistik. Python + numpy + scipy.
---

# Kenapa Data Sintetis?

Proyek **HERA (Heavy Element Risk Analyzer)** butuh data dalam jumlah besar untuk training model AI. Masalah: data real sangat langka. Setiap sampel elemen berat butuh proses lab mahal.

Solusi: **generate data sintetis** yang secara statistik **ekuivalen** dengan data real yang terbatas. Ini bukan sembarang random — data sintetis harus menghormati:
- Distribusi fisik (distribusi probabilitas dari parameter atomik)
- Korelasi antar variabel (cross-section vs energi, decay rate vs massa)
- Boundary condition fisika nuklir (tidak mungkin ada nilai negatif untuk massa, dll)

---

# Workflow: 6 Tahap

```
[1. Definisi Parameter] → [2. Model Fisika] → [3. Sampling Statistik]
        → [4. Validasi] → [5. Augmentasi] → [6. Export Dataset]
```

## 1. Definisi Parameter

Berdasarkan paper referensi dan data real terbatas, ditentukan variabel input:

```python
PARAMETERS = {
    'atomic_number': (1, 118),        # Z: 1-118
    'mass_number': (1, 295),          # A: 1-295
    'binding_energy': (0.0, 2000.0),  # MeV
    'cross_section': (0.0, 100.0),    # barns
    'half_life': (1e-21, 1e18),       # seconds (log scale)
    'decay_mode': ['alpha', 'beta-', 'beta+', 'gamma', 'fission', 'stable'],
    'energy_level': (0.0, 50.0),      # MeV
}
```

## 2. Model Fisika Sederhana

Hubungan fisika antar parameter:

- **Binding energy per nucleon** ≈ 8 MeV untuk A > 20 (model droplet)
- **Half-life** berhubungan terbalik dengan decay energy (hukum Geiger-Nuttall untuk alpha)
- **Cross-section** punya resonance peak di energi tertentu

```python
import numpy as np

def binding_energy(A, Z):
    """Semi-empirical mass formula (Bethe-Weizsäcker)."""
    a_v, a_s, a_c, a_a, a_p = 15.75, 17.8, 0.711, 23.7, 11.18
    delta = a_p / np.sqrt(A) if (A % 2 == 0 and Z % 2 == 0) else (
        -a_p / np.sqrt(A) if (A % 2 == 1 and Z % 2 == 1) else 0
    )
    return (a_v * A 
            - a_s * A**(2/3) 
            - a_c * Z*(Z-1) / A**(1/3) 
            - a_a * (A - 2*Z)**2 / A 
            + delta)

def estimate_half_life(Z, A, decay_mode):
    """Estimasi half-life berdasarkan energi decay dan mode."""
    BE = binding_energy(A, Z)
    if decay_mode == 'alpha':
        # Geiger-Nuttall: log(T) ∝ 1/√(Q)
        Q_alpha = BE - binding_energy(A-4, Z-2)
        return np.exp(50 / np.sqrt(max(Q_alpha, 1)))  # seconds
    elif decay_mode == 'beta-':
        return np.random.lognormal(mean=5, sigma=3)
    elif decay_mode == 'stable':
        return np.inf
    else:
        return np.random.lognormal(mean=3, sigma=2)
```

## 3. Sampling Statistik

Bukan uniform random — pakai distribusi yang mencerminkan kelangkaan data real:

```python
from scipy import stats

def sample_nuclides(n_samples=10000):
    data = []

    for _ in range(n_samples):
        # Z: weighted ke rare-earth dan trans-uranium (region of interest)
        Z = int(stats.skewnorm.rvs(a=4, loc=60, scale=30))
        Z = np.clip(Z, 1, 118)

        # A: correlated with Z (A ≈ 2.5*Z typical)
        A = int(Z * 2.5 + np.random.normal(0, 5))
        A = np.clip(A, Z, max(Z*3, 295))
        if A < Z: A = Z  # impossible

        BE = binding_energy(A, Z) / A  # per nucleon
        # Add realistic noise (±5%)
        BE *= np.random.uniform(0.95, 1.05)

        # Decay mode based on Z/A region
        if Z >= 84:   # heavy — alpha emitter
            mode = np.random.choice(['alpha', 'fission', 'beta-'], p=[0.6, 0.25, 0.15])
        elif Z >= 58: # medium — various
            mode = np.random.choice(['beta-', 'beta+', 'gamma', 'stable'], p=[0.3, 0.2, 0.2, 0.3])
        else:         # light — stable or beta
            mode = np.random.choice(['stable', 'beta-', 'beta+'], p=[0.7, 0.2, 0.1])

        half_life = estimate_half_life(Z, A, mode)
        cs = np.random.lognormal(mean=np.log(10), sigma=1.0)  # cross-section lognormal

        data.append({
            'Z': Z, 'A': A,
            'binding_energy_per_nucleon': round(BE, 3),
            'cross_section_barns': round(cs, 3),
            'half_life_seconds': round(half_life, 3),
            'decay_mode': mode,
        })

    return data
```

Kenapa distribusi skew? Heavy element (Z > 84) adalah fokus HERA — risk analysis untuk elemen radioaktif berat. Region ini oversample dengan skew distribution, bukan uniform.

## 4. Validasi Statistik

Sintetis harus **tidak bisa dibedakan** dari data real dalam uji statistik:

```python
def validate_synthetic(synthetic_df, real_df, columns):
    """K-S test: synthetic vs real — p > 0.05 berarti tidak berbeda signifikan."""
    from scipy.stats import ks_2samp
    results = {}
    for col in columns:
        if col not in real_df.columns: continue
        stat, p = ks_2samp(synthetic_df[col], real_df[col])
        results[col] = {'statistic': stat, 'p_value': p, 'pass': p > 0.05}
    return results

def correlation_check(df):
    """Korelasi spearman antar variabel — dibandingkan dengan data real."""
    # Physical constraints:
    # - Z vs A harus highly correlated (r > 0.9)
    # - Binding energy vs A smooth curve
    return df[['Z', 'A', 'binding_energy_per_nucleon']].corr(method='spearman')
```

## 5. Augmentasi

Dari 10rb sampel, generate variant dengan noise terkontrol:

```python
def augment(data, n_variants=5, noise_level=0.02):
    """Untuk tiap record, generate N variant dengan gaussian noise."""
    augmented = []
    for row in data:
        for _ in range(n_variants):
            variant = row.copy()
            variant['binding_energy_per_nucleon'] *= np.random.normal(1, noise_level)
            variant['cross_section_barns'] *= np.random.normal(1, noise_level)
            if variant['half_life_seconds'] != np.inf:
                variant['half_life_seconds'] *= np.random.normal(1, noise_level)
            augmented.append(variant)
    return augmented
```

Hasil: 50rb sampel sintetis dari 10rb base + augmentasi. Cukup untuk training deep learning.

## 6. Export untuk Training

```python
import pandas as pd

df = pd.DataFrame(data)
# Label encoding untuk decay_mode
df['decay_mode_encoded'] = df['decay_mode'].astype('category').cat.codes
# Log transform untuk half-life (range terlalu lebar)
df['log_half_life'] = np.log10(df['half_life_seconds'].replace(np.inf, 1e100))

# Train/test split
from sklearn.model_selection import train_test_split
train, test = train_test_split(df, test_size=0.2, random_state=42)

# Format buat model (XGBoost / PyTorch)
X_cols = ['Z', 'A', 'binding_energy_per_nucleon', 'cross_section_barns', 'log_half_life']
y_col = 'decay_mode_encoded'

train.to_csv('hera_train.csv', index=False)
test.to_csv('hera_test.csv', index=False)
```

---

# Hasil Validasi

| Parameter | K-S Statistic | P-Value | Pass? |
|-----------|---------------|---------|-------|
| Z | 0.043 | 0.87 | ✅ |
| A | 0.051 | 0.72 | ✅ |
| Binding energy | 0.038 | 0.91 | ✅ |
| Half-life | 0.062 | 0.58 | ✅ |

Semua parameter lolos K-S test (p > 0.05) — distribusi sintetis tidak berbeda signifikan dari data real.

---

# Pelajaran

1. **Data sintetis ≠ data palsu.** Dengan model fisika yang benar, data sintetis adalah **extension** dari data real — bukan pengganti.
2. **Validasi statistik wajib.** Kalau K-S test gagal, model AI belajar dari distribusi yang salah → gagal di real world.
3. **Domain knowledge menentukan.** Tanpa rumus Bethe-Weizsäcker dan Geiger-Nuttall, data sintetis cuma random noise.
4. **Augmentasi dengan noise terkontrol > oversampling naive.** 5 variant per sampel dengan 2% noise = regularisasi alami buat model.