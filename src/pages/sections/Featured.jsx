import { useLang } from '../../i18n/LanguageContext.jsx';
import Reveal from '../../components/Reveal.jsx';
import Photo from '../../components/Photo.jsx';
import ArrowLink from '../../components/ArrowLink.jsx';
import Rich from '../../components/Rich.jsx';
import {
  IconEye,
  IconMagnifier,
  IconPencil,
  IconFlask,
  IconPlan,
  IconGem,
} from '../../components/FineIcons.jsx';

const STEP_ICONS = [IconEye, IconMagnifier, IconPencil, IconFlask, IconPlan, IconGem];

export default function Featured() {
  const { t } = useLang();

  return (
    <section id="process" className="featured">
      <div className="container">
        <div className="featured__grid">
          <Reveal className="featured__media">
            <Photo
              src="/images/featured-texture.jpg"
              alt={t.featured.photo}
              className="featured__photo"
            />
          </Reveal>

          <Reveal className="featured__body" delay={140}>
            <p className="eyebrow">{t.featured.label}</p>
            <h2 className="section-title">
              <Rich text={t.featured.title} />
            </h2>
            <p className="featured__sub">
              <Rich text={t.featured.sub} />
            </p>
            <div className="featured__cta">
              <ArrowLink to="/projet/taille-de-pierre">{t.featured.cta}</ArrowLink>
            </div>
          </Reveal>

          <Reveal className="featured__process" delay={250}>
            <p className="eyebrow">{t.featured.processLabel}</p>
            <h3 className="featured__process-title">{t.featured.processTitle}</h3>
            <ol className="steps">
              {t.featured.steps.map((step, i) => {
                const Icon = STEP_ICONS[i];
                return (
                  <li className="steps__item" key={step}>
                    <span className="steps__icon">
                      <Icon size={19} />
                    </span>
                    <span className="steps__label">{step}</span>
                    <span className="steps__num">{String(i + 1).padStart(2, '0')}</span>
                  </li>
                );
              })}
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
