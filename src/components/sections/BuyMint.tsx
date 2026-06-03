import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ExternalLink, Minus, PlayCircle, Plus, Wallet } from 'lucide-react';
import { useEffect, useState } from 'react';
import { assets, links } from '../../data/assets';
import { AnimatedSection } from '../ui/AnimatedSection';
import { PosterBackground } from '../ui/PosterBackground';

type MintTab = 'buy' | 'phantom';

const MAX_PER_WALLET = 12;
const PRICE_PLACEHOLDER = 'X';
const TAB_MIN_H = 'min-h-[340px] sm:min-h-[360px]';

const phantomSteps = [
  {
    n: 1,
    text: 'Visit',
    link: { href: links.phantom, label: 'phantom.app' },
  },
  { n: 2, text: 'Add the extension to your browser.' },
  { n: 3, text: 'Create your wallet and save your recovery phrase.' },
  { n: 4, text: 'Fund with SOL, then switch to Buy to mint.' },
];

function useCountdown(target: Date) {
  const [parts, setParts] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, target.getTime() - Date.now());
      setParts({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  return parts;
}

const pad = (n: number) => String(n).padStart(2, '0');

function MintTabSwitcher({
  active,
  onChange,
}: {
  active: MintTab;
  onChange: (tab: MintTab) => void;
}) {
  const tabs: { id: MintTab; label: string }[] = [
    { id: 'buy', label: 'Buy Mooning Monkeys' },
    { id: 'phantom', label: 'Get Phantom Wallet' },
  ];

  return (
    <div className="mint-tab-track relative flex rounded-full p-1" role="tablist">
      {tabs.map((t) => (
        <button
          key={t.id}
          type="button"
          role="tab"
          aria-selected={active === t.id}
          onClick={() => onChange(t.id)}
          className={`relative z-10 flex-1 px-3 py-2.5 text-[10px] font-semibold uppercase tracking-[0.1em] transition-colors sm:px-5 sm:text-[11px] sm:tracking-[0.14em] ${
            active === t.id ? 'text-white' : 'text-white/40 hover:text-white/60'
          }`}
        >
          {active === t.id && (
            <motion.span
              layoutId="mint-tab-pill"
              className="mint-tab-active absolute inset-0 rounded-full"
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative">{t.label}</span>
        </button>
      ))}
    </div>
  );
}

function CountdownCompact({ d, h, m, s }: { d: number; h: number; m: number; s: number }) {
  const units = [
    { value: pad(d), label: 'D' },
    { value: pad(h), label: 'H' },
    { value: pad(m), label: 'M' },
    { value: pad(s), label: 'S' },
  ];

  return (
    <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
      {units.map((unit, i) => (
        <div key={unit.label} className="flex items-center gap-1.5 sm:gap-2">
          <div className="countdown-cell rounded-lg px-2.5 py-2 text-center sm:px-3">
            <div className="font-display text-lg font-semibold tabular-nums text-white sm:text-xl">
              {unit.value}
            </div>
            <div className="text-[8px] font-medium uppercase tracking-widest text-white/30">
              {unit.label}
            </div>
          </div>
          {i < units.length - 1 && (
            <span className="text-sm text-white/15">:</span>
          )}
        </div>
      ))}
    </div>
  );
}

export function BuyMint() {
  const [tab, setTab] = useState<MintTab>('buy');
  const [amount, setAmount] = useState(1);
  const countdown = useCountdown(new Date('2026-12-16T19:00:00Z'));
  const clamp = (n: number) => Math.min(MAX_PER_WALLET, Math.max(1, n));

  useEffect(() => {
    const hash = window.location.hash;
    if (hash === '#phantom') setTab('phantom');
    else if (hash === '#buy') setTab('buy');
  }, []);

  const handleTabChange = (next: MintTab) => {
    setTab(next);
    window.history.replaceState(null, '', next === 'phantom' ? '#phantom' : '#buy');
  };

  return (
    <AnimatedSection
      id="buy"
      className="relative overflow-hidden px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16"
    >
      <PosterBackground
        src={assets.sec3Bg}
        opacity={0.14}
        overlayClassName="bg-gradient-to-t from-void via-void/90 to-void"
      />
      <div className="hero-vignette absolute inset-0" />

      <div className="relative z-10 mx-auto max-w-4xl">
        <div className="mb-6 text-center sm:mb-8">
          <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-white/35">
            Mint access
          </p>
          <h2 className="mt-2 font-display text-2xl font-semibold text-white sm:text-3xl">
            Join the launch
          </h2>
        </div>

        <div className="mint-panel overflow-hidden rounded-3xl">
          <div className="border-b border-white/[0.06] px-4 py-4 sm:px-6">
            <MintTabSwitcher active={tab} onChange={handleTabChange} />
          </div>

          <div className={`relative p-4 sm:p-6 ${TAB_MIN_H}`}>
            <AnimatePresence mode="wait">
              {tab === 'buy' ? (
                <motion.div
                  key="buy"
                  role="tabpanel"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className={`flex h-full flex-col ${TAB_MIN_H}`}
                >
                  {/* Header row */}
                  <div className="flex flex-col gap-4 border-b border-white/[0.06] pb-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-white/35">
                        Public mint
                      </p>
                      <h3 className="mt-1 font-display text-xl font-semibold text-white sm:text-2xl">
                        Take off is imminent
                      </h3>
                      <p className="mt-1 text-xs text-white/40 sm:text-sm">
                        16 Dec · 7PM UTC · Price in SOL confirmed 12h prior
                      </p>
                    </div>
                    <CountdownCompact
                      d={countdown.d}
                      h={countdown.h}
                      m={countdown.m}
                      s={countdown.s}
                    />
                  </div>

                  {/* Equal-height columns */}
                  <div className="mt-5 grid flex-1 gap-4 sm:grid-cols-2 sm:gap-5">
                    <div className="flex flex-col justify-between rounded-2xl border border-white/[0.06] bg-black/25 p-4 sm:p-5">
                      <div className="flex items-center gap-4">
                        <img
                          src={assets.evolution.mooningMonkey}
                          alt="Mooning Monkey"
                          className="h-16 w-16 shrink-0 rounded-xl object-cover ring-1 ring-white/10 sm:h-[4.5rem] sm:w-[4.5rem]"
                        />
                        <div>
                          <p className="font-medium text-white">Mooning Monkey</p>
                          <p className="mt-0.5 text-sm text-white/45">
                            {PRICE_PLACEHOLDER} SOL <span className="text-white/30">/ NFT</span>
                          </p>
                          <span className="mt-2 inline-block rounded-md bg-white/[0.06] px-2 py-0.5 text-[9px] font-medium uppercase tracking-wider text-white/40">
                            12,000 left
                          </span>
                        </div>
                      </div>
                      <p className="mt-4 border-t border-white/[0.06] pt-4 text-xs leading-relaxed text-white/35">
                        Max <span className="text-white/55">12 per wallet</span> on mint day
                      </p>
                    </div>

                    <div className="flex flex-col justify-between rounded-2xl border border-white/[0.06] bg-black/25 p-4 sm:p-5">
                      <div>
                        <label className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/40">
                          Quantity
                        </label>
                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex items-center gap-0.5 rounded-lg border border-white/[0.08] bg-white/[0.03] p-0.5">
                            <button
                              type="button"
                              onClick={() => setAmount((a) => clamp(a - 1))}
                              className="flex h-9 w-9 items-center justify-center rounded-md text-white/60 hover:bg-white/10 hover:text-white"
                              aria-label="Decrease"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="min-w-[2.5rem] text-center font-display text-xl font-semibold tabular-nums text-white">
                              {amount}
                            </span>
                            <button
                              type="button"
                              onClick={() => setAmount((a) => clamp(a + 1))}
                              className="flex h-9 w-9 items-center justify-center rounded-md text-white/60 hover:bg-white/10 hover:text-white"
                              aria-label="Increase"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                          <span className="text-[11px] text-white/30">Max {MAX_PER_WALLET}</span>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-end justify-between border-t border-white/[0.06] pt-4">
                          <span className="text-sm text-white/40">Total</span>
                          <span className="font-display text-xl font-semibold tabular-nums text-white">
                            {PRICE_PLACEHOLDER} SOL
                          </span>
                        </div>
                        <motion.button
                          type="button"
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          className="hero-btn-primary mt-4 flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold text-void"
                        >
                          <Wallet size={16} />
                          Connect Wallet
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="phantom"
                  role="tabpanel"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className={`flex h-full flex-col ${TAB_MIN_H}`}
                >
                  <div className="flex flex-col gap-4 border-b border-white/[0.06] pb-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-white/35">
                        Wallet setup
                      </p>
                      <h3 className="mt-1 font-display text-xl font-semibold text-white sm:text-2xl">
                        Install Phantom
                      </h3>
                      <p className="mt-1 text-xs text-white/40 sm:text-sm">
                        Required to mint on Solana · ~2 minutes
                      </p>
                    </div>
                    <span className="inline-flex w-fit rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-white/45">
                      Step-by-step
                    </span>
                  </div>

                  <div className="mt-5 grid flex-1 gap-4 sm:grid-cols-2 sm:gap-5">
                    <div className="flex flex-col justify-between rounded-2xl border border-white/[0.06] bg-black/25 p-4 sm:p-5">
                      <ol className="space-y-4">
                        {phantomSteps.slice(0, 2).map((step) => (
                          <li key={step.n} className="flex gap-3">
                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/[0.06] text-xs font-medium text-accent">
                              {step.n}
                            </span>
                            <p className="pt-0.5 text-sm leading-snug text-white/55">
                              {step.text}{' '}
                              {step.link && (
                                <a
                                  href={step.link.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="font-medium text-white/85 hover:text-white"
                                >
                                  {step.link.label}
                                </a>
                              )}
                            </p>
                          </li>
                        ))}
                      </ol>
                    </div>

                    <div className="flex flex-col justify-between rounded-2xl border border-white/[0.06] bg-black/25 p-4 sm:p-5">
                      <ol className="space-y-4">
                        {phantomSteps.slice(2).map((step) => (
                          <li key={step.n} className="flex gap-3">
                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/[0.06] text-xs font-medium text-accent">
                              {step.n}
                            </span>
                            <p className="pt-0.5 text-sm leading-snug text-white/55">{step.text}</p>
                          </li>
                        ))}
                      </ol>

                      <div className="mt-4 space-y-2 border-t border-white/[0.06] pt-4">
                        <a
                          href={links.phantom}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hero-btn-primary flex w-full items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold text-void"
                        >
                          Install Phantom
                          <ArrowRight size={15} />
                        </a>
                        <a
                          href={links.youtube}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hero-btn-secondary flex w-full items-center justify-center gap-2 rounded-full py-2.5 text-sm font-medium"
                        >
                          <PlayCircle size={15} className="text-white/50" />
                          Watch tutorial
                          <ExternalLink size={12} className="text-white/30" />
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
