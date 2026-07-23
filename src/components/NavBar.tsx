import { motion } from 'motion/react';
import { personalInfo } from '../data/portfolio';

export function NavBar() {
  const links = [
    { label: 'Projects', href: '#projects' },
    { label: 'Focus', href: '#focus' },
    { label: 'Badges', href: '#certifications' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="sticky top-0 z-50 w-full px-6 sm:px-12 py-4 bg-paper/80 backdrop-blur-md border-b border-mist flex justify-between items-center"
    >
      <div className="max-w-4xl mx-auto w-full flex items-center justify-between">
        <motion.a
          href="#init"
          className="font-mono font-bold tracking-tight text-xs uppercase text-ink-circuit transition-colors hover:text-solder-copper"
          whileHover={{ scale: 1.03 }}
        >
          {personalInfo.name.toUpperCase()} / {personalInfo.role.toUpperCase()}
        </motion.a>
        <nav className="flex gap-4 sm:gap-8 text-[11px] uppercase tracking-widest font-semibold font-mono">
          {links.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              className="text-trace-green transition-colors relative"
              whileHover={{ color: 'var(--color-solder-copper)' }}
            >
              {link.label}
              <motion.span
                className="absolute -bottom-0.5 left-0 w-full h-px bg-solder-copper origin-left"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.25 }}
              />
            </motion.a>
          ))}
        </nav>
      </div>
    </motion.header>
  );
}