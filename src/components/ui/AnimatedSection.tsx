import { motion, type HTMLMotionProps } from 'framer-motion';
import { forwardRef, type ReactNode } from 'react';
import { MeshNetworkBackground } from './MeshNetworkBackground';

type MeshVariant = 'cyan' | 'purple' | 'mixed';

interface AnimatedSectionProps extends HTMLMotionProps<'section'> {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Lumia-style animated 3D mesh behind section content */
  mesh?: boolean | MeshVariant;
}

export const AnimatedSection = forwardRef<HTMLElement, AnimatedSectionProps>(
  ({ children, className = '', delay = 0, mesh, ...props }, ref) => {
    const meshVariant: MeshVariant | undefined =
      mesh === true ? 'mixed' : mesh === false ? undefined : mesh;

    return (
      <motion.section
        ref={ref}
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
        className={`${meshVariant ? 'relative overflow-hidden' : ''} ${className}`}
        {...props}
      >
        {meshVariant && (
          <MeshNetworkBackground variant={meshVariant} className="z-0" intensity={0.9} />
        )}
        <div className={meshVariant ? 'relative z-[1]' : undefined}>{children}</div>
      </motion.section>
    );
  },
);

AnimatedSection.displayName = 'AnimatedSection';

export const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

export const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.1 } },
  viewport: { once: true },
};

export const staggerItem = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
};
