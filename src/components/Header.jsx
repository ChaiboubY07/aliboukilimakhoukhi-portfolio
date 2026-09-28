import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLang } from '../i18n/LanguageContext.jsx';
import { SECTION_IDS } from '../i18n/translations.js';
import useScrollSpy from '../hooks/useScrollSpy.js';
import { scrollToId, scrollToBottom, scrollToTop } from '../lib/scroll.js';

const NAV = [
  { id: 'accueil', key: 'accueil' },
  { id: 'a-propos', key: 'aPropos' },
  { id: 'portfolio', key: 'portfolio' },
  { id: 'process', key: 'process' },
  { id: 'contact', key: 'contact' },
];

export default function Header() {
  const { t, lang, switchLang } = useLang();
  const location = useLocation();
  const navigate = useNavigate();
  const onProject = location.pathname.startsWith('/projet');
  const spied = useScrollSpy(SECTION_IDS);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const active = onProject ? 'portfolio' : spied;

  const goHome = (e) => {
    e.preventDefault();
    setOpen(false);
    if (location.pathname !== '/') navigate('/');
    scrollToTop();
    window.history.replaceState(null, '', '/');
  };

  const goTo = (id) => (e) => {
    e.preventDefault();
    setOpen(false);

    if (location.pathname !== '/') {
      navigate(id ? `/#${id}` : '/');
      return;
    }
    if (id === 'contact') scrollToBottom();
    else if (id) scrollToId(id);
    else scrollToTop();
    window.history.replaceState(null, '', id ? `#${id}` : window.location.pathname.split('#')[0]);
  };


  return (
    <header className={`site-header${scrolled ? ' is-scrolled' : ''}${open ? ' is-menu-open' : ''}`}>
      <div className="site-header__bar">
        <a className="brand" href="/" onClick={goHome}>
          <span className="brand__name">ALI BOUKILI MAKHOUKHI</span>
        </a>

        <nav className="nav" aria-label="Navigation">
          {NAV.map(({ id, key }) => (
            <a
              key={id}
              href={`#${id}`}
              className={`nav__link${active === id ? ' is-active' : ''}`}
              onClick={goTo(id)}
              aria-current={active === id ? 'true' : undefined}
            >
              {t.nav[key]}
            </a>
          ))}
        </nav>

        <div className="site-header__end">
          <div className="lang" role="group" aria-label={t.a11y.language}>
            <button
              type="button"
              className={`lang__btn${lang === 'fr' ? ' is-active' : ''}`}
              onClick={() => switchLang('fr')}
              aria-pressed={lang === 'fr'}
            >
              FR
            </button>
            <span className="lang__sep" aria-hidden="true">
              /
            </span>
            <button
              type="button"
              className={`lang__btn${lang === 'ar' ? ' is-active' : ''}`}
              onClick={() => switchLang('ar')}
              aria-pressed={lang === 'ar'}
            >
              AR
            </button>
          </div>

          <button
            type="button"
            className={`burger${open ? ' is-open' : ''}`}
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? t.a11y.close : t.a11y.menu}
            aria-expanded={open}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      <div className={`mobile-menu${open ? ' is-open' : ''}`} aria-hidden={!open}>
        <nav className="mobile-menu__nav" aria-label="Navigation mobile">
          {NAV.map(({ id, key }, i) => (
            <a
              key={id}
              href={`#${id}`}
              className={`mobile-menu__link${active === id ? ' is-active' : ''}`}
              onClick={goTo(id)}
              tabIndex={open ? 0 : -1}
            >
              <span className="mobile-menu__num">{String(i + 1).padStart(2, '0')}</span>
              {t.nav[key]}
            </a>
          ))}
        </nav>
        <p className="mobile-menu__meta">{t.footer.tagline}</p>
      </div>
    </header>
  );
}
