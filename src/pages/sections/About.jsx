import { useState } from 'react';
import { useLang } from '../../i18n/LanguageContext.jsx';
import Reveal from '../../components/Reveal.jsx';
import Photo from '../../components/Photo.jsx';
import { ArrowSvg } from '../../components/ArrowLink.jsx';
import {
  IconCompass,
  IconHammer,
  IconArch,
  IconBlocks,
  IconMagnifier,
  IconStar,
} from '../../components/FineIcons.jsx';

const ICONS = [IconCompass, IconHammer, IconArch, IconBlocks, IconMagnifier, IconStar];

export default function About() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);

  return (
    <section id="a-propos" className="about">
      <div className="container">
        <div className="about__grid">
          <Reveal className="about__media">
            <Photo src="/images/about-artisan.jpg" alt={t.about.photo} className="about__photo" />
            <p className="about__caption">{t.about.caption}</p>
          </Reveal>

          <Reveal className="about__body" delay={130}>
            <p className="eyebrow">{t.about.label}</p>
            <h2 className="about__title">{t.about.title}</h2>
            <p className="about__text">{t.about.text}</p>
            <div className={`about__extra${open ? ' is-open' : ''}`}>
              <span>
                <p>{t.about.extra}</p>
              </span>
            </div>
            <button
              type="button"
              className="arrow-link about__more"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
            >
              <span className="arrow-link__label">{open ? t.about.less : t.about.more}</span>
              <ArrowSvg />
            </button>
          </Reveal>

          <Reveal className="about__list" delay={240}>
            <ul>
              {t.about.items.map((label, i) => {
                const Icon = ICONS[i];
                return (
                  <li key={label}>
                    <Icon size={21} />
                    <span>{label}</span>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
