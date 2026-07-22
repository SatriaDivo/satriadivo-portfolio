import { motion } from "framer-motion";

interface NodeMarkerProps {
  isFirst?: boolean;
  isLast?: boolean;
}

/**
 * Komponen Node/Solder Joint yang diletakkan di sisi kiri.
 * Posisinya fixed relatif terhadap container kiri.
 */
export function NodeMarker({ isFirst, isLast }: NodeMarkerProps) {
  return (
    <div className="absolute left-[-2px] sm:left-[-2.5px] top-6 flex flex-col items-center z-10">
      {/* 
        Lingkaran Node (Solder joint).
        Menggunakan motion untuk efek pop-in ringan saat scroll 
      */}
      <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[var(--color-trace-green)] border-2 border-[var(--color-paper)] shadow-[0_0_0_2px_var(--color-trace-green)]" />
      
      {/* 
        Garis trace vertikal putus di node terakhir, 
        atau menyambung terus kalau belum terakhir.
        Tetapi karena border kiri dari pembungkus utama sudah menangani garis penuh,
        komponen ini cukup merender titiknya saja.
      */}
    </div>
  );
}

/**
 * Reusable Eyebrow component untuk judul tiap section
 */
export function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-mono text-sm text-[var(--color-slate-node)] uppercase tracking-widest mb-8 flex items-center gap-3">
      {children}
    </h2>
  );
}
