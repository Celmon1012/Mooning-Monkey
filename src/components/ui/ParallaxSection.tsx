import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { type ReactNode, useRef } from 'react';

interface ParallaxSectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  backgroundImage?: string;
  imageOpacity?: number;
  depth?: 'shallow' | 'medium' | 'deep';
}

const depthRange = {
  shallow: ['-6%', '6%'] as [string, string],
  medium: ['-12%', '12%'] as [string, string],
  deep: ['-18%', '18%'] as [string, string],
};

export function ParallaxSection({
  children,
  id,
  className = '',
  backgroundImage,
  imageOpacity = 0.2,
  depth = 'medium',
}: ParallaxSectionProps) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], depthRange[depth]);
  const decorY = useTransform(scrollYProgress, [0, 1], ['40px', '-40px']);

  return (
    <section
      ref={ref}
      id={id}
      className={`section-padding relative overflow-hidden perspective-section ${className}`}
    >
      {backgroundImage && (
        <ParallaxBg image={backgroundImage} y={bgY} opacity={imageOpacity} />
      )}
      <motion.div className="relative z-10 mx-auto max-w-7xl" style={{ y: decorY }}>
        {children}
      </motion.div>
    </section>
  );
}

function ParallaxBg({
  image,
  y,
  opacity,
}: {
  image: string;
  y: MotionValue<string>;
  opacity: number;
}) {
  return (
    <>
      <motion.div
        className="absolute inset-0 scale-110 bg-cover bg-center"
        style={{
          y,
          backgroundImage: `url(${image})`,
          opacity,
        }}
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-void via-void/80 to-void"
        aria-hidden
      />
    </>
  );
}
