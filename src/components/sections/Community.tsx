import { motion } from 'framer-motion';
import { MessageCircle, Send, Share2, Users, Video } from 'lucide-react';
import { assets, links } from '../../data/assets';
import { faqs } from '../../data/content';
import { AnimatedSection } from '../ui/AnimatedSection';
import { Button } from '../ui/Button';
import { GlassCard } from '../ui/GlassCard';
import { SectionHeading } from '../ui/SectionHeading';

const socialLinks = [
  {
    name: 'Discord',
    href: links.discord,
    icon: MessageCircle,
    color: 'from-indigo-500/20 to-indigo-600/10',
    description: 'Join 50K+ degens in our official Discord server',
  },
  {
    name: 'Telegram',
    href: links.telegram,
    icon: Send,
    color: 'from-sky-500/20 to-sky-600/10',
    description: 'Get real-time updates and alpha in our Telegram',
  },
  {
    name: 'Twitter',
    href: links.twitter,
    icon: Share2,
    color: 'from-blue-500/20 to-blue-600/10',
    description: 'Follow us for announcements and community highlights',
  },
  {
    name: 'YouTube',
    href: links.youtube,
    icon: Video,
    color: 'from-red-500/20 to-red-600/10',
    description: 'Watch trailers, gameplay, and behind-the-scenes',
  },
];

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
          subtitle="Connect with like-minded gamers, NFT enthusiasts, and crypto degens. Build friendships, connections, and relationships while passively earning rewards."
        />

        {/* Social cards */}
        <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {socialLinks.map((social, i) => (
            <motion.a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="group block"
            >
              <GlassCard className="h-full text-center">
                <div
                  className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${social.color} transition-transform group-hover:scale-110`}
                >
                  <social.icon className="h-7 w-7 text-white" />
                </div>
                <h4 className="font-display text-lg font-semibold">{social.name}</h4>
                <p className="mt-2 text-sm text-white/50">{social.description}</p>
              </GlassCard>
            </motion.a>
          ))}
        </div>

        {/* Community stats + FAQ */}
        <div className="grid gap-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <GlassCard glow>
              <Users className="mb-4 h-10 w-10 text-cyan-glow" />
              <h3 className="font-display text-2xl font-bold">
                Built For <span className="gradient-text">Gamers & Degens</span>
              </h3>
              <p className="mt-4 text-white/60 leading-relaxed">
                The Mooning Monkeys Project is made for gamers and NFT enthusiasts to join
                together and celebrate those two things. The creators are gamers, NFT
                enthusiasts, comic book fans and crypto degens who want to create a community
                where like-minded individuals can talk about their passions and passively earn
                rewards.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button href={links.discord} size="sm">
                  Join Discord
                </Button>
                <Button href={links.telegram} variant="secondary" size="sm">
                  Join Telegram
                </Button>
              </div>
            </GlassCard>
          </motion.div>

          <motion.div
            id="faq"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h3 className="font-display text-xl font-bold">Questions? We Have Answers</h3>
            {faqs.map((faq, i) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-xl p-5"
              >
                <h4 className="font-display font-semibold text-cyan-glow">{faq.question}</h4>
                <p className="mt-2 text-sm text-white/50">{faq.answer}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </AnimatedSection>
  );
}
