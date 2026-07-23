import { motion } from 'motion/react';
import { personalInfo } from './data/portfolio';
import { NavBar } from './components/NavBar';
import { Section } from './components/Section';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { FocusAreas } from './components/FocusAreas';
import { Certifications } from './components/Certifications';
import { Contact } from './components/Contact';

export default function App() {
  return (
    <>
      <NavBar />

      <main className="max-w-4xl mx-auto px-4 sm:px-8 md:px-16 pt-8 sm:pt-12 pb-12 w-full flex-1">
        <div className="relative">
          {/* PCB Trace Line — animate from top on load */}
          <div className="hidden sm:block absolute left-[-40px] top-12 bottom-0 w-px bg-trace-green/20 z-0">
            <motion.div
              className="absolute top-0 w-full bg-trace-green/40 origin-top"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ duration: 2.0, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{ height: '100%' }}
            />
            {/* Trace nodes — pulse along the line at each section */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-solder-copper shadow-[0_0_8px_var(--color-solder-copper)]"
              style={{ top: '40px' }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.2, 1], opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.0, ease: 'easeOut' }}
            />
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-solder-copper shadow-[0_0_8px_var(--color-solder-copper)]"
              style={{ top: '42%' }}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-solder-copper shadow-[0_0_8px_var(--color-solder-copper)]"
              style={{ top: '66%' }}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-solder-copper shadow-[0_0_8px_var(--color-solder-copper)]"
              style={{ top: '90%' }}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          </div>

          <Section id="init" eyebrow="SYS_INIT">
            <Hero />
          </Section>

          <Section id="projects" eyebrow="MODULES" title="Production Projects">
            <Projects />
          </Section>

          <Section id="experience" eyebrow="ORG_LOG" title="Organizational Experience">
            <Experience />
          </Section>

          <Section id="focus" eyebrow="CORE_AREAS" title="Technical Focus">
            <FocusAreas />
          </Section>

          <Section id="certifications" eyebrow="CERTIFICATIONS" title="Verified Badges">
            <Certifications />
          </Section>

          <Section id="contact" eyebrow="END_PROCESS" title="Connect">
            <Contact />
          </Section>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-4 sm:px-8 py-5 sm:py-6 border-t border-mist flex flex-col sm:flex-row justify-between items-center bg-paper mt-auto gap-3 sm:gap-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-trace-green animate-pulse shrink-0" />
          <p className="text-[8px] sm:text-[9px] font-mono uppercase tracking-widest text-slate-node truncate max-w-[220px] sm:max-w-none">
            {personalInfo.name} — {personalInfo.role}
          </p>
        </div>
        <p className="text-[8px] sm:text-[9px] font-mono text-ink-circuit/40">
          © {new Date().getFullYear()} — Embedded · AI · Cloud
        </p>
      </footer>
    </>
  );
}