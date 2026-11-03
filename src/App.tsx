import { motion, useScroll, useSpring } from 'motion/react';
import { personalInfo } from './data/portfolio';
import { NavBar } from './components/NavBar';
import { Section } from './components/Section';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { Achievements } from './components/Achievements';
import { Experience } from './components/Experience';
import { FocusAreas } from './components/FocusAreas';
import { Certifications } from './components/Certifications';
import { Contact } from './components/Contact';
import { PiaPet } from './components/PiaPet';

function ScrollTop() {
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  return (
    <motion.button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full bg-ink-primary text-white flex items-center justify-center shadow-lg hover:bg-ink-secondary transition-colors"
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
    >
      <svg className="absolute inset-0 -rotate-90" width="40" height="40" viewBox="0 0 40 40">
        <motion.circle
          cx="20" cy="20" r="18"
          fill="none" stroke="var(--color-border-subtle)"
          strokeWidth="2"
          strokeLinecap="round"
          style={{ pathLength: scaleY }}
        />
      </svg>
      <span className="relative text-sm font-mono">↑</span>
    </motion.button>
  );
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-paper selection:bg-ink-primary selection:text-white">
      <NavBar />

      <main className="max-w-5xl mx-auto px-6 sm:px-12 md:px-20 pt-16 sm:pt-24 pb-20 w-full flex-1">
        <div className="flex flex-col gap-24 sm:gap-32">
          <Section id="init" className="pt-0">
            <Hero />
          </Section>

          <Section id="projects" eyebrow="01" title="Selected Works">
            <Projects />
          </Section>

          <Section id="focus" eyebrow="02" title="Technical Focus">
            <FocusAreas />
          </Section>

          <Section id="experience" eyebrow="03" title="Experience">
            <Experience />
          </Section>

          <Section id="achievements" eyebrow="04" title="Achievements">
            <Achievements />
          </Section>

          <Section id="certifications" eyebrow="05" title="Verified Badges">
            <Certifications />
          </Section>

          <Section id="contact" eyebrow="06" title="Connect">
            <Contact />
          </Section>
        </div>
      </main>

      <footer className="px-6 sm:px-12 py-8 border-t border-border-subtle flex flex-col sm:flex-row justify-between items-center bg-surface mt-auto gap-4">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shrink-0" />
          <p className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-ink-secondary">
            {personalInfo.name} / {personalInfo.role}
          </p>
        </div>
        <p className="text-[10px] sm:text-xs font-mono text-ink-muted">
          © {new Date().getFullYear()} • Engineering & Data Science
        </p>
      </footer>

      <ScrollTop />
      <PiaPet />
    </div>
  );
}
