import { AnimatePresence, motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { Calculator, ChevronDown, Menu, ShoppingCart, X } from 'lucide-react';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../../data/assets';
import { learnMoreMenu, navStandaloneLinks, type NavLink } from '../../data/content';
import { InternalLink } from '../ui/InternalLink';

function NavHref({
  href,
  external,
  className,
  title,
  onClick,
  children,
}: {
  href: string;
  external?: boolean;
  className?: string;
  title?: string;
  onClick?: () => void;
  children: ReactNode;
}) {
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        title={title}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }
  if (href.startsWith('/')) {
    return (
      <InternalLink href={href} className={className} title={title} onClick={onClick}>
        {children}
      </InternalLink>
    );
  }
  return (
    <a href={href} className={className} title={title} onClick={onClick}>
      {children}
    </a>
  );
}

/** Lumia.org-style: text swaps to icon on hover */
function NavLumiaSwap({
  label,
  icon: Icon,
  className = '',
  children,
}: {
  label: string;
  icon: LucideIcon;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <span className={`nav-link-lumia-swap ${className}`}>
      <span className="nav-link-label">{label}</span>
      <span className="nav-link-icon-wrap" aria-hidden>
        <Icon className="h-[18px] w-[18px] text-white" strokeWidth={1.5} />
      </span>
      {children}
    </span>
  );
}

function NavDropdown({
  label,
  icon,
  items,
}: {
  label: string;
  icon: LucideIcon;
  items: NavLink[];
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, [open]);

  return (
    <div
      ref={ref}
      className="group relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 px-1 py-2"
        aria-expanded={open}
        aria-haspopup="true"
      >
        <NavLumiaSwap label={label} icon={icon} />
        <ChevronDown
          className={`h-3 w-3 shrink-0 text-white/50 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          strokeWidth={2}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.15 }}
            className="absolute left-1/2 top-full z-50 min-w-[10rem] -translate-x-1/2 pt-2"
          >
            <div className="overflow-hidden rounded-md border border-white/[0.08] bg-black/95 py-1 shadow-lg backdrop-blur-md">
              {items.map((link) => (
                <NavHref
                  key={link.href}
                  href={link.href}
                  external={link.external}
                  onClick={() => setOpen(false)}
                  className="nav-dropdown-item block"
                  title={link.label}
                >
                  <span className="nav-link-label">{link.label}</span>
                  <span className="nav-link-icon-wrap" aria-hidden>
                    <link.icon className="h-[17px] w-[17px] text-white" strokeWidth={1.5} />
                  </span>
                </NavHref>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MobileNavGroup({
  label,
  items,
  onNavigate,
}: {
  label: string;
  items: NavLink[];
  onNavigate: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-white/[0.06] last:border-0">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="nav-link-lumia flex w-full items-center justify-between py-3"
        aria-expanded={open}
      >
        {label}
        <ChevronDown
          className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`}
          strokeWidth={1.5}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden pl-2"
          >
            {items.map((link) => (
              <NavHref
                key={link.href}
                href={link.href}
                external={link.external}
                onClick={onNavigate}
                className="flex items-center gap-3 py-2.5 font-nav text-[12px] uppercase tracking-[2px] text-white/55 hover:text-white"
              >
                <link.icon className="h-4 w-4 shrink-0 text-white/70" strokeWidth={1.5} />
                {link.label}
              </NavHref>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  const headerBg = scrolled
    ? 'border-white/[0.06] bg-black/30 backdrop-blur-[7px]'
    : 'border-transparent bg-black/10 backdrop-blur-[4px]';

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <motion.div
        initial={{ y: -12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className={`border-b transition-all duration-300 ${headerBg}`}
      >
        <div className="mx-auto flex h-14 max-w-7xl items-center gap-4 px-5 sm:px-8 lg:px-10">
          <Link to="/" className="group flex shrink-0 items-center gap-3">
            <img
              src={assets.logo}
              alt="Mooning Monkey"
              className="h-8 w-8 object-contain sm:h-9 sm:w-9"
            />
            <span className="hidden font-nav text-[13px] font-normal uppercase tracking-[2px] text-white/80 sm:block">
              Mooning Monkey
            </span>
          </Link>

          <nav
            className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 xl:flex"
            aria-label="Main"
          >
            {navStandaloneLinks.map((link) => (
              <NavHref key={link.href} href={link.href} className="px-1 py-2" title={link.label}>
                <NavLumiaSwap label={link.label} icon={link.icon} />
              </NavHref>
            ))}
            <NavDropdown
              label={learnMoreMenu.label}
              icon={learnMoreMenu.icon}
              items={learnMoreMenu.items}
            />
          </nav>

          <div className="ml-auto flex shrink-0 items-center gap-0.5 sm:gap-1">
            <NavHref href="/#calculator" className="hidden md:inline-block" title="Calculator">
              <NavLumiaSwap label="Calculator" icon={Calculator} className="min-w-[6.5rem]" />
            </NavHref>
            <NavHref href="/#buy" className="hidden md:inline-block" title="Buy Now">
              <NavLumiaSwap label="Buy Now" icon={ShoppingCart} className="min-w-[5rem]" />
            </NavHref>
            <button
              type="button"
              className="rounded p-2 text-white/70 transition-colors hover:text-white xl:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-expanded={mobileOpen}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
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
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-b border-white/[0.06] bg-black/95 backdrop-blur-md xl:hidden"
          >
            <nav className="mx-auto max-w-7xl px-5 py-2 sm:px-8" aria-label="Mobile">
              {navStandaloneLinks.map((link) => (
                <NavHref
                  key={link.href}
                  href={link.href}
                  onClick={closeMobile}
                  className="flex items-center gap-3 border-b border-white/[0.06] py-3 font-nav text-[12px] uppercase tracking-[2px] text-white/65 hover:text-white"
                >
                  <link.icon className="h-4 w-4 shrink-0 text-white/70" strokeWidth={1.5} />
                  {link.label}
                </NavHref>
              ))}
              <MobileNavGroup
                label={learnMoreMenu.label}
                items={learnMoreMenu.items}
                onNavigate={closeMobile}
              />
              <div className="flex flex-col gap-1 border-t border-white/[0.08] py-2">
                <NavHref
                  href="/#calculator"
                  onClick={closeMobile}
                  className="flex items-center gap-3 py-3 font-nav text-[12px] uppercase tracking-[2px] text-white/65"
                >
                  <Calculator className="h-4 w-4" strokeWidth={1.5} />
                  Calculator
                </NavHref>
                <NavHref
                  href="/#buy"
                  onClick={closeMobile}
                  className="flex items-center gap-3 py-3 font-nav text-[12px] uppercase tracking-[2px] text-white/90"
                >
                  <ShoppingCart className="h-4 w-4" strokeWidth={1.5} />
                  Buy Now
                </NavHref>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
