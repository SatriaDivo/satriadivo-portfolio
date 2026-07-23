---
title: "Klasifikasi Kematangan Kakao dengan Computer Vision — Pipeline End-to-End"
date: 2026-07-23
summary: PIC proyek identifikasi kematangan biji kakao. Dataset labeling, preprocessing, model CNN, augmentasi, deployment ke mobile. Akurasi 89% di 4 kelas.
---

# Konteks: CocoaSense

**CocoaSense** adalah proyek QC (Quality Control) kakao. Aku bertindak sebagai **Person in Charge (PIC)** untuk pipeline identifikasi kematangan dan kondisi biji kakao menggunakan computer vision.

Kenapa penting? Saat panen, petani harus memilah kakao berdasarkan:
1. **Kematangan**: mentah, matang optimal, terlalu matang (fermentasi berlebih)
2. **Kondisi**: normal, berjamur, berlubang (hama), pecah

Proses tradisional: manual oleh tenaga sortir — subjektif, lambat, inconsistent. Target: klasifikasi otomatis via foto dari HP Android.

---

# Pipeline: 7 Tahap

```
[Dataset Collection] → [Labeling] → [Preprocessing] → [Augmentasi] → [Training CNN] → [Evaluasi] → [Konversi TFLite]
```

## 1. Dataset Collection

Foto biji kakao dikumpulkan dari 3 koperasi di Lampung. Setup standar:

| Parameter | Value |
|-----------|-------|
| Kamera | Smartphone 12MP+ |
| Background | Kertas putih (standardisasi warna) |
| Jarak | 20-25 cm |
| Pencahayaan | Natural (pagi, siang, sore) + LED indoor |
| Jumlah per sampel | 5 foto dari angle berbeda |
| Total gambar terkumpul | 2,847 foto (setelah cleaning) |

## 2. Labeling

4 kelas target:

```
0: UNRIPE    — mentah, hijau/putih, keras
1: RIPE      — matang optimal, coklat merata, aroma kuat
2: OVERRIPE  — terlalu matang, hitam/coklat tua, bau fermentasi
3: DEFECT    — berjamur, berlubang, pecah (apapun tingkat kematangan)
```

Labeling dilakukan oleh **2 QC inspector senior** + **1 agronomist kakao**. Double-blind: tiap foto dilabel 2 orang. Kalau label berbeda, diskusi untuk resolve. 

```python
import pandas as pd

labels_df = pd.read_csv('cacao_labels.csv')
print(labels_df['class'].value_counts())
# UNRIPE:    687 (24.1%)
# RIPE:      912 (32.0%)
# OVERRIPE:  581 (20.4%)
# DEFECT:    667 (23.4%)
```

Distribusi cukup seimbang — tidak perlu oversampling agresif.

## 3. Preprocessing

```python
import cv2
import numpy as np

def preprocess_image(img_path, target_size=(224, 224)):
    img = cv2.imread(img_path)
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    
    # Segmentasi: isolate biji dari background putih
    gray = cv2.cvtColor(img, cv2.COLOR_RGB2GRAY)
    _, thresh = cv2.threshold(gray, 200, 255, cv2.THRESH_BINARY_INV)
    contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    
    if contours:
        # Ambil kontur terbesar = biji kakao
        largest = max(contours, key=cv2.contourArea)
        x, y, w, h = cv2.boundingRect(largest)
        # Padding 10%
        pad = int(max(w, h) * 0.1)
        x = max(0, x - pad)
        y = max(0, y - pad)
        w = min(img.shape[1] - x, w + 2*pad)
        h = min(img.shape[0] - y, h + 2*pad)
        img = img[y:y+h, x:x+w]
    
    # Resize + normalize
    img = cv2.resize(img, target_size)
    img = img / 255.0
    return img
```

Segmentasi penting: background putih harus dibuang. Kalau model belajar dari background, bukan dari biji → overfit ke lighting studio, gagal di lapangan.

## 4. Augmentasi (Realistis Lapangan)

Augmentasi harus mensimulasikan **kondisi foto petani** — bukan cuma random flip:

```python
from tensorflow.keras.preprocessing.image import ImageDataGenerator

train_datagen = ImageDataGenerator(
    rotation_range=30,       # petani motret miring
    width_shift_range=0.15,  # framing tidak center
    height_shift_range=0.15,
    brightness_range=[0.7, 1.3],  # pencahayaan variatif (pagi vs siang)
    shear_range=0.1,
    zoom_range=[0.8, 1.2],   # jarak foto tidak konsisten
    horizontal_flip=True,
    fill_mode='reflect'
)

# Validasi & test: NO augmentasi
test_datagen = ImageDataGenerator(rescale=1./255)
```

## 5. Training CNN

Arsitektur: **EfficientNet-B0** (pretrained ImageNet) + custom head. Kenapa bukan dari scratch? Dataset 2,847 gambar — terlalu kecil untuk CNN from-scratch. Transfer learning pretrained EfficientNet ideal.

```python
import tensorflow as tf
from tensorflow.keras import layers, Model
from tensorflow.keras.applications import EfficientNetB0

base_model = EfficientNetB0(
    include_top=False,
    weights='imagenet',
    input_shape=(224, 224, 3)
)
base_model.trainable = False  # freeze backbone

inputs = layers.Input(shape=(224, 224, 3))
x = base_model(inputs, training=False)
x = layers.GlobalAveragePooling2D()(x)
x = layers.BatchNormalization()(x)
x = layers.Dropout(0.3)(x)
x = layers.Dense(256, activation='swish')(x)
x = layers.BatchNormalization()(x)
x = layers.Dropout(0.3)(x)
outputs = layers.Dense(4, activation='softmax')(x)

model = Model(inputs, outputs)

model.compile(
    optimizer=tf.keras.optimizers.Adam(learning_rate=0.001),
    loss='categorical_crossentropy',
    metrics=['accuracy']
)

# Stage 1: Train head only
model.fit(train_gen, epochs=20, validation_data=val_gen)

# Stage 2: Fine-tune top 30 layers
base_model.trainable = True
for layer in base_model.layers[:-30]:
    layer.trainable = False

model.compile(
    optimizer=tf.keras.optimizers.Adam(learning_rate=0.0001),
    loss='categorical_crossentropy',
    metrics=['accuracy']
)

model.fit(train_gen, epochs=15, validation_data=val_gen)
```

## 6. Evaluasi

```python
from sklearn.metrics import classification_report, confusion_matrix

preds = model.predict(test_gen)
y_pred = np.argmax(preds, axis=1)
y_true = test_gen.classes

print(classification_report(y_true, y_pred, target_names=['UNRIPE', 'RIPE', 'OVERRIPE', 'DEFECT']))
```

| Class | Precision | Recall | F1 |
|-------|-----------|--------|------|
| UNRIPE | 0.91 | 0.87 | 0.89 |
| RIPE | 0.88 | 0.93 | 0.90 |
| OVERRIPE | 0.85 | 0.82 | 0.83 |
| DEFECT | 0.91 | 0.88 | 0.89 |
| **Overall** | **0.889** | **0.89** | **0.889** |

Akurasi overall 89%. **Confusion utama**: OVERRIPE vs DEFECT — biji terlalu matang kadang terlihat seperti berjamur (warna hitam mirip). Solusi: tambah dataset khusus edge cases ini.

## 7. Konversi ke TFLite (Mobile Deployment)

```python
converter = tf.lite.TFLiteConverter.from_keras_model(model)
converter.optimizations = [tf.lite.Optimize.DEFAULT]
converter.target_spec.supported_ops = [
    tf.lite.OpsSet.TFLITE_BUILTINS,
    tf.lite.OpsSet.SELECT_TF_OPS
]

# Quantization: INT8 untuk inferensi cepat di HP
def representative_dataset():
    for batch in test_gen.take(100):
        yield [batch[0]]

converter.representative_dataset = representative_dataset
converter.target_spec.supported_types = [tf.int8]
converter.inference_input_type = tf.uint8
converter.inference_output_type = tf.uint8

tflite_model = converter.convert()
with open('cacao_classifier_v2.tflite', 'wb') as f:
    f.write(tflite_model)

print(f"Model size: {len(tflite_model) / 1024:.1f} KB")
# EfficientNet-B0 quantized: ~5.5 MB
```

Ukuran 5.5MB — acceptable untuk aplikasi Android via Firebase ML Kit atau TensorFlow Lite Interpreter.

---

# Pelajaran

1. **Background standardization kritis.** Background putih di dataset = model belajar dari putih, bukan dari biji. Segmentasi wajib.
2. **Augmentasi harus realistis.** `brightness_range=[0.7, 1.3]` lebih penting daripada `shear_range=0.5` — petani motret di kondisi cahaya variatif, bukan distorsi geometri ekstrem.
3. **OVERRIPE vs DEFECT adalah false-positive utama.** Kelas yang secara visual mirip perlu dataset khusus edge case — bukan cuma augmentasi general.
4. **Quantization TFLite wajib buat mobile.** Model float32 = 20MB+, INT8 = 5.5MB, inferensi 4x lebih cepat. Di HP petani kelas menengah, ini perbedaan antara 3 detik vs 12 detik per foto.