/**
 * Interaction smoke tests — run with the dev server up:
 *   node scripts/interactions.mjs
 */
import { chromium } from 'playwright-core';

const BASE = 'http://localhost:5173';
const results = [];
const check = (name, cond) => results.push(`${cond ? 'PASS' : 'FAIL'}  ${name}`);

let lastErr;
const browser = await (async () => {
  for (const channel of ['msedge', 'chrome']) {
    try {
      return await chromium.launch({ channel, headless: true });
    } catch (e) {
      lastErr = e;
    }
  }
  throw lastErr;
})();

const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [];
page.on('pageerror', (e) => errors.push('PAGEERROR: ' + e.message));

/* 1 — "EN SAVOIR PLUS" expands the extra paragraph */
await page.goto(`${BASE}/`, { waitUntil: 'load' });
await page.waitForTimeout(1200);
await page.click('.about__more');
await page.waitForTimeout(800);
check('about: extra paragraph expands', (await page.locator('.about__extra.is-open').count()) === 1);

/* 2 — CV preview image (not a link) + PDF download link at the bottom */
const cv = await page.evaluate(() => {
  const prev = document.querySelector('.closing__cv-preview');
  const img = prev?.querySelector('img');
  const ph = prev?.querySelector('.photo-ph');
  const dl = document.querySelector('.closing__cv-download');
  return {
    preview: !!prev,
    imgSrc: img?.getAttribute('src') ?? null,
    placeholder: !!ph,
    dlHref: dl?.getAttribute('href'),
    hasDownload: dl?.hasAttribute('download'),
    fileLinkGone: !document.querySelector('.closing__cv-file'),
  };
});
check(
  'closing: CV preview present (image or placeholder)',
  cv.preview && (cv.imgSrc === '/cv/cv.jpg' || cv.placeholder)
);
check('closing: CV preview is not a link', cv.fileLinkGone);
check('closing: CV download link present', cv.hasDownload === true && cv.dlHref === '/cv/cv.pdf');

/* 2b — click the preview → lightbox opens, zoom in/out works, Esc closes */
await page.click('.closing__cv-trigger');
await page.waitForTimeout(500);
check('cv viewer: opens on click', (await page.locator('.cv-viewer[role="dialog"]').count()) === 1);
const zBefore = await page.locator('.cv-viewer__zoom').innerText();
await page.click('.cv-viewer__bar button:nth-of-type(2)');
await page.waitForTimeout(350);
const zAfter = await page.locator('.cv-viewer__zoom').innerText();
check('cv viewer: zoom in changes scale', zBefore !== zAfter && zAfter === '130%');
check('cv viewer: stage marked zoomed', (await page.locator('.cv-viewer__stage.is-zoomed').count()) === 1);
await page.click('.cv-viewer__bar button:nth-of-type(1)');
await page.waitForTimeout(350);
const zBack = await page.locator('.cv-viewer__zoom').innerText();
check('cv viewer: zoom out back to 100%', zBack === '100%');
await page.keyboard.press('Escape');
await page.waitForTimeout(350);
check('cv viewer: Escape closes', (await page.locator('.cv-viewer').count()) === 0);

/* 2c — LinkedIn logo in the contact column + footer */
const liContact = await page.evaluate(() => {
  const a = document.querySelector('.closing__social a');
  return { href: a?.getAttribute('href'), hasSvg: !!a?.querySelector('svg') };
});
check(
  'contact: LinkedIn logo + correct href',
  liContact.hasSvg && liContact.href === 'https://www.linkedin.com/in/ali-boukili-makhoukhi-2a26b0297'
);
const liFooter = await page.evaluate(() => {
  const a = document.querySelector('.site-footer__link');
  return {
    href: a?.getAttribute('href'),
    hasSvg: !!a?.querySelector('svg'),
    label: a?.getAttribute('aria-label'),
  };
});
check(
  'footer: LinkedIn logo (text replaced) + correct href',
  liFooter.hasSvg &&
    liFooter.label === 'LinkedIn' &&
    liFooter.href === 'https://www.linkedin.com/in/ali-boukili-makhoukhi-2a26b0297'
);

/* 3 — nav link scrolls to the section + scroll-spy underline */
await page.click('.nav__link[href="#portfolio"]');
await page.waitForTimeout(1500);
const posOk = await page.evaluate(() => {
  const y = window.scrollY;
  const top = document.getElementById('portfolio').getBoundingClientRect().top + window.scrollY;
  return Math.abs(y - (top - 88)) < 70;
});
check('nav: click scrolls to portfolio', posOk);
const active = await page.evaluate(() => document.querySelector('.nav__link.is-active')?.textContent);
check('nav: PORTFOLIO underlined', active === 'PORTFOLIO');
const navCount = await page.locator('.nav .nav__link').count();
check('nav: exactly 5 links', navCount === 5);

/* 4 — card 01 opens the project page */
await page.click('.p-card[href]');
await page.waitForTimeout(1500);
check('card 01 → project route', page.url().includes('/projet/taille-de-pierre'));
const h1 = await page.locator('h1.project-hero__title').innerText();
check('project h1 rendered', h1.includes('Arc en pierre'));

/* 5 — boxed CTA returns to home + portfolio anchor */
await page.click('.project-info .arrow-link--box');
await page.waitForTimeout(1700);
check('project CTA → home #portfolio', page.url().includes('#portfolio'));
const nearPortfolio = await page.evaluate(() => {
  const top = document.getElementById('portfolio')?.getBoundingClientRect().top;
  return top !== null && Math.abs(top) < 220;
});
check('scrolled to portfolio anchor', nearPortfolio);

/* 6 — language switch flips to RTL */
await page.getByRole('button', { name: 'AR', exact: true }).click();
await page.waitForTimeout(600);
check('language: html dir=rtl', (await page.evaluate(() => document.documentElement.dir)) === 'rtl');
check('language: html lang=ar', (await page.evaluate(() => document.documentElement.lang)) === 'ar');
const arActive = await page.evaluate(() => document.querySelector('.nav__link.is-active')?.textContent);
check('language: nav translated', arActive === 'أعمالي');

/* 7 — featured CTA opens the project */
await page.goto(`${BASE}/`, { waitUntil: 'load' });
await page.waitForTimeout(900);
await page.click('.featured__cta a');
await page.waitForTimeout(1400);
check('featured CTA → project route', page.url().includes('/projet/taille-de-pierre'));

/* 8 — project hero CTA scrolls to content */
await page.click('.project-hero__cta a');
await page.waitForTimeout(1500);
const atContent = await page.evaluate(() => {
  const top = document.getElementById('contenu')?.getBoundingClientRect().top;
  return top !== null && Math.abs(top) < 220;
});
check('project hero CTA scrolls to body', atContent);

/* 9 — CONTACT underline in the closing band */
await page.goto(`${BASE}/`, { waitUntil: 'load' });
await page.waitForTimeout(1000);
await page.click('.nav__link[href="#contact"]');
await page.waitForTimeout(1700);
const contactActive = await page.evaluate(
  () => document.querySelector('.nav__link.is-active')?.textContent
);
check('nav: CONTACT underlined after CONTACT click', contactActive === 'CONTACT');

/* 10 — scrolling away switches the underline back */
await page.click('.nav__link[href="#portfolio"]');
await page.waitForTimeout(1700);
const backActive = await page.evaluate(
  () => document.querySelector('.nav__link.is-active')?.textContent
);
check('nav: PORTFOLIO again after re-click', backActive === 'PORTFOLIO');

await browser.close();

console.log(results.join('\n'));
console.log(errors.length ? `PAGE ERRORS:\n${errors.join('\n')}` : 'NO PAGE ERRORS');
const failed = results.filter((r) => r.startsWith('FAIL')).length;
console.log(failed ? `${failed} CHECK(S) FAILED` : 'ALL CHECKS PASSED');
