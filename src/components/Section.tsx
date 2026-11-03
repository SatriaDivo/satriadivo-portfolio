import { motion, AnimatePresence } from 'motion/react';
import { ReactNode, useEffect, useState } from 'react';
import { Sparkles } from 'lucide-react';

interface SectionProps {
  id: string;
  eyebrow?: string;
  title?: string;
  children: ReactNode;
  className?: string;
}

export function Section({ id, eyebrow, title, children, className = '' }: SectionProps) {
  const [isHighlighted, setIsHighlighted] = useState(false);

  useEffect(() => {
    const handleTourStep = (e: Event) => {
      const customEvent = e as CustomEvent<{ targetId: string }>;
      if (customEvent.detail?.targetId === id) {
        setIsHighlighted(true);
        const timer = setTimeout(() => setIsHighlighted(false), 3500);
        return () => clearTimeout(timer);
      } else {
        setIsHighlighted(false);
      }
    };

    window.addEventListener('pia-tour-step', handleTourStep);
    return () => window.removeEventListener('pia-tour-step', handleTourStep);
  }, [id]);

  return (
    <section
      id={id}
      className={`relative scroll-mt-24 transition-all duration-500 rounded-2xl ${
        isHighlighted
          ? 'ring-2 ring-accent/30 bg-accent/[0.015] p-3 -m-3 sm:p-5 sm:-m-5 shadow-sm'
          : ''
      } ${className}`}
    >
      <AnimatePresence>
        {isHighlighted && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent text-white font-mono text-[10px] tracking-wider uppercase mb-3 shadow-md"
          >
            <Sparkles size={11} className="animate-spin" style={{ animationDuration: '4s' }} />
            <span>Fokus Panduan Pia 🐾</span>
          </motion.div>
        )}
      </AnimatePresence>

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
