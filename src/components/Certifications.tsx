import { motion } from 'motion/react';
import { personalInfo } from '../data/portfolio';

const badgeVariants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.35, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] },
  }),
};

export function Certifications() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {personalInfo.certificationBadges.map((badge, idx) => (
          <motion.a
            key={badge.url}
            href={badge.url}
            target="_blank"
            rel="noreferrer"
            variants={badgeVariants}
            custom={idx}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-20px' }}
            whileHover={{ y: -2, scale: 1.02 }}
            className="bg-mist/40 border border-mist p-3 hover:border-solder-copper transition-colors group block"
          >
            <p className="text-[10px] font-mono font-bold text-ink-circuit uppercase leading-tight mb-1 group-hover:text-trace-green transition-colors">
              {badge.name}
            </p>
            <p className="text-[8px] font-mono text-slate-node uppercase tracking-wider">
              {badge.issuer}
            </p>
            <motion.span
              className="text-[8px] font-mono text-solder-copper mt-1.5 inline-block"
              whileHover={{ x: 2 }}
            >
              credly ↗
            </motion.span>
          </motion.a>
        ))}
      </div>

      <motion.a
        href="https://www.credly.com/users/satria-divo-praditya/badges/credly"
        target="_blank"
        rel="noreferrer"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.3 }}
        whileHover={{ x: 4 }}
        className="inline-flex items-center gap-1.5 text-[10px] font-mono font-bold text-trace-green hover:text-solder-copper transition-colors border-b border-dashed border-trace-green hover:border-solder-copper pb-0.5"
      >
        Lihat semua 13 badge di Credly
        <span className="text-xs">→</span>
      </motion.a>
    </div>
  );
}