import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const read = (relativePath) => fs.readFileSync(path.join(root, relativePath), 'utf8');

const calculator = read('src/pages/cost-calculator.astro');
assert.match(calculator, /import \{ MODEL_DATA_VERIFIED_ON, VERIFIED_MODELS \} from '\.\.\/data\/verified-models';/);
assert.doesNotMatch(calculator, /from '\.\.\/data\/pricing'/);

const picker = read('src/pages/tools/model-picker.astro');
assert.match(picker, /Answer five questions/);
assert.match(picker, /Decision scores are relative to your selections/);
assert.doesNotMatch(picker, /Fit score/);
assert.match(picker, /data-analytics="model_picker_run"/, 'picker submit intent must be tracked');
assert.match(picker, /data-analytics="model_picker_cost_estimate"/, 'picker-to-cost-calculator conversion must be tracked');
assert.match(picker, /data-analytics="model_picker_compare"/, 'picker-to-comparison conversion must be tracked');

assert.match(calculator, /data-analytics="cost_calculator_calculate"/, 'cost-calculator calculation intent must be tracked');
assert.match(calculator, /data-analytics="cost_calculator_share"/, 'cost-calculator share intent must be tracked');

const models = read('src/pages/models.astro');
assert.match(models, /search\.value = new URLSearchParams\(window\.location\.search\)\.get\('q'\) \|\| '';/, 'model search must honor the SearchAction q parameter');
assert.match(models, /search\.value = new URLSearchParams[\s\S]*?apply\(\);/, 'model search query must be applied on load');
assert.doesNotMatch(models, /priceValidUntil/, 'pricing evidence must not claim an arbitrary offer-expiration date');

const constants = read('src/consts.ts');
assert.match(constants, /import \{ MODEL_DATA_VERIFIED_ON \} from '\.\/data\/verified-models';/);
assert.match(constants, /SITE_UPDATED = MODEL_DATA_VERIFIED_ON/);
assert.match(constants, /STALE_REVIEW_PATHS/);

const verifiedModels = read('src/data/verified-models.ts');
assert.doesNotMatch(verifiedModels, /https:\/\/openai\.com\/index\/introducing-gpt-oss\//);

assert.equal(fs.existsSync(path.join(root, 'public/robots.txt')), false, 'dynamic robots endpoint must be the only source of robots.txt');

const factCheck = read('src/utils/fact-check.ts');
assert.doesNotMatch(factCheck, /Kimi K3/);

const faq = read('src/pages/faq.astro');
assert.match(faq, /MODEL_DATA_VERIFIED_ON/, 'FAQ current-model claims must expose the catalog review date');
assert.match(faq, /source-reviewed API catalog/, 'FAQ pricing answer must identify its evidence boundary');
assert.doesNotMatch(faq, /DeepSeek-R1/, 'FAQ must not retain superseded API pricing guidance');
assert.doesNotMatch(faq, /We use blind scoring/, 'FAQ must not claim an unimplemented evaluation process');

assert.doesNotMatch(constants, /'\/faq\/'/, 'refreshed FAQ should be indexable and eligible for the sitemap');
const expectedStaleReviewPaths = [
  '/benchmarks/chatbot-arena/',
  '/benchmarks/mmlu/',
  '/benchmarks/swe-bench/',
  '/best-ai-model-for-agents/',
  '/best-ai-model-for-coding/',
  '/best-long-context-models/',
  '/best-open-weight-models/',
  '/cheapest-ai-models/',
  '/coding-agents/',
  '/compare/claude-vs-gemini/',
  '/compare/gpt-vs-gemini/',
  '/openclaw/',
  '/use-cases/coding/',
  '/use-cases/cost-optimization/',
  '/use-cases/reasoning/',
];
for (const stalePath of expectedStaleReviewPaths) {
  assert.match(constants, new RegExp(`'${stalePath}'`), `${stalePath} must remain protected from indexing until refreshed`);
}
assert.match(read('src/components/BaseHead.astro'), /const shouldNoindex = noindex \|\| STALE_REVIEW_PATHS\.has\(Astro\.url\.pathname\);/, 'stale review paths must receive a noindex directive');
const sitemap = read('src/pages/sitemap.xml.ts');
assert.match(sitemap, /\.filter\(\(page\) => !STALE_REVIEW_PATHS\.has\(page\.path\)\)/, 'stale review paths must stay out of the sitemap');

const llms = read('src/pages/llms.txt.ts');
assert.match(llms, /## Decision tools/);
assert.match(llms, /Choose a model for a specific coding, agent, RAG, reasoning, extraction, or local workflow/);
assert.match(llms, /Estimate monthly API spend from request volume, token mix, retries, and cache hits/);
const llmsUrls = [...llms.matchAll(/https:\/\/aimodelbenchmarks\.com\/[\w/-]*\//g)].map((match) => match[0]);
assert.equal(new Set(llmsUrls).size, llmsUrls.length, 'llms.txt must not repeat route URLs');

const vercel = JSON.parse(read('vercel.json'));
const expectedRedirects = new Map([
  ['/model-picker', '/tools/model-picker/'],
  ['/model-picker/', '/tools/model-picker/'],
  ['/tools/cost-calculator', '/cost-calculator/'],
  ['/tools/cost-calculator/', '/cost-calculator/'],
]);
assert.equal(vercel.redirects?.length, expectedRedirects.size, 'vercel.json must retain the legacy-tool redirect set');
for (const [source, destination] of expectedRedirects) {
  const redirect = vercel.redirects.find((entry) => entry.source === source);
  assert.deepEqual(redirect, { source, destination, permanent: true }, `missing permanent redirect for ${source}`);
}
const headerSource = vercel.headers?.find((entry) => entry.source === '/(.*)');
assert.ok(headerSource, 'vercel.json must define site-wide security headers');
for (const headerName of ['Content-Security-Policy', 'X-Content-Type-Options', 'Referrer-Policy', 'Permissions-Policy']) {
  assert.ok(headerSource.headers.some((header) => header.key === headerName), `missing ${headerName}`);
}

console.log('PASS site integrity regression checks');
