import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import { assets, links } from '../../data/assets';
import { AnimatedSection } from '../ui/AnimatedSection';
import { Button } from '../ui/Button';
import { SectionHeading } from '../ui/SectionHeading';

export function ComicSection() {
  return (
    <AnimatedSection id="comic" className="section-padding relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{ backgroundImage: `url(${assets.comicBg})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-void via-transparent to-void" />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          label="Comic series"
          title="The Mooning Monkey Space Odyssey"
          subtitle="An intriguing, action-packed story in Limited Digital NFT Edition — 4 comic books of 14 pages each."
        />

        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative order-2 lg:order-1"
          >
            <div className="absolute -inset-3 rounded-3xl bg-purple-glow/10 blur-2xl" />
            <img
              src={assets.comicBg}
              alt="Mooning Monkey Comic Book"
              className="relative rounded-2xl border border-white/10 shadow-glow-lg"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <BookOpen className="mb-4 h-8 w-8 text-purple-glow" />
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
              <Button href={links.docs} variant="secondary">
                Check Out Comic Page
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
}
