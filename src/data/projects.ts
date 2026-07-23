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
    category: "Full-Stack",
    description:
      "Platform low-code headless CMS & instant hosting. Mengonversi template statis/dinamis menjadi visual drag-and-drop editor. Backend Rust (Axum, sqlx), frontend Next.js, PostgreSQL, Redis, autentikasi JWT dengan role-based access control.",
    techStack: ["Rust", "Axum", "Next.js", "PostgreSQL", "Redis"],
  },
  {
    name: "ESP32 Fisheries E-Logbook",
    category: "Embedded Systems",
    description:
      "Sistem monitoring perikanan berbasis ESP32 dengan firmware 5-state non-blocking state machine untuk mencegah system stall. Transmisi data via ring buffer TX queue, ACK/retry logic, komunikasi Serial1 melalui modul MAX3232 ke DTU. Backend Node.js/Sequelize dengan sinkronisasi edge-to-cloud.",
    techStack: ["ESP32", "C/C++", "FreeRTOS", "State Machine", "UART/MAX3232"],
  },
  {
    name: "CocoaSense",
    category: "Computer Vision",
    description:
      "Mesin inferensi untuk identifikasi kematangan dan kualitas biji kakao. Pipeline Computer Vision terintegrasi backend QC operasional. Role management tiga tingkat: Petani (input scan), Koperasi (QC validation), Admin (oversight) — dengan flow pengajuan akses sistem.",
    techStack: ["AI/ML", "Computer Vision", "RBAC", "Python"],
  },
  {
    name: "CodeVault",
    category: "Desktop",
    description:
      "Aplikasi desktop manajemen workspace developer. Dibangun dengan Tauri (Rust core) dan React/TypeScript frontend. Dokumentasi engineering lengkap: PRD, SRS, Architecture Decision Records, hingga Future Roadmap.",
    techStack: ["Rust", "Tauri", "React", "TypeScript", "SQLite"],
  },
  {
    name: "Chess Bot",
    category: "Automation",
    description:
      "Bot otomatis untuk chess.com menggunakan Playwright sebagai browser automation dan Stockfish sebagai engine analisis posisi. Membaca state board secara visual, menghitung langkah optimal, dan mengeksekusi move.",
    techStack: ["Playwright", "Stockfish", "Python", "Computer Vision"],
  },
];