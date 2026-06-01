import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { assets, links } from '../../data/assets';
import { Button } from '../ui/Button';
import { GalaxyBackground } from '../ui/GalaxyBackground';
import { Particles } from '../ui/Particles';

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      <GalaxyBackground />
      <Particles count={50} />

      {/* Hero background image overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-lighten"
        style={{ backgroundImage: `url(${assets.heroBg})` }}
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pt-28 pb-16 sm:px-6 lg:px-8 lg:pt-32">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Content */}
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
              Save the Mooning Monkeys from imminent extinction. Earn astronomical rewards,
              exclusive membership privileges, and a lifetime source of passive income through
              the most utility-packed NFT ecosystem in Web3.
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

          {/* Hero Artwork */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Glow ring */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-glow/30 to-purple-glow/30 blur-3xl" />

              <motion.img
                src={assets.heroMonkey}
                alt="Mooning Monkey Astronaut"
                className="relative z-10 w-full max-w-md object-contain drop-shadow-2xl lg:max-w-lg xl:max-w-xl"
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              />

              {/* Orbiting elements */}
              <motion.div
                className="absolute -right-4 top-1/4 h-16 w-16 rounded-full border border-cyan-glow/30 bg-cyan-glow/10 backdrop-blur-sm"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute -left-8 bottom-1/4 h-12 w-12 rounded-full border border-purple-glow/30 bg-purple-glow/10 backdrop-blur-sm"
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
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
