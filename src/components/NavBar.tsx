import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { personalInfo } from '../data/portfolio';

export function NavBar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  const links = [
    { label: 'Projects', href: '/#projects' },
    { label: 'Focus', href: '/#focus' },
    { label: 'Badges', href: '/#certifications' },
    { label: 'Blog', href: '/#blog' },
    { label: 'Contact', href: '/#contact' },
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="sticky top-0 z-50 w-full bg-paper/80 backdrop-blur-md border-b border-mist"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-8 py-3 sm:py-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="font-mono font-bold text-[10px] sm:text-xs uppercase text-ink-circuit hover:text-solder-copper transition-colors truncate max-w-[60%] sm:max-w-none inline-block"
        >
          <span className="hidden sm:inline">{personalInfo.name.toUpperCase()} / </span>
          {personalInfo.role.toUpperCase()}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden sm:flex gap-6 text-[10px] sm:text-[11px] uppercase tracking-widest font-semibold font-mono">
          {links.map((link) => (
            <div key={link.label} className="relative group">
              <a
                href={link.href}
                className="text-trace-green hover:text-solder-copper transition-colors"
              >
                {link.label}
              </a>
              <motion.span
                className="absolute -bottom-0.5 left-0 w-full h-px bg-solder-copper origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-250"
              />
            </div>
          ))}
        </nav>

        {/* Burger */}
        <button
          onClick={() => setOpen(!open)}
          className="sm:hidden flex flex-col gap-1 p-1"
          aria-label="Toggle menu"
        >
          <motion.span animate={open ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }} className="w-5 h-0.5 bg-ink-circuit block" />
          <motion.span animate={open ? { opacity: 0 } : { opacity: 1 }} className="w-5 h-0.5 bg-ink-circuit block" />
          <motion.span animate={open ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }} className="w-5 h-0.5 bg-ink-circuit block" />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="sm:hidden border-t border-mist bg-paper/95 overflow-hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-3">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-[11px] font-mono font-bold uppercase tracking-widest text-trace-green hover:text-solder-copper transition-colors py-1 border-b border-dashed border-mist"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}