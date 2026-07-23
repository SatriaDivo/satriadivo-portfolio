"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { siteMetadata } from "@/data/metadata";

const links = [
  { label: "GitHub", href: siteMetadata.github },
  { label: "LinkedIn", href: siteMetadata.linkedin },
  { label: "Instagram", href: siteMetadata.instagram },
  { label: "YouTube", href: siteMetadata.youtube },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.4 } },
};

const item = {
  hidden: { opacity: 0, x: -20 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export function Hero() {
  const [typed, setTyped] = useState("");
  const tagline = "satria@dev:~$";

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setTyped(tagline.slice(0, i));
      if (i >= tagline.length) clearInterval(interval);
    }, 60);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-[80vh] flex flex-col justify-end pb-20 sm:pb-28 pt-28 sm:pt-40">
      {/* Terminal prompt */}
      <div className="mb-6">
        <span className="text-[var(--color-accent)] text-sm">{typed}</span>
        {typed.length < tagline.length && (
          <span className="text-[var(--color-accent)] animate-pulse">█</span>
        )}
      </div>

      <motion.div variants={container} initial="hidden" animate="show">
        <motion.h1
          variants={item}
          className="heading-display text-[clamp(2.8rem,9vw,6rem)] leading-[0.88] text-[var(--color-text)] mb-8"
          style={{ textShadow: "0 0 80px rgba(255,179,71,0.1)" }}
        >
          <span className="block">Satria</span>
          <span className="block">Divo</span>
          <span className="block">Praditya</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="text-sm text-[var(--color-text-muted)] mb-2 max-w-lg leading-relaxed"
        >
          {/* Build layered systems — firmware to AI pipeline */}
          {`// Membangun sistem berlapis — dari firmware sampai AI pipeline`}
        </motion.p>

        <motion.p
          variants={item}
          className="text-[11px] text-[var(--color-accent-2)] mb-12"
        >
          {siteMetadata.email}
        </motion.p>

        <motion.div variants={item} className="flex flex-wrap gap-x-7 gap-y-2">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] tracking-[0.1em] uppercase text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
            >
              {link.label} →
            </a>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
