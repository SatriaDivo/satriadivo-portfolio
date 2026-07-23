---
title: "Docker + CI/CD Pipeline untuk Data Scientist — Kenapa Bukan Cuma Jupyter Notebook"
date: 2026-07-23
summary: Containerisasi model ML, CI/CD pipeline dari training ke deployment. Dockerfile praktis, docker-compose untuk stack ML, GitHub Actions auto-test model.
---

# Masalah: "It Works on My Machine"

Data scientist klasik:
1. Buka Jupyter Notebook di laptop.
2. `pip install` apapun yang dibutuhkan.
3. Training model, save `model.h5`.
4. Kirim file `.h5` ke backend engineer.
5. Backend engineer: _"Import error, module `transformers==2023.1.1` conflict."_

Ini terjadi karena tidak ada **lingkungan yang identik** antara development dan production.

Solusi: **Docker containerization** + **CI/CD pipeline**. Model bukan cuma file — model adalah **artifact beserta runtime environment-nya**.

---

# Dockerfile untuk Model Serving (Flask API)

```dockerfile
FROM python:3.11-slim

WORKDIR /app

# Install dependencies from locked file
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy model & inference code
COPY model.pkl .
COPY inference.py .
COPY preprocessing.py .

# Flask API untuk serving
EXPOSE 5000
ENV MODEL_PATH=/app/model.pkl

CMD ["python", "inference.py"]
```

`requirements.txt` yang **locked** — bukan `>=`, tapi `==` exact version:

```
numpy==1.26.4
scikit-learn==1.5.1
xgboost==2.0.3
flask==3.0.3
pandas==2.2.2
```

Kenapa locked? Supaya build deterministik. Kalau pakai `>=`, minggu depan bisa auto-upgrade dan model jadi broken karena API change.

## inference.py (Flask minimal)

```python
import pickle
import numpy as np
from flask import Flask, request, jsonify
from preprocessing import preprocess

app = Flask(__name__)

# Load model sekali saat startup
with open('/app/model.pkl', 'rb') as f:
    model = pickle.load(f)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    features = preprocess(data)
    prediction = model.predict(features).tolist()
    return jsonify({'prediction': prediction})

@app.route('/health')
def health():
    return jsonify({'status': 'ok', 'model_version': 'v2.1'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
```

---

# Docker Compose: Full ML Stack

Untuk development lokal dengan seluruh infrastruktur:

```yaml
# docker-compose.yml
version: '3.8'
services:
  ml-api:
    build: .
    ports:
      - "5000:5000"
    environment:
      - MODEL_PATH=/app/model.pkl
    depends_on:
      - redis
    restart: unless-stopped

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

  training:
    build:
      context: .
      dockerfile: Dockerfile.training
    volumes:
      - ./data:/app/data
      - ./models:/app/models
    command: python train.py --output /app/models/model.pkl
```

Dockerfile.training:

```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements-training.txt .
RUN pip install --no-cache-dir -r requirements-training.txt

COPY data_prep.py .
COPY train.py .
```

Ini memisahkan **training environment** (lebih berat — matplotlib, jupyter, seaborn) dari **serving environment** (lebih ringan — cuma flask + numpy + scikit-learn). Serving image seharusnya sekecil mungkin untuk cold-start cepat.

---

# CI/CD dengan GitHub Actions

Pipeline: push ke `main` → test model → build Docker → push ke registry → deploy.

```yaml
# .github/workflows/ml-pipeline.yml
name: ML Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test-model:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - uses: actions/setup-python@v5
        with:
          python-version: '3.11'
          cache: 'pip'
      
      - name: Install dependencies
        run: pip install -r requirements.txt
      
      - name: Run model validation tests
        run: python -m pytest tests/ -v
      # Tests harus include:
      # - test_model_accuracy_minimum (akurasi >= threshold)
      # - test_no_data_leakage (train/test split benar)
      # - test_inference_shape (input/output shape OK)
      # - test_edge_cases (null input, extreme values)

  build-and-push:
    needs: test-model  # Hanya build kalau tests pass
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Build Docker image
        run: docker build -t ghcr.io/${{ github.repository }}/ml-api:${{ github.sha }} .
      
      - name: Push to GitHub Container Registry
        run: |
          echo ${{ secrets.GITHUB_TOKEN }} | docker login ghcr.io -u ${{ github.actor }} --password-stdin
          docker push ghcr.io/${{ github.repository }}/ml-api:${{ github.sha }}
      
      - name: Tag as latest
        run: |
          docker tag ghcr.io/${{ github.repository }}/ml-api:${{ github.sha }} ghcr.io/${{ github.repository }}/ml-api:latest
          docker push ghcr.io/${{ github.repository }}/ml-api:latest

  deploy:
    needs: build-and-push
    runs-on: ubuntu-latest
    steps:
      - name: Deploy via SSH
        uses: appleboy/ssh-action@v1.0.3
        with:
          host: ${{ secrets.VPS_HOST }}
          username: ${{ secrets.VPS_USER }}
          key: ${{ secrets.VPS_SSH_KEY }}
          script: |
            cd /opt/ml-api
            docker compose pull ml-api
            docker compose up -d ml-api
            # Health check
            sleep 5
            curl -f http://localhost:5000/health || exit 1
```

---

# Model Validation Tests

```python
# tests/test_model.py
import pickle
import numpy as np
import pytest

@pytest.fixture(scope='module')
def model():
    with open('model.pkl', 'rb') as f:
        return pickle.load(f)

def test_model_accuracy_minimum(model):
    """Akurasi baseline harus > 0.75 — kalau di bawah, jangan deploy."""
    from sklearn.metrics import accuracy_score
    X_test = np.load('data/X_test.npy')
    y_test = np.load('data/y_test.npy')
    preds = model.predict(X_test)
    acc = accuracy_score(y_test, preds)
    assert acc > 0.75, f"Accuracy {acc:.3f} below minimum threshold 0.75"

def test_inference_shape(model):
    """Pastikan model menerima input shape yang benar."""
    dummy = np.random.randn(1, 10)  # asumsi 10 features
    pred = model.predict(dummy)
    assert pred.shape == (1,), f"Expected shape (1,), got {pred.shape}"

def test_edge_cases(model):
    """Null input, extreme values — tidak boleh crash."""
    # All zeros
    zeros = np.zeros((1, 10))
    pred_zeros = model.predict(zeros)
    assert pred_zeros is not None

    # Extreme values
    extreme = np.full((1, 10), 1e6)
    pred_extreme = model.predict(extreme)
    assert pred_extreme is not None

    # NaN input — harus raise atau handle gracefully
    nan_input = np.full((1, 10), np.nan)
    with pytest.raises(ValueError):
        model.predict(nan_input)
```

---

# Kenapa Ini Penting Buat Data Scientist?

1. **Reproducibility.** Docker image = snapshot immutable dari environment. Model yang di-train 6 bulan lalu bisa dijalankan ulang persis sama.
2. **Deployment bukan urusan "backend engineer saja."** Kalau lo bisa bikin Dockerfile, lo udah 90% jalan ke production. Backend tinggal orchestrate (K8s, health check).
3. **CI/CD mencegah regresi model.** Tiap commit ke `main`, pipeline auto-test akurasi. Kalau model baru lebih jelek dari sebelumnya → build gagal → tidak deploy.
4. **Docker bukan pengganti Jupyter.** Jupyter tetap untuk eksplorasi. Docker untuk productionize. Keduanya coexist.

---

# Pelajaran

1. **`pip freeze > requirements.txt` dengan exact version.** Bukan `>=`. Deterministic build.
2. **Docker image terpisah untuk training vs serving.** Training = berat (full dependencies). Serving = ringan (minimal). Image serving 200MB vs 2GB — cold start 5 detik vs 60 detik.
3. **Tests model = code tests.** Akurasi minimum, shape validation, edge cases — semua harus automated. Bukan cek "accuracy 0.89" di notebook dan anggap selesai.
4. **CI/CD untuk ML bukan opsional.** Model degradation itu silent killer. Tanpa auto-test tiap commit, bisa deploy model rusak tanpa sadar.