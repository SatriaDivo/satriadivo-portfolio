"use client";

import { useEffect, useState } from "react";
import { siteMetadata } from "@/data/metadata";

const navLinks = [
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Fokus Teknis" },
  { href: "#contact", label: "Contact" },
] as const;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 border-b ${
        scrolled
          ? "bg-[var(--color-paper)]/90 backdrop-blur-md border-[var(--color-mist)] shadow-sm"
          : "bg-transparent border-transparent"
      }`}
    >
      <div className="max-w-4xl mx-auto px-[var(--spacing-page-px)] flex justify-between items-center h-14">
        <a
          href="#"
          className="text-mono text-sm font-bold text-[var(--color-ink-circuit)] hover:text-[var(--color-trace-green)] transition-colors min-h-[44px] flex items-center tracking-tight"
        >
          {siteMetadata.name.toUpperCase()}
        </a>
        <div className="flex gap-2 sm:gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-mono text-xs text-[var(--color-ink-circuit)]/80 hover:text-[var(--color-trace-green)] transition-colors min-h-[44px] flex items-center uppercase tracking-wide"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
