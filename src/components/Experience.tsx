import { motion } from 'motion/react';
import { organization } from '../data/portfolio';

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] },
  }),
};

const bulletVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, delay: 0.3 + i * 0.06, ease: 'easeOut' },
  }),
};

export function Experience() {
  return (
    <div className="space-y-6">
      {organization.map((org, idx) => (
        <motion.article
          key={org.org}
          variants={cardVariants}
          custom={idx}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-20px' }}
          className="relative bg-mist/40 border border-mist p-5 sm:p-6 hover:border-solder-copper transition-colors"
        >
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-4">
            <div>
              <h3 className="font-bold text-base sm:text-lg tracking-tight font-display text-ink-circuit uppercase">
                {org.role}
              </h3>
              <p className="text-sm font-body text-ink-circuit/70 mt-0.5">
                {org.org} — {org.department}
              </p>
              <p className="text-[10px] font-mono uppercase tracking-widest text-slate-node mt-0.5">
                {org.institution}
              </p>
            </div>
            <motion.span
              className="text-[10px] sm:text-xs font-mono bg-solder-copper text-white px-2 py-0.5 rounded-sm whitespace-nowrap self-start"
              whileHover={{ scale: 1.05 }}
            >
              {org.period}
            </motion.span>
          </div>

          {/* Highlights */}
          <ul className="space-y-2">
            {org.highlights.map((item, i) => (
              <motion.li
                key={i}
                variants={bulletVariants}
                custom={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex items-start gap-3 text-sm sm:text-base text-ink-circuit/80 leading-relaxed font-body"
              >
                <span className="text-trace-green font-bold select-none mt-0.5 shrink-0">▸</span>
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>
        </motion.article>
      ))}
    </div>
  );
}
