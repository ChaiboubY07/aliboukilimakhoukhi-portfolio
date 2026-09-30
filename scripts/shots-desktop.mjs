/**
 * Desktop non-regression comparator.
 *
 *   node scripts/shots-desktop.mjs before
 *   node scripts/shots-desktop.mjs after
 *
 * Writes full-page captures at 1440 and 1280 into
 * ./shots/desktop-<label>/ so the two runs can be diffed byte-wise.
 */
import { chromium } from 'playwright-core';
import { mkdirSync } from 'node:fs';
import path from 'node:path';

const BASE = 'http://localhost:5173';
const label = process.argv[2] || 'run';
const OUT = path.resolve('shots', `desktop-${label}`);
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

/** Walk the page down so every Reveal has fired, then return to the top. */
async function warmUp() {
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.7;
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 80));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(1200);
}

const shot = (name) =>
  page.screenshot({ path: path.join(OUT, `${name}.png`), fullPage: true });

await page.goto(`${BASE}/`, { waitUntil: 'load' });
await page.waitForTimeout(2600);
await warmUp();
await shot('1440-home');

await page.setViewportSize({ width: 1280, height: 900 });
await page.waitForTimeout(1000);
await shot('1280-home');

await page.setViewportSize({ width: 1440, height: 900 });
await page.goto(`${BASE}/projet/taille-de-pierre`, { waitUntil: 'load' });
await page.waitForTimeout(2200);
await warmUp();
await shot('1440-project');

await browser.close();

console.log(errors.length ? `ERRORS (${errors.length}):\n${errors.join('\n')}` : 'NO CONSOLE ERRORS');
console.log('DONE —', OUT);
