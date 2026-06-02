import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface VideoBackgroundProps {
  src: string;
  poster?: string;
  className?: string;
  overlayClassName?: string;
  opacity?: number;
  parallax?: boolean;
  playbackRate?: number;
  videoScale?: number;
}

export function VideoBackground({
  src,
  poster,
  className = '',
  overlayClassName = 'bg-gradient-to-b from-void/85 via-void/70 to-void',
  opacity = 0.45,
  parallax = true,
  playbackRate = 1,
  videoScale = 1.2,
}: VideoBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], parallax ? ['-8%', '8%'] : ['0%', '0%']);
  const scrollScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.15]);

  return (
    <div ref={ref} className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <motion.div className="absolute inset-0" style={{ y, scale: parallax ? scrollScale : 1 }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={poster}
          className="absolute left-1/2 top-1/2 h-[120%] w-[120%] max-w-none -translate-x-1/2 -translate-y-1/2 object-cover"
          style={{ opacity, transform: `translate(-50%, -50%) scale(${videoScale})` }}
          onLoadedMetadata={(e) => {
            e.currentTarget.playbackRate = playbackRate;
          }}
        >
          <source src={src} type="video/mp4" />
        </video>
      </motion.div>
      <div className={`absolute inset-0 ${overlayClassName}`} aria-hidden />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,240,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,0.6) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
        aria-hidden
      />
    </div>
  );
}
