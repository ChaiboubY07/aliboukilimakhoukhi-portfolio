import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './i18n/LanguageContext.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home.jsx';
import ProjectStone from './pages/ProjectStone.jsx';
import { scrollToId, scrollToBottom } from './lib/scroll.js';

/** Restores scroll position on route changes (top, or the hash anchor). */
function RouteScroll() {
  const location = useLocation();

  useEffect(() => {
    const id = location.hash.replace('#', '');
    const timer = setTimeout(() => {
      if (id) {
        if (id === 'contact') scrollToBottom();
        else scrollToId(id);
      } else {
        window.scrollTo({ top: 0, behavior: 'auto' });
      }
    }, 110);
    return () => clearTimeout(timer);
  }, [location.pathname, location.hash]);

  return null;
}

export default function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <RouteScroll />
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projet/:slug" element={<ProjectStone />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </LanguageProvider>
  );
}
