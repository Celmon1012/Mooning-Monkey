import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import { useRef } from 'react';
import { assets } from '../../data/assets';
import { AnimatedSection } from '../ui/AnimatedSection';
import { LazyImage } from '../ui/LazyImage';
import { Button } from '../ui/Button';
import { Reveal3D } from '../ui/Reveal3D';
import { SectionHeading } from '../ui/SectionHeading';
import { useParallax } from '../ui/useParallax';

export function ComicSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgY = useParallax(sectionRef, ['-10%', '10%']);

  return (
    <AnimatedSection
      ref={sectionRef}
      id="comic"
      mesh="purple"
      className="section-padding overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 scale-110 bg-cover bg-center opacity-[0.12]"
        style={{ backgroundImage: `url(${assets.comicBg})`, y: bgY }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-b from-void via-transparent to-void" />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          label="Comic series"
          title="The Mooning Monkey Space Odyssey"
          subtitle="An intriguing, action-packed story in Limited Digital NFT Edition — 4 comic books of 14 pages each."
        />

        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-10">
          <Reveal3D direction="left" className="relative order-2 lg:order-1">
            <LazyImage
              src={assets.comicBg}
              alt="Mooning Monkey Comic Book"
              className="rounded-lg border border-white/[0.08] shadow-lift"
            />
          </Reveal3D>

          <Reveal3D direction="right" className="order-1 lg:order-2">
            <BookOpen className="mb-4 h-8 w-8 text-white/70" />
            <p className="text-white/60 leading-relaxed">
              This story will bring back the excitement you had as a kid reading your favorite
              comic books — fantasizing about limitless worlds and opportunities.
            </p>
            <p className="mt-4 text-white/60 leading-relaxed">
              Be one of the first 10 people to own the full 14 pages of any chapter for a
              special surprise. Owning a full comic unlocks exclusive future privileges we
              cannot reveal just yet.
            </p>
            <ul className="mt-6 space-y-2">
              {['4 chapters × 14 pages', 'Limited NFT edition', 'Exclusive holder privileges'].map(
                (item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-white/50">
                    <span className="h-1 w-1 rounded-full bg-cyan-glow" />
                    {item}
                  </li>
                ),
              )}
            </ul>
            <div className="mt-8">
              <Button href="/comic" variant="secondary">
                Check Out Comic Page
              </Button>
            </div>
          </Reveal3D>
        </div>
      </div>
    </AnimatedSection>
  );
}
