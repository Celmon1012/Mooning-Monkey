import { motion } from 'framer-motion';
import { type ReactNode } from 'react';
import { TiltCard } from './TiltCard';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  tilt?: boolean;
}

export function GlassCard({
  children,
  className = '',
  hover = true,
  glow = false,
  tilt = true,
}: GlassCardProps) {
  const inner = (
    <motion.div
      className={`glass rounded-xl p-5 lg:p-6 ${!tilt ? 'card-3d' : ''} ${glow ? 'shadow-glow-purple' : 'shadow-glass'} ${className}`}
      whileHover={
        hover && !tilt
          ? {
              y: -4,
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.4), 0 0 30px rgba(0, 240, 255, 0.1)',
            }
          : undefined
      }
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );

  if (tilt) {
    return <TiltCard intensity={8}>{inner}</TiltCard>;
  }

  return inner;
}
