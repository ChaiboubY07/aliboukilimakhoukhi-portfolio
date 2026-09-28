import { useState } from 'react';
import { useLang } from '../../i18n/LanguageContext.jsx';
import Reveal from '../../components/Reveal.jsx';
import ArrowLink, { ArrowSvg } from '../../components/ArrowLink.jsx';
import Rich from '../../components/Rich.jsx';

export default function Closing() {
  const { t } = useLang();
  const [note, setNote] = useState(false);
  const { cv, quote, contact } = t.closing;

  return (
    <section id="contact" className="closing">
      <div className="container">
        <div className="closing__grid">
          <Reveal className="closing__col closing__cv">
            <p className="eyebrow">{cv.label}</p>
            <h2 className="closing__title">{cv.title}</h2>
            <ul className="closing__list">
              {cv.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <button
              type="button"
              className="arrow-link"
              onClick={() => setNote((v) => !v)}
              aria-expanded={note}
            >
              <span className="arrow-link__label">{cv.cta}</span>
              <ArrowSvg />
            </button>
            <div className={`closing__note${note ? ' is-visible' : ''}`}>
              <span>
                <p>{cv.note}</p>
              </span>
            </div>
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
            <div>
              <ArrowLink href={`mailto:${contact.email}`}>{contact.cta}</ArrowLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
