interface PosterBackgroundProps {
  src: string;
  className?: string;
  overlayClassName?: string;
  opacity?: number;
}

/** Lightweight static background — no video decode */
export function PosterBackground({
  src,
  className = '',
  overlayClassName = 'bg-gradient-to-b from-void/85 via-void/70 to-void',
  opacity = 0.35,
}: PosterBackgroundProps) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <img
        src={src}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        style={{ opacity }}
        loading="lazy"
        decoding="async"
      />
      <div className={`absolute inset-0 ${overlayClassName}`} aria-hidden />
    </div>
  );
}
