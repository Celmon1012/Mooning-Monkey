export const tokenHero = {
  title: 'THE TAKION TOKEN',
  subtitle: 'WHAT ARE TAKIONS USED FOR?',
  description:
    'TAK token is at the center of the Mooning Monkey ecosystem whether you are looking to Yield, evolve your NFT, get additional staking rewards, extra cashback or winning bonuses while playing the Mooning Monkey Crash game.',
  highlights: ['TAK token', 'Mooning Monkey ecosystem', 'Mooning Monkey Crash game'],
} as const;

export const yieldSection = {
  heading: 'YIELD',
  description:
    'You can yield $TAK via any of the Mooning Monkey evolution or through the NFT comic pages you own.',
} as const;

export const nftRewards = [
  {
    heading: 'MOONING MONKEY NFT',
    description:
      'Any evolution of the Mooning Monkey ecosystem will provide you with the following reward:',
    reward: '10 TAK/day',
  },
  {
    heading: 'COMIC PAGE NFT',
    description: 'By simply being a comic page NFT owner, you\'ll receive the following rewards:',
    reward: '15 TAK/day',
  },
] as const;

export const evolutionCosts = {
  heading: 'EVOLVE',
  description:
    'In order to evolve your current NFT holding to the next stage of evolution you\'ll need the following amount of TAK:',
  processLabel: 'EVOLUTION PROCESS',
  burnLabel: 'STACK TO BURN',
  steps: [
    { process: '4 Mooning Monkeys to 1 Galactic Gorilla:', cost: '1200' },
    { process: '3 Galactic Gorillas to 1 Alien Gorilla:', cost: '1350' },
    { process: '2 Alien Gorillas to 1 Eternal Yeti:', cost: '1800' },
  ],
  note: 'NOTE: If you want to proceed to the next evolution level, you can either buy more $TAK directly on listed exchanges, or simply wait for your daily, passive rewards!',
} as const;

export const comicPagesSection = {
  heading: 'ACQUIRE COMIC PAGES',
  description:
    'Besides being able to read through the intriguing, amazing, and full-of-action Mooning Monkey Epic Space Odyssey, acquiring comic pages earn you great rewards! And, by being a TAK Holder that owns Mooning Monkey NFT Evolutions, you\'ll get an unique chance to earn extra rewards, exclusive discord chat access, and much, much more!',
  highlights: ['Mooning Monkey Epic Space Odyssey', 'TAK Holder', 'Mooning Monkey NFT Evolutions'],
} as const;

export const stakingTiers = {
  heading: 'STAKING FOR EVERYONE',
  description:
    'Even if you do not own any NFT, we welcome anyone in our staking program to earn and enjoy the following rewards:',
  stakingLabel: 'STAKING',
  apyLabel: 'APY',
  tiers: [
    { range: 'Up to 10,000', apy: '5%' },
    { range: '10,001 to 25,000', apy: '10%' },
    { range: '25,001 to 50,000', apy: '25%' },
    { range: '50,001 to 75,000', apy: '50%' },
    { range: '75,001 to 100,000', apy: '75%' },
    { range: '100,000+', apy: '100%' },
  ],
} as const;

export const extraCashback = {
  heading: 'EXTRA CASHBACK',
  description:
    'Every single player will have the chance to earn extra Cashback on top of the initial 0.25%, here\'s exactly how it works:',
  bullets: [
    'Minimum of 0.25% if play with SOL, BTC or USDT and up to 2% depending on your total wager overtime',
    'A minimum of 1% when playing with TAK and Up to 3 % depending on your total wager overtime',
  ],
} as const;

export const extraWins = {
  heading: 'EARN EXTRA CASH ON YOUR WINS',
  description:
    'Whenever you use the $TAK token while playing, you\'ll earn extra on each winning bet, regardless of whether or not you own any of the Mooning Monkey Evolutions.',
  bullet: 'An extra 1% on each winning bet and up to 3%',
} as const;

export const wagerLevels = [
  { level: 'Level 1', lifetimeBet: 'Up to $50,000', tak: '1%', crypto: '0.25%' },
  { level: 'Level 2', lifetimeBet: '$50K – $100K', tak: '1.5%', crypto: '0.5%' },
  { level: 'Level 3', lifetimeBet: '$100K – $250K', tak: '2%', crypto: '1%' },
  { level: 'Level 4', lifetimeBet: '$250K – $500K', tak: '2.5%', crypto: '1.5%' },
  { level: 'Level 5', lifetimeBet: 'Over $500K', tak: '3%', crypto: '2%' },
] as const;

export const bankrollSection = {
  heading: 'BANKROLL',
  intro: 'Bankrolling is a great way to earn some extra cash, with minimal risk!',
  exampleLabel: "Here's An Example:",
  example:
    'If the total bankroll is $1,000 and you contributed $200, you\'ll receive 20% of ALL the house-edge profits. In order to access The Mooning Monkey Bankroll Program, you HAVE to be a $TAK holder.',
  highlights: ['20%', 'ALL', 'The Mooning Monkey Bankroll Program', '$TAK'],
} as const;

export const gameBenefits = {
  para1: 'In our game, whether they win or lose, 4% out of the 5% house hedge is redistributed to players in cashback, minimizing the chances of losing!',
  para2:
    'As you can see, The Crash Game on MooningMonkey.com provides unlimited benefits to its players, and this is why so many people choose this platform…',
  para3: 'You Earn Even If You Lose, And Earn EVEN MORE When You Win!',
  calculatorNote:
    'Visit our staking calculator for non NFT holders to see potential earnings',
  disclaimer:
    '$TAK is the utility token at the center of Mooning Monkey ecosystem. It is NOT investment advice and the $TAK token has NO economic value.',
} as const;
