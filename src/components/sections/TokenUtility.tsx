import { motion } from 'framer-motion';
import { assets, links } from '../../data/assets';
import { tokenFeatures } from '../../data/content';
import { AnimatedSection } from '../ui/AnimatedSection';
import { Button } from '../ui/Button';
import { GlassCard } from '../ui/GlassCard';
import { Reveal3D } from '../ui/Reveal3D';
import { SectionHeading } from '../ui/SectionHeading';
import { VideoBackground } from '../ui/VideoBackground';

export function TokenUtility() {
  return (
    <AnimatedSection id="token" mesh="cyan" className="section-padding overflow-hidden">
      <VideoBackground
        src={assets.video}
        poster={assets.tokenBack}
        opacity={0.1}
        parallax
        overlayClassName="bg-gradient-to-r from-void/95 via-void/88 to-void/95"
      />
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10 mix-blend-overlay"
        style={{ backgroundImage: `url(${assets.tokenBack})` }}
      />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          label="Token Utility"
          title="The $TAK Token Ecosystem"
          subtitle="The Mooning Monkey Mission goes far beyond the simple NFT collectible sphere. We are building a galactical ecosystem that will handsomely reward ALL participants."
        />

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
          {/* Left - Token info */}
          <Reveal3D direction="left">
            <GlassCard glow className="relative overflow-hidden">
              <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full bg-purple-glow/20 blur-3xl" />
              <div className="relative">
                <span className="font-sansation text-xs uppercase tracking-widest text-cyan-glow">
                  Takion Token
                </span>
                <h3 className="mt-2 font-display text-4xl font-bold">
                  <span className="gradient-text">$TAK</span>
                </h3>
                <p className="mt-4 text-white/60 leading-relaxed">
                  By simply holding any of the evolution NFTs, you'll receive daily Takion Tokens
                  ($TAK). You'll be able to yield, stake, evolve, earn extra rewards and much
                  more — all of which will earn you money, passively, without requiring any extra
                  effort.
                </p>

                <div className="mt-8 grid grid-cols-2 gap-4">
                  {[
                    { label: 'Daily Rewards', value: 'Auto' },
                    { label: 'Staking APY', value: 'High' },
                    { label: 'Game Integration', value: 'Live' },
                    { label: 'Evolution Bonus', value: '4x' },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
                    >
                      <div className="font-display text-lg font-bold text-cyan-glow">
                        {item.value}
                      </div>
                      <div className="text-xs text-white/40">{item.label}</div>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <Button href={links.docs}>Token Utility Overview</Button>
                </div>
              </div>
            </GlassCard>

            {/* Comic book teaser */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-6 flex items-center gap-4 rounded-2xl glass p-4"
            >
              <img
                src={assets.comicBg}
                alt="Comic Book"
                className="h-20 w-20 rounded-lg object-cover"
              />
              <div>
                <h4 className="font-display font-semibold">Epic Sci-Fi Comic Series</h4>
                <p className="text-sm text-white/50">
                  4 chapters × 14 pages. Own a full comic to unlock exclusive future privileges.
                </p>
              </div>
            </motion.div>
          </Reveal3D>

          {/* Right - Feature grid */}
          <div className="grid gap-4 sm:grid-cols-2">
            {tokenFeatures.map((feature, i) => (
              <Reveal3D key={feature.title} delay={i * 0.08}>
                <GlassCard className="h-full">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-glow/20 to-purple-glow/20">
                    <feature.icon className="h-5 w-5 text-cyan-glow" />
                  </div>
                  <h4 className="font-display font-semibold">{feature.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-white/50">
                    {feature.description}
                  </p>
                </GlassCard>
              </Reveal3D>
            ))}
          </div>
        </div>

        {/* Mystery box */}
        <Reveal3D className="mt-10 flex flex-col items-center gap-8 rounded-3xl glass-strong p-8 sm:flex-row sm:p-12">
          <motion.img
            src={assets.questionBox}
            alt="Lucky Mystery Box"
            className="h-32 w-32 object-contain sm:h-40 sm:w-40"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <div className="flex-1 text-center sm:text-left">
            <h3 className="font-display text-2xl font-bold sm:text-3xl">
              <span className="gradient-text-alt">Lucky Mystery Box</span>
            </h3>
            <p className="mt-3 text-white/60">
              Insane surprises will be announced along with the pre and post roadmap launch.
              Airdrops, winning prizes, and massive project developments — all you need is to
              own a Mooning Monkey.
            </p>
          </div>
        </Reveal3D>
      </div>
    </AnimatedSection>
  );
}
