import { motion, type HTMLMotionProps } from 'framer-motion';
import { type ReactNode } from 'react';

interface Reveal3DProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  className?: string;
  /** Use on hero / above-fold so animation runs on load, not only on scroll */
  immediate?: boolean;
}

const directionOffset = {
  up: { x: 0, y: 48, rotateX: 14, rotateY: 0 },
  down: { x: 0, y: -48, rotateX: -14, rotateY: 0 },
  left: { x: 48, y: 0, rotateX: 0, rotateY: -14 },
  right: { x: -48, y: 0, rotateX: 0, rotateY: 14 },
};

const revealState = {
  opacity: 1,
  x: 0,
  y: 0,
  rotateX: 0,
  rotateY: 0,
};

export function Reveal3D({
  children,
  delay = 0,
  direction = 'up',
  className = '',
  immediate = false,
  ...props
}: Reveal3DProps) {
  const offset = directionOffset[direction];
  const hidden = {
    opacity: 0,
    x: offset.x,
    y: offset.y,
    rotateX: offset.rotateX,
    rotateY: offset.rotateY,
  };
  const transition = {
    duration: 0.75,
    delay,
    ease: [0.22, 1, 0.36, 1] as const,
  };

  return (
    <motion.div
      initial={hidden}
      {...(immediate
        ? { animate: revealState }
        : {
            whileInView: revealState,
            viewport: { once: true, margin: '-40px' },
          })}
      transition={transition}
      className={className}
      style={{ transformStyle: 'preserve-3d', transformPerspective: 1200 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
