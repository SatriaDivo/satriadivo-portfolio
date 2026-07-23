---
title: "Kenapa Data Scientist Harus Mengerti Networking (CCNA)"
date: 2026-07-23
summary: Alasan sertifikasi jaringan seperti Cisco CCNA tidak hanya relevan untuk SysAdmin, tapi merupakan nilai tambah krusial bagi AI Engineer dan Data Scientist.
---

# "Saya Kan Cuma Bikin Model ML?"

Sering kali, saya ditanya oleh sesama mahasiswa atau developer: _"Kamu Data Scientist Intern, fokusnya Python dan Machine Learning. Ngapain repot-repot ambil sertifikasi CCNA sampai 3 modul?"_

Pandangan umum mengatakan bahwa Data Science itu murni soal matematika, probabilitas, dan algoritma. Jaringan komputer itu urusan SysAdmin atau DevOps.

Tapi realita industri (terutama di era Cloud dan MLOps) berkata lain. Memiliki **mental model networking** adalah nilai tambah yang masif bagi seorang Data Scientist.

---

# 1. Cloud-Native ML Butuh Jaringan

Di tahap belajar (Kaggle, Jupyter Notebook lokal), file `.csv` tinggal dibaca dari folder yang sama. Tapi di produksi, di mana data lo berada?

- Data ada di S3 bucket pribadi.
- Database ada di private subnet RDS.
- Feature Store ada di Redis cluster.

Saat training script lo (di EC2 atau SageMaker) tidak bisa menghubungi database, error yang keluar seringkali generik: `Connection Timeout`.

Data scientist tanpa dasar jaringan akan menyalahkan library database atau _credentials_.
Data scientist dengan dasar CCNA akan berpikir:
- _"Apakah SG (Security Group) EC2 saya mengizinkan outbound port 5432?"_
- _"Apakah ada NAT Gateway di route table subnet ini?"_
- _"Apakah DNS resolution gagal karena DNS internal VPC tidak aktif?"_

Troubleshooting yang biasanya butuh waktu berhari-hari menunggu tim DevOps, bisa lo selesaikan sendiri dalam 10 menit.

---

# 2. Data Streaming dan Latency (Real-time AI)

Banyak aplikasi AI modern bersifat _real-time_: deteksi fraud kartu kredit, rekomendasi e-commerce, atau klasifikasi data sensor IoT seperti di proyek **E-Logbook**.

Jika model lo butuh 50ms untuk inferensi, tapi lo mengambil _features_ secara sinkron dari API eksternal yang latensinya 200ms karena masalah TCP handshake atau jarak geografis server, total response time jadi 250ms. Sistem lo dianggap lambat, padahal model lo sudah optimal.

Pemahaman tentang:
- TCP Window Size dan Overhead Handshake.
- UDP vs TCP (kapan boleh ada packet loss).
- Keep-Alive connections dan Connection Pooling.

...memungkinkan Data Scientist untuk mendesain arsitektur _data ingestion_ yang efisien sebelum data masuk ke model.

---

# 3. Distributed Training (Multi-GPU/Multi-Node)

Model AI semakin raksasa (LLM, Transformers). Lo tidak bisa lagi men-train model di satu mesin. Lo butuh kluster berisi belasan hingga ratusan node.

Saat menggunakan framework _distributed training_ (seperti PyTorch DistributedDataParallel atau Horovod), botleneck utamanya bukan lagi kecepatan GPU, melainkan **bandwidth dan latency jaringan antar node**.

Memahami konsep _Bandwidth, Throughput, Latency, MTU (Maximum Transmission Unit), dan Jumbo Frames_ sangat membantu dalam mengoptimalkan sinkronisasi gradien antar GPU di jaringan berkecepatan tinggi (InfiniBand atau AWS EFA).

---

# 4. Keamanan Data (Security)

Sebagai Data Scientist, lo sering memegang data paling sensitif di perusahaan: PII (Personally Identifiable Information), rekam medis, atau data keuangan.

Kalau lo membuka port Jupyter Notebook lo ke `0.0.0.0` (semua IP publik) tanpa enkripsi atau auth, lo sedang membocorkan aset terbesar perusahaan ke internet.

Sertifikasi CCNA mengajarkan prinsip dasar keamanan:
- **Defense in Depth:** Berlapis.
- **Least Privilege:** Hanya buka port yang diperlukan, untuk IP yang diizinkan.
- Konsep enkripsi data _in-transit_ (IPsec, TLS) vs _at-rest_.

---

# Kesimpulan

Belajar algoritma Random Forest atau Neural Network memang inti dari Data Science. Tapi infrastruktur yang menopang algoritma itu 100% bergantung pada jaringan komputer.

Sertifikasi seperti Cisco CCNA mungkin terlihat _overkill_ atau melenceng dari jalur AI. Tapi pondasi yang dibangunnya — pemahaman tentang bagaimana data sebenarnya berpindah dari Titik A ke Titik B — akan membuat lo menjadi AI Engineer yang mandiri, peka terhadap arsitektur, dan tidak buta saat sistem masuk ke fase produksi.