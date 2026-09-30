import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../../i18n/LanguageContext.jsx';
import Reveal from '../../components/Reveal.jsx';
import Photo from '../../components/Photo.jsx';
import ArrowLink from '../../components/ArrowLink.jsx';
import Rich from '../../components/Rich.jsx';

function CardArrow() {
  return (
    <svg width="21" height="9" viewBox="0 0 28 9" fill="none" aria-hidden="true" focusable="false">
      <path d="M0 4.5h26M22.5 1 26 4.5 22.5 8" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

/** Number of projects shown before the "voir tous" link unfolds the rest. */
const VISIBLE_CARDS = 4;

export default function Portfolio() {
  const { t } = useLang();
  const [showAll, setShowAll] = useState(false);

  const cards = showAll ? t.portfolio.cards : t.portfolio.cards.slice(0, VISIBLE_CARDS);

  const toggle = (event) => {
    event.preventDefault();
    setShowAll((v) => !v);
  };

  return (
    <section id="portfolio" className="portfolio">
      <div className="container">
        <div className="section-head">
          <Reveal className="section-head__left">
            <p className="eyebrow">{t.portfolio.label}</p>
            <h2 className="section-title">
              <Rich text={t.portfolio.title} />
            </h2>
          </Reveal>
        </div>

        <div className="portfolio__grid" id="portfolio-grid">
          {cards.map((card, i) => {
            const inner = (
              <>
                {card.wip ? (
                  <span className="p-card__wip" />
                ) : (
                  <Photo
                    src={`/images/portfolio-${String(i + 1).padStart(2, '0')}.jpg`}
                    alt={card.alt}
                    className="p-card__photo"
                  />
                )}
                <span className="p-card__veil" />
                {card.wip && <span className="p-card__badge">{t.portfolio.inProgress}</span>}
                <span className="p-card__num">{card.n}</span>
                <h3 className="p-card__title">{card.t}</h3>
                <span className="p-card__arrow">
                  <CardArrow />
                </span>
              </>
            );

            return card.slug ? (
              <Reveal key={card.n} as={Link} to={`/projet/${card.slug}`} className="p-card" delay={i * 90}>
                {inner}
              </Reveal>
            ) : (
              <Reveal key={card.n} as="article" className="p-card" delay={i * 90}>
                {inner}
              </Reveal>
            );
          })}
        </div>

        <div className="portfolio__more">
          <ArrowLink
            href="#portfolio"
            onClick={toggle}
            aria-expanded={showAll}
            aria-controls="portfolio-grid"
          >
            {showAll ? t.portfolio.less : t.portfolio.cta}
          </ArrowLink>
        </div>
      </div>
    </section>
  );
}
