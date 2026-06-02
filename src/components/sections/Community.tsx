import { motion } from 'framer-motion';
import { Check, MessageCircle, Send, Share2, Users, Video } from 'lucide-react';
import { assets, links } from '../../data/assets';
import { faqs } from '../../data/content';
import { AnimatedSection } from '../ui/AnimatedSection';
import { Button } from '../ui/Button';
import { FaqAccordion } from '../ui/FaqAccordion';
import { SectionHeading } from '../ui/SectionHeading';

const socialLinks = [
  {
    name: 'Discord',
    href: links.discord,
    icon: MessageCircle,
    color: 'from-indigo-500/30 to-indigo-600/10',
    ring: 'ring-indigo-400/20',
  },
  {
    name: 'Telegram',
    href: links.telegram,
    icon: Send,
    color: 'from-sky-500/30 to-sky-600/10',
    ring: 'ring-sky-400/20',
  },
  {
    name: 'Twitter',
    href: links.twitter,
    icon: Share2,
    color: 'from-blue-500/30 to-blue-600/10',
    ring: 'ring-blue-400/20',
  },
  {
    name: 'YouTube',
    href: links.youtube,
    icon: Video,
    color: 'from-red-500/30 to-red-600/10',
    ring: 'ring-red-400/20',
  },
];

const communityPerks = [
  'Daily alpha & mint updates',
  'Holder-only channels & events',
  'Co-own game profits together',
  'Passive $TAK rewards',
];

const communityStats = [
  { value: '12,000', label: 'Unique NFTs' },
  { value: '239', label: 'Distinct traits' },
  { value: 'Solana', label: 'Blockchain' },
  { value: '$TAK', label: 'Reward token' },
];

const whoItsFor = ['Gamers', 'NFT Collectors', 'Comic Fans', 'Crypto Degens'];

export function Community() {
  return (
    <AnimatedSection id="community" mesh="mixed" className="section-padding">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-5"
        style={{ backgroundImage: `url(${assets.sec2Bg})` }}
      />

      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          label="Community"
          title="Join The Mission"
          subtitle="Connect with gamers, NFT collectors, and crypto degens — build friendships while earning passive rewards."
          className="mb-8 lg:mb-10"
        />

        {/* Social strip */}
        <div className="mb-8 grid grid-cols-2 gap-3 lg:mb-10 lg:grid-cols-4 lg:gap-4">
          {socialLinks.map((social, i) => (
            <motion.a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -3 }}
              className={`group flex items-center gap-3 rounded-xl border border-white/[0.08] bg-white/[0.03] p-3 backdrop-blur-md transition-all hover:border-white/15 hover:bg-white/[0.06] sm:p-4 ${social.ring} ring-1 ring-inset`}
            >
              <div
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${social.color}`}
              >
                <social.icon className="h-4 w-4 text-white" />
              </div>
              <span className="font-display text-sm font-semibold text-white/90 group-hover:text-white">
                {social.name}
              </span>
            </motion.a>
          ))}
        </div>

        {/* Equal-height twin panels */}
        <div className="grid gap-5 lg:grid-cols-2 lg:gap-6 lg:items-stretch">
          {/* Built For — full height */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.1] bg-gradient-to-br from-white/[0.06] via-white/[0.02] to-void/80 p-6 shadow-glass backdrop-blur-xl sm:p-8"
          >
            <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-purple-glow/15 blur-[80px]" />
            <div className="pointer-events-none absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-cyan-glow/10 blur-[70px]" />

            <div className="relative flex flex-1 flex-col">
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-glow/25 bg-cyan-glow/10">
                <Users className="h-6 w-6 text-cyan-glow" />
              </div>

              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-cyan-glow/80">
                Our community
              </p>
              <h3 className="mt-2 font-display text-2xl font-bold leading-tight sm:text-3xl">
                Built For{' '}
                <span className="gradient-text">Gamers & Degens</span>
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-white/55 sm:text-[15px]">
                The Mooning Monkeys NFT Game is a celebration for gaming — join the NFT
                community, make connections, and potentially earn along the way. We’re gamers,
                artists, and degens building a crew where passions meet passive rewards.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-white/45">
                Whether you collect for rarity, play for the leaderboard, or follow every comic
                chapter — there’s a channel, event, and upside waiting for you on mission control.
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {whoItsFor.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white/55"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-6 grid grid-cols-2 gap-2.5 sm:gap-3">
                {communityStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-2.5 sm:px-4 sm:py-3"
                  >
                    <div className="font-display text-lg font-bold text-cyan-glow sm:text-xl">
                      {stat.value}
                    </div>
                    <div className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-white/40 sm:text-[11px]">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              <ul className="mt-6 space-y-2.5">
                {communityPerks.map((perk) => (
                  <li key={perk} className="flex items-center gap-3 text-sm text-white/65">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-glow/15">
                      <Check size={12} className="text-cyan-glow" strokeWidth={2.5} />
                    </span>
                    {perk}
                  </li>
                ))}
              </ul>

              <div className="mt-auto flex flex-wrap gap-3 pt-6">
                <Button href={links.discord} size="md">
                  Join Discord
                </Button>
                <Button href={links.telegram} variant="secondary" size="md">
                  Join Telegram
                </Button>
              </div>
            </div>
          </motion.div>

          {/* FAQ — matched height panel */}
          <motion.div
            id="faq"
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex h-full flex-col rounded-2xl border border-white/[0.1] bg-gradient-to-br from-white/[0.05] via-void/50 to-white/[0.02] p-6 shadow-glass backdrop-blur-xl sm:p-8"
          >
            <div className="mb-4 shrink-0 border-b border-white/[0.08] pb-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-purple-glow/90">
                FAQ
              </p>
              <h3 className="mt-1 font-display text-2xl font-bold leading-tight sm:text-3xl">
                Questions?{' '}
                <span className="text-cyan-glow">We Have Answers</span>
              </h3>
              <p className="mt-2 text-sm text-white/45">
                Tap any question to reveal the answer.
              </p>
            </div>

            <div className="flex min-h-[280px] flex-1 flex-col sm:min-h-[300px]">
              <FaqAccordion items={faqs} className="h-full min-h-[240px]" />
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
}
