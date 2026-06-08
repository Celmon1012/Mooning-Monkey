import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import {
  AlienYetiPhase,
  GalacticGorillasPhase,
} from '../components/evolution-lab/EvolutionTreePhases';
import { AnimatedSection } from '../components/ui/AnimatedSection';
import { InternalLink } from '../components/ui/InternalLink';
import { LazyImage } from '../components/ui/LazyImage';
import { PosterBackground } from '../components/ui/PosterBackground';
import { Reveal3D } from '../components/ui/Reveal3D';
import { SectionHeading } from '../components/ui/SectionHeading';
import { TiltCard } from '../components/ui/TiltCard';
import { useParallax } from '../components/ui/useParallax';
import { assets } from '../data/assets';
import {
  evolutionEarning,
  evolutionLabHero,
  evolutionRewardsTable,
  evolutionStageCards,
  evolutionTreeIntro,
  evolutionTreeSteps,
  evolveStageContent,
  rarityTip,
  type EvolutionStageCard,
  type EvolveStage,
} from '../data/evolutionLab';
import '../styles/evolution-lab.css';

const heroStats = [
  { value: '4', label: 'Stages' },
  { value: '3', label: 'Evolutions' },
  { value: '500', label: 'Elite Yetis' },
];

function StagePreviewCard({ card, index }: { card: EvolutionStageCard; index: number }) {
  return (
    <Reveal3D delay={index * 0.08} className="group relative text-center">
      <p className="mb-4 font-body text-[10px] font-medium uppercase tracking-widest text-white/40">
        Stage {card.stage}
      </p>
      <TiltCard intensity={8}>
        <div
          className={`ev-stage-card mx-auto aspect-square w-full max-w-[220px] overflow-hidden rounded-2xl ${
            card.stage === 1
              ? 'ev-stage-card--revealed'
              : 'ev-stage-card--hidden flex items-center justify-center'
          }`}
        >
          {card.stage === 1 ? (
            <LazyImage src={card.image} alt={card.name} className="h-full w-full object-cover" />
          ) : (
            <span className="font-brand text-[clamp(3.5rem,9vw,5rem)] font-bold leading-none text-void/90">
              ?
            </span>
          )}
        </div>
      </TiltCard>
      <h3 className="mt-4 font-display text-lg font-semibold text-white sm:text-xl">{card.name}</h3>
    </Reveal3D>
  );
}

function EvolveSlots({ stage }: { stage: EvolveStage }) {
  const border = assets.evolutionLab.nftBorder;
  const placeholder = assets.evolutionLab.nftPlaceholder;

  const Slot = () => (
    <div className="glass shrink-0 rounded-xl p-2 transition-transform duration-300 hover:-translate-y-1">
      <LazyImage src={border} alt="" className="h-24 w-24 object-contain sm:h-28 sm:w-28" />
    </div>
  );

  const Result = () => (
    <div className="flex flex-col items-center gap-4">
      <div className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-3">
        <LazyImage
          src={placeholder}
          alt="Evolved NFT"
          className="h-28 w-28 object-contain sm:h-32 sm:w-32"
        />
      </div>
      <button type="button" className="hero-btn-primary rounded-full px-6 py-2.5 text-sm font-semibold text-void">
        Evolve
      </button>
    </div>
  );

  const layouts: Record<EvolveStage, ReactNode> = {
    '2': (
      <>
        <Slot />
        <Slot />
        <Slot />
        <Slot />
        <ChevronRight className="hidden h-7 w-7 shrink-0 text-white/25 sm:block" aria-hidden />
        <Result />
      </>
    ),
    '3': (
      <>
        <Slot />
        <Slot />
        <Slot />
        <ChevronRight className="hidden h-7 w-7 shrink-0 text-white/25 sm:block" aria-hidden />
        <Result />
      </>
    ),
    '4': (
      <>
        <Slot />
        <Slot />
        <ChevronRight className="hidden h-7 w-7 shrink-0 text-white/25 sm:block" aria-hidden />
        <Result />
      </>
    ),
  };

  return (
    <motion.div
      key={stage}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
      className="flex flex-wrap items-center justify-center gap-3 sm:gap-4"
    >
      {layouts[stage]}
    </motion.div>
  );
}

const MONKEY_GRID_COLS = 6;
const MONKEY_GRID_ROWS = 4;

function MonkeysTreeGrid({ images }: { images: readonly string[] }) {
  return (
    <div className="ev-tree-wrap">
      <div className="ev-monkeys-grid">
        {Array.from({ length: MONKEY_GRID_COLS }, (_, col) => (
          <div key={col} className="ev-monkey-col">
            {Array.from({ length: MONKEY_GRID_ROWS }, (_, row) => {
              const index = row * MONKEY_GRID_COLS + col;
              const src = images[index];
              if (!src) return null;
              return (
                <div key={row} className="ev-monkey-slot">
                  <LazyImage src={src} alt="" className="ev-monkey-img" />
                  {row < MONKEY_GRID_ROWS - 1 && <div className="ev-connector-v" aria-hidden />}
                  {row === MONKEY_GRID_ROWS - 1 && <div className="ev-connector-down" aria-hidden />}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <div className="ev-tree-hbar" />
    </div>
  );
}

function Accent({ children }: { children: ReactNode }) {
  return <span className="text-cyan-glow">{children}</span>;
}

export function EvolutionLabPage() {
  const [activeStage, setActiveStage] = useState<EvolveStage>('2');
  const stage = evolveStageContent[activeStage];
  const heroRef = useRef<HTMLElement>(null);
  const bgY = useParallax(heroRef, ['-10%', '10%']);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative overflow-hidden bg-void">
      {/* Hero — same language as landing Hero / Membership */}
      <section
        ref={heroRef}
        className="relative overflow-hidden pb-14 pt-6 sm:pb-16 sm:pt-8"
      >
        <motion.div
          className="pointer-events-none absolute inset-0 scale-110 bg-cover bg-center opacity-[0.08]"
          style={{ backgroundImage: `url(${assets.sec3Back})`, y: bgY }}
          aria-hidden
        />
        <PosterBackground
          src={assets.sec3Bg}
          opacity={0.12}
          overlayClassName="bg-gradient-to-b from-void/95 via-void/90 to-void"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-void via-transparent to-void" aria-hidden />

        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <Reveal3D immediate>
              <p className="font-body text-xs font-medium uppercase tracking-[2px] text-white/55">
                Evolution Lab
              </p>
            </Reveal3D>

            <Reveal3D immediate delay={0.08}>
              <h1 className="mt-4 font-brand text-[2rem] font-medium leading-[1.15] text-white sm:text-[2.35rem] lg:text-[2.75rem]">
                <span className="hero-headline-accent">The Evolution Lab</span>
              </h1>
            </Reveal3D>

            <Reveal3D immediate delay={0.14}>
              <p className="mt-6 max-w-2xl text-[15px] leading-[1.65] text-white/65">
                {evolutionLabHero.subtitle}
              </p>
            </Reveal3D>

            <Reveal3D immediate delay={0.2}>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/50 sm:text-[15px]">
                {evolutionLabHero.tagline}
              </p>
            </Reveal3D>

            <Reveal3D immediate delay={0.26}>
              <div className="mt-8 grid max-w-md grid-cols-3 overflow-hidden rounded-xl border border-white/[0.08] bg-void/40 backdrop-blur-md">
                {heroStats.map((stat, i) => (
                  <div
                    key={stat.label}
                    className={`px-4 py-5 sm:px-5 ${i > 0 ? 'border-l border-white/[0.08]' : ''}`}
                  >
                    <div className="font-display text-xl font-semibold tracking-tight text-white sm:text-2xl">
                      {stat.value}
                    </div>
                    <div className="mt-1 text-[10px] uppercase tracking-[0.2em] text-white/40">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal3D>

            <Reveal3D immediate delay={0.32}>
              <p className="mt-6 max-w-lg text-sm text-white/45">{evolutionLabHero.detail}</p>
            </Reveal3D>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Stage cards — reference picture style, landing typography */}
      <AnimatedSection mesh="cyan" className="section-padding overflow-hidden">
        <motion.div
          className="pointer-events-none absolute inset-0 scale-110 bg-cover bg-center opacity-[0.06]"
          style={{ backgroundImage: `url(${assets.sec3Back})` }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-b from-void via-transparent to-void" aria-hidden />

        <div className="relative mx-auto max-w-7xl">
          <SectionHeading
            label="Evolution path"
            title="From Monkey to Eternal Yeti"
            subtitle="Four stages of evolution. Burn lower-tier NFTs to ascend — each form unlocks higher game rewards and holder benefits."
          />

          <div className="relative">
            <div className="absolute left-0 right-0 top-[42%] hidden h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-cyan-glow/25 to-transparent lg:block" />
            <div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-x-6">
              {evolutionStageCards.map((card, i) => (
                <StagePreviewCard key={card.stage} card={card} index={i} />
              ))}
            </div>
          </div>
        </div>
      </AnimatedSection>

      <div className="section-divider" />

      {/* Evolve panel — mint-panel like BuyMint / ProfitCalculator */}
      <AnimatedSection mesh="mixed" className="section-padding">
        <div className="relative mx-auto max-w-7xl">
          <SectionHeading
            label="Evolve now"
            title="Sacrifice. Transform. Earn more."
            subtitle="Select your evolution stage based on your current NFT holdings, then burn the required monkeys to unlock the next form."
          />

          <div className="mint-tab-track relative mx-auto mb-8 flex max-w-sm rounded-full p-1">
            {(['2', '3', '4'] as const).map((id) => (
              <button
                key={id}
                type="button"
                className={`relative z-10 flex-1 rounded-full py-2.5 font-body text-sm font-medium transition-colors duration-200 ${
                  activeStage === id ? 'text-white' : 'text-white/45 hover:text-white/65'
                }`}
                onClick={() => setActiveStage(id)}
              >
                {activeStage === id && (
                  <motion.span
                    layoutId="evolve-tab-pill"
                    className="mint-tab-active absolute inset-0 rounded-full"
                    transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                  />
                )}
                <span className="relative">Stage {id}</span>
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeStage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
              className="mint-panel overflow-hidden rounded-3xl"
            >
              <div className="border-b border-white/[0.06] px-6 py-6 sm:px-8 sm:py-7">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <h3 className="font-display text-xl font-semibold text-white sm:text-2xl">
                    {stage.nftTitle}
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      className="hero-btn-secondary rounded-full px-5 py-2.5 text-sm font-medium text-white/90"
                    >
                      Connect Wallet
                    </button>
                    <InternalLink href="/#buy">
                      <button
                        type="button"
                        className="hero-btn-primary rounded-full px-5 py-2.5 text-sm font-semibold text-void"
                      >
                        Buy Monkey
                      </button>
                    </InternalLink>
                  </div>
                </div>
              </div>

              <div className="space-y-6 px-6 py-7 sm:px-8 sm:py-8">
                <div className="space-y-4 text-[15px] leading-[1.65] text-white/60">
                  <p>
                    {stage.id === '2' && (
                      <>
                        In order to achieve the powerful <Accent>Galactic Gorilla</Accent>, you&apos;ll
                        have to sacrifice 4 of your current <Accent>Mooning Monkeys</Accent> to depart
                        into deep space and surpass the obstacles they&apos;ll encounter on their way to the
                        new planet.
                      </>
                    )}
                    {stage.id === '3' && (
                      <>
                        The <Accent>Alien Gorilla</Accent> is the <Accent>KEY</Accent> to winning against
                        the alien invader and winning The Inter-Galactic War — you&apos;ll have to sacrifice{' '}
                        <Accent>3 Galactic Gorillas</Accent> in order to achieve such a strong being and
                        protect the species from extinction.
                      </>
                    )}
                    {stage.id === '4' && (
                      <>
                        Although <Accent>The Alien Gorilla</Accent> is extremely powerful, it is still
                        bound by the shackles of mortality… You&apos;ll need to sacrifice{' '}
                        <Accent>2 Of Your Alien Gorillas</Accent> to make <Accent>1 Eternal Yeti</Accent>{' '}
                        that will live forever on the Blockchain and earn the highest possible levels of
                        daily game rewards.
                      </>
                    )}
                  </p>
                  <p className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3 text-sm text-white/50">
                    <span className="font-medium text-cyan-glow">Note:</span> By clicking &quot;Evolve&quot;,
                    the {stage.sacrificeLabel} you&apos;ve chosen will be sent to a Solana black hole wallet
                    and disappear forever — however, each evolution will make you more money in the{' '}
                    <Accent>Mooning Monkey Game</Accent>.
                  </p>
                </div>

                <div className="border-t border-white/[0.06] pt-8 text-center">
                  <h4 className="mb-8 font-display text-lg font-semibold text-white">
                    Start evolve process
                  </h4>
                  <EvolveSlots stage={activeStage} />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <p className="mx-auto mt-8 max-w-3xl text-center text-sm italic leading-relaxed text-white/45">
            {rarityTip}
          </p>
        </div>
      </AnimatedSection>

      <div className="section-divider" />

      {/* Evolution tree */}
      <AnimatedSection mesh="purple" className="section-padding overflow-hidden">
        <PosterBackground
          src={assets.sec3Bg}
          opacity={0.1}
          overlayClassName="bg-gradient-to-b from-void/92 via-void/88 to-void"
        />

        <div className="relative mx-auto max-w-7xl text-center">
          <SectionHeading
            label="Evolution tree"
            title={evolutionTreeIntro.title}
            subtitle={`${evolutionTreeIntro.paragraph1} ${evolutionTreeIntro.paragraph2}`}
          />

          <div className="evolution-lab-tree mt-2">
            <p className="font-body text-sm font-medium text-white/55 sm:text-[15px]">
              {evolutionTreeSteps[0].title}
            </p>
            <MonkeysTreeGrid images={evolutionTreeSteps[0].images} />
            <GalacticGorillasPhase title={evolutionTreeSteps[1].title} />
            <AlienYetiPhase
              alienTitle={evolutionTreeSteps[2].title}
              yetiTitle={evolutionTreeSteps[3].title}
            />
          </div>
        </div>
      </AnimatedSection>

      <div className="section-divider" />

      {/* Rewards */}
      <AnimatedSection mesh="cyan" className="section-padding">
        <div className="relative mx-auto max-w-7xl">
          <SectionHeading
            label="Rewards"
            title={evolutionEarning.title}
            subtitle={`${evolutionEarning.text} ${evolutionEarning.text2}`}
          />

          <Reveal3D>
            <div className="mint-panel overflow-hidden rounded-3xl">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[540px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-white/[0.08]">
                      {['Stage', 'Unit', 'Remarks', 'Rewards*', 'Bonus*'].map((col) => (
                        <th
                          key={col}
                          className="px-5 py-4 font-body text-[10px] font-medium uppercase tracking-[0.2em] text-white/40"
                        >
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {evolutionRewardsTable.map((row, i) => (
                      <tr
                        key={row.stage}
                        className={`border-b border-white/[0.04] transition-colors hover:bg-white/[0.02] ${
                          i === 0 ? 'bg-white/[0.02]' : ''
                        }`}
                      >
                        <td className="px-5 py-4 font-medium text-white/90">{row.stage}</td>
                        <td className="px-5 py-4 text-white/55">{row.unit}</td>
                        <td className="max-w-[200px] px-5 py-4 text-white/50">{row.remarks}</td>
                        {i === 0 && (
                          <td
                            rowSpan={4}
                            className="border-l border-white/[0.06] px-5 py-4 text-center font-display text-2xl font-semibold text-cyan-glow"
                          >
                            25%
                          </td>
                        )}
                        <td className="px-5 py-4 font-medium text-cyan-glow/80">{row.bonus}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Reveal3D>

          <div className="mt-10 flex justify-center">
            <InternalLink href="/calculator">
              <button
                type="button"
                className="hero-btn-secondary inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium text-white/90"
              >
                Check out profit calculator
                <ArrowRight size={16} strokeWidth={2} />
              </button>
            </InternalLink>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
