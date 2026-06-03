import { motion, type HTMLMotionProps } from 'framer-motion';
import { forwardRef, useEffect, useRef, useState, type ReactNode } from 'react';
import { MeshNetworkBackground } from './MeshNetworkBackground';

type MeshVariant = 'cyan' | 'purple' | 'mixed';

interface AnimatedSectionProps extends HTMLMotionProps<'section'> {
  children: ReactNode;
  className?: string;
  delay?: number;
  mesh?: boolean | MeshVariant;
}

export const AnimatedSection = forwardRef<HTMLElement, AnimatedSectionProps>(
  ({ children, className = '', delay = 0, mesh, ...props }, ref) => {
    const meshVariant: MeshVariant | undefined =
      mesh === true ? 'mixed' : mesh === false ? undefined : mesh;

    const sectionRef = useRef<HTMLElement | null>(null);
    const [meshActive, setMeshActive] = useState(false);

    useEffect(() => {
      if (!meshVariant) return;
      const el = sectionRef.current;
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => setMeshActive(entry.isIntersecting),
        { rootMargin: '120px 0px', threshold: 0 },
      );
      observer.observe(el);
      return () => observer.disconnect();
    }, [meshVariant]);

    const setRefs = (node: HTMLElement | null) => {
      sectionRef.current = node;
      if (typeof ref === 'function') ref(node);
      else if (ref) ref.current = node;
    };

    return (
      <motion.section
        ref={setRefs}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.4, delay }}
        className={`${meshVariant ? 'relative overflow-hidden' : ''} ${className}`}
        {...props}
      >
        {meshVariant && meshActive && (
          <MeshNetworkBackground variant={meshVariant} className="z-0" intensity={0.85} />
        )}
        <div className={meshVariant ? 'relative z-[1]' : undefined}>{children}</div>
      </motion.section>
    );
  },
);

AnimatedSection.displayName = 'AnimatedSection';

export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.45, ease: [0.25, 0.1, 0.25, 1] },
};

export const staggerContainer = {
  initial: {},
  whileInView: { transition: { staggerChildren: 0.08 } },
  viewport: { once: true },
};

export const staggerItem = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] },
};
