import { motion } from 'motion/react';
import { organization } from '../data/portfolio';

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] as const },
  }),
};

export function Experience() {
  return (
    <div className="space-y-12">
      {organization.map((org, idx) => (
        <motion.div
          key={org.role + org.org}
          variants={itemVariants}
          custom={idx}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-20px' }}
          className="relative pl-6 sm:pl-8 border-l border-mist"
        >
          {/* Timeline Dot */}
          <div className="absolute left-[-5px] top-1.5 w-2 h-2 rounded-full bg-solder-copper" />

          <div className="mb-4">
            <h3 className="font-display font-bold text-lg sm:text-xl text-ink-circuit uppercase tracking-tight">
              {org.org}
            </h3>
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-xs sm:text-sm font-mono text-trace-green mt-1">
              <span className="font-bold">{org.role}</span>
              <span className="hidden sm:inline text-mist">•</span>
              <span>{org.department}</span>
              <span className="hidden sm:inline text-mist">•</span>
              <span className="text-ink-circuit/60">{org.period}</span>
            </div>
          </div>

          <ul className="space-y-2 text-sm sm:text-base font-body text-ink-circuit/80">
            {org.highlights.map((point, i) => (
              <li key={i} className="flex gap-3">
                <span className="text-solder-copper shrink-0 mt-1.5 text-[8px]">▶</span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  );
}