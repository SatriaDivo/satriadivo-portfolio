"use client";

import { useEffect, useState } from "react";
import { siteMetadata } from "@/data/metadata";

const navLinks = [
  { href: "#resume", label: "resume" },
  { href: "#proyek", label: "proyek" },
  { href: "#keahlian", label: "keahlian" },
] as const;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "py-3"
          : "py-5"
      }`}
      style={{
        backgroundColor: scrolled ? "color-mix(in srgb, var(--color-bg) 92%, transparent)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid var(--color-border)" : "1px solid transparent",
      }}
    >
      <div className="max-w-4xl mx-auto px-6 sm:px-10 flex justify-between items-center">
        <a
          href="#"
          className="heading-display text-sm text-[var(--color-accent)] hover:opacity-80 transition-opacity"
        >
          [{siteMetadata.shortName}]
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[11px] tracking-[0.15em] uppercase transition-colors hover:text-[var(--color-accent)]"
              style={{ color: "var(--color-text-muted)" }}
            >
              ./{link.label}
            </a>
          ))}
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 -mr-2"
          style={{ color: "var(--color-text-muted)" }}
          aria-label="Toggle menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div
          className="md:hidden px-6 py-6 flex flex-col gap-5"
          style={{
            backgroundColor: "color-mix(in srgb, var(--color-bg) 95%, transparent)",
            borderBottom: "1px solid var(--color-border)",
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="text-[12px] tracking-[0.15em] uppercase transition-colors hover:text-[var(--color-accent)]"
              style={{ color: "var(--color-text-muted)" }}
            >
              ./{link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
