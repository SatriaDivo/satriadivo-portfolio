---
title: Membangun Arsitektur Firmware Non-Blocking di ESP32
date: 2026-07-25
summary: Bagaimana saya menangani multiple sensor dan serial komunikasi tanpa delay di sistem IoT Fisheries E-Logbook.
---

# Kenapa Non-Blocking?
Dalam pengembangan firmware menggunakan C/C++, penggunaan `delay()` adalah mimpi buruk. Terutama di ESP32 saat kita berurusan dengan **FreeRTOS** dan state machine.

Di proyek **E-Logbook**, saya perlu mengirim data dari ESP32 via RS232 ke Data Terminal Unit (DTU) sembari membaca sensor secara simultan. Jika saya menggunakan `delay(1000)`, proses pembacaan serial akan terhenti, dan ACK dari server akan terlewat.

## Pendekatan State Machine
Solusi yang saya gunakan adalah arsitektur *5-State Non-Blocking State Machine*.

```cpp
enum SystemState {
  STATE_INIT,
  STATE_READ_SENSOR,
  STATE_TX_QUEUE,
  STATE_WAIT_ACK,
  STATE_ERROR
};

SystemState currentState = STATE_INIT;
```

Dengan metode ini, loop utama berjalan sekencang mungkin tanpa tertahan.

### Hasilnya
Sistem berjalan 24/7 tanpa *freeze* atau *watchdog reset*. Payload berhasil dikirim melalui jaringan satelit secara mulus.