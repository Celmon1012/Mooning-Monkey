import { motion } from 'framer-motion';
import { type ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
}

export function GlassCard({
  children,
  className = '',
  hover = true,
  glow = false,
}: GlassCardProps) {
  return (
    <motion.div
      className={`glass rounded-2xl p-6 lg:p-8 ${glow ? 'shadow-glow-purple' : 'shadow-glass'} ${className}`}
      whileHover={
        hover
          ? {
              y: -4,
              boxShadow: '0 20px 60px rgba(0, 240, 255, 0.15), 0 0 40px rgba(168, 85, 247, 0.1)',
            }
          : undefined
      }
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}
