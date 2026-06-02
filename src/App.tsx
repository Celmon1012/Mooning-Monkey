import { Footer } from './components/layout/Footer';
import { Navbar } from './components/layout/Navbar';
import { About } from './components/sections/About';
import { BuyMint } from './components/sections/BuyMint';
import { ComicSection } from './components/sections/ComicSection';
import { Community } from './components/sections/Community';
import { Evolution } from './components/sections/Evolution';
import { Hero } from './components/sections/Hero';
import { NFTCollection } from './components/sections/NFTCollection';
import { ProfitCalculator } from './components/sections/ProfitCalculator';
import { Roadmap } from './components/sections/Roadmap';
import { Team } from './components/sections/Team';
import { TokenUtility } from './components/sections/TokenUtility';
import { VideoShowcase } from './components/sections/VideoShowcase';
function App() {
  return (
    <div className="relative min-h-screen bg-void">
      <Navbar />
      <main className="pt-14">
        <Hero />
        <div className="section-divider" aria-hidden />
        <About />
        <div className="section-divider" aria-hidden />
        <Evolution />
        <div className="section-divider" aria-hidden />
        <NFTCollection />
        <div className="section-divider" aria-hidden />
        <ComicSection />
        <div className="section-divider" aria-hidden />
        <TokenUtility />
        <div className="section-divider" aria-hidden />
        <ProfitCalculator />
        <div className="section-divider" aria-hidden />
        <Roadmap />
        <div className="section-divider" aria-hidden />
        <VideoShowcase />
        <div className="section-divider" aria-hidden />
        <Team />
        <div className="section-divider" aria-hidden />
        <Community />
        <div className="section-divider" aria-hidden />
        <BuyMint />
      </main>
      <Footer />
    </div>
  );
}

export default App;
