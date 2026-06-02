import { motion } from 'framer-motion';
import { type ReactNode } from 'react';

interface SectionHeadingProps {
  label?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
  children?: ReactNode;
}

export function SectionHeading({
  label,
  title,
  subtitle,
  align = 'center',
  className = '',
}: SectionHeadingProps) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left';

  return (
    <div className={`mb-8 max-w-2xl lg:mb-10 ${alignClass} ${className}`}>
      {label && (
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-glow/90"
        >
          {label}
        </motion.span>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.05 }}
        className="font-display text-2xl font-medium leading-tight text-white sm:text-3xl lg:text-4xl"
      >
        <span className="text-balance">{title}</span>
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-3 text-sm leading-relaxed text-white/55 sm:text-base"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
