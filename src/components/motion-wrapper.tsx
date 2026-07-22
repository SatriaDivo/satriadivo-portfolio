"use client";

import { type ReactNode, useEffect, useState } from "react";
import { motion } from "framer-motion";

interface MotionWrapperProps {
  children: ReactNode;
  className?: string;
  /** Delay in seconds before fade-in starts */
  delay?: number;
}

/**
 * Fade-in wrapper yang menghormati prefers-reduced-motion.
 * Jika reduced motion aktif, konten langsung tampil tanpa animasi.
 */
export function MotionWrapper({
  children,
  className,
  delay = 0,
}: MotionWrapperProps) {
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mq.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
