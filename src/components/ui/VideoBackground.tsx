import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

interface VideoBackgroundProps {
  src: string;
  poster?: string;
  className?: string;
  overlayClassName?: string;
  opacity?: number;
  parallax?: boolean;
  playbackRate?: number;
  videoScale?: number;
  /** Only decode/play when element is near viewport */
  playWhenVisible?: boolean;
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
  playWhenVisible = true,
}: VideoBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(!playWhenVisible);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], parallax ? ['-8%', '8%'] : ['0%', '0%']);
  const scrollScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.15]);

  useEffect(() => {
    if (!playWhenVisible || !ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setActive(entry.isIntersecting);
        const video = videoRef.current;
        if (!video) return;
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { rootMargin: '100px 0px', threshold: 0.05 },
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [playWhenVisible]);

  return (
    <div ref={ref} className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <motion.div className="absolute inset-0" style={{ y, scale: parallax ? scrollScale : 1 }}>
        {active ? (
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={poster}
            className="absolute left-1/2 top-1/2 h-[120%] w-[120%] max-w-none -translate-x-1/2 -translate-y-1/2 object-cover"
            style={{ opacity, transform: `translate(-50%, -50%) scale(${videoScale})` }}
            onLoadedMetadata={(e) => {
              e.currentTarget.playbackRate = playbackRate;
            }}
          >
            <source src={src} type="video/mp4" />
          </video>
        ) : (
          poster && (
            <img
              src={poster}
              alt=""
              className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 object-cover"
              style={{ opacity, transform: `scale(${videoScale})` }}
              loading="eager"
              decoding="async"
            />
          )
        )}
      </motion.div>
      <div className={`absolute inset-0 ${overlayClassName}`} aria-hidden />
    </div>
  );
}
