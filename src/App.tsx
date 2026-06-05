import { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { Footer } from './components/layout/Footer';
import { Navbar } from './components/layout/Navbar';
import { WhitelistRail } from './components/layout/WhitelistRail';
import { EvolutionLabPage } from './pages/EvolutionLabPage';
import { HomePage } from './pages/HomePage';
import { scrollToSectionWhenReady } from './utils/navigation';

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace(/^#/, '');
      scrollToSectionWhenReady(id);
      return;
    }
    window.scrollTo({ top: 0, left: 0 });
  }, [pathname, hash]);

  return null;
}

function AppLayout() {
  return (
    <div className="relative min-h-screen bg-void">
      <Navbar />
      <WhitelistRail />
      <ScrollToTop />
      <main className="pt-14">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/Evaluation" element={<EvolutionLabPage />} />
          <Route path="/evaluation" element={<EvolutionLabPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;
