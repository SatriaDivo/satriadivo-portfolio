import { siteMetadata } from "@/data/metadata";
import { NodeMarker } from "./node-marker";
import { MotionWrapper } from "./motion-wrapper";

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-32">
      <NodeMarker isFirst />

      <MotionWrapper>
        <div className="mb-8">
          <h1 className="heading-display text-5xl sm:text-6xl text-[var(--color-ink-circuit)] mb-4">
            Satria Divo
            <br />
            Praditya
          </h1>
          <div className="text-mono text-sm text-[var(--color-slate-node)] bg-[var(--color-mist)]/50 inline-block px-3 py-1.5 uppercase tracking-wide">
            Data Analyst / Scientist Intern
          </div>
        </div>

        <p className="text-xl sm:text-2xl font-light text-[var(--color-ink-circuit)]/90 max-w-2xl mb-12 leading-relaxed">
          Saya membangun sistem berlapis—dari firmware sampai AI pipeline.
        </p>

        <div className="flex flex-wrap gap-6 text-mono text-sm uppercase tracking-wide">
          <a
            href={siteMetadata.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-trace-green)] hover:text-[var(--color-solder-copper)] transition-colors flex items-center gap-2 group min-h-[44px]"
          >
            GitHub
            <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
          </a>
          <a
            href={siteMetadata.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-trace-green)] hover:text-[var(--color-solder-copper)] transition-colors flex items-center gap-2 group min-h-[44px]"
          >
            LinkedIn
            <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
          </a>
        </div>
      </MotionWrapper>
    </section>
  );
}
