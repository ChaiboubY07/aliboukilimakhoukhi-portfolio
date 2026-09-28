import { Link } from 'react-router-dom';

export function ArrowSvg() {
  return (
    <span className="arrow-link__arrow" aria-hidden="true">
      <svg width="28" height="9" viewBox="0 0 28 9" fill="none" focusable="false">
        <path d="M0 4.5h26M22.5 1 26 4.5 22.5 8" stroke="currentColor" strokeWidth="1" />
      </svg>
    </span>
  );
}

/**
 * Editorial call-to-action link. Use `to` for internal routes,
 * `href` for anchors / mailto.
 */
export default function ArrowLink({
  to,
  href = '#',
  onClick,
  children,
  className = '',
  light = false,
  box = false,
  label = false,
}) {
  const cls = ['arrow-link', light && 'arrow-link--light', box && 'arrow-link--box', className]
    .filter(Boolean)
    .join(' ');

  const content = (
    <>
      <span className="arrow-link__label">{children}</span>
      <ArrowSvg />
    </>
  );

  if (to) {
    return (
      <Link className={cls} to={to} onClick={onClick} aria-label={label || undefined}>
        {content}
      </Link>
    );
  }

  return (
    <a className={cls} href={href} onClick={onClick} aria-label={label || undefined}>
      {content}
    </a>
  );
}

