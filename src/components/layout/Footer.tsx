import { assets, links } from '../../data/assets';
import { navLinks } from '../../data/content';

const footerLinks = [
  { label: 'Buy Now', href: '/#buy' },
  { label: 'Token', href: '/#token' },
  { label: 'Membership', href: '/#membership' },
  { label: 'Comic', href: '/#comic' },
  { label: 'Calculator', href: '/#calculator' },
  { label: 'Evolution Lab', href: '/Evaluation' },
  { label: 'Whitelist', href: links.whitelist },
  { label: 'One Pager', href: links.docs },
];

export function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-nebula/50">
      <div className="section-padding mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="mb-4 flex items-center gap-3">
              <img src={assets.logo} alt="Mooning Monkey" className="h-10 w-10" />
              <span className="font-display text-xl font-bold">Mooning Monkey</span>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-white/50">
              Save the Mooning Monkeys from imminent extinction. Earn astronomical rewards,
              exclusive membership privileges, and a lifetime source of passive income.
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-white/80">
              Navigation
            </h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-white/50 transition-colors hover:text-cyan-glow"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-display text-sm font-semibold uppercase tracking-wider text-white/80">
              Resources
            </h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="text-sm text-white/50 hover:text-cyan-glow"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a href={links.phantom} className="text-sm text-white/50 hover:text-cyan-glow">
                  Phantom Wallet
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-white/40">
            Copyright © {new Date().getFullYear()} Mooning Monkey. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <a href={links.discord} className="text-xs text-white/40 hover:text-cyan-glow">
              Discord
            </a>
            <a href={links.telegram} className="text-xs text-white/40 hover:text-cyan-glow">
              Telegram
            </a>
            <a href={links.twitter} className="text-xs text-white/40 hover:text-cyan-glow">
              Twitter
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
