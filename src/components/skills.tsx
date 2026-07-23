import { skillGroups } from "@/data/skills";
import { SectionTitle } from "./node-marker";
import { MotionWrapper } from "./motion-wrapper";

export function Skills() {
  return (
    <section id="keahlian" className="py-20 sm:py-28 scroll-mt-20">
      <MotionWrapper>
        <SectionTitle>Keahlian Teknis</SectionTitle>
        <div className="space-y-8">
          {skillGroups.map((group) => (
            <div key={group.category}>
              <h3 className="text-[12px] font-semibold text-[var(--color-text)] mb-3">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((skill) => (
                  <span
                    key={skill}
                    className="text-[10px] tracking-wide border px-3 py-1.5 transition-all cursor-default hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] hover:shadow-[0_0_16px_rgba(255,179,71,0.08)]"
                    style={{
                      color: "var(--color-text-muted)",
                      borderColor: "var(--color-border)",
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </MotionWrapper>
    </section>
  );
}
