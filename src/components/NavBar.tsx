import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

const NAV_LINKS = [
  { label: 'Works', href: '/#projects' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Achievements', href: '/#achievements' },
  { label: 'Contact', href: '/#contact' },
] as const;

function NavLink({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      className="relative text-ink-secondary hover:text-ink-primary transition-colors duration-300 text-xs sm:text-sm font-medium tracking-wide"
    >
      {label}
    </a>
  );
}

export function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 18 }}
      className="sticky top-0 z-50 w-full bg-paper/90 backdrop-blur-md border-b border-border-subtle"
    >
      <div className="max-w-5xl mx-auto px-6 sm:px-12 md:px-20 flex items-center justify-between h-16 sm:h-20">
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="font-mono font-bold text-xs sm:text-sm text-ink-primary hover:text-accent transition-colors shrink-0 tracking-tight"
        >
          SATRIA DIVO PRADITYA / <span className="text-ink-muted font-normal">PORTFOLIO</span>
        </a>

        <nav className="hidden sm:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.label} {...link} />
          ))}
        </nav>

        <button
          onClick={() => setOpen(!open)}
          className="sm:hidden flex flex-col gap-1.5 p-1"
          aria-label="Toggle menu"
        >
          <motion.span
            animate={open ? { rotate: 45, y: 7.5 } : { rotate: 0, y: 0 }}
            className="w-5 h-px bg-ink-primary block origin-left"
          />
          <motion.span
            animate={open ? { opacity: 0 } : { opacity: 1 }}
            className="w-5 h-px bg-ink-primary block"
          />
          <motion.span
            animate={open ? { rotate: -45, y: -7.5 } : { rotate: 0, y: 0 }}
            className="w-5 h-px bg-ink-primary block origin-left"
          />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="sm:hidden border-t border-border-subtle bg-paper overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-6">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-sm font-medium tracking-wide text-ink-secondary hover:text-ink-primary transition-colors"
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
