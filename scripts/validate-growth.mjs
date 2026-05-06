import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const requiredFiles = [
  'src/pages/tools/model-picker.astro',
  'src/pages/model-picker.astro',
  'src/pages/compare/claude-vs-gemini.astro',
  'src/pages/compare/gpt-vs-gemini.astro',
  'src/pages/compare/openai-vs-anthropic-api.astro',
  'scripts/audit-blog-facts.mjs',
];

let failed = false;
for (const file of requiredFiles) {
  const exists = fs.existsSync(path.join(root, file));
  console.log(`${exists ? 'PASS' : 'FAIL'} ${file}`);
  if (!exists) failed = true;
}

const sitemapPath = path.join(root, 'dist/sitemap.xml');
if (fs.existsSync(sitemapPath)) {
  const sitemap = fs.readFileSync(sitemapPath, 'utf8');
  const requiredUrls = [
    'https://aimodelbenchmarks.com/tools/model-picker/',
    'https://aimodelbenchmarks.com/model-picker/',
    'https://aimodelbenchmarks.com/compare/claude-vs-gemini/',
    'https://aimodelbenchmarks.com/compare/gpt-vs-gemini/',
    'https://aimodelbenchmarks.com/compare/openai-vs-anthropic-api/',
  ];
  for (const url of requiredUrls) {
    const present = sitemap.includes(url);
    console.log(`${present ? 'PASS' : 'FAIL'} sitemap ${url}`);
    if (!present) failed = true;
  }
} else {
  console.log('SKIP dist/sitemap.xml missing; run npm run build first');
}

process.exit(failed ? 1 : 0);
