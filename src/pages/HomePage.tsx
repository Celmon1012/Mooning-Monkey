import { lazy, Suspense } from 'react';
import { Hero } from '../components/sections/Hero';

const About = lazy(() => import('../components/sections/About').then((m) => ({ default: m.About })));
const Membership = lazy(() =>
  import('../components/sections/Membership').then((m) => ({ default: m.Membership })),
);
const Evolution = lazy(() =>
  import('../components/sections/Evolution').then((m) => ({ default: m.Evolution })),
);
const NFTCollection = lazy(() =>
  import('../components/sections/NFTCollection').then((m) => ({ default: m.NFTCollection })),
);
const ComicSection = lazy(() =>
  import('../components/sections/ComicSection').then((m) => ({ default: m.ComicSection })),
);
const TokenUtility = lazy(() =>
  import('../components/sections/TokenUtility').then((m) => ({ default: m.TokenUtility })),
);
const ProfitCalculator = lazy(() =>
  import('../components/sections/ProfitCalculator').then((m) => ({ default: m.ProfitCalculator })),
);
const Roadmap = lazy(() =>
  import('../components/sections/Roadmap').then((m) => ({ default: m.Roadmap })),
);
const VideoShowcase = lazy(() =>
  import('../components/sections/VideoShowcase').then((m) => ({ default: m.VideoShowcase })),
);
const Team = lazy(() => import('../components/sections/Team').then((m) => ({ default: m.Team })));
const Community = lazy(() =>
  import('../components/sections/Community').then((m) => ({ default: m.Community })),
);
const BuyMint = lazy(() =>
  import('../components/sections/BuyMint').then((m) => ({ default: m.BuyMint })),
);

function SectionFallback() {
  return <div className="min-h-[40vh]" aria-hidden />;
}

export function HomePage() {
  return (
    <>
      <Hero />
      <Suspense fallback={<SectionFallback />}>
        <About />
        <Membership />
        <Evolution />
        <NFTCollection />
        <ComicSection />
        <TokenUtility />
        <ProfitCalculator />
        <Roadmap />
        <VideoShowcase />
        <Team />
        <Community />
        <BuyMint />
      </Suspense>
    </>
  );
}
