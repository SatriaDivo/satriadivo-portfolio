import { motion, Variants } from 'motion/react';
import { personalInfo, uiTranslations } from '../data/portfolio';
import { useLanguage } from '../context/LanguageContext';
import { MapPin, ArrowRight, FileDown } from 'lucide-react';

const stagger: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 80, damping: 18, delay: 0.12 * i },
  }),
};

export function Hero() {
  const { lang } = useLanguage();
  const t = uiTranslations[lang].hero;

  return (
    <motion.div
      className="flex flex-col gap-8 md:gap-12"
      initial="hidden"
      animate="visible"
    >
      <div className="flex flex-col max-w-3xl">
        <motion.div variants={stagger} custom={0} className="flex items-center gap-2 mb-6">
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-ink-secondary">
            {t.available}
          </span>
        </motion.div>

        <motion.h1
          variants={stagger} custom={1}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold tracking-tighter leading-[1.1] mb-6 text-ink-primary"
        >
          {t.headline}
        </motion.h1>

        <motion.p
          variants={stagger} custom={2}
          className="text-base sm:text-lg md:text-xl text-ink-secondary font-body leading-relaxed max-w-2xl mb-8"
        >
          {t.introPrefix} <strong className="text-ink-primary font-medium">{personalInfo.name}</strong>, {lang === 'id' ? 'seorang' : 'a'}{' '}
          <strong className="text-ink-primary font-medium">{t.introTitle}</strong>. {t.introBody}
        </motion.p>

        <motion.div variants={stagger} custom={3} className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm font-mono text-ink-muted mb-10">
          <span className="flex items-center gap-1.5">
            <MapPin size={14} />
            {personalInfo.location[lang]}
          </span>
          <span className="hidden sm:inline text-border-subtle">|</span>
          <span>{t.certTag}</span>
          <span className="hidden sm:inline text-border-subtle">|</span>
          <span>{personalInfo.company}</span>
        </motion.div>

        <motion.div variants={stagger} custom={4} className="flex flex-wrap gap-3 sm:gap-4 items-center">
          <a
            href="#projects"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-ink-primary text-white px-6 py-3.5 text-sm font-medium hover:bg-ink-secondary transition-colors rounded-md shadow-xs"
          >
            {t.viewWorks}
            <ArrowRight size={16} />
          </a>
          <a
            href={personalInfo.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            download="CV_Satria_Divo_Praditya.pdf"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-surface border border-border-subtle text-ink-primary px-6 py-3.5 text-sm font-medium hover:border-ink-primary hover:bg-black/[0.02] transition-all rounded-md shadow-xs group"
          >
            <FileDown size={16} className="text-ink-secondary group-hover:text-accent transition-colors" />
            <span>{t.downloadCv}</span>
          </a>
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 text-ink-secondary hover:text-ink-primary px-3 py-3 text-sm font-mono transition-colors"
          >
            <span>{t.githubProfile}</span>
            <span className="text-xs">↗</span>
          </a>
        </motion.div>
      </div>

      <motion.div
        variants={stagger} custom={5}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 pt-8 sm:pt-12 border-t border-border-subtle mt-4"
      >
        {[
          { label: t.stats.projects, value: personalInfo.stats.projects, suffix: '+' },
          { label: t.stats.certifications, value: personalInfo.stats.certifications, suffix: '' },
          { label: t.stats.publications, value: personalInfo.stats.publications, suffix: '' },
          { label: t.stats.experience, value: personalInfo.stats.experience, suffix: '+' },
        ].map((stat) => (
          <div key={stat.label} className="flex flex-col gap-1">
            <span className="text-3xl sm:text-4xl font-display font-bold text-ink-primary tracking-tight tabular-nums">
              {stat.value}{stat.suffix}
            </span>
            <span className="text-[10px] sm:text-xs font-mono text-ink-secondary uppercase tracking-wider">
              {stat.label}
            </span>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
}
