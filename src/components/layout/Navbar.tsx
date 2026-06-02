import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { assets, links } from '../../data/assets';
import { navLinks } from '../../data/content';
import { Button } from '../ui/Button';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
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
      <motion.div
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className={`border-b transition-all duration-300 ${
          scrolled
            ? 'border-white/[0.08] bg-void/95 shadow-glass backdrop-blur-xl'
            : 'border-transparent bg-void/70 backdrop-blur-md'
        }`}
      >
        <div className="mx-auto flex h-14 max-w-7xl items-center gap-2 px-4 sm:gap-3 sm:px-6 lg:px-8">
          <a href="#" className="group flex shrink-0 items-center gap-2">
            <img
              src={assets.logo}
              alt="Mooning Monkey"
              className="h-8 w-8 object-contain transition-transform group-hover:scale-105 sm:h-9 sm:w-9"
            />
            <span className="hidden font-display text-sm font-bold tracking-tight sm:block md:text-base">
              Mooning <span className="text-cyan-glow">Monkey</span>
            </span>
          </a>

          <nav
            className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 lg:flex"
            aria-label="Main"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="whitespace-nowrap rounded-md px-2 py-1.5 text-[12px] font-medium text-white/55 transition-colors hover:text-white xl:px-2.5 xl:text-[13px]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="ml-auto flex shrink-0 items-center gap-1.5 sm:gap-2">
            <a
              href={links.whitelist}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-full border border-cyan-glow/25 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-cyan-glow transition-colors hover:bg-cyan-glow/10 sm:inline-block sm:text-[11px]"
            >
              Whitelist
            </a>
            <div className="hidden items-center gap-1.5 md:flex">
              <Button href={links.docs} variant="ghost" size="sm">
                Docs
              </Button>
              <Button href="#buy" size="sm">
                Buy Now
              </Button>
            </div>
            <button
              type="button"
              className="rounded-lg p-2 text-white/80 transition-colors hover:bg-white/10 lg:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden border-b border-white/[0.06] bg-void/98 backdrop-blur-xl lg:hidden"
          >
            <nav className="mx-auto max-w-7xl space-y-1 px-4 py-3 sm:px-6" aria-label="Mobile">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-lg px-3 py-2.5 text-sm text-white/70 hover:bg-white/5 hover:text-white"
                >
                  {link.label}
                </a>
              ))}
              <div className="flex flex-wrap gap-2 border-t border-white/10 pt-3">
                <Button href={links.whitelist} variant="secondary" size="sm">
                  Whitelist
                </Button>
                <Button href={links.docs} variant="ghost" size="sm">
                  Docs
                </Button>
                <Button href="#buy" size="sm">
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
