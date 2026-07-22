export interface SkillGroup {
  category: string;
  items: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    category: "Internet of Things (IoT) Development",
    items: ["Arduino", "ESP32", "Raspberry Pi"],
  },
  {
    category: "Artificial Intelligence & Machine Learning",
    items: ["Model development", "TensorFlow Lite", "feature engineering"],
  },
  {
    category: "Cloud Computing & DevOps",
    items: ["AWS", "Docker", "Kubernetes", "CI/CD"],
  },
  {
    category: "Networking & Security",
    items: ["CCNA-level", "Firewall", "VPN", "Penetration Testing"],
  },
  {
    category: "Web & Mobile Development",
    items: ["React", "Next.js", "Node.js", "React Native"],
  },
  {
    category: "Soft Skill",
    items: [
      "Kerja dalam tim",
      "Kepemimpinan",
      "Komunikasi",
      "Problem Solving",
      "Adaptif",
      "Manajemen Waktu",
    ],
  },
];
