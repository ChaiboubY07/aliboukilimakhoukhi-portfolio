import { useLang } from '../i18n/LanguageContext.jsx';
import { scrollToTop } from '../lib/scroll.js';

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <span className="site-footer__brand">© 2026 ALI BOUKILI MAKHOUKHI</span>
        <span className="site-footer__tag">{t.footer.tagline}</span>
        <button type="button" className="site-footer__top" onClick={scrollToTop}>
          {t.footer.top} ↑
        </button>
      </div>
    </footer>
  );
}
