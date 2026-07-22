export interface Project {
  name: string;
  category: string;
  description: string;
  techStack: string[];
  repoUrl?: string;
}

export const projects: Project[] = [
  {
    name: "NEXUS-CMS",
    category: "Web Platform",
    description:
      "Platform Low-Code Headless CMS & Instant Hosting. Mengonversi template statis dan dinamis menjadi visual drag-and-drop editor. Otomasi pemetaan variabel dan komponen dilakukan oleh AI model (DeepSeek/Gemini), beroperasi di atas backend high-performance berbasis Rust.",
    techStack: ["Rust (Axum)", "Next.js", "PostgreSQL", "Redis"],
  },
  {
    name: "CodeVault",
    category: "Desktop App",
    description:
      "Aplikasi desktop untuk manajemen workspace developer. Diarsiteki menggunakan Rust dan Tauri untuk performa mendekati native dengan footprint memori minimal. Dilengkapi dokumentasi rekayasa industri: PRD, Design Doc, SRS, BRD, dan diagram Arsitektur.",
    techStack: ["Rust", "Tauri", "Technical Writing"],
  },
  {
    name: "ESP32 Fisheries E-Logbook",
    category: "Embedded Systems",
    description:
      "Sistem pemantauan perikanan berbasis ESP32. Firmware menggunakan 5-state non-blocking state machine untuk menghindari system stall. Transmisi data via ring buffer TX queue dan ACK/retry logic. Jalur komunikasi hardware melalui Serial1 ke DTU menggunakan modul MAX3232.",
    techStack: ["ESP32", "C/C++", "State Machine", "UART/MAX3232"],
  },
  {
    name: "CocoaSense",
    category: "Computer Vision",
    description:
      "Mesin inferensi untuk identifikasi kematangan dan kualitas biji kakao. Pipeline Computer Vision disambungkan dengan backend QC operasional. Terintegrasi Role-Based Access Control (RBAC) yang membedakan Petani, Koperasi, dan Admin — termasuk flow pengajuan akses sistem.",
    techStack: ["AI/ML", "Computer Vision", "RBAC"],
  },
  {
    name: "Chess Bot",
    category: "Automation",
    description:
      "Bot otomasi catur web. Menggunakan Playwright untuk interaksi langsung pada DOM browser, mengekstrak representasi FEN papan catur, lalu mengirim posisi ke local Stockfish engine untuk evaluasi langkah optimal secara real-time.",
    techStack: ["Playwright", "Stockfish", "DOM Automation"],
  },
];
