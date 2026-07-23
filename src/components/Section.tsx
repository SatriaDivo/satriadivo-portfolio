import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface SectionProps {
  id: string;
  eyebrow: string;
  title?: string;
  children: ReactNode;
}

export function Section({ id, eyebrow, title, children }: SectionProps) {
  return (
    <section id={id} className="relative pt-12 pb-12 scroll-mt-28 group">
      {/* PCB Trace Node / Solder Joint */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-20px" }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="hidden sm:block absolute left-[-44px] top-[38px] w-2 h-2 rounded-full bg-solder-copper shadow-[0_0_8px_var(--color-solder-copper)] z-10"
      />

      <div className="mb-6">
        <h2 className="text-xs sm:text-sm font-mono uppercase tracking-[0.3em] text-trace-green mb-8">
          {eyebrow} {title ? `— ${title}` : ''}
        </h2>
      </div>

      <div>{children}</div>
    </section>
  );
}
