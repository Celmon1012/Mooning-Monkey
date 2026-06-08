import {
  BookOpen,
  Coins,
  Crown,
  FileText,
  Gamepad2,
  Gift,
  GraduationCap,
  HelpCircle,
  Tags,
  Map,
  Rocket,
  ScrollText,
  Shield,
  Sparkles,
  TrendingUp,
  Users,
  Zap,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { assets, links } from './assets';

export interface NavLink {
  label: string;
  href: string;
  icon: LucideIcon;
  /** Opens in a new tab (e.g. Docs) */
  external?: boolean;
}

export interface EvolutionStage {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  population: string;
  color: string;
  glowColor: string;
}

export interface TokenFeature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface RoadmapPhase {
  percentage: number;
  title: string;
  description: string;
  status: 'completed' | 'active' | 'upcoming';
}

export interface TimelineItem {
  quarter: string;
  title: string;
  items: string[];
}

export interface NavMenuGroup {
  label: string;
  icon: LucideIcon;
  items: NavLink[];
}

/** Standalone header links (Lumia hover swap) */
export const navStandaloneLinks: NavLink[] = [
  { label: 'Story', href: '/#about', icon: ScrollText },
  { label: 'Evolution', href: '/Evaluation', icon: Sparkles },
  { label: 'Attribute', href: '/attributes', icon: Tags },
  { label: 'Comic', href: '/comic', icon: BookOpen },
  { label: 'Token', href: '/token', icon: Zap },
];

/** Single header dropdown — matches original site "Learn More" */
export const learnMoreMenu: NavMenuGroup = {
  label: 'Learn More',
  icon: GraduationCap,
  items: [
    { label: 'Roadmap', href: '/#roadmap', icon: Map },
    { label: 'Membership', href: '/#membership', icon: Crown },
    { label: 'Team', href: '/#team', icon: Users },
    { label: 'FAQs', href: '/#faq', icon: HelpCircle },
    { label: 'Docs', href: links.docs, icon: FileText, external: true },
  ],
};

/** Flat list for footer navigation */
export const navLinks: NavLink[] = [...navStandaloneLinks, ...learnMoreMenu.items];

export const evolutionStages: EvolutionStage[] = [
  {
    id: 'mooning-monkey',
    name: 'Mooning Monkey',
    subtitle: 'Genesis Stage',
    description:
      '12,000 unique crypto heroes drilled around 239 distinctive traits. The epic space journey begins with ordinary monkeys sent to the moon and beyond.',
    population: '12,000',
    color: 'from-cyan-500/20 to-blue-600/10',
    glowColor: 'rgba(0, 240, 255, 0.4)',
  },
  {
    id: 'galactic-gorilla',
    name: 'Galactic Gorilla',
    subtitle: 'First Evolution',
    description:
      'Advanced technology discovered during deep space travels triggers the first evolution. More power, more rewards, greater rarity.',
    population: '2,500',
    color: 'from-purple-500/20 to-violet-600/10',
    glowColor: 'rgba(168, 85, 247, 0.4)',
  },
  {
    id: 'alien-gorilla',
    name: 'Alien Gorilla',
    subtitle: 'Second Evolution',
    description:
      'Cosmic radiation and alien tech reshape the species. Alien Gorillas unlock exclusive privileges and amplified token rewards.',
    population: '1,000',
    color: 'from-fuchsia-500/20 to-pink-600/10',
    glowColor: 'rgba(236, 72, 153, 0.4)',
  },
  {
    id: 'eternal-yeti',
    name: 'Eternal Yeti',
    subtitle: 'Final Form',
    description:
      '500 chosen beings eternally live on the Solana blockchain — infinitely more powerful, infinitely more valuable. The ultimate evolution.',
    population: '500',
    color: 'from-amber-500/20 to-orange-600/10',
    glowColor: 'rgba(251, 191, 36, 0.4)',
  },
];

export const tokenFeatures: TokenFeature[] = [
  {
    icon: Coins,
    title: 'Daily $TAK Rewards',
    description:
      'Hold any evolution NFT and receive daily Takion Tokens ($TAK) without any extra work — pure passive income.',
  },
  {
    icon: Gamepad2,
    title: 'Crash Game Profits',
    description:
      'Co-own the Mooning Monkey Crash Game and share astronomical profits from the multiplayer gambling experience.',
  },
  {
    icon: TrendingUp,
    title: 'Yield & Staking',
    description:
      'Stake, evolve, and earn extra rewards across the galactical ecosystem built to handsomely reward all participants.',
  },
  {
    icon: Gift,
    title: 'Insane Surprises',
    description:
      'Airdrops, prize wins, and massive project developments announced along the pre and post roadmap launch.',
  },
  {
    icon: BookOpen,
    title: 'Comic Book Utility',
    description:
      'Own full 14-page comic chapters to unlock exclusive future privileges and special surprises.',
  },
  {
    icon: Shield,
    title: 'Certik Audited',
    description:
      'Smart contracts secured through Certik audit partnership ensuring maximum safety for all holders.',
  },
];

export interface MembershipBenefit {
  icon: LucideIcon;
  title: string;
  description: string;
  image: string;
  href: string;
  cta: string;
}

/** Original site membership grid — img1–img4 + sect1 copy */
export const membershipBenefits: MembershipBenefit[] = [
  {
    icon: Sparkles,
    title: 'Evolution Madness',
    description:
      'The Mooning Monkeys are facing an extinction level event, and, in order to survive, they NEED to EVOLVE. Fortunately, they have a plan… During their travels, they will turn from 12,000 Ordinary Mooning Monkeys, into 500 Eternal, Valuable, And Unique Yeti\'s.',
    image: assets.nfts[0],
    href: '/Evaluation',
    cta: 'Visit Evolution Lab',
  },
  {
    icon: BookOpen,
    title: 'Comic Book',
    description:
      'This intriguing and action-packed story, available in a Limited Digital NFT Edition, will bring back the excitement you had back as a kid, when you were reading your favorite comic books, fantasizing all day about limitless worlds and opportunities.',
    image: assets.nfts[1],
    href: '/comic',
    cta: 'Check Out Comic Page',
  },
  {
    icon: Zap,
    title: 'Token Reward Program',
    description:
      'This membership will give you the opportunity to Earn Even More Rewards by receiving DAILY TAKIONS ($TAK) without having to do any extra work, while you simply hold your Mooning Monkeys, AND, passively earn money from your game profits.',
    image: assets.nfts[2],
    href: '/token',
    cta: 'Token Utility Overview',
  },
  {
    icon: Rocket,
    title: 'Tons of Surprises',
    description:
      'Unfortunately, since they are surprises, we can\'t reveal them right now, but just know that we\'re talking about the good kind of surprises! (Not The Kind Which Will Require You To Evolve Into An Eternal Yeti)',
    image: assets.nfts[3],
    href: '/#roadmap',
    cta: 'Check Out Roadmap',
  },
];

export const preLaunchRoadmap: RoadmapPhase[] = [
  {
    percentage: 10,
    title: 'NFT Sale Launch',
    description: '100 Mooning Monkeys randomly distributed to early participants.',
    status: 'completed',
  },
  {
    percentage: 20,
    title: 'Community Rewards',
    description: 'SOL equivalent of 30 iPhone 13 raffled to lucky winners.',
    status: 'completed',
  },
  {
    percentage: 40,
    title: 'New Dimension',
    description:
      'A surprise that teleports the whole project to a new dimension, increasing value of every NFT.',
    status: 'completed',
  },
  {
    percentage: 60,
    title: 'Premium Giveaway',
    description: 'SOL equivalent of 30 MacBook Airs raffled to lucky winners.',
    status: 'active',
  },
  {
    percentage: 80,
    title: 'Life-Changing Prize',
    description: 'An extravagant, over-the-top surprise for 1 lucky winner.',
    status: 'upcoming',
  },
  {
    percentage: 100,
    title: 'Rocket Launch',
    description: '$1,000,000 deposited in the bankroll so the first rocket can launch to the moon!',
    status: 'upcoming',
  },
];

export const postLaunchTimeline: TimelineItem[] = [
  {
    quarter: 'Q4 2021',
    title: 'Foundation',
    items: [
      'Tokenomics V2 release: Full Economy Paper',
      'Dummy game demo launch to build excitement',
    ],
  },
  {
    quarter: 'Q1 2022',
    title: 'Expansion',
    items: [
      '1st comic chapter release',
      'Certik Audit partnership',
      'NFT evolution collection releases',
      'Full game launch',
    ],
  },
  {
    quarter: 'Q2 2022',
    title: 'Scale',
    items: [
      'Special surprise taking the game to another level',
      'V2 of the Mooning Monkey Game release',
      '2nd, 3rd, and 4th comic chapters',
    ],
  },
];

export const faqs = [
  {
    question: 'What are Mooning Monkeys?',
    answer:
      'The Mooning Monkeys are 12,000 exclusive characters that ALL have unique characteristics. The Mooning Monkeys NFT Game is a celebration for gaming — join the NFT community, make connections, and potentially earn along the way.',
  },
  {
    question: 'Where can I buy one?',
    answer:
      'Mooning Monkeys NFT will be available on our Official Website MooningMonkey.com ONLY.',
  },
  {
    question: 'When can I mint?',
    answer:
      'Minting opens 16 December at 7PM UTC. The final amount in SOL will be updated 12 hours before the minting event. We want everything PERFECT before launch.',
  },
  {
    question: 'How are we different?',
    answer:
      'Real World UTILITY and RARITY — two qualities we built Mooning Monkeys upon. Earn passive rewards through a sustainable model designed to last.',
  },
  {
    question: "Who's on the team?",
    answer:
      'Gamers, NFT enthusiasts, comic book fans and crypto degens who love those things and want to create a community where like-minded individuals talk about their passions and passively earn rewards.',
  },
];

export interface TeamMember {
  role: string;
  title: string;
  bio: string;
}

export const teamMembers: TeamMember[] = [
  {
    role: 'Operation',
    title: 'Mission Control',
    bio: 'The mooning monkey overseeing and coordinating the entire space mission.',
  },
  {
    role: 'NFT Artist',
    title: 'Visual Architect',
    bio: 'Crafting 239 distinctive traits — far beyond pixel randomizers.',
  },
  {
    role: 'Comic Artist',
    title: 'Story Illustrator',
    bio: 'Bringing the Mooning Monkey Space Odyssey to life across 4 epic chapters.',
  },
  {
    role: 'Blockchain Dev',
    title: 'Smart Contract Lead',
    bio: 'A coordinated team of paranoid monkeys double-checking every on-chain detail.',
  },
  {
    role: 'Game Dev',
    title: 'Crash Game Builder',
    bio: 'Building the multiplayer crash experience that keeps everyone on the edge.',
  },
  {
    role: 'Web Dev',
    title: 'Platform Engineer',
    bio: 'Navigating through space requires someone who knows the digital cosmos.',
  },
  {
    role: 'Web Design',
    title: 'Experience Designer',
    bio: 'Creating immersive interfaces worthy of an intergalactic mission.',
  },
  {
    role: 'Marketing',
    title: 'Growth Lead',
    bio: 'An experienced team spreading the Mooning Monkey story across the galaxy.',
  },
];
