import { motion } from 'framer-motion';
import { Check, Circle } from 'lucide-react';
import { assets } from '../../data/assets';
import { postLaunchTimeline, preLaunchRoadmap } from '../../data/content';
import { AnimatedSection } from '../ui/AnimatedSection';
import { SectionHeading } from '../ui/SectionHeading';

const statusColors = {
  completed: 'bg-cyan-glow',
  active: 'bg-purple-glow animate-pulse',
  upcoming: 'bg-white/20',
};

export function Roadmap() {
  return (
    <AnimatedSection id="roadmap" className="section-padding relative">
      <div className="absolute inset-0 bg-gradient-to-b from-cosmic/30 via-void to-void" />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          label="Roadmap"
          title="Join Us On The Journey To Space"
          subtitle="Everything you need to know about the epic space journey your Mooning Monkeys are about to go on, before they take off."
        />

        <div className="grid gap-16 lg:grid-cols-2">
          {/* Pre-Launch Progress */}
          <div>
            <h3 className="mb-8 font-display text-xl font-bold text-cyan-glow">
              Pre-Launch Milestones
            </h3>
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute bottom-0 left-[19px] top-0 w-px bg-gradient-to-b from-cyan-glow/50 via-purple-glow/30 to-transparent" />

              <div className="space-y-6">
                {preLaunchRoadmap.map((phase, i) => (
                  <motion.div
                    key={phase.percentage}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="relative flex gap-5 pl-2"
                  >
                    {/* Node */}
                    <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                          phase.status === 'completed'
                            ? 'border-cyan-glow bg-cyan-glow/10'
                            : phase.status === 'active'
                              ? 'border-purple-glow bg-purple-glow/10'
                              : 'border-white/20 bg-white/5'
                        }`}
                      >
                        {phase.status === 'completed' ? (
                          <Check size={16} className="text-cyan-glow" />
                        ) : (
                          <Circle size={12} className={statusColors[phase.status]} fill="currentColor" />
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="glass flex-1 rounded-xl p-4">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-sm font-bold text-cyan-glow">
                          {phase.percentage}%
                        </span>
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] uppercase tracking-wider ${
                            phase.status === 'completed'
                              ? 'bg-cyan-glow/10 text-cyan-glow'
                              : phase.status === 'active'
                                ? 'bg-purple-glow/10 text-purple-glow'
                                : 'bg-white/5 text-white/40'
                          }`}
                        >
                          {phase.status}
                        </span>
                      </div>
                      <h4 className="mt-1 font-display font-semibold">{phase.title}</h4>
                      <p className="mt-1 text-sm text-white/50">{phase.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Post-Launch Timeline */}
          <div>
            <h3 className="mb-8 font-display text-xl font-bold text-purple-glow">
              Post-Launch Timeline
            </h3>
            <div className="space-y-6">
              {postLaunchTimeline.map((item, i) => (
                <motion.div
                  key={item.quarter}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass overflow-hidden rounded-2xl"
                >
                  {assets.roadmap[i] && (
                    <div className="relative h-32 overflow-hidden">
                      <img
                        src={assets.roadmap[i]}
                        alt={item.title}
                        className="h-full w-full object-cover opacity-60"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-void to-transparent" />
                      <span className="absolute bottom-3 left-4 font-mono text-xs text-cyan-glow">
                        {item.quarter}
                      </span>
                    </div>
                  )}
                  <div className="p-5">
                    <h4 className="font-display text-lg font-semibold">{item.title}</h4>
                    <ul className="mt-3 space-y-2">
                      {item.items.map((entry) => (
                        <li key={entry} className="flex items-start gap-2 text-sm text-white/50">
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-purple-glow" />
                          {entry}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
