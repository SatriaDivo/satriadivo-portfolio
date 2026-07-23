import type { ReactNode } from "react";

export function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-10 -ml-10 sm:-ml-14">
      <span
        className="block w-3 h-3 rounded-sm shrink-0"
        style={{
          background: "var(--color-accent)",
          boxShadow: "0 0 0 3px var(--color-bg), 0 0 0 5px var(--color-accent-2)",
        }}
      />
      <h2
        className="text-[11px] tracking-[0.25em] uppercase"
        style={{ color: "var(--color-text-muted)" }}
      >
        {children}
      </h2>
    </div>
  );
}