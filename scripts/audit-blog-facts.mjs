import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const blogDir = path.join(root, 'src/content/blog');
const patterns = [
  { pattern: /\b5\.3-Codex-Spark\b/gi, reason: 'Not listed in official OpenAI model references.' },
  { pattern: /\bClaude Opus 4\.[67]\b/gi, reason: 'Not listed in official Anthropic model references.' },
  { pattern: /\bClaude 4o\b/gi, reason: 'No official Anthropic model named Claude 4o.' },
  { pattern: /\bKimi K2\.5\b/gi, reason: 'Public provider docs could not be validated in this build.' },
  { pattern: /\bKimi K3\b/gi, reason: 'Public provider docs could not be validated in this build.' },
];

const rows = [['file','match','reason']];
for (const file of fs.readdirSync(blogDir).filter((f) => f.endsWith('.md') || f.endsWith('.mdx'))) {
  const content = fs.readFileSync(path.join(blogDir, file), 'utf8');
  for (const rule of patterns) {
    const matches = [...content.matchAll(rule.pattern)].map((m) => m[0]);
    for (const match of matches) rows.push([file, match, rule.reason]);
  }
}
const outDir = path.join(root, 'reports');
fs.mkdirSync(outDir, { recursive: true });
const outPath = path.join(outDir, 'blog-fact-audit.csv');
fs.writeFileSync(outPath, rows.map((row) => row.map((cell) => `"${String(cell).replaceAll('"','""')}"`).join(',')).join('\n'));
const files = new Set(rows.slice(1).map((r) => r[0]));
console.log(`Blog fact audit: ${rows.length - 1} issues across ${files.size} files`);
console.log(outPath);
process.exit(0);
