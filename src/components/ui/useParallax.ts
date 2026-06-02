import { useScroll, useTransform, type MotionValue } from 'framer-motion';
import { type RefObject } from 'react';

export function useParallax(
  ref: RefObject<HTMLElement | null>,
  range: [string, string] = ['-12%', '12%'],
) {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  return useTransform(scrollYProgress, [0, 1], range);
}

export function useParallaxOpacity(
  ref: RefObject<HTMLElement | null>,
): MotionValue<number> {
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  return useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.4, 1, 1, 0.4]);
}
