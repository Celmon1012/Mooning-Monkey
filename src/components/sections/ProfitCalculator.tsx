import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { assets } from '../../data/assets';
import { AnimatedSection } from '../ui/AnimatedSection';
import { SectionHeading } from '../ui/SectionHeading';

export function ProfitCalculator() {
  const [multiplier, setMultiplier] = useState(1.0);
  const [bet] = useState(1.0);
  const [crashed, setCrashed] = useState(false);

  useEffect(() => {
    if (crashed) return;
    const id = setInterval(() => {
      setMultiplier((m) => {
        const next = m + 0.02 + Math.random() * 0.08;
        if (next > 3 + Math.random() * 5) {
          setCrashed(true);
          return m;
        }
        return next;
      });
    }, 120);
    return () => clearInterval(id);
  }, [crashed]);

  const reset = () => {
    setMultiplier(1.0);
    setCrashed(false);
  };

  const profit = (bet * multiplier).toFixed(2);

  return (
    <AnimatedSection id="calculator" mesh="mixed" className="section-padding overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-[0.08]"
        style={{ backgroundImage: `url(${assets.sec2Bg})` }}
      />

      <div className="relative mx-auto max-w-4xl">
        <SectionHeading
          label="Crash game"
          title="Profit Calculator"
          subtitle="While we prepare the full game launch, preview the crash curve and estimate your potential winnings."
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mint-panel overflow-hidden rounded-3xl"
        >
          <div className="grid lg:grid-cols-2">
            <div className="border-b border-white/[0.06] p-6 lg:border-b-0 lg:border-r lg:p-8">
              <p className="text-[10px] font-medium uppercase tracking-[0.25em] text-white/35">
                Live preview
              </p>
              <div className="mt-6 flex h-48 items-end gap-1 rounded-xl border border-white/[0.06] bg-black/30 p-4">
                {Array.from({ length: 24 }).map((_, i) => {
                  const h = crashed
                    ? Math.min(100, (i / 24) * multiplier * 20)
                    : Math.min(100, (i / 24) * multiplier * 25);
                  return (
                    <div
                      key={i}
                      className="flex-1 rounded-t-sm bg-gradient-to-t from-purple-glow/80 to-cyan-glow/60 transition-all duration-300"
                      style={{ height: `${h}%` }}
                    />
                  );
                })}
              </div>
              <p className="mt-4 text-center font-display text-4xl font-bold tabular-nums text-white">
                {crashed ? 'CRASHED' : `${multiplier.toFixed(2)}x`}
              </p>
            </div>

            <div className="flex flex-col justify-between p-6 lg:p-8">
              <div>
                <label className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/40">
                  Bet amount (SOL)
                </label>
                <div className="mt-3 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-3 text-lg font-semibold text-white">
                  {bet.toFixed(2)} SOL
                </div>
                <div className="mt-6 flex justify-between border-t border-white/[0.06] pt-4">
                  <span className="text-sm text-white/40">Potential payout</span>
                  <span className="font-display text-xl font-semibold text-accent">
                    {crashed ? '0.00' : profit} SOL
                  </span>
                </div>
              </div>
              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  disabled={crashed}
                  className="hero-btn-primary flex-1 rounded-full py-3 text-sm font-semibold text-void disabled:opacity-40"
                >
                  Cash Out
                </button>
                <button
                  type="button"
                  onClick={reset}
                  className="hero-btn-secondary flex-1 rounded-full py-3 text-sm font-medium"
                >
                  Play Again
                </button>
              </div>
              <p className="mt-3 text-center text-[11px] text-white/30">
                Demo preview only — not connected to live game
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}
