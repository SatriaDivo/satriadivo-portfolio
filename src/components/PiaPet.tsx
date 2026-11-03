import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronRight, ChevronLeft, RotateCcw, Sparkles } from 'lucide-react';
import { useLanguage, Language } from '../context/LanguageContext';

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

interface TourStepContent {
  targetId: string | null;
  badge: { id: string; en: string };
  stepNumber: { id: string; en: string };
  message: { id: string; en: string };
  nextHint: { id: string; en: string };
  anim: AnimationName;
}

const TOUR_STEPS: TourStepContent[] = [
  {
    targetId: 'init',
    badge: { id: 'TOUR • SAMBUTAN', en: 'TOUR • WELCOME' },
    stepNumber: { id: 'Mulai', en: 'Start' },
    message: {
      id: 'Halo! Aku Pia 🐾 Selamat datang di portofolio resmi Satria Divo Praditya! Yuk, klik "Mulai Tour" biar aku ajak keliling dan jelasin karya-karyanya ✨',
      en: 'Hello! I am Pia 🐾 Welcome to Satria Divo Praditya\'s official engineering portfolio! Click "Start Tour" and I will guide you through his work ✨',
    },
    nextHint: { id: 'Mulai Tour', en: 'Start Tour' },
    anim: 'waving',
  },
  {
    targetId: 'projects',
    badge: { id: '01 • KARYA UNGGULAN', en: '01 • SELECTED WORKS' },
    stepNumber: { id: '1/6', en: '1/6' },
    message: {
      id: 'Ini 01: Selected Works! Satria mengembangkan sistem IoT & AI nyata: HERA (Heavy Element Risk Analyzer), AgriSense, E-Logbook perikanan (LoRa & Edge AI), hingga CocoaSense 🚀',
      en: 'This is 01: Selected Works! Satria builds real-world IoT & AI systems: HERA (Risk Analyzer), AgriSense, maritime E-Logbook (LoRa & Edge AI), and CocoaSense 🚀',
    },
    nextHint: { id: 'Lanjut: Fokus Teknis', en: 'Next: Technical Focus' },
    anim: 'review',
  },
  {
    targetId: 'focus',
    badge: { id: '02 • FOKUS TEKNIS', en: '02 • TECHNICAL FOCUS' },
    stepNumber: { id: '2/6', en: '2/6' },
    message: {
      id: 'Ini 02: Technical Focus! Keahlian Satria berakar di AI & Machine Learning, Embedded Systems (ESP32/LoRa), Cloud Computing (AWS), serta Jaringan Komputer (CCNA) ⚡',
      en: 'This is 02: Technical Focus! Satria\'s expertise spans AI & Machine Learning, Embedded Systems (ESP32/LoRa), Cloud Computing (AWS), and Computer Networking (CCNA) ⚡',
    },
    nextHint: { id: 'Lanjut: Pengalaman', en: 'Next: Experience' },
    anim: 'running-right',
  },
  {
    targetId: 'experience',
    badge: { id: '03 • PENGALAMAN', en: '03 • EXPERIENCE' },
    stepNumber: { id: '3/6', en: '3/6' },
    message: {
      id: 'Ini 03: Experience! Satria adalah Data Scientist Intern di PT Makerindo Prima Solusi dan pernah memimpin sebagai Wakil Gubernur Mahasiswa TI Polinela 💼',
      en: 'This is 03: Experience! Satria is a Data Scientist Intern at PT Makerindo Prima Solusi and served as Vice Governor of the IT Student Executive Board at Polinela 💼',
    },
    nextHint: { id: 'Lanjut: Prestasi', en: 'Next: Achievements' },
    anim: 'review',
  },
  {
    targetId: 'achievements',
    badge: { id: '04 • PRESTASI & RISET', en: '04 • ACHIEVEMENTS' },
    stepNumber: { id: '4/6', en: '4/6' },
    message: {
      id: 'Ini 04: Achievements! Meraih Juara 2 Cyber Security KMIPN 2026 tingkat nasional, juara inovasi AITeC VI, dan publikasi riset Random Forest di prosiding ISC-ASSH 🏆',
      en: 'This is 04: Achievements! Won 2nd Place in Cyber Security at KMIPN 2026 national competition, AITeC VI champion, and author of Random Forest research at ISC-ASSH 🏆',
    },
    nextHint: { id: 'Lanjut: Lencana', en: 'Next: Verified Badges' },
    anim: 'jumping',
  },
  {
    targetId: 'certifications',
    badge: { id: '05 • LENCANA RESMI', en: '05 • VERIFIED BADGES' },
    stepNumber: { id: '5/6', en: '5/6' },
    message: {
      id: 'Ini 05: Verified Badges! Memiliki 14 sertifikasi resmi terverifikasi Credly, termasuk AWS Cloud Architecting, Cisco CCNA & CCNP, IBM Granite, dan MikroTik MTCNA 📜',
      en: 'This is 05: Verified Badges! Holds 14 verified Credly credentials, including AWS Cloud Architecting, Cisco CCNA & CCNP, IBM Granite, and MikroTik MTCNA 📜',
    },
    nextHint: { id: 'Lanjut: Kontak', en: 'Next: Connect' },
    anim: 'review',
  },
  {
    targetId: 'contact',
    badge: { id: '06 • HUBUNGI SATRIA', en: '06 • CONNECT' },
    stepNumber: { id: '6/6', en: '6/6' },
    message: {
      id: 'Ini 06: Connect! Butuh konsultasi IoT/AI, kolaborasi proyek, atau peluang kerja? Satria sangat terbuka untuk berdiskusi lewat LinkedIn, GitHub, atau Email 📬',
      en: 'This is 06: Connect! Seeking IoT/AI consulting, project collaboration, or engineering talent? Satria is open to opportunities via LinkedIn, GitHub, or Email 📬',
    },
    nextHint: { id: 'Selesaikan Tour', en: 'Finish Tour' },
    anim: 'waving',
  },
  {
    targetId: 'init',
    badge: { id: 'TOUR • SELESAI', en: 'TOUR • COMPLETE' },
    stepNumber: { id: 'Selesai', en: 'Complete' },
    message: {
      id: 'Yeay, tour selesai! 🎉 Terima kasih banyak sudah mampir menjelajahi portofolio Satria. Klik "Ulang Tour" kapan pun kamu ingin panduan lagi ya ✨',
      en: 'Hooray, tour completed! 🎉 Thank you for exploring Satria\'s portfolio. Click "Restart Tour" anytime you would like to tour again ✨',
    },
    nextHint: { id: 'Ulang Tour', en: 'Restart Tour' },
    anim: 'jumping',
  },
];

export function PiaPet() {
  const { lang, setLang } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const bubbleTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [isLoaded, setIsLoaded] = useState(false);
  const [currentAnim, setCurrentAnim] = useState<AnimationName>('idle');
  const [showBubble, setShowBubble] = useState(false);
  const [tourIndex, setTourIndex] = useState<number>(-1);
  const [hasPickedLanguage, setHasPickedLanguage] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);

  // Preload spritesheet and immediately greet upon landing
  useEffect(() => {
    const img = new Image();
    img.src = '/pia/spritesheet.webp';
    img.onload = () => {
      imageRef.current = img;
      setIsLoaded(true);

      // Greet immediately when opening the portfolio
      bubbleTimeoutRef.current = setTimeout(() => {
        setCurrentAnim('waving');
        setShowBubble(true);
      }, 400);
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
    setHasPickedLanguage(true);

    const step = TOUR_STEPS[boundedIdx];
    setCurrentAnim(step.anim);
    setShowBubble(true);

    if (step.targetId) {
      const targetElement = document.getElementById(step.targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      window.dispatchEvent(
        new CustomEvent('pia-tour-step', { detail: { targetId: step.targetId } })
      );
    }
  }, []);

  // Advance tour (only triggered by explicit Next button or ArrowRight)
  const advanceTour = useCallback(() => {
    if (tourIndex < 0) {
      goToStep(1); // Start tour at selected works
    } else {
      const nextIdx = (tourIndex + 1) % TOUR_STEPS.length;
      goToStep(nextIdx === 0 ? 1 : nextIdx);
    }
  }, [tourIndex, goToStep]);

  // Go to previous step
  const prevTour = useCallback(() => {
    if (tourIndex <= 1) {
      goToStep(0);
      return;
    }
    goToStep(tourIndex - 1);
  }, [tourIndex, goToStep]);

  // Handle click on Pia sprite: reopen current step if closed, or play playful reaction if open
  const handlePetClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();

    // If dialog is closed, reopen at the CURRENT step without advancing
    if (!showBubble) {
      setShowBubble(true);
      if (tourIndex < 0) {
        setCurrentAnim('waving');
      } else {
        const step = TOUR_STEPS[tourIndex];
        setCurrentAnim(step.anim);
      }
      return;
    }

    // If dialog is already open, do NOT advance tour; trigger a cheerful reaction
    setCurrentAnim((prev) => (prev === 'jumping' ? 'waving' : 'jumping'));
  }, [showBubble, tourIndex]);

  // Select language from Pia's greeting
  const handleSelectLanguage = (selectedLang: Language) => {
    setLang(selectedLang);
    setHasPickedLanguage(true);
    setCurrentAnim('jumping');
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
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
      ? 14
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
            setShowBubble(true);
            if (tourIndex < 0) {
              setCurrentAnim('waving');
            } else {
              const step = TOUR_STEPS[tourIndex];
              setCurrentAnim(step.anim);
            }
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 bg-surface/95 backdrop-blur-md border border-border-subtle px-3.5 py-2 rounded-full shadow-lg text-xs font-mono text-ink-primary hover:border-accent hover:shadow-accent/10 transition-all"
          title={lang === 'id' ? 'Buka Pemandu Portofolio (Pia)' : 'Open Portfolio Guide (Pia)'}
        >
          <div className="relative flex items-center justify-center">
            <span className="w-2 h-2 rounded-full bg-accent animate-ping absolute" />
            <span className="w-2 h-2 rounded-full bg-accent relative" />
          </div>
          <span className="font-semibold tracking-wide">
            {lang === 'id' ? 'Pemandu Pia' : 'Pia Guide'}
          </span>
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
                {/* Header row with step badge, quick language switch, and close button */}
                <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-border-subtle">
                  <div className="flex items-center gap-1.5 overflow-hidden">
                    <Sparkles size={13} className="text-accent shrink-0 animate-pulse" />
                    <span className="text-[10px] sm:text-xs font-mono font-bold text-ink-primary uppercase tracking-wider truncate">
                      {tourIndex < 0
                        ? lang === 'id'
                          ? 'SELAMAT DATANG'
                          : 'WELCOME'
                        : currentStep.badge[lang]}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {/* Quick language switcher in card */}
                    <div className="flex items-center bg-paper border border-border-subtle rounded-md text-[9px] font-mono p-0.5">
                      <button
                        onClick={() => handleSelectLanguage('id')}
                        className={`px-1.5 py-0.5 rounded transition-colors ${
                          lang === 'id'
                            ? 'bg-ink-primary text-white font-bold'
                            : 'text-ink-secondary hover:text-ink-primary'
                        }`}
                        title="Bahasa Indonesia"
                      >
                        ID
                      </button>
                      <button
                        onClick={() => handleSelectLanguage('en')}
                        className={`px-1.5 py-0.5 rounded transition-colors ${
                          lang === 'en'
                            ? 'bg-ink-primary text-white font-bold'
                            : 'text-ink-secondary hover:text-ink-primary'
                        }`}
                        title="English"
                      >
                        EN
                      </button>
                    </div>

                    {tourIndex >= 1 && tourIndex <= 6 && (
                      <span className="text-[10px] font-mono font-medium text-ink-muted bg-paper border border-border-subtle px-1.5 py-0.5 rounded">
                        {currentStep.stepNumber[lang]}
                      </span>
                    )}

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowBubble(false);
                      }}
                      className="text-ink-muted hover:text-ink-primary p-0.5 rounded transition-colors"
                      title={lang === 'id' ? 'Tutup dialog' : 'Close dialog'}
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

                {/* INITIAL GREETING & LANGUAGE SELECTION STATE */}
                {tourIndex < 0 ? (
                  <div className="flex flex-col">
                    <p className="text-ink-primary text-xs sm:text-sm font-body leading-relaxed mb-1 font-medium">
                      {lang === 'id'
                        ? 'Halo! Selamat datang di portofolio Satria Divo Praditya 🐾'
                        : "Hello! Welcome to Satria Divo Praditya's portfolio 🐾"}
                    </p>
                    <p className="text-ink-secondary text-xs font-body leading-relaxed mb-3">
                      {lang === 'id'
                        ? 'Pilih bahasa untuk menjelajahi portofolio bersama Pia:'
                        : 'Please choose your preferred language to explore with Pia:'}
                    </p>

                    {/* Language choice buttons */}
                    <div className="grid grid-cols-2 gap-2 mb-3.5">
                      <button
                        onClick={() => handleSelectLanguage('id')}
                        className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border text-xs font-mono font-medium transition-all ${
                          lang === 'id' && hasPickedLanguage
                            ? 'bg-ink-primary text-white border-ink-primary shadow-xs'
                            : 'bg-paper hover:bg-black/[0.04] border-border-subtle text-ink-primary'
                        }`}
                      >
                        <span>🇮🇩</span>
                        <span>Bahasa</span>
                      </button>
                      <button
                        onClick={() => handleSelectLanguage('en')}
                        className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border text-xs font-mono font-medium transition-all ${
                          lang === 'en' && hasPickedLanguage
                            ? 'bg-ink-primary text-white border-ink-primary shadow-xs'
                            : 'bg-paper hover:bg-black/[0.04] border-border-subtle text-ink-primary'
                        }`}
                      >
                        <span>🇬🇧</span>
                        <span>English</span>
                      </button>
                    </div>

                    {/* Start Tour CTA */}
                    <div className="flex items-center justify-between pt-2 border-t border-border-subtle/80">
                      <button
                        onClick={() => setShowBubble(false)}
                        className="text-[11px] font-mono text-ink-muted hover:text-ink-secondary transition-colors"
                      >
                        {lang === 'id' ? 'Lewati' : 'Skip'}
                      </button>

                      <button
                        onClick={advanceTour}
                        className="inline-flex items-center gap-1.5 text-xs font-mono font-medium bg-ink-primary text-white hover:bg-accent px-3 py-1.5 rounded-md shadow-sm transition-all hover:gap-2 active:scale-95"
                      >
                        <span>{lang === 'id' ? 'Mulai Tour' : 'Start Tour'}</span>
                        <ChevronRight size={13} />
                      </button>
                    </div>
                  </div>
                ) : (
                  /* TOUR IN PROGRESS STATE */
                  <div className="flex flex-col">
                    <p className="text-ink-secondary text-xs sm:text-sm font-body leading-relaxed mb-4">
                      {currentStep.message[lang]}
                    </p>

                    <div className="flex items-center justify-between pt-2 border-t border-border-subtle/80 gap-2">
                      {/* Prev Button */}
                      {tourIndex > 0 ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            prevTour();
                          }}
                          className="inline-flex items-center gap-1 text-[11px] font-mono font-medium text-ink-secondary hover:text-ink-primary py-1 px-2 rounded hover:bg-black/[0.03] transition-colors"
                          title={lang === 'id' ? 'Kembali ke bagian sebelumnya' : 'Back to previous section'}
                        >
                          <ChevronLeft size={13} />
                          <span>{lang === 'id' ? 'Kembali' : 'Back'}</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => setTourIndex(-1)}
                          className="text-[10px] font-mono text-ink-muted hover:text-ink-primary"
                        >
                          {lang === 'id' ? 'Ganti Bahasa' : 'Change Lang'}
                        </button>
                      )}

                      {/* Next / Action Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          advanceTour();
                        }}
                        className="inline-flex items-center gap-1.5 text-xs font-mono font-medium bg-ink-primary text-white hover:bg-accent px-3 py-1.5 rounded-md shadow-sm transition-all hover:gap-2 active:scale-95"
                      >
                        {tourIndex === 7 ? (
                          <>
                            <RotateCcw size={12} />
                            <span>{currentStep.nextHint[lang]}</span>
                          </>
                        ) : (
                          <>
                            <span>{currentStep.nextHint[lang]}</span>
                            <ChevronRight size={13} />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}

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
            title={lang === 'id' ? 'Sembunyikan Pia' : 'Minimize Pia'}
            aria-label="Sembunyikan Pia"
          >
            <X size={12} />
          </button>

          {/* Pet Sprite Canvas & Base */}
          <motion.div
            onClick={handlePetClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer flex flex-col items-center group/pet"
            title={
              !showBubble
                ? lang === 'id'
                  ? 'Buka dialog panduan Pia'
                  : 'Open Pia tour guide'
                : lang === 'id'
                ? 'Pia Pet Companion'
                : 'Pia Pet Companion'
            }
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
                  ? lang === 'id' ? 'Pia • Sambutan' : 'Pia • Welcome'
                  : tourIndex === 7
                  ? lang === 'id' ? 'Pia • Selesai' : 'Pia • Complete'
                  : `Pia • Tour [${tourIndex}/6]`}
              </span>
            </span>
          </motion.div>
        </div>
      )}
    </div>
  );
}
