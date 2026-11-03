import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface SectionProps {
  id: string;
  eyebrow?: string;
  title?: string;
  children: ReactNode;
  className?: string;
}

export function Section({ id, eyebrow, title, children, className = '' }: SectionProps) {
  return (
    <section id={id} className={`relative scroll-mt-24 ${className}`}>
      {(eyebrow || title) && (
        <div className="mb-10 sm:mb-12 border-b border-border-subtle pb-4 flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6">
          {eyebrow && (
            <h2 className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.2em] text-ink-muted">
              {eyebrow}
            </h2>
          )}
          {title && (
            <h3 className="text-xl sm:text-2xl font-display font-bold text-ink-primary tracking-tight">
              {title}
            </h3>
          )}
        </div>
      )}

      <div>{children}</div>
    </section>
  );
}
