import { AnimatePresence, motion } from 'framer-motion';
import { Menu, Sparkles, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { assets, links } from '../../data/assets';
import { navLinks } from '../../data/content';
import { Button } from '../ui/Button';

function AnnouncementStrip() {
  return (
    <div className="border-b border-white/[0.06] bg-void/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2 sm:px-6 lg:px-8">
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <Sparkles className="h-3.5 w-3.5 shrink-0 text-cyan-glow" aria-hidden />
          <p className="truncate text-[11px] text-white/55 sm:text-xs sm:whitespace-normal sm:overflow-visible">
            Join the official whitelist lottery for early access to the mint.
          </p>
        </div>
        <a
          href={links.whitelist}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 rounded-full border border-cyan-glow/30 bg-cyan-glow/10 px-3.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-cyan-glow transition-colors hover:bg-cyan-glow/20 sm:px-4 sm:py-1.5 sm:text-xs"
        >
          Whitelist
        </a>
      </div>
    </div>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <AnnouncementStrip />

      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={`transition-all duration-500 ${
          scrolled ? 'glass-strong shadow-glass' : 'bg-void/40 backdrop-blur-sm'
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:h-[4.5rem] sm:px-6 lg:px-8">
          {/* Logo */}
          <a href="#" className="group flex shrink-0 items-center gap-2.5 sm:gap-3">
            <img
              src={assets.logo}
              alt="Mooning Monkey"
              className="h-9 w-9 object-contain transition-transform group-hover:scale-105 sm:h-10 sm:w-10"
            />
            <span className="hidden font-display text-base font-bold tracking-tight sm:block lg:text-lg">
              Mooning <span className="text-cyan-glow">Monkey</span>
            </span>
          </a>

          {/* Desktop nav — xl+ only so links never crush the CTAs */}
          <nav
            className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 xl:flex"
            aria-label="Main"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="whitespace-nowrap rounded-lg px-2.5 py-2 text-[13px] text-white/60 transition-colors hover:bg-white/5 hover:text-white 2xl:px-3.5 2xl:text-sm"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop actions */}
          <div className="hidden shrink-0 items-center gap-2 xl:flex">
            <Button href={links.docs} variant="ghost" size="sm">
              Docs
            </Button>
            <Button href="#buy" size="sm">
              Buy Now
            </Button>
          </div>

          {/* Mobile / tablet menu toggle */}
          <button
            type="button"
            className="ml-auto rounded-lg p-2 text-white/80 transition-colors hover:bg-white/10 xl:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-white/[0.06] bg-void/95 backdrop-blur-xl xl:hidden"
          >
            <nav className="mx-auto max-w-7xl px-4 py-4 sm:px-6" aria-label="Mobile">
              <div className="grid gap-1 sm:grid-cols-2">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-lg px-4 py-3 text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-white"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
              <div className="mt-4 flex flex-col gap-2 border-t border-white/10 pt-4 sm:flex-row">
                <Button
                  href={links.whitelist}
                  variant="secondary"
                  size="md"
                  className="flex-1 justify-center"
                >
                  Whitelist
                </Button>
                <Button href={links.docs} variant="ghost" size="md" className="flex-1 justify-center">
                  Docs
                </Button>
                <Button href="#buy" size="md" className="flex-1 justify-center">
                  Buy Now
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
