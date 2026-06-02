import { motion } from 'framer-motion';

interface FloatingOrbProps {
  className?: string;
  color?: 'cyan' | 'purple' | 'magenta';
  size?: 'sm' | 'md' | 'lg';
  delay?: number;
}

const colors = {
  cyan: 'bg-cyan-glow/20',
  purple: 'bg-purple-glow/25',
  magenta: 'bg-magenta-glow/15',
};

const sizes = {
  sm: 'h-32 w-32 blur-[60px]',
  md: 'h-48 w-48 blur-[80px]',
  lg: 'h-72 w-72 blur-[100px]',
};

export function FloatingOrb({
  className = '',
  color = 'cyan',
  size = 'md',
  delay = 0,
}: FloatingOrbProps) {
  return (
    <motion.div
      aria-hidden
      className={`pointer-events-none absolute rounded-full ${colors[color]} ${sizes[size]} ${className}`}
      animate={{
        y: [0, -24, 0],
        x: [0, 12, 0],
        scale: [1, 1.08, 1],
        opacity: [0.5, 0.85, 0.5],
      }}
      transition={{
        duration: 8 + delay,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
    />
  );
}
