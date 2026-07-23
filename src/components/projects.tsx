import { motion } from 'motion/react';
import { projects } from '../data/portfolio';

const cardVariants: any = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] },
  }),
};

export function Projects() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {projects.map((project, idx) => (
        <motion.article
          key={project.id}
          variants={cardVariants}
          custom={idx}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-20px' }}
          whileHover={{ y: -3, scale: 1.01 }}
          className="bg-mist/40 p-4 border border-mist hover:border-solder-copper transition-colors group cursor-default"
        >
          <div className="flex justify-between items-start mb-2 gap-2">
            <h3 className="font-bold text-base sm:text-lg tracking-tight font-display text-ink-circuit uppercase">
              {project.title}
            </h3>
            {project.tech.length > 0 && (
              <motion.span
                className="text-[10px] sm:text-xs font-mono bg-solder-copper text-white px-2 py-0.5 whitespace-nowrap rounded-sm"
                whileHover={{ scale: 1.05 }}
              >
                {project.tech.slice(0, 2).join(' / ').toUpperCase()}
              </motion.span>
            )}
          </div>
          <p className="text-sm sm:text-base text-ink-circuit/80 leading-relaxed font-body">
            {project.description}
          </p>

          {/* Extra tech tags below description */}
          {project.tech.length > 2 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {project.tech.slice(2).map((t) => (
                <span
                  key={t}
                  className="text-[8px] font-mono text-slate-node bg-mist px-1.5 py-0.5"
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </motion.article>
      ))}
    </div>
  );
}