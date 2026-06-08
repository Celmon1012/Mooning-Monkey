/** Calculator logic aligned with moon-monkey.netlify.app/calculator */

const BANKROLL = 41812.7;
const HOUSE_EDGE = 0.05;
const HOLDER_SHARE = 0.5;
const REVENUE_SHARE = 0.7;
const PLATFORM_FACTOR = 0.1;

export interface ProfitForecast {
  rewards: number[];
  bonus: number[];
  total: number[];
  totalTenYears: number;
}

function simulateAnnualVolume(dailyBets: number, avgWager: number): number[] {
  const annual: number[] = [];
  let cumulative = 30 * dailyBets;
  let wager = avgWager;

  for (let month = 0; month < 12; month++) {
    cumulative *= 1.015;
    wager *= 1.015;
  }
  annual.push(cumulative * wager);

  for (let year = 1; year < 10; year++) {
    cumulative *= 1.18;
    wager *= 1.18;
    annual.push(cumulative * wager);
  }

  return annual;
}

function stageBonusRate(
  mm: number,
  gg: number,
  ag: number,
  ey: number,
): number {
  if (ey > 0) return 0.15;
  if (ag > 0) return 0.075;
  if (gg > 0) return 0.025;
  if (mm > 0) return 0;
  return 0;
}

function shareDistribution(year: number) {
  let mm = 0.9;
  let gg = 0.05;
  let ag = 0.03;
  let ey = 0.02;

  for (let y = 1; y <= year; y++) {
    mm = y <= 2 ? mm - 0.045 : mm - 0.05;
    gg += 0.03;
    ag += 0.01;
    ey = y <= 2 ? ey + 0.005 : ey + 0.01;
  }

  return { mm, gg, ag, ey };
}

export function calcProfitForecast(
  dailyBets: number,
  avgWager: number,
  mooningMonkey: number,
  galacticGorilla: number,
  alienGorilla: number,
  eternalYeti: number,
): ProfitForecast {
  const annualVolume = simulateAnnualVolume(dailyBets, avgWager);
  const bonusRate = stageBonusRate(mooningMonkey, galacticGorilla, alienGorilla, eternalYeti);

  const rewards: number[] = [];
  const bonus: number[] = [];
  const total: number[] = [];

  for (let y = 0; y < 10; y++) {
    const shares = shareDistribution(y);
    const gross = annualVolume[y] * PLATFORM_FACTOR;
    const netProfit = gross * (gross / BANKROLL) * HOUSE_EDGE * HOLDER_SHARE * REVENUE_SHARE;

    const pool =
      12000 * shares.mm +
      4 * 3000 * shares.gg +
      12 * 1000 * shares.ag +
      24 * 500 * shares.ey;

    const mmPart = pool > 0 ? ((12000 * shares.mm) / pool) * netProfit * (mooningMonkey / 12000) : 0;
    const ggPart = pool > 0 ? ((4 * 3000 * shares.gg) / pool) * netProfit * (galacticGorilla / 3000) : 0;
    const agPart = pool > 0 ? ((12 * 1000 * shares.ag) / pool) * netProfit * (alienGorilla / 1000) : 0;
    const eyPart = pool > 0 ? ((24 * 500 * shares.ey) / pool) * netProfit * (eternalYeti / 500) : 0;

    const reward = mmPart + ggPart + agPart + eyPart;
    const bonusAmt = reward * bonusRate;

    rewards.push(Math.round(reward));
    bonus.push(Math.round(bonusAmt));
    total.push(Math.round(reward + bonusAmt));
  }

  return {
    rewards,
    bonus,
    total,
    totalTenYears: total.reduce((sum, n) => sum + n, 0),
  };
}

export interface EvolutionResult {
  stay: { mm: number; gg: number; ag: number; ey: number };
  level2: { gg: number; mm: number };
  level3: { ag: number; gg: number; mm: number };
  level4: { ey: number; ag: number; gg: number; mm: number };
}

export function calcEvolution(monkeys: number): EvolutionResult {
  const mod = (e: number, t: number) => {
    const s = Math.abs(e % t);
    return e < 0 ? (t > 0 ? t - s : s) : t > 0 ? s : -s;
  };

  const l2_gg = Math.floor(monkeys / 4);
  const l2_mm = monkeys - 4 * l2_gg;
  const l3_ag = Math.floor(monkeys / 12);
  const l3_gg = Math.floor(mod(monkeys, 12) / 4);
  const l3_mm = monkeys - 4 * l3_gg - 12 * l3_ag;
  const l4_ey = Math.floor(monkeys / 24);
  const l4_ag = Math.floor(mod(monkeys, 24) / 12);
  const l4_gg = Math.floor(mod(mod(monkeys, 24), 12) / 4);
  const l4_mm = monkeys - 4 * l4_gg - 12 * l4_ag - 24 * l4_ey;

  return {
    stay: { mm: monkeys, gg: 0, ag: 0, ey: 0 },
    level2: { gg: l2_gg, mm: l2_mm },
    level3: { ag: l3_ag, gg: l3_gg, mm: l3_mm },
    level4: { ey: l4_ey, ag: l4_ag, gg: l4_gg, mm: l4_mm },
  };
}

export function calcStaking(takAmount: number) {
  let apy = 5;
  if (takAmount > 100000) apy = 100;
  else if (takAmount > 75000) apy = 75;
  else if (takAmount > 50000) apy = 50;
  else if (takAmount > 25000) apy = 25;
  else if (takAmount > 10000) apy = 10;

  const daily = Math.round((takAmount * (apy / 100)) / 365);
  return {
    apy,
    daily,
    weekly: Math.round(daily * 7),
    monthly: Math.round(daily * 30),
    yearly: Math.round(daily * 365),
  };
}

export function calcComicsProfit(pageHoldings: number) {
  const base = calcProfitForecast(75000, 15, 0, 0, 0, 0);
  const scale = pageHoldings > 0 ? (5601 - pageHoldings) / 5601 : 0;
  return {
    perPage: base.total.map((v) => Math.round(v * scale * 0.02)),
    perIssue: base.total.map((v) => Math.round(v * scale * 0.08)),
    totalTenYears: Math.round(base.totalTenYears * scale * 0.1),
  };
}

export function formatUsd(value: number) {
  return value.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  });
}

export function formatNumber(value: number) {
  return value.toLocaleString('en-US');
}
