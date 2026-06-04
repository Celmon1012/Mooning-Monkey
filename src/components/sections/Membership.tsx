import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { assets } from '../../data/assets';
import { membershipBenefits } from '../../data/content';
import { AnimatedSection } from '../ui/AnimatedSection';
import { LazyImage } from '../ui/LazyImage';
import { PosterBackground } from '../ui/PosterBackground';
import { Reveal3D } from '../ui/Reveal3D';
import { SectionHeading } from '../ui/SectionHeading';

export function Membership() {
  return (
    <AnimatedSection id="membership" mesh="purple" className="section-padding overflow-hidden">
      <PosterBackground
        src={assets.sec3Bg}
        opacity={0.14}
        overlayClassName="bg-gradient-to-b from-void/92 via-void/88 to-void"
      />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          label="Membership"
          title="Exclusive Holder Privileges"
          subtitle="On top of co-sharing astronomical profits from the game, here's what else awaits Mooning Monkey NFT holders."
        />

        <div className="grid items-stretch gap-6 sm:grid-cols-2">
          {membershipBenefits.map((benefit, i) => (
            <Reveal3D key={benefit.title} delay={i * 0.06} className="h-full">
              <motion.article
                whileHover={{ y: -4 }}
                className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.1] bg-gradient-to-br from-white/[0.06] via-white/[0.02] to-void/80 shadow-glass backdrop-blur-xl transition-[border-color,box-shadow] duration-300 hover:border-white/[0.16] hover:shadow-[0_20px_50px_-20px_rgba(168,85,247,0.25)]"
              >
                <div className="flex items-center justify-center bg-void/50 p-6 sm:p-8">
                  <LazyImage
                    src={benefit.image}
                    alt={benefit.title}
                    className="h-auto max-h-[220px] w-full max-w-[280px] object-contain sm:max-h-[260px]"
                  />
                </div>

                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <div className="flex items-center gap-2">
                    <benefit.icon className="h-5 w-5 shrink-0 text-cyan-glow" strokeWidth={1.5} />
                    <h3 className="font-display text-lg font-semibold text-white">{benefit.title}</h3>
                  </div>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-white/55 sm:text-[15px]">
                    {benefit.description}
                  </p>
                  <a
                    href={benefit.href}
                    className="mt-5 inline-flex items-center gap-2 font-body text-sm font-medium text-white/70 transition-colors hover:text-cyan-glow"
                  >
                    {benefit.cta}
                    <ArrowRight size={14} strokeWidth={2} />
                  </a>
                </div>
              </motion.article>
            </Reveal3D>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
