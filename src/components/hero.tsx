import { motion } from 'motion/react';
import { personalInfo } from '../data/portfolio';

const stagger = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.15 * i, ease: [0.16, 1, 0.3, 1] },
  }),
};

export function Hero() {
  return (
    <motion.div
      className="space-y-6 pt-4 pb-4 relative flex flex-col"
      initial="hidden"
      animate="visible"
    >
      {/* Eyebrow */}
      <motion.p
        variants={stagger} custom={0}
        className="text-[10px] font-mono uppercase tracking-[0.2em] text-trace-green mb-2"
      >
        {personalInfo.education}
      </motion.p>

      {/* Name — split line */}
      <motion.h1
        variants={stagger} custom={1}
        className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tighter leading-none mb-4 font-display"
      >
        {personalInfo.name.toUpperCase()}
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 3 }}
          className="text-solder-copper ml-1 inline-block"
        >
          _
        </motion.span>
      </motion.h1>

      {/* Badges */}
      <motion.div variants={stagger} custom={2} className="flex flex-wrap items-center gap-4 mb-6">
        <span className="bg-slate-node text-white px-3 py-1 text-[10px] font-mono rounded">
          {personalInfo.role.toUpperCase()} — {personalInfo.company.toUpperCase()}
        </span>
        <span className="bg-mist text-ink-circuit px-3 py-1 text-[10px] font-mono rounded">
          AWS &amp; CCNA CERTIFIED
        </span>
      </motion.div>

      {/* Thesis */}
      <motion.p
        variants={stagger} custom={3}
        className="text-xl md:text-2xl leading-tight max-w-2xl italic text-trace-green font-body"
      >
        &ldquo;{personalInfo.thesis}&rdquo;
      </motion.p>

      {/* Location */}
      <motion.p variants={stagger} custom={4} className="text-xs text-ink-circuit/60 font-mono">
        {personalInfo.location}
      </motion.p>

      {/* Links */}
      <motion.div variants={stagger} custom={5} className="flex flex-col gap-2 pt-6 max-w-xs">
        {[
          { label: 'GITHUB', href: personalInfo.github },
          { label: 'LINKEDIN', href: personalInfo.linkedin },
          { label: 'INSTAGRAM', href: personalInfo.instagram },
          { label: 'YOUTUBE', href: personalInfo.youtube },
        ].map((link) => (
          <motion.a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="text-sm border-b border-dashed border-trace-green py-1 flex justify-between font-mono transition-colors hover:border-solder-copper hover:text-solder-copper"
            whileHover={{ x: 4 }}
          >
            <span className="font-bold">
              {link.label}
            </span>
            <span>↗</span>
          </motion.a>
        ))}
      </motion.div>
    </motion.div>
  );
}