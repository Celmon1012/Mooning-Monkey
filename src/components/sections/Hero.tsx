import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle, Play, Send } from 'lucide-react';
import { assets, links } from '../../data/assets';
import { Button } from '../ui/Button';
import { GalaxyBackground } from '../ui/GalaxyBackground';
import { GlassCard } from '../ui/GlassCard';
import { Particles } from '../ui/Particles';

const utilityHighlights = [
  'Co-own the Mooning Monkey Crash Game & share profits',
  'Epic sci-fi comic book in limited NFT edition',
  'Daily $TAK token rewards for all evolution holders',
];

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      <GalaxyBackground />
      <Particles count={50} />

      <div
        className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-lighten"
        style={{ backgroundImage: `url(${assets.heroBg})` }}
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pt-28 pb-16 sm:px-6 lg:px-8 lg:pt-32">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-16">
          {/* Left — headline & primary CTAs */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-glow/30 bg-cyan-glow/5 px-4 py-1.5"
            >
              <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-glow" />
              <span className="font-mono text-xs uppercase tracking-widest text-cyan-glow/90">
                Solana NFT Ecosystem
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="max-w-2xl text-balance"
            >
              <span className="mb-5 block font-mono text-[11px] font-medium uppercase tracking-[0.35em] text-white/40 sm:text-xs">
                Onboard the
              </span>
              <span className="block font-display text-[2.5rem] font-bold leading-[1.12] tracking-[-0.02em] text-white sm:text-5xl lg:text-[3.5rem] lg:leading-[1.1] xl:text-6xl">
                Greatest{' '}
                <span className="hero-headline-accent">Space Mission</span>
              </span>
              <span className="mt-3 block font-display text-[2.5rem] font-bold leading-[1.12] tracking-[-0.02em] text-white/80 sm:text-5xl lg:text-[3.5rem] lg:leading-[1.1] xl:text-6xl">
                of All Time
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-6 max-w-xl text-base leading-relaxed text-white/60 sm:text-lg"
            >
              Join the Mooning Monkeys on their epic space journey — exclusive NFT art from
              another world and unrivalled utility from galaxies far beyond. Co-own the famous
              Crash Game, collect the sci-fi comic, and earn passive rewards.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Button href={links.buyNow} size="lg">
                Buy Now
                <ArrowRight size={18} />
              </Button>
              <Button href="#video" variant="secondary" size="lg">
                <Play size={18} />
                Watch Trailer
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-10 flex flex-wrap gap-8"
            >
              {[
                { value: '12,000', label: 'Unique NFTs' },
                { value: '239', label: 'Distinct Traits' },
                { value: '500', label: 'Elite Yetis' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-display text-2xl font-bold text-cyan-glow sm:text-3xl">
                    {stat.value}
                  </div>
                  <div className="text-xs uppercase tracking-wider text-white/40">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — ecosystem panel (replaces monkey icon) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4"
          >
            {/* Crash game feature */}
            <a href="#about" className="group block">
              <div className="relative overflow-hidden rounded-2xl border border-white/10 glass glow-border">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={assets.sec4Front}
                    alt="Mooning Monkey Crash Game"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-void via-void/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-cyan-glow">
                      Co-own & profit
                    </span>
                    <h3 className="mt-1 font-display text-lg font-bold text-white sm:text-xl">
                      Mooning Monkey Crash Game
                    </h3>
                    <p className="mt-1 text-sm text-white/60">
                      Multiplayer crash gameplay — cash out before the curve crashes.
                    </p>
                  </div>
                </div>
              </div>
            </a>

            {/* NFT preview strip */}
            <div className="grid grid-cols-4 gap-2">
              {assets.nfts.slice(0, 4).map((img, i) => (
                <motion.a
                  key={img}
                  href="#collection"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 + i * 0.05 }}
                  className="group aspect-square overflow-hidden rounded-xl border border-white/10 glass"
                >
                  <img
                    src={img}
                    alt={`Collection preview ${i + 1}`}
                    className="h-full w-full object-cover transition-transform group-hover:scale-110"
                  />
                </motion.a>
              ))}
            </div>

            {/* Utility bullets + community */}
            <GlassCard hover={false} className="!p-4">
              <ul className="space-y-2.5">
                {utilityHighlights.map((text) => (
                  <li key={text} className="flex items-start gap-2 text-sm text-white/55">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-purple-glow" />
                    {text}
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-2 border-t border-white/10 pt-4">
                <a
                  href={links.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-cyan-glow/10 px-4 py-2.5 text-sm font-medium text-cyan-glow transition-colors hover:bg-cyan-glow/20"
                >
                  <Send size={16} />
                  Join Telegram
                </a>
                <a
                  href={links.discord}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-purple-glow/10 px-4 py-2.5 text-sm font-medium text-purple-glow transition-colors hover:bg-purple-glow/20"
                >
                  <MessageCircle size={16} />
                  Join Discord
                </a>
              </div>
            </GlassCard>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex h-10 w-6 items-start justify-center rounded-full border border-white/20 p-1"
        >
          <div className="h-2 w-1 rounded-full bg-cyan-glow" />
        </motion.div>
      </motion.div>
    </section>
  );
}
