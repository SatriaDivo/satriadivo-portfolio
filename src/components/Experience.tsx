import { motion } from 'motion/react';
import { experience, organization } from '../data/portfolio';
import { useLanguage } from '../context/LanguageContext';

function TimelineItem({
  role,
  company,
  period,
  highlights,
  idx,
}: {
  role: string;
  company: string;
  period: string;
  highlights: string[];
  idx: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ type: "spring", stiffness: 100, damping: 20, delay: idx * 0.1 }}
      className="flex flex-col md:flex-row gap-4 md:gap-12 py-8 border-t border-border-subtle first:border-0 first:pt-0"
    >
      <div className="md:w-1/4 shrink-0">
        <span className="font-mono text-xs text-ink-muted uppercase tracking-widest block mb-2">
          {period}
        </span>
      </div>

      <div className="md:w-3/4">
        <h3 className="font-display font-bold text-lg sm:text-xl text-ink-primary tracking-tight mb-1">
          {role}
        </h3>
        <span className="font-mono text-sm text-ink-secondary mb-4 block">
          {company}
        </span>

        <ul className="space-y-3 font-body text-sm sm:text-base text-ink-secondary">
          {highlights.map((point, i) => (
            <li key={i} className="flex gap-3 leading-relaxed">
              <span className="text-ink-muted shrink-0 text-[10px] mt-1.5 font-mono">/</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

export function Experience() {
  const { lang } = useLanguage();

  const items = [
    ...experience.map((e) => ({
      role: e.role[lang],
      company: e.company,
      period: e.period[lang],
      highlights: e.highlights[lang],
    })),
    ...organization.map((o) => ({
      role: o.role[lang],
      company: `${o.org[lang]} ${o.department[lang]}, ${o.institution[lang]}`,
      period: o.period[lang],
      highlights: o.highlights[lang],
    })),
  ];

  if (items.length === 0) return null;

  return (
    <div className="flex flex-col">
      {items.map((item, idx) => (
        <TimelineItem key={item.role + item.company} {...item} idx={idx} />
      ))}
    </div>
  );
}
