import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { personalInfo, uiTranslations } from '../data/portfolio';
import { useLanguage } from '../context/LanguageContext';

type CertCategory = 'all' | 'cloud' | 'networking' | 'ai-data';

export function Certifications() {
  const { lang } = useLanguage();
  const t = uiTranslations[lang].certifications;
  const [activeCategory, setActiveCategory] = useState<CertCategory>('all');

  const filterOptions: { key: CertCategory; label: string }[] = [
    { key: 'all', label: t.filters.all },
    { key: 'cloud', label: t.filters.cloud },
    { key: 'networking', label: t.filters.networking },
    { key: 'ai-data', label: t.filters.aiData },
  ];

  const filteredBadges = activeCategory === 'all'
    ? personalInfo.certificationBadges
    : personalInfo.certificationBadges.filter((b) => b.category === activeCategory);

  return (
    <div className="flex flex-col gap-6">
      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {filterOptions.map((option) => (
          <button
            key={option.key}
            onClick={() => setActiveCategory(option.key)}
            className={`text-xs font-mono px-3.5 py-1.5 rounded-full border transition-all cursor-pointer ${
              activeCategory === option.key
                ? 'bg-ink-primary text-white border-ink-primary font-semibold shadow-xs'
                : 'bg-surface text-ink-secondary border-border-subtle hover:border-ink-muted hover:text-ink-primary'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>

      {/* Grid of Badges */}
      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <AnimatePresence mode="popLayout">
          {filteredBadges.map((badge, idx) => (
            <motion.a
              layout
              key={badge.url}
              href={badge.url}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 120, damping: 20, delay: idx * 0.03 }}
              className="group flex flex-col justify-between p-5 border border-border-subtle bg-surface hover:border-ink-primary rounded-xl transition-all hover:shadow-xs hover:-translate-y-0.5"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[9px] font-mono uppercase tracking-wider text-ink-muted bg-paper border border-border-subtle px-1.5 py-0.5 rounded">
                    {badge.category === 'cloud'
                      ? 'Cloud'
                      : badge.category === 'networking'
                      ? 'Network'
                      : 'AI / Data'}
                  </span>
                </div>
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
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
