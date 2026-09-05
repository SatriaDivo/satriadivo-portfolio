import { motion, Variants } from 'motion/react';
import { personalInfo } from '../data/portfolio';
import { MapPin, ArrowRight } from 'lucide-react';

const stagger: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 80, damping: 18, delay: 0.12 * i },
  }),
};

export function Hero() {
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
            Available for new opportunities
          </span>
        </motion.div>

        <motion.h1
          variants={stagger} custom={1}
          className="text-4xl sm:text-6xl md:text-7xl font-display font-bold tracking-tighter leading-[1.1] mb-6 text-ink-primary"
        >
          Bridging physical systems with intelligent data.
        </motion.h1>

        <motion.p
          variants={stagger} custom={2}
          className="text-lg sm:text-xl text-ink-secondary font-body leading-relaxed max-w-2xl mb-8"
        >
          I am a <strong className="text-ink-primary font-medium">Data Scientist & IoT Engineer</strong>. 
          I build layered systems—from constrained firmware in embedded devices to scalable AI pipelines in the cloud.
        </motion.p>

        <motion.div variants={stagger} custom={3} className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm font-mono text-ink-muted mb-10">
          <span className="flex items-center gap-1.5">
            <MapPin size={14} />
            {personalInfo.location}
          </span>
          <span className="hidden sm:inline text-border-subtle">|</span>
          <span>AWS & CCNA Certified</span>
          <span className="hidden sm:inline text-border-subtle">|</span>
          <span>{personalInfo.company}</span>
        </motion.div>

        <motion.div variants={stagger} custom={4} className="flex flex-wrap gap-4 items-center">
          <a
            href="#projects"
            className="inline-flex items-center gap-2 bg-ink-primary text-white px-6 py-3 text-sm font-medium hover:bg-ink-secondary transition-colors"
          >
            View Selected Works
            <ArrowRight size={16} />
          </a>
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 bg-surface border border-border-subtle text-ink-primary px-6 py-3 text-sm font-medium hover:border-ink-muted transition-colors"
          >
            GitHub Profile
          </a>
        </motion.div>
      </div>

      <motion.div
        variants={stagger} custom={5}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 pt-8 sm:pt-12 border-t border-border-subtle mt-4"
      >
        {[
          { label: 'Engineering Projects', value: personalInfo.stats.projects, suffix: '+' },
          { label: 'Verified Badges', value: personalInfo.stats.certifications, suffix: '' },
          { label: 'Publications', value: personalInfo.stats.publications, suffix: '' },
          { label: 'Years Experience', value: personalInfo.stats.experience, suffix: '+' },
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
