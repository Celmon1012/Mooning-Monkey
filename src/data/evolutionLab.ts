import { assets } from './assets';

export type EvolveStage = '2' | '3' | '4';

export interface EvolutionStageCard {
  stage: number;
  name: string;
  image: string;
}

export interface EvolveStageContent {
  id: EvolveStage;
  label: string;
  nftTitle: string;
  sacrificeCount: number;
  sacrificeLabel: string;
  targetName: string;
  description: string;
  note: string;
  slotCount: number;
}

export const evolutionLabHero = {
  title: 'THE EVOLUTION LAB',
  subtitle:
    'Evolve Your Mooning Monkeys To Gain Access To Exclusive Benefits And Of Course, Earn More Rewards!',
  tagline:
    'The Mooning Monkeys NEED To Evolve In Order To Survive, Will You Help Them?',
  detail:
    "You'll be able to evolve your Mooning Monkey 3 Times! Each evolution allowing you to earn more as an NFT Holder once the game launches.",
};

export const evolutionStageCards: EvolutionStageCard[] = [
  { stage: 1, name: 'Mooning Monkey', image: assets.evolution.mooningMonkey },
  { stage: 2, name: 'Galactic Gorilla', image: assets.evolution.galacticGorilla },
  { stage: 3, name: 'Alien Gorilla', image: assets.evolution.alienGorilla },
  { stage: 4, name: 'Eternal Yeti', image: assets.evolution.eternalYeti },
];

export const evolveStageContent: Record<EvolveStage, EvolveStageContent> = {
  '2': {
    id: '2',
    label: 'Stage 2',
    nftTitle: 'My NFT Mooning Monkeys',
    sacrificeCount: 4,
    sacrificeLabel: 'Mooning Monkeys',
    targetName: 'Galactic Gorilla',
    description:
      "In order to achieve the powerful Galactic Gorilla, you'll have to sacrifice 4 of your current Mooning Monkeys to depart into deep space and surpass the obstacles they'll encounter on their way to the new planet.",
    note: "By clicking \"Evolve\", the Mooning Monkeys you've chosen will be sent to a Solana black hole wallet and disappear forever, however, EACH EVOLUTION will make you more money in the Mooning Monkey Game.",
    slotCount: 4,
  },
  '3': {
    id: '3',
    label: 'Stage 3',
    nftTitle: 'My NFT Galactic Gorillas',
    sacrificeCount: 3,
    sacrificeLabel: 'Galactic Gorillas',
    targetName: 'Alien Gorilla',
    description:
      "The Alien Gorilla is the KEY to winning against the alien invader and winning The Inter-Galactic War — you'll have to sacrifice 3 Galactic Gorillas in order to achieve such a strong being and protect the species from extinction.",
    note: "By clicking \"Evolve\", the Galactic Gorillas you've chosen will be sent to a Solana black hole wallet and disappear forever, however, EACH EVOLUTION will make you more money in the Mooning Monkey Game.",
    slotCount: 3,
  },
  '4': {
    id: '4',
    label: 'Stage 4',
    nftTitle: 'My NFT Alien Gorillas',
    sacrificeCount: 2,
    sacrificeLabel: 'Alien Gorillas',
    targetName: 'Eternal Yeti',
    description:
      "Although The Alien Gorilla is extremely powerful, it is still bound by the shackles of mortality… as well as an unsettling look that's not easy on the eye. To guarantee the survival of the Mooning Monkey's Species AND make sure they do so with style… You'll need to sacrifice 2 Of Your Alien Gorillas to make 1 Eternal Yeti that will live forever on the Blockchain and earn the highest possible levels of daily game rewards.",
    note: "By clicking \"Evolve\", the Alien Gorillas you've chosen will be sent to a Solana black hole wallet and disappear forever, however, EACH EVOLUTION will make you more money in the Mooning Monkey Game.",
    slotCount: 2,
  },
};

export const evolutionTreeSteps = [
  {
    title: 'Buy 24 Mooning Monkeys',
    images: assets.evolutionLab.treeMonkeys,
    count: 24,
  },
  {
    title: 'Evolve them into 6 Galactic Gorillas',
    images: Array(6).fill(assets.evolutionLab.galacticCard),
    count: 6,
  },
  {
    title: 'Evolve them into 2 Alien Gorillas',
    images: Array(2).fill(assets.evolutionLab.alienCard),
    count: 2,
  },
  {
    title: 'Get 1 Eternal Yeti',
    images: [assets.evolutionLab.nftPlaceholder],
    count: 1,
  },
] as const;

export const evolutionRewardsTable = [
  {
    stage: 'Eternal Yeti',
    unit: '500',
    remarks: 'Get 1 Eternal Yeti by burning 2 Alien Gorilla',
    rewards: '25%',
    bonus: '+15%',
  },
  {
    stage: 'Alien Gorilla',
    unit: '1,000',
    remarks: 'Get 1 Alien Gorilla by burning 3 Galactic Gorilla',
    rewards: null,
    bonus: '+7.5%',
  },
  {
    stage: 'Galactic Gorilla',
    unit: '3,000',
    remarks: 'Get 1 Galactic Gorilla by burning 4 Mooning Monkeys',
    rewards: null,
    bonus: '+2.5%',
  },
  {
    stage: 'Mooning Monkey',
    unit: '12,000',
    remarks: 'None',
    rewards: null,
    bonus: '0%',
  },
] as const;

export const evolutionTreeIntro = {
  title: 'Evolution Tree',
  paragraph1:
    "In order to achieve evolution, earn and spot among the 500 prestigious Eternal Yeti holder's circle, and receive the highest possible amount of passive rewards, you'll need 24 \"Mooning Monkeys\"",
  paragraph2:
    'Below, you can see The Evolution — a visual that shows you EXACTLY how evolution process works:',
};

export const evolutionEarning = {
  title: 'EVOLUTION EARNING',
  text: '50% Of All Game Profit Will Be Redistributed Mooning Monkeyes NFT Holders',
  text2: 'The Image Below Show You The Benefits OF Evolving Your Mooning Monkeys:',
};

export const rarityTip =
  "Make sure you fight to get the most rare Mooning Monkeys as the traits rarity level of your evolved NFT's will be matched with those from your previous evolution stage";
