import { motion } from 'motion/react';
import { achievements } from '../data/portfolio';

const CATEGORY_ICONS: Record<string, string> = {
  Competition: '🏆',
  Publication: '📄',
  Conference: '🌐',
};

const cardVariants: any = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] },
  }),
};

export function Achievements() {
  return (
    <div className="space-y-4">
      {achievements.map((item, idx) => (
        <motion.a
          key={item.id}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          variants={cardVariants}
          custom={idx}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-20px' }}
          whileHover={{ y: -3, scale: 1.01 }}
          className="block bg-mist/40 p-4 sm:p-5 border border-mist hover:border-solder-copper transition-colors group cursor-pointer"
        >
          {/* Top row: category + date */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-base sm:text-lg">
                {CATEGORY_ICONS[item.category] || '📌'}
              </span>
              <span className="text-[9px] sm:text-[10px] font-mono font-bold text-white bg-trace-green px-2 py-0.5 uppercase tracking-wider">
                {item.category}
              </span>
            </div>
            <span className="text-[10px] sm:text-xs font-mono text-slate-node">
              {item.date}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-display font-bold text-sm sm:text-base text-ink-circuit group-hover:text-solder-copper transition-colors leading-snug mb-2 uppercase tracking-tight">
            {item.title}
          </h3>

          {/* Description */}
          <p className="text-xs sm:text-sm text-ink-circuit/80 leading-relaxed font-body mb-3">
            {item.description}
          </p>

          {/* Tags + Link */}
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex flex-wrap gap-1.5">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[8px] sm:text-[9px] font-mono text-slate-node bg-mist px-1.5 py-0.5"
                >
                  {tag}
                </span>
              ))}
            </div>
            <span className="font-mono text-[9px] sm:text-[10px] text-solder-copper opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Baca selengkapnya ↗
            </span>
          </div>
        </motion.a>
      ))}
    </div>
  );
}
