import { motion } from 'motion/react';
import { personalInfo, uiTranslations } from '../data/portfolio';
import { useLanguage } from '../context/LanguageContext';

export function Certifications() {
  const { lang } = useLanguage();
  const t = uiTranslations[lang].certifications;

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {personalInfo.certificationBadges.map((badge, idx) => (
          <motion.a
            key={badge.url}
            href={badge.url}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: idx * 0.05 }}
            className="group flex flex-col justify-between p-5 border border-border-subtle bg-surface hover:border-ink-primary rounded-xl transition-all hover:shadow-xs hover:-translate-y-0.5"
          >
            <div>
              <p className="text-xs sm:text-sm font-mono font-medium text-ink-primary leading-tight mb-2 group-hover:text-accent transition-colors">
                {badge.name}
              </p>
              <p className="text-[10px] sm:text-xs font-mono text-ink-secondary">
                {badge.issuer}
              </p>
            </div>
            <div className="mt-6 flex justify-between items-center">
              <span className="text-[10px] font-mono font-bold text-ink-muted group-hover:text-ink-primary transition-colors">
                {t.verified}
              </span>
              <span className="text-xs font-mono text-ink-muted group-hover:text-accent transition-colors">
                ↗
              </span>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );
}
