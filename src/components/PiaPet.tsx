import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Compass, ChevronRight, ChevronLeft, RotateCcw, Sparkles } from 'lucide-react';

const FRAME_WIDTH = 192;
const FRAME_HEIGHT = 208;

type AnimationName =
  | 'idle'
  | 'running-right'
  | 'running-left'
  | 'waving'
  | 'jumping'
  | 'failed'
  | 'waiting'
  | 'running'
  | 'review';

const ANIMATIONS: Record<AnimationName, { frames: number; row: number; speedMs?: number }> = {
  idle: { frames: 6, row: 0, speedMs: 140 },
  'running-right': { frames: 8, row: 1, speedMs: 100 },
  'running-left': { frames: 8, row: 2, speedMs: 100 },
  waving: { frames: 4, row: 3, speedMs: 160 },
  jumping: { frames: 5, row: 4, speedMs: 130 },
  failed: { frames: 8, row: 5, speedMs: 120 },
  waiting: { frames: 6, row: 6, speedMs: 160 },
  running: { frames: 6, row: 7, speedMs: 100 },
  review: { frames: 6, row: 8, speedMs: 150 },
};

interface TourStep {
  targetId: string | null;
  badge: string;
  stepNumber: string;
  message: string;
  nextHint: string;
  anim: AnimationName;
}

const TOUR_STEPS: TourStep[] = [
  {
    targetId: 'init',
    badge: 'TOUR • WELCOME',
    stepNumber: 'Mulai',
    message: 'Halo! Aku Pia 🐾 Selamat datang di portofolio resmi Satria Divo Praditya! Yuk, klik "Mulai Tour" biar aku ajak keliling dan jelasin karya-karyanya ✨',
    nextHint: 'Mulai Tour',
    anim: 'waving',
  },
  {
    targetId: 'projects',
    badge: '01 • SELECTED WORKS',
    stepNumber: '1/6',
    message: 'Ini 01: Selected Works! Satria mengembangkan sistem IoT & AI nyata: HERA (Heavy Element Risk Analyzer), AgriSense, E-Logbook perikanan (LoRa & Edge AI), hingga CocoaSense 🚀',
    nextHint: 'Lanjut ke Focus Areas',
    anim: 'review',
  },
  {
    targetId: 'focus',
    badge: '02 • TECHNICAL FOCUS',
    stepNumber: '2/6',
    message: 'Ini 02: Technical Focus! Keahlian Satria berakar di AI & Machine Learning, Embedded Systems (ESP32/LoRa), Cloud Computing (AWS), serta Jaringan Komputer (CCNA) ⚡',
    nextHint: 'Lanjut ke Experience',
    anim: 'running-right',
  },
  {
    targetId: 'experience',
    badge: '03 • EXPERIENCE',
    stepNumber: '3/6',
    message: 'Ini 03: Experience! Satria adalah Data Scientist Intern di PT Makerindo Prima Solusi dan pernah memimpin sebagai Wakil Gubernur Mahasiswa TI Polinela 💼',
    nextHint: 'Lanjut ke Achievements',
    anim: 'review',
  },
  {
    targetId: 'achievements',
    badge: '04 • ACHIEVEMENTS',
    stepNumber: '4/6',
    message: 'Ini 04: Achievements! Meraih Juara 2 Cyber Security KMIPN 2026 tingkat nasional, juara inovasi AITeC VI, dan publikasi riset Random Forest di prosiding ISC-ASSH 🏆',
    nextHint: 'Lanjut ke Verified Badges',
    anim: 'jumping',
  },
  {
    targetId: 'certifications',
    badge: '05 • VERIFIED BADGES',
    stepNumber: '5/6',
    message: 'Ini 05: Verified Badges! Memiliki 14 sertifikasi resmi terverifikasi Credly, termasuk AWS Cloud Architecting, Cisco CCNA & CCNP, IBM Granite, dan MikroTik MTCNA 📜',
    nextHint: 'Lanjut ke Connect',
    anim: 'review',
  },
  {
    targetId: 'contact',
    badge: '06 • CONNECT',
    stepNumber: '6/6',
    message: 'Ini 06: Connect! Butuh konsultasi IoT/AI, kolaborasi proyek, atau peluang kerja? Satria sangat terbuka untuk berdiskusi lewat LinkedIn, GitHub, atau Email 📬',
    nextHint: 'Selesaikan Tour',
    anim: 'waving',
  },
  {
    targetId: 'init',
    badge: 'TOUR • SELESAI',
    stepNumber: 'Selesai',
    message: 'Yeay, tour selesai! 🎉 Terima kasih banyak sudah mampir menjelajahi portofolio Satria. Klik "Ulang Tour" kapan pun kamu ingin panduan lagi ya ✨',
    nextHint: 'Ulang Tour',
    anim: 'jumping',
  },
];

export function PiaPet() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const bubbleTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [isLoaded, setIsLoaded] = useState(false);
  const [currentAnim, setCurrentAnim] = useState<AnimationName>('idle');
  const [showBubble, setShowBubble] = useState(false);
  const [tourIndex, setTourIndex] = useState<number>(-1);
  const [isMinimized, setIsMinimized] = useState(false);

  // Preload spritesheet
  useEffect(() => {
    const img = new Image();
    img.src = '/pia/spritesheet.webp';
    img.onload = () => {
      imageRef.current = img;
      setIsLoaded(true);

      // Initial friendly greeting
      setTimeout(() => {
        setCurrentAnim('waving');
        setShowBubble(true);
        bubbleTimeoutRef.current = setTimeout(() => {
          setShowBubble(false);
        }, 6000);
      }, 1200);
    };

    return () => {
      if (bubbleTimeoutRef.current) clearTimeout(bubbleTimeoutRef.current);
    };
  }, []);

  // Frame animation runner
  useEffect(() => {
    if (!isLoaded || !canvasRef.current || !imageRef.current) return;

    const anim = ANIMATIONS[currentAnim];
    const frameCount = anim.frames;
    const row = anim.row;
    const speed = anim.speedMs || 140;

    let frame = 0;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const drawFrame = (f: number) => {
      ctx.clearRect(0, 0, FRAME_WIDTH, FRAME_HEIGHT);
      if (imageRef.current) {
        ctx.drawImage(
          imageRef.current,
          f * FRAME_WIDTH,
          row * FRAME_HEIGHT,
          FRAME_WIDTH,
          FRAME_HEIGHT,
          0,
          0,
          FRAME_WIDTH,
          FRAME_HEIGHT
        );
      }
    };

    drawFrame(0);

    const interval = setInterval(() => {
      frame++;
      if (frame >= frameCount) {
        if (currentAnim !== 'idle' && currentAnim !== 'waiting') {
          setCurrentAnim('idle');
          return;
        }
        frame = 0;
      }
      drawFrame(frame);
    }, speed);

    return () => clearInterval(interval);
  }, [currentAnim, isLoaded]);

  // Navigate to a specific step
  const goToStep = useCallback((stepIdx: number) => {
    const boundedIdx = Math.max(0, Math.min(stepIdx, TOUR_STEPS.length - 1));
    setTourIndex(boundedIdx);

    const step = TOUR_STEPS[boundedIdx];
    setCurrentAnim(step.anim);
    setShowBubble(true);

    if (step.targetId) {
      const targetElement = document.getElementById(step.targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      // Broadcast tour focus event to trigger section highlighting
      window.dispatchEvent(
        new CustomEvent('pia-tour-step', { detail: { targetId: step.targetId } })
      );
    }

    // Auto-dismiss after 12 seconds of inactivity
    if (bubbleTimeoutRef.current) clearTimeout(bubbleTimeoutRef.current);
    bubbleTimeoutRef.current = setTimeout(() => {
      setShowBubble(false);
    }, 12000);
  }, []);

  // Advance tour
  const advanceTour = useCallback(() => {
    const nextIdx = tourIndex < 0 ? 0 : (tourIndex + 1) % TOUR_STEPS.length;
    goToStep(nextIdx);
  }, [tourIndex, goToStep]);

  // Go to previous step
  const prevTour = useCallback(() => {
    if (tourIndex <= 0) return;
    goToStep(tourIndex - 1);
  }, [tourIndex, goToStep]);

  // Keyboard navigation for power users
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Only handle if bubble is open and not typing in an input
      if (!showBubble) return;
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.key === 'ArrowRight') {
        e.preventDefault();
        advanceTour();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevTour();
      } else if (e.key === 'Escape') {
        setShowBubble(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showBubble, advanceTour, prevTour]);

  const currentStep = tourIndex >= 0 ? TOUR_STEPS[tourIndex] : TOUR_STEPS[0];
  const progressPercent =
    tourIndex <= 0
      ? 12
      : tourIndex >= 7
      ? 100
      : Math.round((tourIndex / 6) * 100);

  return (
    <div className="fixed bottom-4 left-4 z-40 select-none sm:bottom-6 sm:left-6">
      {/* Minimized Pill */}
      {isMinimized ? (
        <motion.button
          onClick={() => {
            setIsMinimized(false);
            if (tourIndex < 0) {
              advanceTour();
            } else {
              goToStep(tourIndex);
            }
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 bg-surface/95 backdrop-blur-md border border-border-subtle px-3.5 py-2 rounded-full shadow-lg text-xs font-mono text-ink-primary hover:border-accent hover:shadow-accent/10 transition-all"
          title="Buka Pemandu Portofolio (Pia)"
        >
          <div className="relative flex items-center justify-center">
            <span className="w-2 h-2 rounded-full bg-accent animate-ping absolute" />
            <span className="w-2 h-2 rounded-full bg-accent relative" />
          </div>
          <span className="font-semibold tracking-wide">Pemandu Pia</span>
          {tourIndex >= 1 && tourIndex <= 6 && (
            <span className="text-[10px] font-mono text-accent bg-accent/10 px-1.5 py-0.2 rounded-full">
              {tourIndex}/6
            </span>
          )}
          <span className="text-[11px]">🐾</span>
        </motion.button>
      ) : (
        <div className="relative group">
          {/* Responsive Tour Speech Bubble / Card */}
          <AnimatePresence>
            {showBubble && (
              <motion.div
                initial={{ opacity: 0, y: 12, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.94 }}
                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                className="absolute bottom-full left-0 mb-3 w-[min(360px,calc(100vw-32px))] bg-surface/95 backdrop-blur-md border border-border-subtle text-ink-primary p-4 rounded-xl shadow-2xl ring-1 ring-black/[0.03]"
              >
                {/* Header row with step badge and close button */}
                <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-border-subtle">
                  <div className="flex items-center gap-1.5 overflow-hidden">
                    <Sparkles size={13} className="text-accent shrink-0 animate-pulse" />
                    <span className="text-[10px] sm:text-xs font-mono font-bold text-ink-primary uppercase tracking-wider truncate">
                      {currentStep.badge}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[10px] font-mono font-medium text-ink-muted bg-paper border border-border-subtle px-1.5 py-0.5 rounded">
                      {currentStep.stepNumber}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowBubble(false);
                      }}
                      className="text-ink-muted hover:text-ink-primary p-0.5 rounded transition-colors"
                      title="Tutup dialog"
                      aria-label="Tutup dialog"
                    >
                      <X size={13} />
                    </button>
                  </div>
                </div>

                {/* Animated Progress Track */}
                <div className="w-full bg-border-subtle/80 h-1 rounded-full overflow-hidden mb-3">
                  <motion.div
                    className="h-full bg-accent"
                    initial={false}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ type: 'spring', stiffness: 120, damping: 20 }}
                  />
                </div>

                {/* Message Body */}
                <p className="text-ink-secondary text-xs sm:text-sm font-body leading-relaxed mb-4">
                  {currentStep.message}
                </p>

                {/* Interactive Action Bar */}
                <div className="flex items-center justify-between pt-2 border-t border-border-subtle/80 gap-2">
                  {/* Prev Button */}
                  {tourIndex > 0 ? (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        prevTour();
                      }}
                      className="inline-flex items-center gap-1 text-[11px] font-mono font-medium text-ink-secondary hover:text-ink-primary py-1 px-2 rounded hover:bg-black/[0.03] transition-colors"
                      title="Kembali ke bagian sebelumnya (Panah Kiri)"
                    >
                      <ChevronLeft size={13} />
                      <span>Kembali</span>
                    </button>
                  ) : (
                    <span className="text-[10px] font-mono text-ink-muted">
                      Panduan Interaktif
                    </span>
                  )}

                  {/* Next / Action Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      advanceTour();
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-medium bg-ink-primary text-white hover:bg-accent px-3 py-1.5 rounded-md shadow-sm transition-all hover:gap-2 active:scale-95"
                    title="Lanjut ke bagian berikutnya (Spasi / Panah Kanan)"
                  >
                    {tourIndex === 7 ? (
                      <>
                        <RotateCcw size={12} />
                        <span>Ulang Tour</span>
                      </>
                    ) : (
                      <>
                        <span>{currentStep.nextHint}</span>
                        <ChevronRight size={13} />
                      </>
                    )}
                  </button>
                </div>

                {/* Speech Bubble Tail */}
                <div className="absolute -bottom-1.5 left-7 w-3 h-3 bg-surface border-b border-r border-border-subtle rotate-45" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Minimize / Hide Trigger Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsMinimized(true);
            }}
            className="absolute -top-1 -right-1 opacity-80 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity bg-surface border border-border-subtle rounded-full p-1 text-ink-muted hover:text-ink-primary shadow-sm z-10"
            title="Sembunyikan Pia ke mode minimalis"
            aria-label="Sembunyikan Pia"
          >
            <X size={12} />
          </button>

          {/* Pet Sprite Canvas & Base */}
          <motion.div
            onClick={advanceTour}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer flex flex-col items-center group/pet"
            title="Klik Pia untuk memandu keliling portofolio!"
          >
            <canvas
              ref={canvasRef}
              width={FRAME_WIDTH}
              height={FRAME_HEIGHT}
              className="w-20 h-[86px] sm:w-24 sm:h-[104px] drop-shadow-md image-render-pixel"
              style={{ imageRendering: 'pixelated' }}
            />

            {/* Ground contact shadow */}
            <div className="w-14 h-1.5 bg-ink-primary/10 rounded-full blur-[2px] -mt-1 mb-1 transition-transform group-hover/pet:scale-110" />

            {/* Status indicator tag */}
            <span className="text-[9px] font-mono tracking-wider uppercase text-ink-secondary bg-surface/90 border border-border-subtle px-2 py-0.5 rounded-full shadow-sm backdrop-blur flex items-center gap-1.5 transition-colors group-hover/pet:border-accent">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              <span className="font-semibold">
                {tourIndex < 0
                  ? 'Pia • Panduan'
                  : tourIndex === 7
                  ? 'Pia • Selesai'
                  : `Pia • Tour [${tourIndex}/6]`}
              </span>
            </span>
          </motion.div>
        </div>
      )}
    </div>
  );
}


