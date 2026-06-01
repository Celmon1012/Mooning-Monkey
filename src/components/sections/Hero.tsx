import { motion } from 'framer-motion';
import { ArrowRight, ArrowUpRight, Check, MessageCircle, Play, Send } from 'lucide-react';
import { assets, links } from '../../data/assets';
import { GalaxyBackground } from '../ui/GalaxyBackground';
import { Particles } from '../ui/Particles';

const utilityHighlights = [
  'Co-own the Crash Game & share profits',
  'Limited-edition sci-fi comic NFT',
  'Daily $TAK rewards for holders',
];

const stats = [
  { value: '12,000', label: 'Unique NFTs' },
  { value: '239', label: 'Traits' },
  { value: '500', label: 'Elite Yetis' },
];

export function Hero() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden">
      <GalaxyBackground />
      <Particles count={24} />

      {/* Layered backdrop — readable, premium depth */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-[0.18]"
        style={{ backgroundImage: `url(${assets.heroBg})` }}
      />
      <div className="hero-vignette absolute inset-0" />
      <div className="hero-mesh absolute inset-0" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-20 pt-28 sm:px-8 sm:pt-32 lg:pb-24">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 xl:gap-20">
          {/* Left */}
          <div className="max-w-xl lg:max-w-none">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8 flex items-center gap-3"
            >
              <span className="h-px w-8 bg-gradient-to-r from-cyan-glow/60 to-transparent" />
              <span className="text-[11px] font-medium uppercase tracking-[0.28em] text-white/45">
                Solana NFT Ecosystem
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="font-display text-[2.75rem] font-semibold leading-[1.08] tracking-[-0.03em] text-white sm:text-5xl lg:text-[3.25rem] xl:text-[3.75rem]"
            >
              <span className="block text-white/90">Onboard the greatest</span>
              <span className="hero-headline-accent mt-1 block">space mission</span>
              <span className="mt-1 block text-white/70">of all time.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="mt-7 max-w-md text-[15px] leading-[1.75] text-white/45 sm:text-base"
            >
              Exclusive NFT art, co-owned crash game economics, and passive $TAK
              rewards — built for a galactic community that values utility as much as
              rarity.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18 }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <motion.a
                href={links.buyNow}
                className="hero-btn-primary inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-void"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Buy Now
                <ArrowRight size={16} strokeWidth={2.5} />
              </motion.a>
              <motion.a
                href="#video"
                className="hero-btn-secondary inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium text-white/90"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Play size={16} className="text-white/70" />
                Watch Trailer
              </motion.a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.28 }}
              className="mt-12 grid grid-cols-3 overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-md"
            >
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className={`px-4 py-5 sm:px-5 ${i > 0 ? 'border-l border-white/[0.06]' : ''}`}
                >
                  <div className="font-display text-xl font-semibold tracking-tight text-white sm:text-2xl">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-[10px] uppercase tracking-[0.2em] text-white/35">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — single premium showcase card */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:justify-self-end lg:w-full lg:max-w-lg xl:max-w-xl"
          >
            <div className="hero-showcase overflow-hidden rounded-[1.75rem] border border-white/[0.08] bg-white/[0.03] shadow-[0_32px_100px_-20px_rgba(0,0,0,0.65)] backdrop-blur-2xl">
              <a href="#about" className="group relative block">
                <div className="relative aspect-[5/3] overflow-hidden sm:aspect-[16/10]">
                  <img
                    src={assets.sec4Front}
                    alt="Mooning Monkey Crash Game"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#030014] via-[#030014]/50 to-transparent" />
                  <div className="absolute left-5 top-5">
                    <span className="inline-flex items-center rounded-full border border-white/10 bg-black/30 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-white/70 backdrop-blur-md">
                      Featured
                    </span>
                  </div>
                  <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
                    <div>
                      <h3 className="font-display text-lg font-semibold text-white sm:text-xl">
                        Crash Game
                      </h3>
                      <p className="mt-1 text-sm text-white/45">
                        Co-own · Multiplayer · Real rewards
                      </p>
                    </div>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-colors group-hover:bg-white group-hover:text-void">
                      <ArrowUpRight size={18} />
                    </span>
                  </div>
                </div>
              </a>

              <div className="border-t border-white/[0.06] p-5 sm:p-6">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-white/35">
                    Collection
                  </p>
                  <a
                    href="#collection"
                    className="text-xs font-medium text-white/50 transition-colors hover:text-cyan-glow"
                  >
                    View all
                  </a>
                </div>
                <div className="mt-4 flex -space-x-2">
                  {assets.nfts.slice(0, 5).map((img, i) => (
                    <a
                      key={img}
                      href="#collection"
                      className="relative h-11 w-11 overflow-hidden rounded-full border-2 border-[#0a0618] ring-1 ring-white/10 transition-transform hover:z-10 hover:scale-110 sm:h-12 sm:w-12"
                      style={{ zIndex: 5 - i }}
                    >
                      <img src={img} alt="" className="h-full w-full object-cover" />
                    </a>
                  ))}
                  <a
                    href="#collection"
                    className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#0a0618] bg-white/[0.06] text-[10px] font-medium text-white/50 ring-1 ring-white/10 sm:h-12 sm:w-12"
                  >
                    +12k
                  </a>
                </div>

                <ul className="mt-6 space-y-3">
                  {utilityHighlights.map((text) => (
                    <li
                      key={text}
                      className="flex items-center gap-3 text-sm text-white/50"
                    >
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-glow/10">
                        <Check size={12} className="text-cyan-glow" strokeWidth={2.5} />
                      </span>
                      {text}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 grid grid-cols-2 gap-2">
                  <a
                    href={links.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.02] py-3 text-sm font-medium text-white/70 transition-all hover:border-white/15 hover:bg-white/[0.05] hover:text-white"
                  >
                    <Send size={15} />
                    Telegram
                  </a>
                  <a
                    href={links.discord}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.02] py-3 text-sm font-medium text-white/70 transition-all hover:border-white/15 hover:bg-white/[0.05] hover:text-white"
                  >
                    <MessageCircle size={15} />
                    Discord
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 sm:block"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="h-9 w-5 rounded-full border border-white/10 p-1"
        >
          <div className="mx-auto h-1.5 w-0.5 rounded-full bg-white/30" />
        </motion.div>
      </motion.div>
    </section>
  );
}
