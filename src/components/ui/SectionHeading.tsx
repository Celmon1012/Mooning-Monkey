import { motion } from 'framer-motion';

interface SectionHeadingProps {
  label?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({
  label,
  title,
  subtitle,
  align = 'center',
  className = '',
}: SectionHeadingProps) {
  const alignClass = align === 'center' ? 'text-center mx-auto items-center' : 'text-left items-start';

  return (
    <div className={`mb-8 flex max-w-3xl flex-col lg:mb-10 ${alignClass} ${className}`}>
      {label && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-3 font-body text-xs font-medium uppercase tracking-[0.2em] text-white/45"
        >
          {label}
        </motion.p>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="font-display text-[1.75rem] font-semibold leading-[1.15] tracking-[-0.02em] text-white sm:text-4xl lg:text-[2.5rem]"
      >
        <span className="text-balance">{title}</span>
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.05, duration: 0.4 }}
          className="mt-4 max-w-2xl text-[15px] leading-[1.65] text-white/60 sm:text-base"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}
