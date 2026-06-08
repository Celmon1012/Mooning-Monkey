import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Footer } from './components/layout/Footer';
import { Navbar } from './components/layout/Navbar';
import { WhitelistRail } from './components/layout/WhitelistRail';
import { scrollToSectionWhenReady } from './utils/navigation';

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const sectionId = hash.replace(/^#/, '');

    if (sectionId === 'calculator') {
      navigate('/calculator', { replace: true });
      return;
    }

    if (hash) {
      scrollToSectionWhenReady(sectionId);
      return;
    }

    window.scrollTo({ top: 0, left: 0 });
  }, [pathname, hash, navigate]);

  return null;
}

export function AppLayout() {
  const location = useLocation();

  return (
    <div className="relative min-h-screen bg-void">
      <Navbar />
      <WhitelistRail />
      <ScrollToTop />
      <main key={location.pathname} className="pt-14">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
