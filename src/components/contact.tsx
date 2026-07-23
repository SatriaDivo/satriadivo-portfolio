import { motion } from 'motion/react';
import { personalInfo } from '../data/portfolio';

export function Contact() {
  const links = [
    { label: 'EMAIL', href: `mailto:${personalInfo.email}` },
    { label: 'GITHUB', href: personalInfo.github },
    { label: 'LINKEDIN', href: personalInfo.linkedin },
    { label: 'INSTAGRAM', href: personalInfo.instagram },
    { label: 'YOUTUBE', href: personalInfo.youtube },
  ];

  return (
    <motion.div
      className="space-y-8 flex flex-col"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
    >
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-ink-circuit/80 leading-relaxed max-w-xl text-sm font-body"
      >
        Tertarik untuk diskusi tentang arsitektur sistem, kolaborasi proyek, atau peluang profesional? Mari terhubung.
      </motion.p>

      <div className="flex flex-col gap-2 max-w-xs">
        {links.map((link, i) => (
          <motion.a
            key={link.label}
            href={link.href}
            target={link.href.startsWith('mailto') ? undefined : '_blank'}
            rel="noreferrer"
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm border-b border-dashed border-trace-green py-1 flex justify-between font-mono transition-colors hover:border-solder-copper"
            whileHover={{ x: 6 }}
          >
            <span className="font-bold text-ink-circuit transition-colors">
              {link.label}
            </span>
            <motion.span
              className="transition-colors"
              whileHover={{ x: 2 }}
            >
              ↗
            </motion.span>
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
}