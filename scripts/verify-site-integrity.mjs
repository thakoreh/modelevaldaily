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

const constants = read('src/consts.ts');
assert.match(constants, /import \{ MODEL_DATA_VERIFIED_ON \} from '\.\/data\/verified-models';/);
assert.match(constants, /SITE_UPDATED = MODEL_DATA_VERIFIED_ON/);
assert.match(constants, /STALE_REVIEW_PATHS/);

const verifiedModels = read('src/data/verified-models.ts');
assert.doesNotMatch(verifiedModels, /https:\/\/openai\.com\/index\/introducing-gpt-oss\//);

assert.equal(fs.existsSync(path.join(root, 'public/robots.txt')), false, 'dynamic robots endpoint must be the only source of robots.txt');

const factCheck = read('src/utils/fact-check.ts');
assert.doesNotMatch(factCheck, /Kimi K3/);

const vercel = JSON.parse(read('vercel.json'));
const headerSource = vercel.headers?.find((entry) => entry.source === '/(.*)');
assert.ok(headerSource, 'vercel.json must define site-wide security headers');
for (const headerName of ['Content-Security-Policy', 'X-Content-Type-Options', 'Referrer-Policy', 'Permissions-Policy']) {
  assert.ok(headerSource.headers.some((header) => header.key === headerName), `missing ${headerName}`);
}

console.log('PASS site integrity regression checks');
