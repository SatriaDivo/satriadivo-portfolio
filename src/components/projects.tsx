import { projects } from "@/data/projects";
import { NodeMarker, SectionEyebrow } from "./node-marker";

export function Projects() {
  return (
    <section id="projects" className="relative pt-20 pb-[var(--spacing-section)] scroll-mt-14">
      <NodeMarker />
      
      <SectionEyebrow>PROYEK</SectionEyebrow>

      <div className="space-y-16">
        {projects.map((project) => (
          <article key={project.name} className="group">
            <h3 className="heading-display text-2xl sm:text-3xl text-[var(--color-ink-circuit)] mb-3">
              {project.name}
            </h3>
            
            <div className="flex flex-wrap gap-2 text-mono text-xs sm:text-sm text-[var(--color-trace-green)] mb-4">
              {project.techStack.join(" · ")}
            </div>
            
            <p className="text-[var(--color-ink-circuit)]/80 leading-relaxed text-base sm:text-lg max-w-2xl">
              {project.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
