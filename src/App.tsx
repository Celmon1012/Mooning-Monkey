import { Footer } from './components/layout/Footer';
import { Navbar } from './components/layout/Navbar';
import { About } from './components/sections/About';
import { Community } from './components/sections/Community';
import { Evolution } from './components/sections/Evolution';
import { FinalCTA } from './components/sections/FinalCTA';
import { Hero } from './components/sections/Hero';
import { NFTCollection } from './components/sections/NFTCollection';
import { Roadmap } from './components/sections/Roadmap';
import { TokenUtility } from './components/sections/TokenUtility';
import { VideoShowcase } from './components/sections/VideoShowcase';

function App() {
  return (
    <div className="relative min-h-screen bg-void">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Evolution />
        <NFTCollection />
        <TokenUtility />
        <Roadmap />
        <VideoShowcase />
        <Community />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;
