import { motion } from 'motion/react';
import { projects } from '../data/portfolio';
import { ArrowUpRight } from 'lucide-react';

export function Projects() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
      {projects.map((project, idx) => {
        // First project is featured (spans full width)
        const isFeatured = idx === 0;

        return (
          <motion.a
            key={project.id}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: idx * 0.1 }}
            className={`group flex flex-col ${isFeatured ? 'md:col-span-2 md:flex-row gap-8 md:gap-12' : 'gap-6'}`}
          >
            {/* Visual Placeholder for technical layout */}
            <div className={`bg-tech-node border border-border-subtle aspect-video flex items-center justify-center overflow-hidden ${isFeatured ? 'md:w-1/2' : 'w-full'}`}>
              {/* @ts-ignore */}
              {project.image ? (
                /* @ts-ignore */
                <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              ) : (
                <span className="font-mono text-ink-muted text-xs uppercase tracking-widest">
                  [ {project.id.toUpperCase()}_VISUAL ]
                </span>
              )}
            </div>

            <div className={`flex flex-col justify-center ${isFeatured ? 'md:w-1/2' : ''}`}>
              <div className="flex items-start justify-between gap-4 mb-4">
                <h3 className="font-display font-bold text-xl sm:text-2xl text-ink-primary group-hover:text-accent transition-colors tracking-tight">
                  {project.title}
                </h3>
                <ArrowUpRight size={20} className="text-ink-muted group-hover:text-accent transition-colors shrink-0" />
              </div>
              
              <p className="text-sm sm:text-base text-ink-secondary leading-relaxed mb-6 font-body">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-auto">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] sm:text-xs font-mono font-medium text-ink-primary bg-surface border border-border-subtle px-2 py-1"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </motion.a>
        );
      })}
    </div>
  );
}
