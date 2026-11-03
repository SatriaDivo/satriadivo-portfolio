import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { uiTranslations } from '../data/portfolio';

function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="flex items-center bg-surface border border-border-subtle rounded-full p-0.5 text-[11px] font-mono tracking-wider">
      <button
        onClick={() => setLang('id')}
        className={`px-2.5 py-1 rounded-full transition-all ${
          lang === 'id'
            ? 'bg-ink-primary text-white font-bold shadow-xs'
            : 'text-ink-secondary hover:text-ink-primary'
        }`}
        title="Ganti ke Bahasa Indonesia"
      >
        ID
      </button>
      <button
        onClick={() => setLang('en')}
        className={`px-2.5 py-1 rounded-full transition-all ${
          lang === 'en'
            ? 'bg-ink-primary text-white font-bold shadow-xs'
            : 'text-ink-secondary hover:text-ink-primary'
        }`}
        title="Switch to English"
      >
        EN
      </button>
    </div>
  );
}

export function NavBar() {
  const [open, setOpen] = useState(false);
  const { lang } = useLanguage();
  const t = uiTranslations[lang].nav;

  const navLinks = [
    { label: t.works, href: '/#projects' },
    { label: t.focus, href: '/#focus' },
    { label: t.experience, href: '/#experience' },
    { label: t.achievements, href: '/#achievements' },
    { label: t.contact, href: '/#contact' },
  ];

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
          SATRIA DIVO PRADITYA / <span className="text-ink-muted font-normal">{t.portfolio}</span>
        </a>

        <div className="hidden sm:flex items-center gap-8">
          <nav className="flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative text-ink-secondary hover:text-ink-primary transition-colors duration-200 text-xs sm:text-sm font-medium tracking-wide"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <LanguageToggle />
        </div>

        {/* Mobile controls: Language Toggle + Hamburger */}
        <div className="flex sm:hidden items-center gap-3">
          <LanguageToggle />
          <button
            onClick={() => setOpen(!open)}
            className="flex flex-col gap-1.5 p-1 text-ink-primary"
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
            <div className="px-6 py-6 flex flex-col gap-5">
              {navLinks.map((link) => (
                <a
                  key={link.href}
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
