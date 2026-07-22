import type { Project } from "@/data/projects";

export function ProjectRow({ project }: { project: Project }) {
  return (
    <article className="border-b border-border group hover:bg-surface transition-colors p-6 sm:p-10">
      <div className="flex flex-col lg:flex-row lg:items-baseline justify-between mb-4 gap-4">
        <h3 className="heading-display text-2xl sm:text-4xl uppercase group-hover:text-accent transition-colors">
          {project.name}
        </h3>
        <span className="text-sm uppercase text-border-light border border-border-light px-2 py-1 group-hover:border-accent group-hover:text-accent transition-colors">
          {project.category}
        </span>
      </div>
      
      <p className="text-muted leading-relaxed mb-6 sm:text-lg max-w-[800px]">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2 mt-4">
        {project.techStack.map((tech) => (
          <span key={tech} className="bg-border text-text px-2 py-1 text-xs uppercase">
            {tech}
          </span>
        ))}
      </div>
    </article>
  );
}
