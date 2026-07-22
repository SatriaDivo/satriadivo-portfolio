import { siteMetadata } from "@/data/metadata";
import { NodeMarker, SectionEyebrow } from "./node-marker";

export function Contact() {
  return (
    <footer id="contact" className="relative pt-20 pb-32 scroll-mt-14">
      {/* Node terakhir di trace line */}
      <NodeMarker isLast />
      
      <SectionEyebrow>CONTACT</SectionEyebrow>

      <div className="flex flex-wrap gap-8 text-mono text-sm uppercase tracking-wide">
        <a
          href={siteMetadata.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--color-ink-circuit)] hover:text-[var(--color-solder-copper)] transition-colors underline decoration-[var(--color-mist)] hover:decoration-[var(--color-solder-copper)] underline-offset-8"
        >
          GitHub
        </a>
        <a
          href={siteMetadata.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--color-ink-circuit)] hover:text-[var(--color-solder-copper)] transition-colors underline decoration-[var(--color-mist)] hover:decoration-[var(--color-solder-copper)] underline-offset-8"
        >
          LinkedIn
        </a>
      </div>
    </footer>
  );
}
