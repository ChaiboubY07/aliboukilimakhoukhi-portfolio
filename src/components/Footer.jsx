import { useLang } from '../i18n/LanguageContext.jsx';
import { scrollToTop } from '../lib/scroll.js';
import { IconLinkedIn } from './FineIcons.jsx';

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="site-footer">
      <div className="container site-footer__inner">
        <span className="site-footer__brand">© 2026 ALI BOUKILI MAKHOUKHI</span>
        <span className="site-footer__tag">{t.footer.tagline}</span>
        <span className="site-footer__end">
          <a
            className="site-footer__link"
            href={t.footer.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label={t.footer.linkedinLabel}
          >
            <IconLinkedIn size={15} />
          </a>
          <button type="button" className="site-footer__top" onClick={scrollToTop}>
            {t.footer.top} ↑
          </button>
        </span>
      </div>
    </footer>
  );
}
