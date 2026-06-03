import { motion } from 'framer-motion';
import { Check, Circle } from 'lucide-react';
import { assets } from '../../data/assets';
import { postLaunchTimeline, preLaunchRoadmap } from '../../data/content';
import { AnimatedSection } from '../ui/AnimatedSection';
import { LazyImage } from '../ui/LazyImage';
import { SectionHeading } from '../ui/SectionHeading';

const statusColors = {
  completed: 'bg-cyan-glow',
  active: 'bg-purple-glow animate-pulse',
  upcoming: 'bg-white/20',
};

export function Roadmap() {
  return (
    <AnimatedSection id="roadmap" mesh="cyan" className="section-padding">
      <div className="absolute inset-0 bg-gradient-to-b from-cosmic/30 via-void to-void" />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          label="Roadmap"
          title="Join Us On The Journey To Space"
          subtitle="Everything you need to know about the epic space journey your Mooning Monkeys are about to go on, before they take off."
        />

        <div className="grid gap-10 lg:grid-cols-2 lg:items-stretch">
          {/* Pre-Launch — stretches to match post-launch column height */}
          <div className="flex flex-col">
            <h3 className="mb-8 shrink-0 font-display text-xl font-medium text-accent">
              Pre-Launch Milestones
            </h3>
            <div className="relative flex flex-col lg:min-h-0 lg:flex-1">
              <div className="absolute bottom-0 left-[19px] top-0 hidden w-px bg-white/10 lg:block" />

              <div className="flex flex-col gap-4 lg:h-full lg:flex-1 lg:justify-between lg:gap-3">
                {preLaunchRoadmap.map((phase, i) => (
                  <motion.div
                    key={phase.percentage}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="relative flex gap-5 pl-2 lg:min-h-0 lg:flex-1"
                  >
                    <div className="relative z-10 flex shrink-0 items-center">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                          phase.status === 'completed'
                            ? 'border-accent/50 bg-accent/10'
                            : phase.status === 'active'
                              ? 'border-white/30 bg-white/5'
                              : 'border-white/20 bg-white/5'
                        }`}
                      >
                        {phase.status === 'completed' ? (
                          <Check size={16} className="text-accent" />
                        ) : (
                          <Circle size={12} className={statusColors[phase.status]} fill="currentColor" />
                        )}
                      </div>
                    </div>

                    <div className="panel flex flex-1 flex-col justify-center p-4">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-body text-sm font-bold text-accent">
                          {phase.percentage}%
                        </span>
                        <span
                          className={`shrink-0 rounded-md px-2 py-0.5 text-[10px] capitalize ${
                            phase.status === 'completed'
                              ? 'bg-accent/10 text-accent'
                              : phase.status === 'active'
                                ? 'bg-white/10 text-white/70'
                                : 'bg-white/5 text-white/40'
                          }`}
                        >
                          {phase.status}
                        </span>
                      </div>
                      <h4 className="mt-1 font-display font-medium">{phase.title}</h4>
                      <p className="mt-1 text-sm leading-relaxed text-white/50">
                        {phase.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Post-Launch Timeline — defines column height */}
          <div className="flex flex-col">
            <h3 className="mb-8 shrink-0 font-display text-xl font-medium text-white/80">
              Post-Launch Timeline
            </h3>
            <div className="flex flex-col gap-6 lg:h-full lg:flex-1">
              {postLaunchTimeline.map((item, i) => (
                <motion.div
                  key={item.quarter}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="panel flex flex-col overflow-hidden p-0 lg:flex-1"
                >
                  {assets.roadmap[i] && (
                    <div className="relative h-32 overflow-hidden">
                      <LazyImage
                        src={assets.roadmap[i]}
                        alt={item.title}
                        className="h-full w-full object-cover opacity-60"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-void to-transparent" />
                      <span className="absolute bottom-3 left-4 font-body text-xs text-accent">
                        {item.quarter}
                      </span>
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-5">
                    <h4 className="font-display text-lg font-medium">{item.title}</h4>
                    <ul className="mt-3 flex flex-1 flex-col justify-center space-y-2">
                      {item.items.map((entry) => (
                        <li key={entry} className="flex items-start gap-2 text-sm text-white/50">
                          <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-white/30" />
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
