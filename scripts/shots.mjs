/**
 * Visual review helper — captures screenshots of the site with the
 * system Edge/Chrome (no browser download required).
 *
 *   npm run dev            (in another terminal)
 *   node scripts/shots.mjs
 *
 * Screenshots land in ./shots/
 */
import { chromium } from 'playwright-core';
import { mkdirSync } from 'node:fs';
import path from 'node:path';

const BASE = 'http://localhost:5173';
const OUT = path.resolve('shots');
mkdirSync(OUT, { recursive: true });

const errors = [];

async function launch() {
  let lastErr;
  for (const channel of ['msedge', 'chrome']) {
    try {
      return await chromium.launch({ channel, headless: true });
    } catch (err) {
      lastErr = err;
    }
  }
  throw lastErr;
}

const browser = await launch();

const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
page.on('pageerror', (e) => errors.push('PAGEERROR: ' + e.message));
page.on('console', (m) => {
  if (m.type() === 'error') errors.push('CONSOLE: ' + m.text());
});

const shot = (name) => page.screenshot({ path: path.join(OUT, `${name}.png`) });

const goToSection = async (id, offset = 74) => {
  await page.evaluate(
    ({ i, o }) => {
      const el = document.getElementById(i);
      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - o });
    },
    { i: id, o: offset }
  );
  await page.waitForTimeout(1500);
};

/* ---------- Desktop FR ---------- */
await page.goto(`${BASE}/`, { waitUntil: 'load' });
await page.waitForTimeout(2600);
await shot('01-hero-fr');

await goToSection('a-propos');
await shot('02-about-fr');

await goToSection('portfolio');
await shot('03-portfolio-fr');

await goToSection('process');
await shot('04-featured-fr');

await page.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight }));
await page.waitForTimeout(1600);
await shot('05-closing-fr');

/* ---------- Project page ---------- */
await page.goto(`${BASE}/projet/taille-de-pierre`, { waitUntil: 'load' });
await page.waitForTimeout(2400);
await shot('06-project-hero-fr');

await goToSection('contenu');
await shot('07-project-body-fr');

await page.evaluate(() => window.scrollTo({ top: document.documentElement.scrollHeight }));
await page.waitForTimeout(1500);
await shot('08-project-end-fr');

/* ---------- Arabic / RTL ---------- */
await page.goto(`${BASE}/`, { waitUntil: 'load' });
await page.waitForTimeout(1600);
await page.getByRole('button', { name: 'AR' }).click();
await page.waitForTimeout(1400);
await shot('09-hero-ar');

await goToSection('a-propos');
await shot('10-about-ar');

await goToSection('portfolio');
await shot('11-portfolio-ar');

await goToSection('contact');
await shot('11b-closing-ar');

await page.goto(`${BASE}/projet/taille-de-pierre`, { waitUntil: 'load' });
await page.waitForTimeout(1500);
await page.getByRole('button', { name: 'AR', exact: true }).click();
await page.waitForTimeout(1700);
await shot('11c-project-ar');

await page.goto(`${BASE}/`, { waitUntil: 'load' });
await page.waitForTimeout(900);
await page.getByRole('button', { name: 'FR', exact: true }).click();
await page.waitForTimeout(500);

/* ---------- Mobile ---------- */
const mctx = await browser.newContext({
  viewport: { width: 390, height: 844 },
  isMobile: true,
  hasTouch: true,
});
const mp = await mctx.newPage();
mp.on('pageerror', (e) => errors.push('MOBILE PAGEERROR: ' + e.message));
await mp.goto(`${BASE}/`, { waitUntil: 'load' });
await mp.waitForTimeout(2200);
await mp.screenshot({ path: path.join(OUT, '12-mobile-hero.png') });

await mp.click('.burger');
await mp.waitForTimeout(900);
await mp.screenshot({ path: path.join(OUT, '13-mobile-menu.png') });

await mp.click('.burger');
await mp.waitForTimeout(500);
await mp.evaluate(() => {
  const el = document.getElementById('portfolio');
  if (el) window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY - 70);
});
await mp.waitForTimeout(1500);
await mp.screenshot({ path: path.join(OUT, '14-mobile-portfolio.png') });

await browser.close();

console.log(errors.length ? `ERRORS (${errors.length}):\n${errors.join('\n')}` : 'NO CONSOLE ERRORS');
console.log('DONE — screenshots in', OUT);
