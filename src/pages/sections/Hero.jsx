import { useEffect, useState } from 'react';
import { useLang } from '../../i18n/LanguageContext.jsx';
import { MARKER_IDS } from '../../i18n/translations.js';
import useScrollSpy from '../../hooks/useScrollSpy.js';
import useParallax from '../../hooks/useParallax.js';
import Photo from '../../components/Photo.jsx';
import ArrowLink from '../../components/ArrowLink.jsx';
import Rich from '../../components/Rich.jsx';
import { scrollToId } from '../../lib/scroll.js';

export default function Hero() {
  const { t } = useLang();
  const mediaRef = useParallax(56);
  const marker = useScrollSpy(MARKER_IDS);
  const [progress, setProgress] = useState(0);
  const [inHero, setInHero] = useState(true);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0);
      const hero = document.getElementById('accueil');
      if (hero) {
        // The indicator is fixed at the viewport centre: keep the "light"
        // (hero) theme while the hero still covers it, dark theme beyond.
        setInHero(hero.getBoundingClientRect().bottom > window.innerHeight * 0.5);
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const idx = Math.max(0, MARKER_IDS.indexOf(marker));
  const goPortfolio = (event) => {
    event.preventDefault();
    scrollToId('portfolio');
    window.history.replaceState(null, '', '#portfolio');
  };

  return (
    <>
      <section id="accueil" className="hero">
        <div className="hero__media" ref={mediaRef}>
          <Photo src="/images/hero-patio.jpg" alt={t.hero.photo} className="hero__photo" priority />
        </div>
        <div className="hero__scrim" />
        <div className="container hero__inner">
          <div className="hero__content">
            <p className="eyebrow hero__eyebrow">{t.hero.eyebrow}</p>
            <h1 className="hero__title">
              <Rich text={t.hero.title} />
            </h1>
            <p className="hero__lead">{t.hero.lead}</p>
            <div className="hero__cta">
              <ArrowLink light href="#portfolio" onClick={goPortfolio}>
                {t.hero.cta}
              </ArrowLink>
            </div>
          </div>
        </div>
      </section>

      <div className={`hero-progress${inHero ? '' : ' is-on-light'}`} aria-hidden="true">
        <span className="hero-progress__count">
          {String(idx + 1).padStart(2, '0')} <i>/</i> {String(MARKER_IDS.length).padStart(2, '0')}
        </span>
        <span className="hero-progress__rail">
          <span className="hero-progress__fill" style={{ height: `${progress}%` }} />
        </span>
      </div>
    </>
  );
}
