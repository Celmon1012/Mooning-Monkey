import { motion } from 'framer-motion';
import { assets } from '../../data/assets';
import { AnimatedSection } from '../ui/AnimatedSection';
import { LazyImage } from '../ui/LazyImage';
import { GlassCard } from '../ui/GlassCard';
import { SectionHeading } from '../ui/SectionHeading';

export function About() {
  return (
    <AnimatedSection id="about" mesh="mixed" className="section-padding">
      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          label="The Universe"
          title="A Galactic Story of Survival & Evolution"
          subtitle="Join the Mooning Monkeys on their epic space journey — an exclusive NFT project featuring art from another world and unrivalled utility from galaxies far beyond."
        />

        {/* Block 1 - Story */}
        <div className="mb-16 grid items-center gap-8 lg:mb-20 lg:grid-cols-2 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="absolute -inset-4 rounded-3xl " />
            <LazyImage
              src={assets.sec4Front}
              alt="Mooning Monkey Crash Game"
              className="relative rounded-2xl shadow-lift"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="font-body text-xs uppercase tracking-widest text-white/70">
              Co-Own The Game
            </span>
            <h3 className="mt-3 font-display text-2xl font-bold sm:text-3xl lg:text-4xl">
              Share Profits From The{' '}
              <span className="accent-word">Crash Game</span>
            </h3>
            <p className="mt-4 text-white/60 leading-relaxed">
              Mooning Monkey is an exciting, online, multiplayer gambling game that will provide
              you with endless hours of thrilling fun, while also giving you the opportunity to
              win millions. The gameplay consists of an increasing curve that can crash at any
              time — keeping everyone at the edge of their seats.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                'Multiplayer crash game with real rewards',
                'Co-own and profit from game revenue',
                'Try the profit calculator while we prepare launch',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-white/70">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-glow" />
                  {item === 'Try the profit calculator while we prepare launch' ? (
                    <a href="#calculator" className="text-accent hover:text-white">
                      {item}
                    </a>
                  ) : (
                    item
                  )}
                </li>
              ))}
            </ul>
            <a
              href="#calculator"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-white/70 hover:text-white"
            >
              Profit Calculator →
            </a>
          </motion.div>
        </div>

        {/* Block 2 - Rarity */}
        <div className="mb-16 grid items-center gap-8 lg:mb-20 lg:grid-cols-2 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <span className="font-body text-xs uppercase tracking-widest text-accent">
              Rarity & Spec
            </span>
            <h3 className="mt-3 font-display text-2xl font-bold sm:text-3xl lg:text-4xl">
              Mooning Monkeys{' '}
              <span className="accent-word-alt">Hate Being Boring</span>
            </h3>
            <p className="mt-4 text-white/60 leading-relaxed">
              This epic space journey begins with 12,000 exciting, unique, and valuable mooning
              monkeys being sent to the moon and beyond. They will evolve to survive, reducing
              their population to only 500 elite beings that are infinitely more powerful and
              valuable.
            </p>
            <div className="mt-6 grid grid-cols-3 gap-4">
              {[
                { num: '12K', label: 'Genesis Supply' },
                { num: '239', label: 'Unique Traits' },
                { num: '500', label: 'Elite Yetis' },
              ].map((s) => (
                <GlassCard key={s.label} className="text-center !p-4">
                  <div className="font-display text-xl font-bold text-accent">{s.num}</div>
                  <div className="text-xs text-white/50">{s.label}</div>
                </GlassCard>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <div className="grid grid-cols-2 gap-3">
              {assets.nfts.slice(0, 4).map((img, i) => (
                <motion.div
                  key={img}
                  whileHover={{ scale: 1.05, zIndex: 10 }}
                  className="glow-border overflow-hidden rounded-xl"
                >
                  <LazyImage src={img} alt={`Mooning Monkey #${i + 1}`} className="w-full object-cover" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
}
