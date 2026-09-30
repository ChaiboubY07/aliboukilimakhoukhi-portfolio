import { useEffect, useState } from 'react';
import { useLang } from '../../i18n/LanguageContext.jsx';
import Reveal from '../../components/Reveal.jsx';
import ArrowLink from '../../components/ArrowLink.jsx';
import Photo from '../../components/Photo.jsx';
import Rich from '../../components/Rich.jsx';
import { IconLinkedIn } from '../../components/FineIcons.jsx';

const ZOOM_MIN = 1;
const ZOOM_MAX = 4;
const ZOOM_STEP = 1.3;

export default function Closing() {
  const { t } = useLang();
  const { cv, quote, contact } = t.closing;
  const [viewer, setViewer] = useState(false);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    if (!viewer) return undefined;
    const onKey = (event) => {
      if (event.key === 'Escape') setViewer(false);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [viewer]);

  const openViewer = () => {
    setZoom(1);
    setViewer(true);
  };

  const stepZoom = (factor) => (event) => {
    event.stopPropagation();
    setZoom((z) => Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, Number((z * factor).toFixed(2)))));
  };

  return (
    <section id="contact" className="closing">
      <div className="container">
        <div className="closing__grid">
          <Reveal className="closing__col closing__cv">
            <p className="eyebrow">{cv.label}</p>
            <h2 className="closing__title">{cv.title}</h2>
            <div
              className="closing__cv-trigger"
              role="button"
              tabIndex={0}
              aria-haspopup="dialog"
              aria-label={cv.openLabel}
              onClick={openViewer}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  openViewer();
                }
              }}
            >
              <Photo src={cv.image} alt={cv.imageAlt} className="closing__cv-preview" />
            </div>
            <a className="closing__cv-download" href={cv.file} download>
              {cv.downloadCta}
            </a>
          </Reveal>

          <Reveal className="closing__col closing__quote" delay={150}>
            <span className="closing__rule" aria-hidden="true" />
            <blockquote className="quote">
              <Rich text={quote} />
            </blockquote>
          </Reveal>

          <Reveal className="closing__col closing__contact" delay={260}>
            <p className="eyebrow">{contact.label}</p>
            <h2 className="closing__title">{contact.title}</h2>
            <p className="closing__text">{contact.text}</p>
            <a className="closing__email" href={`mailto:${contact.email}`}>
              {contact.email}
            </a>
            <p className="closing__meta">
              <a href={contact.phoneHref}>{contact.phone}</a>
              <span aria-hidden="true"> · </span>
              {contact.location}
            </p>
            <p className="closing__social">
              <a href={contact.linkedin} target="_blank" rel="noreferrer">
                <IconLinkedIn size={15} />
                <span>{contact.linkedinLabel}</span>
              </a>
            </p>
            <div>
              <ArrowLink href={`mailto:${contact.email}`}>{contact.cta}</ArrowLink>
            </div>
          </Reveal>
        </div>
      </div>

      {viewer && (
        <div className="cv-viewer" role="dialog" aria-modal="true" aria-label={cv.imageAlt}>
          <div className="cv-viewer__bar">
            <button
              type="button"
              className="cv-viewer__btn"
              onClick={stepZoom(1 / ZOOM_STEP)}
              aria-label={cv.zoomOut}
              disabled={zoom <= ZOOM_MIN}
            >
              −
            </button>
            <span className="cv-viewer__zoom">{Math.round(zoom * 100)}%</span>
            <button
              type="button"
              className="cv-viewer__btn"
              onClick={stepZoom(ZOOM_STEP)}
              aria-label={cv.zoomIn}
              disabled={zoom >= ZOOM_MAX}
            >
              +
            </button>
            <button
              type="button"
              className="cv-viewer__btn cv-viewer__close"
              onClick={() => setViewer(false)}
              aria-label={cv.close}
            >
              ✕
            </button>
          </div>
          <div
            className={`cv-viewer__stage${zoom > ZOOM_MIN ? ' is-zoomed' : ''}`}
            onClick={() => setViewer(false)}
          >
            <img
              className="cv-viewer__img"
              src={cv.image}
              alt={cv.imageAlt}
              style={{ transform: `scale(${zoom})` }}
              onClick={(event) => event.stopPropagation()}
            />
          </div>
        </div>
      )}
    </section>
  );
}
