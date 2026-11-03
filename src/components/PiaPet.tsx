import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

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

const MESSAGES = [
  'Hai! Aku Pia 🐾',
  'Selamat datang di portofolio Satria! ✨',
  'Cek Juara KMIPN & Publikasi di atas ya! 🏆',
  'Ada proyek IoT & AI menarik lho! 🚀',
  'Klik aku lagi untuk aksi lainnya! ⚡',
  'Semoga harimu menyenangkan! 💡',
];

export function PiaPet() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const bubbleTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [isLoaded, setIsLoaded] = useState(false);
  const [currentAnim, setCurrentAnim] = useState<AnimationName>('idle');
  const [showBubble, setShowBubble] = useState(false);
  const [message, setMessage] = useState('Hai! Aku Pia 🐾');
  const [isMinimized, setIsMinimized] = useState(false);

  // Preload spritesheet
  useEffect(() => {
    const img = new Image();
    img.src = '/pia/spritesheet.webp';
    img.onload = () => {
      imageRef.current = img;
      setIsLoaded(true);

      // Greet once after a brief delay
      setTimeout(() => {
        setCurrentAnim('waving');
        setShowBubble(true);
        bubbleTimeoutRef.current = setTimeout(() => {
          setShowBubble(false);
        }, 3500);
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
        // One-shot animations return to idle
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

  const handleInteract = () => {
    const actions: AnimationName[] = ['waving', 'jumping', 'review', 'waiting', 'running-right'];
    const nextAnim = actions[Math.floor(Math.random() * actions.length)];
    setCurrentAnim(nextAnim);

    const nextMsg = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
    setMessage(nextMsg);
    setShowBubble(true);

    if (bubbleTimeoutRef.current) clearTimeout(bubbleTimeoutRef.current);
    bubbleTimeoutRef.current = setTimeout(() => {
      setShowBubble(false);
    }, 4000);
  };

  return (
    <div className="fixed bottom-4 left-4 z-40 select-none sm:bottom-6 sm:left-6">
      {/* Minimized Pill */}
      {isMinimized ? (
        <motion.button
          onClick={() => {
            setIsMinimized(false);
            handleInteract();
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2 bg-surface/90 backdrop-blur border border-border-subtle px-3 py-1.5 rounded-full shadow-md text-xs font-mono text-ink-primary hover:border-accent transition-colors"
          title="Tampilkan Pia"
        >
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span>Pia</span>
          <span className="text-[10px] text-ink-muted">🐾</span>
        </motion.button>
      ) : (
        <div className="relative group">
          {/* Speech Bubble */}
          <AnimatePresence>
            {showBubble && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute bottom-full left-2 mb-2 w-max max-w-[210px] sm:max-w-[240px] bg-surface/95 backdrop-blur border border-border-subtle text-ink-primary p-2.5 rounded-lg shadow-lg text-xs font-mono leading-relaxed pointer-events-none"
              >
                <p className="text-ink-secondary">{message}</p>
                {/* Bubble tail */}
                <div className="absolute -bottom-1.5 left-6 w-3 h-3 bg-surface border-b border-r border-border-subtle rotate-45" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Minimize / Close trigger */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsMinimized(true);
            }}
            className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity bg-surface border border-border-subtle rounded-full p-1 text-ink-muted hover:text-ink-primary shadow-sm z-10"
            title="Sembunyikan Pia"
            aria-label="Sembunyikan Pia"
          >
            <X size={12} />
          </button>

          {/* Pet Sprite Canvas */}
          <motion.div
            onClick={handleInteract}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="cursor-pointer flex flex-col items-center"
            title="Klik Pia untuk berinteraksi!"
          >
            <canvas
              ref={canvasRef}
              width={FRAME_WIDTH}
              height={FRAME_HEIGHT}
              className="w-20 h-[86px] sm:w-24 sm:h-[104px] drop-shadow-md image-render-pixel"
              style={{ imageRendering: 'pixelated' }}
            />
            {/* Status indicator tag */}
            <span className="text-[9px] font-mono tracking-wider uppercase text-ink-muted bg-surface/80 border border-border-subtle px-1.5 py-0.5 rounded-sm -mt-1 backdrop-blur">
              PIA • {currentAnim.replace('-', ' ')}
            </span>
          </motion.div>
        </div>
      )}
    </div>
  );
}
