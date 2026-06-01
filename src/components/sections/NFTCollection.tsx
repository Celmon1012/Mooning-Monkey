import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { assets } from '../../data/assets';
import { AnimatedSection } from '../ui/AnimatedSection';
import { SectionHeading } from '../ui/SectionHeading';

const allNfts = [...assets.nfts, ...assets.monkeys];

export function NFTCollection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const visibleCount = 4;

  const paginate = useCallback(
    (dir: number) => {
      setDirection(dir);
      setCurrent((prev) => {
        const next = prev + dir;
        if (next < 0) return allNfts.length - visibleCount;
        if (next > allNfts.length - visibleCount) return 0;
        return next;
      });
    },
    [],
  );

  useEffect(() => {
    const timer = setInterval(() => paginate(1), 4000);
    return () => clearInterval(timer);
  }, [paginate]);

  const visible = allNfts.slice(current, current + visibleCount);
  const padded =
    visible.length < visibleCount
      ? [...visible, ...allNfts.slice(0, visibleCount - visible.length)]
      : visible;

  return (
    <AnimatedSection id="collection" className="section-padding relative">
      <div className="absolute inset-0 bg-hero-glow" />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          label="NFT Collection"
          title="Unique, Distinct, Rare & Valuable"
          subtitle="All Mooning Monkeys are unique crypto heroes drilled around 239 distinctive traits which define their rarity and value."
        />

        {/* Carousel */}
        <div className="relative">
          <div className="flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => paginate(-1)}
              className="glass flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-colors hover:border-cyan-glow/50 hover:bg-white/10"
              aria-label="Previous"
            >
              <ChevronLeft size={20} />
            </button>

            <div className="grid flex-1 grid-cols-2 gap-4 sm:grid-cols-4">
              <AnimatePresence mode="popLayout" custom={direction}>
                {padded.map((img, i) => (
                  <motion.div
                    key={`${current}-${img}`}
                    custom={direction}
                    initial={{ opacity: 0, x: direction > 0 ? 60 : -60 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: direction > 0 ? -60 : 60 }}
                    transition={{ duration: 0.4 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    className="group relative aspect-square overflow-hidden rounded-2xl glass glow-border"
                  >
                    <img
                      src={img}
                      alt={`Mooning Monkey NFT ${current + i + 1}`}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-void/80 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                    <div className="absolute bottom-3 left-3 font-mono text-xs text-cyan-glow opacity-0 transition-opacity group-hover:opacity-100">
                      #{String(current + i + 1).padStart(4, '0')}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <button
              type="button"
              onClick={() => paginate(1)}
              className="glass flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition-colors hover:border-cyan-glow/50 hover:bg-white/10"
              aria-label="Next"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Dots */}
          <div className="mt-8 flex justify-center gap-2">
            {Array.from({ length: Math.ceil(allNfts.length / visibleCount) }).map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  setDirection(i > current ? 1 : -1);
                  setCurrent(i * visibleCount);
                }}
                className={`h-1.5 rounded-full transition-all ${
                  Math.floor(current / visibleCount) === i
                    ? 'w-8 bg-cyan-glow'
                    : 'w-1.5 bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Grid showcase */}
        <div className="mt-16 grid grid-cols-3 gap-3 sm:grid-cols-6 lg:gap-4">
          {assets.monkeys.slice(0, 6).map((img, i) => (
            <motion.div
              key={img}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.08 }}
              className="aspect-square overflow-hidden rounded-xl glass"
            >
              <img src={img} alt={`Trait preview ${i + 1}`} className="h-full w-full object-cover" />
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
