const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error' && !msg.text().includes('Failed to load resource')) errors.push(msg.text());
  });
  page.on('response', response => {
    if (response.status() >= 400 && !response.url().includes('/_vercel/insights/script.js')) errors.push(`${response.status()} ${response.url()}`);
  });
  page.on('pageerror', err => errors.push(err.message));
  const base = 'http://localhost:4329';
  const paths = ['/tools/model-picker/','/cost-calculator/','/compare/claude-vs-gemini/','/compare/gpt-vs-gemini/','/compare/openai-vs-anthropic-api/'];
  for (const path of paths) {
    const res = await page.goto(base + path, { waitUntil: 'networkidle' });
    if (!res || res.status() !== 200) throw new Error(`${path} status ${res && res.status()}`);
    const h1 = await page.locator('h1').first().innerText();
    if (!h1.trim()) throw new Error(`${path} missing h1`);
    console.log('PASS route', path, h1);
  }
  await page.goto(base + '/tools/model-picker/?task=rag&budget=high&context=huge&tools=medium&deployment=any', { waitUntil: 'networkidle' });
  await page.click('#run-picker');
  const winner = await page.locator('#winner-name').innerText();
  const shortlist = await page.locator('.short-card').count();
  if (!winner || shortlist < 3) throw new Error('model picker failed');
  console.log('PASS picker winner', winner, 'shortlist', shortlist);
  await page.goto(base + '/cost-calculator/?preset=support', { waitUntil: 'networkidle' });
  const rows = await page.locator('#results tr').count();
  const monthly = await page.locator('#monthly-requests').innerText();
  if (rows < 5 || !monthly.includes('requests/mo')) throw new Error('calculator failed');
  console.log('PASS calculator rows', rows, monthly);
  if (errors.length) throw new Error('console errors: ' + errors.join('\n'));
  await browser.close();
})();
