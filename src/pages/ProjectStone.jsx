import { useNavigate } from 'react-router-dom';
import { useLang } from '../i18n/LanguageContext.jsx';
import Reveal from '../components/Reveal.jsx';
import Photo from '../components/Photo.jsx';
import ArrowLink from '../components/ArrowLink.jsx';
import Rich from '../components/Rich.jsx';
import useParallax from '../hooks/useParallax.js';
import { IconCube, IconHammer, IconPin } from '../components/FineIcons.jsx';
import { scrollToId } from '../lib/scroll.js';

function BackArrow() {
  return (
    <svg className="ico" width="21" height="9" viewBox="0 0 28 9" fill="none" aria-hidden="true">
      <path d="M28 4.5H2M5.5 1 2 4.5 5.5 8" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export default function ProjectStone() {
  const { t } = useLang();
  const navigate = useNavigate();
  const p = t.project;
  const mediaRef = useParallax(48);

  const goBack = () => navigate('/#portfolio');
  const goContent = (event) => {
    event.preventDefault();
    scrollToId('contenu');
  };

  const info = [
    { Icon: IconCube, label: p.info.materialLabel, value: p.info.materialValue },
    { Icon: IconHammer, label: p.info.techLabel, value: p.info.techValue },
    { Icon: IconPin, label: p.info.placeLabel, value: p.info.placeValue },
  ];

  return (
    <article className="project">
      <section className="project-hero">
        <div className="project-hero__media" ref={mediaRef}>
          <Photo
            src="/images/project-hero.jpg"
            alt={p.heroPhoto}
            className="project-hero__photo"
            priority
          />
        </div>
        <div className="project-hero__scrim" />
        <div className="container project-hero__inner">
          <div className="project-hero__content">
            <button type="button" className="project-hero__back" onClick={goBack}>
              <BackArrow />
              {p.back}
            </button>
            <p className="eyebrow project-hero__eyebrow">{p.eyebrow}</p>
            <h1 className="project-hero__title">{p.title}</h1>
            <p className="project-hero__sub">
              <Rich text={p.sub} />
            </p>
            <p className="project-hero__intro">{p.intro}</p>
            <div className="project-hero__cta">
              <ArrowLink light href="#contenu" onClick={goContent}>
                {p.cta}
              </ArrowLink>
            </div>
          </div>
        </div>
      </section>

      <section className="project-body" id="contenu">
        <div className="container">
          <div className="project-grid">
            <div className="project-gallery">
              {p.gallery.map((g, i) => (
                <Reveal className="project-gallery__item" key={g.n} delay={i * 70}>
                  <Photo
                    src={`/images/gallery-0${i + 1}.jpg`}
                    alt={g.alt}
                    className="project-gallery__photo"
                  />
                  <p className="project-gallery__cap">
                    <b>{g.n}</b> {g.cap}
                  </p>
                </Reveal>
              ))}
            </div>

            <div className="project-content">
              {p.sections.map((s, i) => (
                <Reveal as="section" className="project-section" key={s.n} delay={i * 70}>
                  <div className="project-section__head">
                    <span className="project-section__num">{s.n}</span>
                    <h2 className="project-section__title">{s.title}</h2>
                  </div>
                  <p className="project-section__text">{s.text}</p>
                </Reveal>
              ))}
            </div>

            <Reveal as="aside" className="project-info" delay={160}>
              <dl className="info-list">
                {info.map(({ Icon, label, value }) => (
                  <div className="info-list__item" key={label}>
                    <dt>
                      <Icon size={18} />
                      {label}
                    </dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
              <blockquote className="project-info__quote">
                <Rich text={p.quote} />
              </blockquote>
              <ArrowLink box to="/#portfolio">
                {p.allCta}
              </ArrowLink>
            </Reveal>
          </div>
        </div>
      </section>
    </article>
  );
}
