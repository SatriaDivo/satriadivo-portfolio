import { siteMetadata } from "@/data/metadata";

export function Contact() {
  return (
    <footer className="pt-10 pb-24 sm:pb-32 mt-16" style={{ borderTop: "1px solid var(--color-border)" }}>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10">
        <div>
          <p className="heading-display text-lg text-[var(--color-text)] mb-1">
            {"// mari bicara."}
          </p>
          <p className="text-[12px] text-[var(--color-text-muted)]">
            Terbuka untuk kolaborasi, proyek, atau magang.
          </p>
        </div>
        <a
          href={`mailto:${siteMetadata.email}`}
          className="text-[11px] tracking-[0.1em] uppercase px-5 py-2.5 transition-all hover:shadow-[0_0_24px_rgba(255,179,71,0.15)]"
          style={{
            backgroundColor: "var(--color-accent)",
            color: "var(--color-bg)",
          }}
        >
          Hubungi Saya
        </a>
      </div>

      <div className="flex flex-wrap gap-x-8 gap-y-2 text-[11px] tracking-[0.1em] uppercase" style={{ color: "var(--color-text-muted)" }}>
        {[
          { label: "GitHub", href: siteMetadata.github },
          { label: "LinkedIn", href: siteMetadata.linkedin },
          { label: "Instagram", href: siteMetadata.instagram },
          { label: "YouTube", href: siteMetadata.youtube },
          { label: "Email", href: `mailto:${siteMetadata.email}` },
        ].map((link) => (
          <a
            key={link.label}
            href={link.href}
            target={link.href.startsWith("mailto") ? undefined : "_blank"}
            rel="noopener noreferrer"
            className="hover:text-[var(--color-accent)] transition-colors"
          >
            {link.label}
          </a>
        ))}
      </div>

      <p
        className="text-[10px] tracking-wide mt-14"
        style={{ color: "var(--color-border)" }}
      >
        © {new Date().getFullYear()} {siteMetadata.name}
      </p>
    </footer>
  );
}
