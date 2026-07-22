import { projects } from "@/data/projects";
import { MotionWrapper } from "./motion-wrapper";

export function ActivityFeed() {
  return (
    <div id="proyek" className="mt-8 scroll-mt-24">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Featured Projects</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <MotionWrapper key={project.name} delay={index * 0.1}>
            <div className="bg-[var(--color-card)] border border-[var(--color-mist)] rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col hover:-translate-y-1">
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="font-bold text-[var(--color-ink-circuit)] text-xl mb-3">{project.name}</h3>
                <p className="text-sm text-gray-600 flex-1 mb-6 leading-relaxed">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-gray-100">
                  {project.techStack.map((tech, i) => (
                    <span key={i} className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </MotionWrapper>
        ))}
      </div>
    </div>
  );
}
