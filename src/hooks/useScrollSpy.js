import { useEffect, useState } from 'react';

const HEADER_OFFSET = 96;

/**
 * Returns the id of the section currently under the header line.
 * The last section is shorter than the space below that line, so it can
 * never reach it: it lights up once it owns the viewport centre instead.
 */
export default function useScrollSpy(ids) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    let raf = 0;

    const measure = () => {
      raf = 0;
      const line = window.scrollY + HEADER_OFFSET;
      const centre = window.scrollY + window.innerHeight * 0.5;

      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top + window.scrollY;
        const reach = id === ids[ids.length - 1] ? centre : line;
        if (top <= reach) current = id;
      }
      setActive(current);
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ids]);

  return active;
}
