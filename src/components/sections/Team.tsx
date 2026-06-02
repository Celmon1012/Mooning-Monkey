import { motion } from 'framer-motion';
import { useState } from 'react';
import { assets } from '../../data/assets';
import { teamMembers } from '../../data/content';
import { AnimatedSection } from '../ui/AnimatedSection';
import { GlassCard } from '../ui/GlassCard';
import { SectionHeading } from '../ui/SectionHeading';

export function Team() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <AnimatedSection id="team" mesh="purple" className="section-padding">
      <div className="absolute inset-0 bg-hero-glow" />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          label="Degen monkey launchers"
          title="Meet The Team"
          subtitle="Gamers, NFT enthusiasts, comic fans and crypto degens building the greatest space mission in Web3."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member, i) => (
            <motion.div
              key={member.role}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
            >
              <GlassCard className="h-full overflow-hidden !p-0">
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={assets.team[i]}
                    alt={member.role}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-void via-void/20 to-transparent" />
                </div>
                <div className="p-4">
                  <p className="font-sansation text-[10px] uppercase tracking-widest text-cyan-glow">
                    {member.role}
                  </p>
                  <h4 className="mt-1 font-display font-semibold text-white">{member.title}</h4>
                  <p
                    className={`mt-2 text-xs leading-relaxed text-white/45 transition-all ${
                      active === i ? 'line-clamp-none' : 'line-clamp-2'
                    }`}
                  >
                    {member.bio}
                  </p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  );
}
