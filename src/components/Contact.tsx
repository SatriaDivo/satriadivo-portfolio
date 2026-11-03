import { motion } from 'motion/react';
import { personalInfo, uiTranslations } from '../data/portfolio';
import { useLanguage } from '../context/LanguageContext';

export function Contact() {
  const { lang } = useLanguage();
  const t = uiTranslations[lang].contact;

  const links = [
    { label: 'GITHUB', href: personalInfo.github },
    { label: 'LINKEDIN', href: personalInfo.linkedin },
    { label: 'INSTAGRAM', href: personalInfo.instagram },
    { label: 'YOUTUBE', href: personalInfo.youtube },
  ];

  return (
    <motion.div
      className="flex flex-col md:flex-row gap-12 md:gap-24"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-20px' }}
    >
      <div className="md:w-1/2">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 80, damping: 18 }}
          className="text-ink-secondary leading-relaxed text-base sm:text-lg font-body mb-8"
        >
          {t.lead}
        </motion.p>

        <motion.a
          href={`mailto:${personalInfo.email}`}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 80, damping: 18, delay: 0.1 }}
          className="inline-flex items-center justify-center bg-ink-primary text-white px-8 py-4 text-sm font-medium hover:bg-ink-secondary transition-colors rounded-md shadow-xs"
        >
          {t.sendEmail}
        </motion.a>
      </div>

      <div className="md:w-1/2 flex flex-col gap-4">
        <h4 className="font-mono text-xs font-bold text-ink-muted uppercase tracking-[0.2em] mb-2">
          {t.socialsTitle}
        </h4>
        <div className="flex flex-col gap-0 border-y border-border-subtle">
          {links.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 80, damping: 18, delay: i * 0.05 }}
              className="group text-sm font-mono flex items-center justify-between py-4 border-b border-border-subtle last:border-0 hover:pl-4 transition-all"
            >
              <span className="font-medium text-ink-primary group-hover:text-accent transition-colors">
                {link.label}
              </span>
              <span className="text-ink-muted group-hover:text-accent transition-colors">↗</span>
            </motion.a>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
