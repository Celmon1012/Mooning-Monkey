import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { AnimatedSection } from '../components/ui/AnimatedSection';
import { Floating3D } from '../components/ui/Floating3D';
import { InternalLink } from '../components/ui/InternalLink';
import { LazyImage } from '../components/ui/LazyImage';
import { Reveal3D } from '../components/ui/Reveal3D';
import { useParallax } from '../components/ui/useParallax';
import { assets } from '../data/assets';
import {
  bankrollSection,
  comicPagesSection,
  evolutionCosts,
  extraCashback,
  extraWins,
  gameBenefits,
  nftRewards,
  stakingTiers,
  tokenHero,
  wagerLevels,
  yieldSection,
} from '../data/token';
import '../styles/token.css';

function HighlightText({ text, highlights }: { text: string; highlights: readonly string[] }) {
  const parts: { text: string; highlight: boolean }[] = [{ text, highlight: false }];

  highlights.forEach((phrase) => {
    const next: typeof parts = [];
    parts.forEach((part) => {
      if (part.highlight) {
        next.push(part);
        return;
      }
      const segments = part.text.split(phrase);
      segments.forEach((segment, i) => {
        if (segment) next.push({ text: segment, highlight: false });
        if (i < segments.length - 1) next.push({ text: phrase, highlight: true });
      });
    });
    parts.length = 0;
    parts.push(...next);
  });

  return (
    <>
      {parts.map((part, i) =>
        part.highlight ? (
          <span key={`${part.text}-${i}`} className="token-highlight">
            {part.text}
          </span>
        ) : (
          <span key={`${part.text}-${i}`}>{part.text}</span>
        ),
      )}
    </>
  );
}

function SectionImage({
  src,
  alt,
  className = '',
  direction = 'up',
}: {
  src: string;
  alt: string;
  className?: string;
  direction?: 'up' | 'left' | 'right';
}) {
  return (
    <Reveal3D direction={direction} className={`flex justify-center ${className}`}>
      <Floating3D floatIntensity={10} tiltIntensity={6}>
        <LazyImage
          src={src}
          alt={alt}
          className="token-section-image h-auto max-h-[320px] w-auto max-w-full object-contain sm:max-h-[400px] lg:max-h-[500px]"
        />
      </Floating3D>
    </Reveal3D>
  );
}

function TierList({
  leftLabel,
  rightLabel,
  rows,
}: {
  leftLabel: string;
  rightLabel: string;
  rows: readonly { left: string; right: string }[];
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.07 } },
      }}
      className="mt-8 grid gap-8 sm:grid-cols-2 sm:gap-12"
    >
      <div>
        <p className="mb-4 font-brand text-sm font-semibold uppercase tracking-wider text-[#f831ec]">
          {leftLabel}
        </p>
        <ul className="token-tier-list space-y-3 text-base text-white/85 sm:text-lg">
          {rows.map((row) => (
            <motion.li
              key={row.left}
              variants={{
                hidden: { opacity: 0, x: -16 },
                visible: { opacity: 1, x: 0 },
              }}
            >
              {row.left}
            </motion.li>
          ))}
        </ul>
      </div>
      <div>
        <p className="mb-4 font-brand text-sm font-semibold uppercase tracking-wider text-[#f831ec]">
          {rightLabel}
        </p>
        <div className="space-y-3 text-base text-white/85 sm:text-lg">
          {rows.map((row) => (
            <motion.div
              key={row.right}
              variants={{
                hidden: { opacity: 0, x: 16 },
                visible: { opacity: 1, x: 0 },
              }}
              className="token-apy-value"
            >
              {row.right}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function WagerTable() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
      }}
      className="mt-10 overflow-x-auto"
    >
      <table className="token-wager-table w-full min-w-[640px]">
        <thead>
          <tr>
            <th>Level</th>
            <th>Lifetime Bet</th>
            <th>Wage $TAK</th>
            <th>Wage Crypto</th>
          </tr>
        </thead>
        <tbody>
          {wagerLevels.map((row) => (
            <motion.tr
              key={row.level}
              variants={{
                hidden: { opacity: 0, y: 12 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.35 }}
            >
              <td>
                <span className="token-highlight">○</span> {row.level}
              </td>
              <td>{row.lifetimeBet}</td>
              <td>{row.tak}</td>
              <td>{row.crypto}</td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
}

export function TokenPage() {
  const heroRef = useRef<HTMLElement>(null);
  const bgY = useParallax(heroRef, ['-6%', '6%']);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative overflow-hidden bg-void">
      {/* Hero */}
      <section
        ref={heroRef}
        className="relative overflow-hidden pb-16 pt-24 sm:pb-20 sm:pt-32 lg:pt-40"
      >
        <motion.div
          className="pointer-events-none absolute inset-0 scale-110 bg-cover bg-center opacity-[0.2]"
          style={{ backgroundImage: `url(${assets.tokenBack})`, y: bgY }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-b from-void/90 via-void/75 to-void" aria-hidden />

        <div className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6">
          <Reveal3D immediate>
            <motion.h1
              initial={{ opacity: 0, y: 36, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="font-brand text-[clamp(2.5rem,7vw,4.5rem)] font-semibold leading-tight gradient-text"
            >
              {tokenHero.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-10 font-body text-xl text-white sm:text-3xl lg:text-[2.125rem] lg:leading-[1.5]"
            >
              {tokenHero.subtitle}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mx-auto mt-4 max-w-4xl text-base leading-relaxed text-white/90 sm:text-xl sm:leading-[1.5] lg:text-[2.125rem]"
            >
              <HighlightText text={tokenHero.description} highlights={tokenHero.highlights} />
            </motion.p>
          </Reveal3D>
        </div>
      </section>

      {/* Yield */}
      <AnimatedSection mesh="cyan" className="section-padding border-t border-white/[0.04]">
        <div className="mx-auto max-w-4xl text-center">
          <SectionImage src={assets.token.yield} alt="Yield" className="mb-10" />
          <Reveal3D>
            <h2 className="font-brand text-4xl font-semibold text-[#f831eb] sm:text-5xl">
              {yieldSection.heading}
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-white/85 sm:text-2xl sm:leading-[1.5]">
              {yieldSection.description}
            </p>
          </Reveal3D>
        </div>
      </AnimatedSection>

      {/* NFT rewards */}
      <AnimatedSection mesh="purple" className="section-padding">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-12">
            {nftRewards.map((block, index) => (
              <Reveal3D key={block.heading} delay={index * 0.1} direction={index % 2 === 0 ? 'left' : 'right'}>
                <h3 className="font-brand text-3xl font-bold gradient-text sm:text-4xl">
                  {block.heading}
                </h3>
                <p className="mt-4 text-lg leading-relaxed text-white/85 sm:text-2xl sm:leading-[1.5]">
                  {block.description}
                </p>
                <motion.ul
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15, duration: 0.4 }}
                  className="token-tier-list mt-8 text-lg text-white/85 sm:text-xl"
                >
                  <li>{block.reward}</li>
                </motion.ul>
              </Reveal3D>
            ))}
          </div>
          <SectionImage src={assets.token.nftRewards} alt="NFT rewards" direction="right" />
        </div>
      </AnimatedSection>

      {/* Evolve */}
      <AnimatedSection mesh="mixed" className="section-padding border-t border-white/[0.04]">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
          <SectionImage src={assets.token.evolve} alt="Evolve" className="order-2 lg:order-1" direction="left" />
          <Reveal3D direction="right" className="order-1 lg:order-2">
            <h2 className="font-brand text-3xl font-bold gradient-text sm:text-4xl">
              {evolutionCosts.heading}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-white/85 sm:text-2xl sm:leading-[1.5]">
              {evolutionCosts.description}
            </p>
            <TierList
              leftLabel={evolutionCosts.processLabel}
              rightLabel={evolutionCosts.burnLabel}
              rows={evolutionCosts.steps.map((s) => ({ left: s.process, right: s.cost }))}
            />
            <p className="mt-8 text-base text-white/70 sm:text-lg">{evolutionCosts.note}</p>
          </Reveal3D>
        </div>
      </AnimatedSection>

      {/* Comic pages */}
      <AnimatedSection mesh="cyan" className="section-padding">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
          <Reveal3D direction="left">
            <h2 className="font-brand text-3xl font-bold gradient-text sm:text-4xl">
              {comicPagesSection.heading}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-white/85 sm:text-2xl sm:leading-[1.5]">
              <HighlightText
                text={comicPagesSection.description}
                highlights={comicPagesSection.highlights}
              />
            </p>
          </Reveal3D>
          <SectionImage src={assets.token.comic} alt="Comic pages" direction="right" />
        </div>
      </AnimatedSection>

      {/* Staking */}
      <AnimatedSection mesh="purple" className="section-padding border-t border-white/[0.04]">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
          <SectionImage src={assets.token.staking} alt="Staking" className="order-2 lg:order-1" direction="left" />
          <Reveal3D direction="right" className="order-1 lg:order-2">
            <h2 className="font-brand text-3xl font-bold gradient-text sm:text-4xl">
              {stakingTiers.heading}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-white/85 sm:text-2xl sm:leading-[1.5]">
              {stakingTiers.description}
            </p>
            <TierList
              leftLabel={stakingTiers.stakingLabel}
              rightLabel={stakingTiers.apyLabel}
              rows={stakingTiers.tiers.map((t) => ({ left: t.range, right: t.apy }))}
            />
          </Reveal3D>
        </div>
      </AnimatedSection>

      {/* Extra cashback */}
      <AnimatedSection mesh="mixed" className="section-padding">
        <div className="mx-auto grid max-w-6xl items-start gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
          <Reveal3D direction="left">
            <h2 className="font-brand text-3xl font-bold gradient-text sm:text-4xl">
              {extraCashback.heading}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-white/85 sm:text-2xl sm:leading-[1.5]">
              {extraCashback.description}
            </p>
            <motion.ul
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.1 } },
              }}
              className="token-tier-list mt-8 space-y-4 text-base text-white/85 sm:text-lg"
            >
              {extraCashback.bullets.map((bullet) => (
                <motion.li
                  key={bullet.slice(0, 30)}
                  variants={{
                    hidden: { opacity: 0, x: -12 },
                    visible: { opacity: 1, x: 0 },
                  }}
                >
                  {bullet}
                </motion.li>
              ))}
            </motion.ul>
          </Reveal3D>
          <SectionImage src={assets.token.cashback} alt="Extra cashback" direction="right" />
        </div>
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <WagerTable />
        </div>
      </AnimatedSection>

      {/* Extra wins */}
      <AnimatedSection mesh="cyan" className="section-padding border-t border-white/[0.04]">
        <div className="mx-auto grid max-w-6xl items-start gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
          <SectionImage src={assets.token.wins} alt="Extra wins" className="order-2 lg:order-1" direction="left" />
          <Reveal3D direction="right" className="order-1 lg:order-2">
            <h2 className="font-brand text-3xl font-bold gradient-text sm:text-4xl">
              {extraWins.heading}
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-white/85 sm:text-2xl sm:leading-[1.5]">
              {extraWins.description}
            </p>
            <motion.ul
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="token-tier-list mt-8 text-base text-white/85 sm:text-lg"
            >
              <li>{extraWins.bullet}</li>
            </motion.ul>
          </Reveal3D>
        </div>
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <WagerTable />
        </div>
      </AnimatedSection>

      {/* Bankroll */}
      <AnimatedSection mesh="purple" className="section-padding">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
          <Reveal3D direction="left">
            <h2 className="font-brand text-3xl font-bold gradient-text sm:text-4xl">
              {bankrollSection.heading}
            </h2>
            <p className="mt-4 text-lg text-white/85 sm:text-2xl">{bankrollSection.intro}</p>
            <p className="mt-6 font-medium text-white/90 sm:text-xl">{bankrollSection.exampleLabel}</p>
            <p className="mt-3 text-base leading-relaxed text-white/80 sm:text-lg">
              <HighlightText
                text={bankrollSection.example}
                highlights={bankrollSection.highlights}
              />
            </p>
          </Reveal3D>
          <SectionImage src={assets.token.bankroll} alt="Bankroll" direction="right" />
        </div>
      </AnimatedSection>

      {/* Game benefits + CTA */}
      <AnimatedSection mesh="mixed" className="section-padding border-t border-white/[0.04]">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <Reveal3D className="space-y-6">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-lg leading-relaxed text-white/85 sm:text-2xl sm:leading-[1.5]"
            >
              In our game, whether they win or lose,{' '}
              <span className="token-highlight">4%</span> out of the{' '}
              <span className="token-highlight">5%</span> house hedge is redistributed to players
              in cashback, minimizing the chances of losing!
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="text-lg leading-relaxed text-white/85 sm:text-2xl sm:leading-[1.5]"
            >
              As you can see, <span className="token-highlight">The Crash Game</span> on
              MooningMonkey.com provides unlimited benefits to its players, and this is why so many
              people choose this platform…
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.16 }}
              className="font-display text-xl font-semibold text-white sm:text-2xl"
            >
              {gameBenefits.para3}
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.24 }}
              className="text-base text-white/70 sm:text-lg"
            >
              {gameBenefits.calculatorNote}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.32 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              <InternalLink
                href="/calculator"
                className="hero-btn-primary inline-flex rounded-full px-10 py-3.5 text-sm font-semibold uppercase tracking-wide text-void"
              >
                Check Calculators
              </InternalLink>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="mx-auto max-w-2xl pt-6 text-sm text-white/45"
            >
              {gameBenefits.disclaimer}
            </motion.p>
          </Reveal3D>
        </div>
      </AnimatedSection>
    </div>
  );
}
