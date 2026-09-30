/**
 * Mobile visual review helper — captures FULL SECTION screenshots (not only
 * the viewport) so the internal order / rhythm of every block can be judged.
 *
 *   npm run dev            (in another terminal)
 *   node scripts/shots-mobile.mjs
 *
 * Output: ./shots/mobile/
 */
import { chromium } from 'playwright-core';
import { mkdirSync } from 'node:fs';
import path from 'node:path';

const BASE = 'http://localhost:5173';
const OUT = path.resolve('shots/mobile');
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

/** Reveal-on-scroll fires only once: walk the page down before shooting. */
async function warmUp(page) {
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.7;
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 90));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(900);
}

async function capture({ width, height, tag, lang = 'fr' }) {
  const ctx = await browser.newContext({
    viewport: { width, height },
    isMobile: true,
    hasTouch: true,
    deviceScaleFactor: 1,
  });
  const page = await ctx.newPage();
  page.on('pageerror', (e) => errors.push(`PAGEERROR ${tag}: ${e.message}`));
  page.on('console', (m) => {
    if (m.type() === 'error') errors.push(`CONSOLE ${tag}: ${m.text()}`);
  });

  const shot = (name, opts = {}) => page.screenshot({ path: path.join(OUT, `${name}.png`), ...opts });
  const block = async (name, selector) => {
    const loc = page.locator(selector).first();
    await loc.scrollIntoViewIfNeeded();
    await page.waitForTimeout(250);
    await loc.screenshot({ path: path.join(OUT, `${name}.png`) });
  };

  await page.goto(`${BASE}/`, { waitUntil: 'load' });
  await page.waitForTimeout(2200);
  if (lang === 'ar') {
    await page.getByRole('button', { name: 'AR', exact: true }).click();
    await page.waitForTimeout(1000);
  }

  /* Above the fold + open menu */
  await shot(`${tag}-00-header`);
  await block(`${tag}-01-hero`, 'section.hero');
  await page.click('.burger');
  await page.waitForTimeout(900);
  await shot(`${tag}-02-menu`);
  await page.click('.burger');
  await page.waitForTimeout(600);

  /* Sections, whole blocks */
  await warmUp(page);
  await block(`${tag}-03-about`, 'section.about');
  await block(`${tag}-04-portfolio`, 'section.portfolio');
  await block(`${tag}-05-process`, 'section.featured');
  await block(`${tag}-06-contact`, 'section.closing');
  await block(`${tag}-07-footer`, 'footer.site-footer');

  /* Portfolio unfolded (all cards) */
  await page.locator('.portfolio__more a').scrollIntoViewIfNeeded();
  await page.click('.portfolio__more a');
  await page.waitForTimeout(1200);
  await warmUp(page);
  await block(`${tag}-08-portfolio-all`, 'section.portfolio');

  /* Project page */
  await page.goto(`${BASE}/projet/taille-de-pierre`, { waitUntil: 'load' });
  await page.waitForTimeout(2000);
  if (lang === 'ar') {
    await page.getByRole('button', { name: 'AR', exact: true }).click();
    await page.waitForTimeout(1000);
  }
  await block(`${tag}-09-project-hero`, 'section.project-hero');
  await warmUp(page);
  await block(`${tag}-10-project-body`, 'section.project-body');

  await ctx.close();
}

await capture({ width: 390, height: 844, tag: 'm390-fr' });
await capture({ width: 320, height: 568, tag: 'm320-fr' });
await capture({ width: 390, height: 844, tag: 'm390-ar', lang: 'ar' });

await browser.close();

console.log(errors.length ? `ERRORS (${errors.length}):\n${errors.join('\n')}` : 'NO CONSOLE ERRORS');
console.log('DONE — screenshots in', OUT);
