import Image from "next/image";
import { siteMetadata } from "@/data/metadata";
import { MotionWrapper } from "./motion-wrapper";

export function ProfileCard() {
  return (
    <MotionWrapper>
      <div className="bg-[var(--color-card)] border border-[var(--color-mist)] rounded-lg shadow-sm p-6 sm:p-8 mb-6">
        <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center mb-6">
          <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 border-[var(--color-mist)] shrink-0">
            <img 
              src="https://github.com/satriaDivo.png" 
              alt={siteMetadata.name}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="flex-1">
            <h1 className="heading-display text-3xl sm:text-4xl text-[var(--color-ink-circuit)] mb-2">
              {siteMetadata.name}
            </h1>
            <div className="text-[var(--color-slate-node)] text-sm mb-3 space-y-1">
              <p className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                DSN Serbajadi, Pemanggilan, Natar, Lampung Selatan, Lampung
              </p>
              <p className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                Internet Engineering Technology
              </p>
            </div>
            <div className="text-sm">
              <span className="font-semibold">As seen in: </span>
              <span className="text-[var(--color-trace-green)]">IoT, AI Pipelines, Firmware, Next.js</span>
            </div>
          </div>
        </div>
        
        <div className="border-t border-[var(--color-mist)] pt-6">
          <p className="text-[15px] font-light text-[var(--color-ink-circuit)]/90 leading-relaxed text-justify">
            {siteMetadata.description}
          </p>
        </div>
      </div>
    </MotionWrapper>
  );
}
