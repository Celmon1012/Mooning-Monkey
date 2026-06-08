import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';
import { RangeSlider } from '../components/calculator/RangeSlider';
import { AnimatedSection } from '../components/ui/AnimatedSection';
import { InternalLink } from '../components/ui/InternalLink';
import { PosterBackground } from '../components/ui/PosterBackground';
import { Reveal3D } from '../components/ui/Reveal3D';
import { SectionHeading } from '../components/ui/SectionHeading';
import { assets } from '../data/assets';
import { evolutionRewardsTable } from '../data/evolutionLab';
import {
  calcComicsProfit,
  calcEvolution,
  calcProfitForecast,
  calcStaking,
  formatNumber,
  formatUsd,
} from '../lib/calculatorEngine';

const TABS = [
  { id: 'profit', label: 'Profit Calculator' },
  { id: 'evolution', label: 'Evolution Calculator' },
  { id: 'tree', label: 'Evolution Tree' },
  { id: 'staking', label: 'Staking Calculator' },
  { id: 'comics', label: 'Comics Profit Calculator' },
] as const;

type TabId = (typeof TABS)[number]['id'];

const YEARS = ['Y1', 'Y2', 'Y3', 'Y4', 'Y5', 'Y6', 'Y7', 'Y8', 'Y9', 'Y10'];

function ForecastTable({
  rewards,
  bonus,
  total,
}: {
  rewards: number[];
  bonus: number[];
  total: number[];
}) {
  const rows = [
    { label: 'Rewards', data: rewards },
    { label: 'Bonus', data: bonus },
    { label: 'Total', data: total },
  ];

  return (
    <div className="space-y-4 overflow-x-auto">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead>
          <tr className="border-b border-white/[0.08]">
            <th className="px-3 py-3 font-body text-[10px] font-medium uppercase tracking-[0.2em] text-white/40">
              All levels
            </th>
            {YEARS.slice(0, 5).map((y) => (
              <th key={y} className="px-3 py-3 text-center text-white/50">
                {y}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} className="border-b border-white/[0.04]">
              <td className="px-3 py-3 font-medium text-white/80">{row.label}</td>
              {row.data.slice(0, 5).map((val, i) => (
                <td key={i} className="px-3 py-3 text-center tabular-nums text-white/60">
                  {formatUsd(val)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead>
          <tr className="border-b border-white/[0.08]">
            <th className="px-3 py-3 font-body text-[10px] font-medium uppercase tracking-[0.2em] text-white/40">
              &nbsp;
            </th>
            {YEARS.slice(5).map((y) => (
              <th key={y} className="px-3 py-3 text-center text-white/50">
                {y}
              </th>
            ))}
            <th className="px-3 py-3 text-center text-cyan-glow">Total</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label} className="border-b border-white/[0.04]">
              <td className="px-3 py-3 font-medium text-white/80">{row.label}</td>
              {row.data.slice(5).map((val, i) => (
                <td key={i} className="px-3 py-3 text-center tabular-nums text-white/60">
                  {formatUsd(val)}
                </td>
              ))}
              <td className="px-3 py-3 text-center font-semibold tabular-nums text-cyan-glow">
                {formatUsd(row.data.reduce((a, b) => a + b, 0))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function RewardDistributionTable() {
  return (
    <div className="mt-12 overflow-x-auto rounded-3xl border border-white/[0.08] bg-white/[0.02]">
      <div className="border-b border-white/[0.06] px-6 py-5">
        <h3 className="font-display text-lg font-semibold text-white">Reward distribution mode</h3>
        <p className="mt-2 text-sm leading-relaxed text-white/50">
          Rewards and bonus start from phase 2 when the Mooning Monkey crash game launches. Revenue
          represents the proportionate % of revenue from the bank roll for the Mooning Monkey house.
          70% of the revenue (where there is profit) will be distributed across NFT holders as rewards
          and bonus.
        </p>
      </div>
      <table className="w-full min-w-[540px] text-left text-sm">
        <thead>
          <tr className="border-b border-white/[0.08]">
            {['Stage', 'Unit', 'Remarks', 'Rewards*', 'Bonus*'].map((col) => (
              <th
                key={col}
                className="px-5 py-4 font-body text-[10px] font-medium uppercase tracking-[0.2em] text-white/40"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {evolutionRewardsTable.map((row, i) => (
            <tr key={row.stage} className="border-b border-white/[0.04]">
              <td className="px-5 py-4 font-medium text-white/90">{row.stage}</td>
              <td className="px-5 py-4 text-white/55">{row.unit}</td>
              <td className="max-w-[200px] px-5 py-4 text-white/50">{row.remarks}</td>
              {i === 0 && (
                <td
                  rowSpan={4}
                  className="border-l border-white/[0.06] px-5 py-4 text-center font-display text-xl font-semibold text-cyan-glow"
                >
                  25%
                </td>
              )}
              <td className="px-5 py-4 font-medium text-cyan-glow/80">{row.bonus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function CalculatorPage() {
  const [tab, setTab] = useState<TabId>('profit');

  const [dailyBets, setDailyBets] = useState(75000);
  const [avgWager, setAvgWager] = useState(15);
  const [mm, setMm] = useState(0);
  const [gg, setGg] = useState(0);
  const [ag, setAg] = useState(0);
  const [ey, setEy] = useState(0);

  const [evoMonkeys, setEvoMonkeys] = useState(24);
  const [takAmount, setTakAmount] = useState(0);
  const [pageHoldings, setPageHoldings] = useState(0);

  const profit = useMemo(
    () => calcProfitForecast(dailyBets, avgWager, mm, gg, ag, ey),
    [dailyBets, avgWager, mm, gg, ag, ey],
  );
  const evolution = useMemo(() => calcEvolution(evoMonkeys), [evoMonkeys]);
  const staking = useMemo(() => calcStaking(takAmount), [takAmount]);
  const comics = useMemo(() => calcComicsProfit(pageHoldings), [pageHoldings]);

  return (
    <div className="relative overflow-hidden bg-void">
      <section className="relative overflow-hidden pb-10 pt-6 sm:pt-8">
        <PosterBackground
          src={assets.sec2Bg}
          opacity={0.1}
          overlayClassName="bg-gradient-to-b from-void/95 via-void/92 to-void"
        />
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal3D immediate>
            <p className="font-body text-xs font-medium uppercase tracking-[2px] text-white/55">
              Calculator
            </p>
            <h1 className="mt-4 font-brand text-[2rem] font-medium leading-[1.15] text-white sm:text-[2.35rem] lg:text-[2.75rem]">
              <span className="hero-headline-accent">Profit Calculator</span>
            </h1>
          </Reveal3D>
        </div>
      </section>

      <AnimatedSection mesh="mixed" className="section-padding pt-0">
        <div className="relative mx-auto max-w-7xl">
          <div className="mint-tab-track mb-8 flex flex-wrap gap-1 rounded-2xl p-1 sm:rounded-full">
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={`relative flex-1 whitespace-nowrap rounded-full px-3 py-2.5 font-body text-[11px] font-medium uppercase tracking-wide transition-colors sm:text-xs ${
                  tab === t.id ? 'text-white' : 'text-white/45 hover:text-white/65'
                }`}
              >
                {tab === t.id && (
                  <motion.span
                    layoutId="calc-tab"
                    className="mint-tab-active absolute inset-0 rounded-full"
                    transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                  />
                )}
                <span className="relative">{t.label}</span>
              </button>
            ))}
          </div>

          <div className="mint-panel rounded-3xl p-6 sm:p-8">
            {tab === 'profit' && (
              <div className="space-y-10">
                <p className="mx-auto max-w-3xl text-center text-[15px] leading-relaxed text-white/60">
                  Use the Profit Calculator to determine the lucrative rewards you&apos;ll be able to
                  generate by holding Mooning Monkeys and other evolution stages such as Galactic
                  Gorillas, Alien Gorillas and Eternal Yetis.
                </p>

                <div className="grid gap-10 lg:grid-cols-2">
                  <div className="space-y-8">
                    <div>
                      <h3 className="mb-5 font-display text-sm font-semibold uppercase tracking-wider text-white/70">
                        Step 1: Bet settings
                      </h3>
                      <div className="space-y-6">
                        <RangeSlider
                          label="Daily bets"
                          value={dailyBets}
                          min={75000}
                          max={1000000}
                          onChange={setDailyBets}
                          formatMin="75,000"
                          formatMax="1,000,000"
                        />
                        <RangeSlider
                          label="Avg wager per bet ($)"
                          value={avgWager}
                          min={15}
                          max={1000}
                          onChange={setAvgWager}
                        />
                      </div>
                    </div>

                    <div>
                      <h3 className="mb-5 font-display text-sm font-semibold uppercase tracking-wider text-white/70">
                        Step 2: NFT holding settings
                      </h3>
                      <div className="space-y-6">
                        <RangeSlider label="Mooning Monkey" value={mm} min={0} max={12000} onChange={setMm} formatMax="12,000" />
                        <RangeSlider label="Galactic Gorilla" value={gg} min={0} max={6000} onChange={setGg} formatMax="6,000" />
                        <RangeSlider label="Alien Gorilla" value={ag} min={0} max={3000} onChange={setAg} formatMax="3,000" />
                        <RangeSlider label="Eternal Yeti" value={ey} min={0} max={500} onChange={setEy} formatMax="500" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="mb-5 font-display text-sm font-semibold uppercase tracking-wider text-white/70">
                      Step 3: Profit forecast
                    </h3>
                    <ForecastTable rewards={profit.rewards} bonus={profit.bonus} total={profit.total} />
                    <div className="mt-6 rounded-xl border border-white/[0.08] bg-white/[0.03] px-5 py-4 text-center">
                      <p className="text-sm text-white/50">Total earned over 10 years</p>
                      <p className="mt-1 font-display text-2xl font-semibold text-cyan-glow">
                        {formatUsd(profit.totalTenYears)}
                      </p>
                    </div>
                    <p className="mt-4 text-xs leading-relaxed text-white/35">
                      * Projections are based on data available for a similar gaming platform. A
                      conservative estimate of 10% (of the other platform) has been considered for Mooning
                      Monkey projections.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {tab === 'evolution' && (
              <div className="space-y-8">
                <p className="mx-auto max-w-3xl text-center text-[15px] leading-relaxed text-white/60">
                  Use the Evolution Calculator to determine your evolution possibilities based on your
                  initial Mooning Monkey holdings or the ones you plan to acquire.
                </p>
                <div className="mx-auto max-w-xl">
                  <RangeSlider
                    label="Mooning Monkeys"
                    value={evoMonkeys}
                    min={0}
                    max={12000}
                    onChange={setEvoMonkeys}
                    formatMax="12,000"
                  />
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[520px] text-left text-sm">
                    <thead>
                      <tr className="border-b border-white/[0.08]">
                        <th className="px-4 py-3 text-white/40">Stage</th>
                        <th className="px-4 py-3 text-white/40">Stay at</th>
                        <th className="px-4 py-3 text-white/40">Level up to L2</th>
                        <th className="px-4 py-3 text-white/40">Level up to L3</th>
                        <th className="px-4 py-3 text-white/40">Level up to L4</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { name: 'Mooning Monkey', stay: evolution.stay.mm, l2: evolution.level2.mm, l3: evolution.level3.mm, l4: evolution.level4.mm },
                        { name: 'Galactic Gorilla', stay: evolution.stay.gg, l2: evolution.level2.gg, l3: evolution.level3.gg, l4: evolution.level4.gg },
                        { name: 'Alien Gorilla', stay: evolution.stay.ag, l2: 0, l3: evolution.level3.ag, l4: evolution.level4.ag },
                        { name: 'Eternal Yeti', stay: evolution.stay.ey, l2: 0, l3: 0, l4: evolution.level4.ey },
                      ].map((row) => (
                        <tr key={row.name} className="border-b border-white/[0.04]">
                          <td className="px-4 py-3 font-medium text-white/85">{row.name}</td>
                          <td className="px-4 py-3 tabular-nums text-white/60">{formatNumber(row.stay)}</td>
                          <td className="px-4 py-3 tabular-nums text-white/60">{formatNumber(row.l2)}</td>
                          <td className="px-4 py-3 tabular-nums text-white/60">{formatNumber(row.l3)}</td>
                          <td className="px-4 py-3 tabular-nums text-cyan-glow">{formatNumber(row.l4)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {tab === 'tree' && (
              <div className="space-y-6 text-center">
                <SectionHeading
                  align="center"
                  label="Evolution path"
                  title="The Evolution Tree"
                  subtitle="See exactly how 24 Mooning Monkeys evolve into 6 Galactic Gorillas, 2 Alien Gorillas, and 1 Eternal Yeti."
                  className="mx-auto"
                />
                <InternalLink href="/Evaluation">
                  <button
                    type="button"
                    className="hero-btn-primary rounded-full px-7 py-3.5 text-sm font-semibold text-void"
                  >
                    Open full Evolution Lab
                  </button>
                </InternalLink>
              </div>
            )}

            {tab === 'staking' && (
              <div className="space-y-8">
                <p className="mx-auto max-w-3xl text-center text-[15px] leading-relaxed text-white/60">
                  NFT and non-NFT holders are welcome to the staking rewards. Enter your current TAK
                  amount to see your potential rewards.
                </p>
                <div className="mx-auto max-w-xl">
                  <RangeSlider
                    label="Amount of $TAK"
                    value={takAmount}
                    min={0}
                    max={100000000}
                    onChange={setTakAmount}
                    formatMax="100,000,000"
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                  {[
                    { label: 'APY', value: `${staking.apy}%` },
                    { label: 'Daily', value: formatNumber(staking.daily) },
                    { label: 'Weekly', value: formatNumber(staking.weekly) },
                    { label: 'Monthly', value: formatNumber(staking.monthly) },
                    { label: 'Yearly', value: formatNumber(staking.yearly) },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-5 text-center"
                    >
                      <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">{item.label}</p>
                      <p className="mt-2 font-display text-xl font-semibold text-white">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === 'comics' && (
              <div className="space-y-8">
                <p className="mx-auto max-w-3xl text-center text-[15px] leading-relaxed text-white/60">
                  Estimate comic-related profit based on your page holdings in the Mooning Monkey comic
                  collection.
                </p>
                <div className="mx-auto max-w-xl">
                  <RangeSlider
                    label="Page holdings"
                    value={pageHoldings}
                    min={0}
                    max={5600}
                    onChange={setPageHoldings}
                    formatMax="5,600"
                  />
                </div>
                <ForecastTable rewards={comics.perPage} bonus={comics.perIssue} total={comics.perPage.map((v, i) => v + comics.perIssue[i])} />
                <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-5 py-4 text-center">
                  <p className="text-sm text-white/50">Total earned over 10 years</p>
                  <p className="mt-1 font-display text-2xl font-semibold text-cyan-glow">
                    {formatUsd(comics.totalTenYears)}
                  </p>
                </div>
              </div>
            )}
          </div>

          <RewardDistributionTable />
        </div>
      </AnimatedSection>
    </div>
  );
}
