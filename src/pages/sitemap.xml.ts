import { getCollection } from 'astro:content';
import { SITE_UPDATED } from '../consts';
import { isFactCheckedPost } from '../utils/fact-check';

export async function GET() {
	const posts = (await getCollection('blog')).filter((post) => isFactCheckedPost(post));
	const base = 'https://aimodelbenchmarks.com';
	const defaultLastmod = SITE_UPDATED;

	const staticPages = [
		{ path: '/', priority: '1.0', changefreq: 'daily', lastmod: defaultLastmod },
		{ path: '/models/', priority: '0.95', changefreq: 'daily', lastmod: defaultLastmod },
		{ path: '/scorecards/', priority: '0.9', changefreq: 'daily', lastmod: defaultLastmod },
		{ path: '/compare/', priority: '0.9', changefreq: 'weekly', lastmod: defaultLastmod },
		{ path: '/cost-calculator/', priority: '0.9', changefreq: 'weekly', lastmod: defaultLastmod },
		{ path: '/tools/cost-calculator/', priority: '0.8', changefreq: 'weekly', lastmod: defaultLastmod },
		{ path: '/tools/model-picker/', priority: '0.92', changefreq: 'weekly', lastmod: defaultLastmod },
		{ path: '/model-picker/', priority: '0.74', changefreq: 'monthly', lastmod: defaultLastmod },
		{ path: '/blog/', priority: '0.85', changefreq: 'daily', lastmod: defaultLastmod },
		{ path: '/model-data/', priority: '0.8', changefreq: 'weekly', lastmod: defaultLastmod },
		{ path: '/best-ai-model-for-coding/', priority: '0.9', changefreq: 'weekly', lastmod: defaultLastmod },
		{ path: '/best-ai-model-for-agents/', priority: '0.9', changefreq: 'weekly', lastmod: defaultLastmod },
		{ path: '/cheapest-ai-models/', priority: '0.88', changefreq: 'weekly', lastmod: defaultLastmod },
		{ path: '/best-long-context-models/', priority: '0.86', changefreq: 'weekly', lastmod: defaultLastmod },
		{ path: '/best-open-weight-models/', priority: '0.86', changefreq: 'weekly', lastmod: defaultLastmod },
		{ path: '/local-models/', priority: '0.84', changefreq: 'weekly', lastmod: defaultLastmod },
		{ path: '/best-openai-models/', priority: '0.82', changefreq: 'weekly', lastmod: defaultLastmod },
		{ path: '/best-anthropic-models/', priority: '0.82', changefreq: 'weekly', lastmod: defaultLastmod },
		{ path: '/best-google-models/', priority: '0.82', changefreq: 'weekly', lastmod: defaultLastmod },
		{ path: '/open-vs-proprietary/', priority: '0.8', changefreq: 'weekly', lastmod: defaultLastmod },
		{ path: '/compare/claude-vs-gpt/', priority: '0.82', changefreq: 'weekly', lastmod: defaultLastmod },
		{ path: '/compare/claude-vs-gemini/', priority: '0.82', changefreq: 'weekly', lastmod: defaultLastmod },
		{ path: '/compare/gpt-vs-gemini/', priority: '0.82', changefreq: 'weekly', lastmod: defaultLastmod },
		{ path: '/compare/openai-vs-anthropic-api/', priority: '0.82', changefreq: 'weekly', lastmod: defaultLastmod },
		{ path: '/compare/deepseek-vs-claude/', priority: '0.8', changefreq: 'weekly', lastmod: defaultLastmod },
		{ path: '/compare/gpt5-vs-claude-opus-46/', priority: '0.8', changefreq: 'weekly', lastmod: defaultLastmod },
		{ path: '/compare/open-source-vs-closed/', priority: '0.8', changefreq: 'weekly', lastmod: defaultLastmod },
		{ path: '/benchmarks/swe-bench/', priority: '0.82', changefreq: 'weekly', lastmod: defaultLastmod },
		{ path: '/benchmarks/mmlu/', priority: '0.78', changefreq: 'weekly', lastmod: defaultLastmod },
		{ path: '/benchmarks/chatbot-arena/', priority: '0.78', changefreq: 'weekly', lastmod: defaultLastmod },
		{ path: '/use-cases/coding/', priority: '0.82', changefreq: 'weekly', lastmod: defaultLastmod },
		{ path: '/use-cases/cost-optimization/', priority: '0.82', changefreq: 'weekly', lastmod: defaultLastmod },
		{ path: '/use-cases/reasoning/', priority: '0.78', changefreq: 'weekly', lastmod: defaultLastmod },
		{ path: '/elo/', priority: '0.75', changefreq: 'weekly', lastmod: defaultLastmod },
		{ path: '/prompts/', priority: '0.72', changefreq: 'monthly', lastmod: defaultLastmod },
		{ path: '/openclaw/', priority: '0.7', changefreq: 'monthly', lastmod: defaultLastmod },
		{ path: '/faq/', priority: '0.7', changefreq: 'weekly', lastmod: defaultLastmod },
		{ path: '/about/', priority: '0.6', changefreq: 'monthly', lastmod: defaultLastmod },
	];

	const blogUrls = posts
		.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
		.map((post) => {
			const lastmod = post.data.updatedDate 
				? post.data.updatedDate.toISOString().split('T')[0] 
				: post.data.pubDate.toISOString().split('T')[0];
			return `  <url>
    <loc>${base}/blog/${post.id}/</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`;
		})
		.join('\n');

	const staticUrls = staticPages
		.map((page) => `  <url>
    <loc>${base}${page.path}</loc>
    <lastmod>${page.lastmod ?? defaultLastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`)
		.join('\n');

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticUrls}
${blogUrls}
</urlset>`;

	return new Response(body, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8',
			'Cache-Control': 'public, max-age=3600',
		},
	});
}
