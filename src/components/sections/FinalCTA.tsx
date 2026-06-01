import { motion } from 'framer-motion';
import { ArrowRight, Rocket } from 'lucide-react';
import { assets, links } from '../../data/assets';
import { Button } from '../ui/Button';
import { GalaxyBackground } from '../ui/GalaxyBackground';
import { Particles } from '../ui/Particles';

export function FinalCTA() {
  return (
    <section id="mint" className="relative overflow-hidden py-24 sm:py-32 lg:py-40">
      <GalaxyBackground />
      <Particles count={30} />

      <div
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{ backgroundImage: `url(${assets.sec3Bg})` }}
      />

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-glow/20 to-purple-glow/20"
          >
            <Rocket className="h-10 w-10 text-cyan-glow" />
          </motion.div>

          <h2 className="font-display text-4xl font-extrabold sm:text-5xl lg:text-6xl">
            <span className="gradient-text">Take Off Is Imminent</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/60 sm:text-xl">
            Suit up and get ready. Join the greatest space mission of all time and become a
            proud owner of one of the most stylish, rare, and utility-packed NFTs in Web3.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button href={links.buyNow} size="lg">
              Buy Mooning Monkeys
              <ArrowRight size={18} />
            </Button>
            <Button href={links.phantom} variant="secondary" size="lg">
              Get Phantom Wallet
            </Button>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-12 inline-flex flex-col items-center gap-2 rounded-2xl glass px-8 py-6 sm:flex-row sm:gap-8"
          >
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-white/40">
                Total Supply
              </div>
              <div className="font-display text-2xl font-bold text-cyan-glow">12,000</div>
            </div>
            <div className="hidden h-8 w-px bg-white/10 sm:block" />
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-white/40">
                Max Per Wallet
              </div>
              <div className="font-display text-2xl font-bold text-purple-glow">12</div>
            </div>
            <div className="hidden h-8 w-px bg-white/10 sm:block" />
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-white/40">
                Blockchain
              </div>
              <div className="font-display text-2xl font-bold text-white">Solana</div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
