import { motion } from 'motion/react';
import { achievements } from '../data/portfolio';
import { Trophy, FileText, Globe } from 'lucide-react';

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  Competition: <Trophy size={16} className="text-ink-primary" strokeWidth={2} />,
  Publication: <FileText size={16} className="text-ink-primary" strokeWidth={2} />,
  Conference: <Globe size={16} className="text-ink-primary" strokeWidth={2} />,
};

export function Achievements() {
  return (
    <div className="flex flex-col gap-4">
      {achievements.map((item, idx) => (
        <motion.a
          key={item.id}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-20px' }}
          transition={{ type: "spring", stiffness: 100, damping: 20, delay: idx * 0.1 }}
          className="group flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-8 p-6 bg-surface border border-border-subtle hover:border-ink-primary transition-colors"
        >
          <div className="flex flex-row sm:flex-col items-center sm:items-start justify-between sm:justify-start gap-2 sm:w-1/4 shrink-0">
            <div className="flex items-center gap-2 text-xs font-mono text-ink-secondary uppercase tracking-widest">
              {CATEGORY_ICONS[item.category] || <FileText size={16} />}
              {item.category}
            </div>
            <span className="text-xs font-mono text-ink-muted">
              {item.date}
            </span>
          </div>

          <div className="flex flex-col sm:w-3/4">
            <h3 className="font-display font-bold text-lg sm:text-xl text-ink-primary group-hover:text-accent transition-colors tracking-tight mb-2">
              {item.title}
            </h3>

            <p className="text-sm sm:text-base text-ink-secondary leading-relaxed font-body mb-4">
              {item.description}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-4 mt-auto">
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono font-medium text-ink-secondary uppercase tracking-wider bg-paper border border-border-subtle px-2 py-0.5"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <span className="font-mono text-xs text-ink-muted group-hover:text-accent transition-colors">
                VIEW DETAIL ↗
              </span>
            </div>
          </div>
        </motion.a>
      ))}
    </div>
  );
}
