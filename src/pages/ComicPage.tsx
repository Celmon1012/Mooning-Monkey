import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { AnimatedSection } from '../components/ui/AnimatedSection';
import { Floating3D } from '../components/ui/Floating3D';
import { InternalLink } from '../components/ui/InternalLink';
import { LazyImage } from '../components/ui/LazyImage';
import { Reveal3D } from '../components/ui/Reveal3D';
import { TiltCard } from '../components/ui/TiltCard';
import { useParallax } from '../components/ui/useParallax';
import { assets } from '../data/assets';
import {
  comicHero,
  comicParts,
  comicReleases,
  nftPurchase,
  storylineParagraphs,
} from '../data/comic';
import '../styles/comic.css';

type PartId = 1 | 2 | 3 | 4;

const PAGE_OPTIONS = ['1', '2', '3', '4', '5', '6', '7'] as const;

function PartTabs({
  active,
  onChange,
}: {
  active: PartId;
  onChange: (id: PartId) => void;
}) {
  return (
    <div className="relative flex flex-wrap items-center justify-center gap-2 sm:gap-4">
      {comicParts.map((part) => (
        <button
          key={part.id}
          type="button"
          onClick={() => onChange(part.id as PartId)}
          className={`comic-tab relative ${active === part.id ? 'comic-tab--active' : ''}`}
        >
          {active === part.id && (
            <motion.span
              layoutId="comic-tab-indicator"
              className="absolute inset-0 rounded-lg bg-cyan-glow/10"
              transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            />
          )}
          <span className="relative z-[1]">{part.label}</span>
        </button>
      ))}
    </div>
  );
}

function CountdownTimer() {
  const [now, setNow] = useState(() => Date.now());
  const target = new Date('2022-01-20T19:00:00Z').getTime();

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const diff = Math.max(0, target - now);
  const days = Math.floor(diff / 86_400_000);
  const hours = Math.floor((diff % 86_400_000) / 3_600_000);
  const minutes = Math.floor((diff % 3_600_000) / 60_000);
  const seconds = Math.floor((diff % 60_000) / 1000);

  const cells = [
    { value: days, label: 'Day(s)' },
    { value: hours, label: 'Hour(s)' },
    { value: minutes, label: 'Minute(s)' },
    { value: seconds, label: 'Second(s)' },
  ];

  return (
    <div className="flex w-full max-w-xl items-center justify-between gap-2 px-2">
      {cells.map((cell, i) => (
        <div key={cell.label} className="flex items-center gap-2">
          <div className="comic-countdown-cell">
            <AnimatePresence mode="popLayout">
              <motion.span
                key={cell.value}
                initial={{ opacity: 0, y: -12, scale: 0.85 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12, scale: 0.85 }}
                transition={{ duration: 0.25 }}
                className="comic-countdown-digit font-display text-3xl font-bold tabular-nums text-white sm:text-4xl lg:text-5xl"
              >
                {cell.value}
              </motion.span>
            </AnimatePresence>
            <span className="text-xs font-normal text-white/70 sm:text-sm">{cell.label}</span>
          </div>
          {i < cells.length - 1 && (
            <motion.span
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1.2, repeat: Infinity }}
              className="mb-4 font-display text-3xl font-bold text-white/60 sm:text-4xl"
            >
              :
            </motion.span>
          )}
        </div>
      ))}
    </div>
  );
}

function PageSelector({
  part,
  page,
  onPageChange,
}: {
  part: PartId;
  page: string;
  onPageChange: (page: string) => void;
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
    <div className="comic-glass-panel mx-auto w-full max-w-3xl px-6 py-5 sm:px-8">
      <p className="text-center font-display text-xl font-semibold text-white sm:text-2xl lg:text-3xl">
        Select Page To Buy: Page{' '}
        <span ref={ref} className="relative inline-block">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="comic-page-dropdown inline-flex items-center gap-2 rounded-lg px-4 py-1 font-semibold text-white"
          >
            {page}
            <ChevronDown
              className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`}
              strokeWidth={2}
            />
          </button>
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                className="absolute left-0 top-full z-20 mt-1 min-w-[3rem] overflow-hidden rounded-lg border border-white/10 bg-black/95 shadow-lg"
              >
                {PAGE_OPTIONS.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      onPageChange(option);
                      setOpen(false);
                    }}
                    className={`block w-full px-4 py-2 text-left text-sm transition-colors hover:bg-white/10 ${
                      option === page ? 'bg-[#f832ec]/30 text-white' : 'text-white/80'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </span>{' '}
        of Part {part}
      </p>
    </div>
  );
}

function PurchasePanel() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40, rotateY: -8 }}
      whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="comic-price-box flex w-full max-w-md flex-col gap-4 px-6 py-6 sm:px-8"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <p className="font-display text-xl font-semibold leading-tight text-[#f832ec] sm:text-2xl">
        MAKE SURE TO HAVE SOME SOL TO PAY TX FEES
      </p>
      <p className="text-base text-white/90 sm:text-lg">
        Remember that you can purchase only 1 page per wallet
      </p>

      <div className="flex items-center gap-4">
        <LazyImage
          src={assets.heroMonkey}
          alt="Mooning Monkey"
          className="h-16 w-16 shrink-0 rounded-lg object-contain sm:h-20 sm:w-20"
        />
        <div>
          <p className="text-sm text-white/60">Price per Page</p>
          <p className="font-display text-lg font-semibold text-white">
            <span className="text-[#f832ec]">{nftPurchase.pricePerPage}</span> TAK each
          </p>
          <p className="text-xs text-white/40">x amount remaining</p>
        </div>
      </div>

      <div className="relative">
        <input
          type="text"
          readOnly
          value={`${nftPurchase.pricePerPage} TAK`}
          className="w-full rounded-lg border border-white/10 bg-black/40 px-4 py-3 text-white outline-none"
        />
        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-white/40">
          {nftPurchase.priceMax}
        </span>
      </div>

      <div className="flex items-center justify-between border-t border-white/10 pt-4">
        <span className="font-medium text-white">Total</span>
        <span className="font-display text-lg font-semibold">
          <span className="text-[#f832ec]">{nftPurchase.total}</span>
          <span className="text-white">TAK</span>
        </span>
      </div>

      <motion.button
        type="button"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="hero-btn-primary w-full rounded-xl py-3 text-sm font-semibold text-void"
      >
        CONNECT WALLET
      </motion.button>
    </motion.div>
  );
}

function StorylineModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-black/60 px-4 py-24 sm:px-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="comic-story-modal relative w-full max-w-3xl rounded-lg"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-labelledby="storyline-title"
            aria-modal="true"
          >
            <h2
              id="storyline-title"
              className="gradient-text px-6 py-7 text-center font-brand text-2xl sm:text-3xl"
            >
              The Storyline
            </h2>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.08 } },
              }}
              className="space-y-5 px-6 pb-8 text-sm leading-relaxed text-white/75 sm:px-10 sm:text-base"
            >
              {storylineParagraphs.map((paragraph) => (
                <motion.p
                  key={paragraph.slice(0, 40)}
                  variants={{
                    hidden: { opacity: 0, y: 14 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.4 }}
                >
                  {paragraph}
                </motion.p>
              ))}
            </motion.div>
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full p-2 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Close storyline"
            >
              <X size={22} strokeWidth={1.5} />
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function UnavailablePart({ ctaHref = '/calculator' }: { ctaHref?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.35 }}
      className="comic-glass-panel mx-auto flex w-full max-w-2xl flex-col items-center gap-6 px-8 py-12 text-center"
    >
      <p className="text-lg text-white/80">{nftPurchase.unavailableText}</p>
      <InternalLink
        href={ctaHref}
        className="hero-btn-primary rounded-full px-8 py-3 text-sm font-semibold text-void"
      >
        PROFIT CALCULATOR
      </InternalLink>
    </motion.div>
  );
}

export function ComicPage() {
  const [storylineOpen, setStorylineOpen] = useState(false);
  const [nftPart, setNftPart] = useState<PartId>(1);
  const [releasePart, setReleasePart] = useState<PartId>(1);
  const [selectedPage, setSelectedPage] = useState('1');
  const heroRef = useRef<HTMLElement>(null);
  const bgY = useParallax(heroRef, ['-8%', '8%']);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative overflow-hidden bg-void">
      <StorylineModal open={storylineOpen} onClose={() => setStorylineOpen(false)} />

      {/* Hero */}
      <section
        ref={heroRef}
        className="relative overflow-hidden pb-16 pt-10 sm:pb-24 sm:pt-14"
      >
        <motion.div
          className="pointer-events-none absolute inset-0 scale-110 bg-cover bg-center opacity-[0.18]"
          style={{ backgroundImage: `url(${assets.comicBg})`, y: bgY }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-gradient-to-b from-void/90 via-void/70 to-void" aria-hidden />

        <div className="relative z-10 mx-auto max-w-5xl px-4 text-center sm:px-6">
          <Reveal3D immediate>
            {comicHero.title.map((line, i) => (
              <motion.h1
                key={line}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="font-brand text-[clamp(2rem,8vw,5.25rem)] font-medium leading-[1.05] gradient-text"
              >
                {line}
              </motion.h1>
            ))}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mx-auto mt-8 max-w-3xl font-body text-lg leading-relaxed text-white/85 sm:text-2xl sm:leading-[1.6]"
            >
              {comicHero.subtitle}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mx-auto mt-4 max-w-3xl font-body text-base text-white/70 sm:text-xl"
            >
              {comicHero.tagline}
            </motion.p>
          </Reveal3D>
        </div>
      </section>

      {/* Storyline + parts */}
      <section
        className="relative overflow-hidden py-16 sm:py-24"
        style={{ backgroundImage: `url(${assets.comic.storyBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-void/75" aria-hidden />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
          <Reveal3D className="text-center">
            <h2 className="font-brand text-3xl font-medium gradient-text sm:text-4xl">THE STORYLINE</h2>
            <motion.button
              type="button"
              onClick={() => setStorylineOpen(true)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="comic-btn-glow mt-6 rounded-2xl bg-gradient-to-b from-[#fa4cf0] to-[#5d15e3] px-10 py-3 font-brand text-lg uppercase text-white sm:text-2xl"
            >
              READ STORYLINE
            </motion.button>
          </Reveal3D>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {comicParts.map((part, index) => (
              <Reveal3D key={part.id} delay={index * 0.1} direction={index % 2 === 0 ? 'left' : 'right'}>
                <TiltCard intensity={10}>
                  <Floating3D floatIntensity={8} tiltIntensity={0}>
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      className="comic-part-card group relative overflow-hidden rounded-xl"
                    >
                      <LazyImage
                        src={assets.comic.parts[index]}
                        alt={part.title}
                        className="image_style w-full object-cover"
                      />
                      <div className="absolute inset-x-0 bottom-0 flex justify-center bg-black/50 px-4 py-3">
                        <span className="text-center font-display text-sm font-bold text-white sm:text-base lg:text-lg">
                          {part.title}
                        </span>
                      </div>
                    </motion.div>
                  </Floating3D>
                </TiltCard>
              </Reveal3D>
            ))}
          </div>
        </div>
      </section>

      {/* NFT purchase */}
      <AnimatedSection
        mesh="purple"
        className="section-padding relative overflow-hidden"
        style={{ backgroundImage: `url(${assets.comic.nftBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="absolute inset-0 bg-void/80" aria-hidden />
        <div className="relative z-10 mx-auto max-w-6xl">
          <Reveal3D className="text-center">
            <h2 className="font-brand text-3xl font-medium gradient-text sm:text-4xl">
              {nftPurchase.heading}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/85">{nftPurchase.description}</p>
            <div className="mt-8">
              <PartTabs active={nftPart} onChange={setNftPart} />
            </div>
          </Reveal3D>

          <AnimatePresence mode="wait">
            {nftPart === 1 ? (
              <motion.div
                key="nft-part-1"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4 }}
                className="mt-12 space-y-10"
              >
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="mx-auto max-w-xl text-center font-display text-xl font-medium text-[#f832ec] sm:text-2xl lg:text-3xl"
                >
                  {nftPurchase.requirement}
                </motion.p>

                <PageSelector part={nftPart} page={selectedPage} onPageChange={setSelectedPage} />

                <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
                  <Reveal3D direction="left" className="flex w-full flex-col items-center gap-6 lg:w-1/2">
                    <h3 className="max-w-md text-center font-brand text-4xl font-bold leading-tight gradient-text-alt sm:text-5xl lg:text-6xl">
                      {nftPurchase.helmetHeading}
                    </h3>
                    <p className="max-w-sm text-center font-display text-2xl font-semibold text-[#f832ec] sm:text-3xl lg:text-4xl">
                      {nftPurchase.helmetSubheading}
                    </p>
                    <CountdownTimer />
                    <p className="max-w-md text-center text-[#f832ec]">
                      {nftPurchase.walletNote}
                      <br />
                      <span className="font-semibold">{nftPurchase.tokenNote}</span>
                    </p>
                  </Reveal3D>
                  <div className="flex w-full justify-center lg:w-1/2 lg:justify-end">
                    <PurchasePanel />
                  </div>
                </div>

                <p className="mx-auto max-w-2xl text-center text-[#f832ec]">{nftPurchase.footerNote}</p>
              </motion.div>
            ) : (
              <UnavailablePart key={`nft-part-${nftPart}`} />
            )}
          </AnimatePresence>
        </div>
      </AnimatedSection>

      {/* Latest releases */}
      <AnimatedSection mesh="cyan" className="section-padding">
        <div className="mx-auto max-w-5xl text-center">
          <Reveal3D>
            <h2 className="font-brand text-3xl font-medium gradient-text sm:text-4xl">
              {comicReleases.heading}
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-lg text-white/85">
              <span className="text-[#f832ec]">{comicReleases.comingSoonPrefix}</span>{' '}
              {comicReleases.description}
            </p>
          </Reveal3D>
          <div className="mt-8">
            <PartTabs active={releasePart} onChange={setReleasePart} />
          </div>

          <div className="mt-10">
            <AnimatePresence mode="wait">
              {releasePart === 1 ? (
                <motion.div
                  key="release-part-1"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35 }}
                  className="comic-release-viewer comic-glass-panel flex items-center justify-center rounded-2xl p-8"
                >
                  <motion.p
                    animate={{ opacity: [0.4, 0.8, 0.4] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="max-w-md text-center text-white/50"
                  >
                    Comic pages will appear here — flip through each release like a real book.
                  </motion.p>
                </motion.div>
              ) : (
                <UnavailablePart key={`release-part-${releasePart}`} />
              )}
            </AnimatePresence>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
