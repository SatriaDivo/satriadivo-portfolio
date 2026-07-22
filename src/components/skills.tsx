import { NodeMarker, SectionEyebrow } from "./node-marker";

const skills = [
  "Embedded/IoT",
  "AI & Machine Learning",
  "Web/Backend",
  "Tools & Certification (AWS, CCNA)",
];

export function Skills() {
  return (
    <section id="skills" className="relative pt-20 pb-[var(--spacing-section)] scroll-mt-14">
      <NodeMarker />
      
      <SectionEyebrow>FOKUS TEKNIS</SectionEyebrow>

      <ul className="space-y-4">
        {skills.map((skill) => (
          <li 
            key={skill} 
            className="text-mono text-[var(--color-slate-node)] sm:text-lg flex items-center gap-4 group"
          >
            <span className="text-[var(--color-trace-green)] group-hover:text-[var(--color-solder-copper)] transition-colors font-bold">
              &gt;
            </span>
            <span className="group-hover:text-[var(--color-ink-circuit)] transition-colors">
              {skill}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
