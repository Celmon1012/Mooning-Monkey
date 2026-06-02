import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useRef } from 'react';
import { assets } from '../../data/assets';
import { evolutionStages } from '../../data/content';
import { AnimatedSection } from '../ui/AnimatedSection';
import { Button } from '../ui/Button';
import { Reveal3D } from '../ui/Reveal3D';
import { SectionHeading } from '../ui/SectionHeading';
import { TiltCard } from '../ui/TiltCard';
import { useParallax } from '../ui/useParallax';

const stageImages = [
  assets.evolution.mooningMonkey,
  assets.evolution.galacticGorilla,
  assets.evolution.alienGorilla,
  assets.evolution.eternalYeti,
];

export function Evolution() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgY = useParallax(sectionRef, ['-14%', '14%']);

  return (
    <AnimatedSection
      ref={sectionRef}
      id="evolution"
      mesh="cyan"
      className="section-padding overflow-hidden"
    >
      <motion.div
        className="absolute inset-0 scale-110 bg-cover bg-center opacity-[0.06]"
        style={{ backgroundImage: `url(${assets.sec3Back})`, y: bgY }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-b from-void via-transparent to-void" />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          label="Evolution Ecosystem"
          title="From Monkey to Eternal Yeti"
          subtitle="The Mooning Monkeys will go through 3 stages of evolution using advanced technology discovered during their travels. The more evolved your NFT, the more rewards and opportunities you unlock."
        />

        {/* Timeline connector - desktop */}
        <div className="relative">
          <div className="absolute left-0 right-0 top-1/2 hidden h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-cyan-glow/30 to-transparent lg:block" />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
            {evolutionStages.map((stage, i) => (
              <Reveal3D key={stage.id} delay={i * 0.1} className="group relative">
                {/* Timeline dot */}
                <div className="absolute -top-3 left-1/2 z-10 hidden h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full border-2 border-cyan-glow bg-void lg:flex">
                  <div className="h-2 w-2 rounded-full bg-cyan-glow" />
                </div>

                <TiltCard intensity={10}>
                <div
                  className="glass glow-border overflow-hidden rounded-2xl transition-shadow duration-300 group-hover:shadow-glow"
                  style={{
                    boxShadow: `0 0 32px ${stage.glowColor}`,
                  }}
                >
                  {/* Image */}
                  <div className={`relative overflow-hidden bg-gradient-to-b ${stage.color} p-6`}>
                    <img
                      src={stageImages[i]}
                      alt={stage.name}
                      className="mx-auto h-48 w-full object-contain drop-shadow-lg transition-transform duration-500 group-hover:scale-110 sm:h-56 animate-float-3d"
                      style={{ animationDelay: `${i * 0.4}s` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-void/80 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-center justify-between">
                      <span className="font-sansation text-[10px] uppercase tracking-widest text-white/40">
                        Stage {i + 1}
                      </span>
                      <span className="rounded-full bg-cyan-glow/10 px-2 py-0.5 font-sansation text-xs text-cyan-glow">
                        {stage.population}
                      </span>
                    </div>
                    <h3 className="mt-2 font-display text-xl font-bold">{stage.name}</h3>
                    <p className="text-xs text-purple-glow/80">{stage.subtitle}</p>
                    <p className="mt-3 text-sm leading-relaxed text-white/50">
                      {stage.description}
                    </p>
                  </div>
                </div>
                </TiltCard>

                {/* Arrow connector - mobile/tablet */}
                {i < evolutionStages.length - 1 && (
                  <div className="flex justify-center py-2 lg:hidden">
                    <ArrowRight className="rotate-90 text-cyan-glow/40" size={20} />
                  </div>
                )}
              </Reveal3D>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="mx-auto mb-6 max-w-2xl text-white/50">
            These 500 chosen Mooning Monkeys will eternally live on the Solana Blockchain,
            travelling deep space, going on adventures, and constantly providing you with
            passive rewards.
          </p>
          <Button href="#collection" variant="secondary">
            Visit Evolution Lab
            <ArrowRight size={16} />
          </Button>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
