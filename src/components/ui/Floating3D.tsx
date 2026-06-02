import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { type MouseEvent, type ReactNode } from 'react';

interface Floating3DProps {
  children: ReactNode;
  className?: string;
  floatIntensity?: number;
  tiltIntensity?: number;
}

export function Floating3D({
  children,
  className = '',
  floatIntensity = 14,
  tiltIntensity = 18,
}: Floating3DProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [tiltIntensity, -tiltIntensity]), {
    stiffness: 200,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-tiltIntensity, tiltIntensity]), {
    stiffness: 200,
    damping: 20,
  });

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className={`perspective-section ${className}`}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      animate={{ y: [0, -floatIntensity, 0] }}
      transition={{
        y: { duration: 5, repeat: Infinity, ease: 'easeInOut' },
      }}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
    >
      <motion.div
        className="relative"
        style={{
          filter: 'drop-shadow(0 40px 80px rgba(0, 240, 255, 0.15))',
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
