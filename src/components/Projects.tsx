import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { projects, uiTranslations } from '../data/portfolio';
import { useLanguage } from '../context/LanguageContext';
import { ArrowUpRight } from 'lucide-react';

type ProjectCategory = 'all' | 'iot' | 'ai' | 'cloud';

export function Projects() {
  const { lang } = useLanguage();
  const t = uiTranslations[lang].projects;
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');

  const filterOptions: { key: ProjectCategory; label: string }[] = [
    { key: 'all', label: t.filters.all },
    { key: 'iot', label: t.filters.iot },
    { key: 'ai', label: t.filters.ai },
    { key: 'cloud', label: t.filters.cloud },
  ];

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <div className="flex flex-col gap-8">
      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2">
        {filterOptions.map((option) => (
          <button
            key={option.key}
            onClick={() => setActiveCategory(option.key)}
            className={`text-xs font-mono px-3.5 py-1.5 rounded-full border transition-all cursor-pointer ${
              activeCategory === option.key
                ? 'bg-ink-primary text-white border-ink-primary font-semibold shadow-xs'
                : 'bg-surface text-ink-secondary border-border-subtle hover:border-ink-muted hover:text-ink-primary'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, idx) => {
            const isFeatured = activeCategory === 'all' && idx === 0;

            return (
              <motion.a
                layout
                key={project.id}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ type: "spring", stiffness: 100, damping: 20, delay: idx * 0.05 }}
                className={`group flex flex-col p-4 sm:p-5 -m-4 sm:-m-5 rounded-xl border border-transparent hover:border-border-subtle hover:bg-surface/60 transition-all ${
                  isFeatured ? 'md:col-span-2 md:flex-row gap-8 md:gap-12' : 'gap-6'
                }`}
              >
                {/* Visual Media Container */}
                <div className={`bg-tech-node border border-border-subtle rounded-lg aspect-video flex items-center justify-center overflow-hidden shrink-0 ${
                  isFeatured ? 'md:w-1/2' : 'w-full'
                }`}>
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <span className="font-mono text-ink-muted text-xs uppercase tracking-widest">
                      [ {project.id.toUpperCase()}_VISUAL ]
                    </span>
                  )}
                </div>

                <div className={`flex flex-col justify-center ${isFeatured ? 'md:w-1/2' : ''}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-accent font-semibold bg-accent/10 px-2 py-0.5 rounded-sm">
                      {project.badge}
                    </span>
                  </div>

                  <div className="flex items-start justify-between gap-4 mb-4">
                    <h3 className="font-display font-bold text-xl sm:text-2xl text-ink-primary group-hover:text-accent transition-colors tracking-tight">
                      {project.title}
                    </h3>
                    <ArrowUpRight size={20} className="text-ink-muted group-hover:text-accent transition-colors shrink-0" />
                  </div>

                  <p className="text-sm sm:text-base text-ink-secondary leading-relaxed mb-6 font-body">
                    {project.description[lang]}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] sm:text-xs font-mono font-medium text-ink-primary bg-surface border border-border-subtle px-2 py-1 rounded-sm"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.a>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
