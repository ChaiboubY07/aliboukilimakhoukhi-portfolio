import { useState } from 'react';

/**
 * Image with graceful fallback: if the file is missing, an elegant
 * mineral-toned placeholder is displayed instead of a broken image.
 * Expected files live in /public/images/ — see public/images/IMAGES.md.
 */
export default function Photo({ src, alt, className = '', imgClass = '', priority = false, children }) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={`photo ${className}`.trim()}>
      {failed ? (
        <div className="photo-ph" role="img" aria-label={alt}>
          <span className="photo-ph__mark">AB</span>
          <span className="photo-ph__label">{alt}</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          className={imgClass}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onError={() => setFailed(true)}
        />
      )}
      {children}
    </div>
  );
}
