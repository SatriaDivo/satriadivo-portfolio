export interface Project {
  name: string;
  category: string;
  description: string;
  techStack: string[];
  repoUrl?: string;
}

export const projects: Project[] = [
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
];
