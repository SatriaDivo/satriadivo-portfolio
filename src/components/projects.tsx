import { projects } from "@/data/projects";
import { SectionTitle } from "./node-marker";
import { MotionWrapper } from "./motion-wrapper";

export function Projects() {
  return (
    <section id="proyek" className="py-20 sm:py-28 scroll-mt-20">
      <MotionWrapper>
        <SectionTitle>Proyek</SectionTitle>
        <div className="space-y-16">
          {projects.map((project, idx) => (
            <MotionWrapper key={project.name} delay={idx * 0.1}>
              <article className="group">
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 mb-4">
                  <h3 className="heading-display text-xl sm:text-2xl text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors">
                    {project.name}
                  </h3>
                  <span
                    className="text-[10px] tracking-[0.1em] uppercase px-2 py-0.5 self-start"
                    style={{
                      color: "var(--color-accent)",
                      border: "1px solid var(--color-accent)",
                      opacity: 0.7,
                    }}
                  >
                    {project.category}
                  </span>
                </div>
                <p className="text-[13px] text-[var(--color-text)]/75 leading-relaxed mb-5 max-w-2xl">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-[10px] tracking-wide text-[var(--color-accent-2)] border px-2.5 py-1 transition-all hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                      style={{ borderColor: "var(--color-border)" }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </article>
            </MotionWrapper>
          ))}
        </div>
      </MotionWrapper>
    </section>
  );
}
