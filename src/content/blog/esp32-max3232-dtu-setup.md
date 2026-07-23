---
title: "ESP32 + MAX3232 + DTU — Setup Hardware Komunikasi Satelit Perikanan"
date: 2026-07-23
summary: Wiring diagram, level shifting RS232 ke TTL, AT command DTU, power management, dan enclosure waterproof untuk kapal perikanan.
---

# Kenapa RS232, Bukan USB/UART Langsung?

Di atas kapal perikanan, ESP32 harus bicara dengan **DTU (Data Terminal Unit)** — modem satelit yang punya interface RS232 (±12V). ESP32 native UART adalah **TTL (0–3.3V)**. Sambung langsung? Pin RX ESP32 akan goreng.

Solusi: **MAX3232** — IC level shifter RS232 ↔ TTL. Kenapa bukan MAX232? MAX232 butuh 5V. MAX3232 jalan di 3.3V, cocok dengan ESP32.

---

# Wiring Diagram

```
ESP32                    MAX3232                   DTU (DB9 Female)
─────────────────────────────────────────────────────────────
GPIO17 (TX2)  ────►  TTL_IN (Pin 10)  ──►  RS232_OUT (Pin 7)  ──►  DB9 Pin 2 (RX)
GPIO16 (RX2)  ◄────  TTL_OUT (Pin 9)  ◄──  RS232_IN (Pin 8)   ◄──  DB9 Pin 3 (TX)
GND           ────   GND (Pin 15)     ────                      ────  DB9 Pin 5 (GND)
3.3V          ────   VCC (Pin 16)     ────  (3.3V supply)
                      C1+ (Pin 1) ──[0.1µF]── GND
                      C1- (Pin 3) ──[0.1µF]── C2+ (Pin 4)
                      C2- (Pin 5) ──[0.1µF]── GND
                      V+ (Pin 2) ──[0.1µF]── GND
                      V- (Pin 6) ──[0.1µF]── GND
```

Kapasitor 0.1µF wajib — ini charge pump internal MAX3232 buat generate ±12V dari 3.3V.

---

# Konfigurasi Serial ESP32

```cpp
// Serial1: GPIO16 (RX), GPIO17 (TX) — dedicated UART
Serial1.begin(9600, SERIAL_8N1, 16, 17);

// Serial2: GPIO5 (RX), GPIO18 (TX) — debug/console
Serial2.begin(115200);
```

Kenapa 9600 baud? DTU satelit biasanya di 9600. Bukan soal kecepatan ESP32 (bisa 921600), tapi **DTU tidak mampu lebih cepat** di link satelit bandwidth rendah.

---

# AT Command DTU — Inisialisasi

DTU dikontrol via AT command. Sebelum operasi, firmware kirim konfigurasi:

```cpp
void dtu_init() {
  // Tunggu DTU siap
  delay(3000);  // HANYA di init — setelah ini NO DELAY di loop utama

  // Cek komunikasi
  Serial1.print("AT\r\n");
  wait_response("OK", 2000);

  // Set APN — SIM card satelit (contoh: Iridium/Inmarsat)
  Serial1.print("AT+APN=\"satellite.provider.id\"\r\n");
  wait_response("OK", 5000);

  // Set server tujuan — IP + port backend Elogbook
  Serial1.print("AT+SERVER=210.79.191.17,5000\r\n");
  wait_response("OK", 5000);

  // Mode transparan — setelah ini, semua data langsung ke server
  Serial1.print("AT+MODE=TRANSPARENT\r\n");
  wait_response("OK", 3000);

  log_info("DTU_READY");
}

bool wait_response(const char* expected, unsigned long timeout) {
  unsigned long start = millis();
  String buffer = "";
  while (millis() - start < timeout) {
    while (Serial1.available()) {
      char c = Serial1.read();
      buffer += c;
      if (buffer.indexOf(expected) >= 0) return true;
    }
    delay(10);  // hanya di init — loop utama pakai vTaskDelay
  }
  return false;
}
```

---

# Power Management

Kapal perikanan pakai aki 12V (± fluktuasi saat mesin nyala/mati). ESP32 butuh 3.3V stabil. 

Rantai power:

```
Aki 12V ──► Buck Converter LM2596 (12V→5V, 3A) ──► AMS1117-3.3 (5V→3.3V, 1A) ──► ESP32 + MAX3232
                                                         │
                                                    DTU (langsung 12V)
```

Kenapa dua stage? Buck converter dari 12V ke 3.3V langsung dropnya besar → panas. Dua stage: 12V→5V (buck, efisien) lalu 5V→3.3V (LDO, bersih — ripple rendah buat ESP32).

Tambahan: **dioda TVS (Transient Voltage Suppressor)** di input 12V — mencegah spike tegangan saat starter mesin kapal dinyalakan. ESP32 mati tanpa TVS, udah kejadian di prototype pertama.

---

# Monitoring Kesehatan Hardware

```cpp
struct HealthStatus {
  float vcc_esp32;    // tegangan ESP32 (internal ADC)
  float vcc_battery;  // tegangan aki (via voltage divider)
  uint16_t heap_free; // ESP.getFreeHeap()
  uint32_t uptime;    // millis() / 1000
  uint8_t tx_queue_usage; // tx_count / TX_QUEUE_SIZE * 100
  uint16_t packets_sent;
  uint16_t packets_dropped;
};

HealthStatus get_health() {
  HealthStatus h;
  h.vcc_esp32 = analogRead(34) * (3.3 / 4095.0) * 2;  // voltage divider 1:1
  h.vcc_battery = analogRead(35) * (3.3 / 4095.0) * 4.545; // 47k:10k divider
  h.heap_free = ESP.getFreeHeap();
  h.uptime = millis() / 1000;
  h.tx_queue_usage = (tx_count * 100) / TX_QUEUE_SIZE;
  h.packets_sent = stats_packets_sent;
  h.packets_dropped = stats_packets_dropped;
  return h;
}
```

Health report dikirim sebagai payload khusus tiap 5 menit — terpisah dari payload sensor. Berguna untuk **remote debugging** tanpa harus naik kapal.

---

# Enclosure Waterproof

Kapal = air garam + getaran mesin + sinar UV. Spesifikasi enclosure:

| Komponen | Spesifikasi |
|----------|-------------|
| Box | IP67 ABS, 200×120×75mm |
| Cable gland | PG9 (untuk kabel DTU + power) |
| Seal | Silicone gasket bawaan box + tambahan silicone sealant di tepi |
| Ventilasi | **Tidak ada** — sealed sepenuhnya. Panas ESP32 (max 60°C) masih aman tanpa ventilasi aktif |
| Mounting | Bracket stainless steel M4, dilas ke dinding kabin |

PCB custom single-layer, semua komponen through-hole (bukan SMD) — supaya bisa disolder manual di bengkel kapal kalau ada perbaikan darurat.

---

# Pelajaran Hardware

1. **Level shifting RS232 bukan optional.** MAX3232 murah (Rp 15rb) vs ESP32 gosong (Rp 80rb). Pasang selalu.
2. **TVS diode wajib di lingkungan elektrik kotor.** Kapal = generator + starter motor = spike 50V+. Tanpa TVS, ESP32 reboot random.
3. **Buck + LDO dua stage > satu regulator.** Efisiensi + stabilitas. ESP32 sensitif terhadap ripple.
4. **Enclosure tanpa ventilasi = ok.** ESP32 + MAX3232 total disipasi <1W. Box sealed 200×120mm cukup untuk konveksi internal.