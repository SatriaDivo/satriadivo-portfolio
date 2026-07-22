export interface SkillGroup {
  category: string;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    category: "Embedded & IoT",
    items: [
      "ESP32 & Arduino ecosystem",
      "Raspberry Pi (SBC architecture)",
      "Non-blocking state machines",
      "Serial comm (UART, MAX3232)",
    ],
  },
  {
    category: "AI & Machine Learning",
    items: [
      "Computer Vision pipelines",
      "TensorFlow Lite (Edge AI)",
      "LLM integration & prompting",
      "Data analytics & visualization",
    ],
  },
  {
    category: "Web & Backend",
    items: [
      "Rust (Axum, Tauri)",
      "Next.js & React ecosystem",
      "PostgreSQL & Redis",
      "Node.js backend",
    ],
  },
  {
    category: "Infrastructure & Certs",
    items: [
      "AWS (Certified — Cloud Architecting & Foundations)",
      "CCNA (Certified — Enterprise Networking, Security & Automation)",
      "Docker, Kubernetes, CI/CD",
      "Firewall, VPN & penetration testing",
    ],
  },
];
