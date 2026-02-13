import { getCollection } from 'astro:content';

export async function GET() {
	const posts = await getCollection('blog');
	const base = 'https://aimodelbenchmarks.com';
	const now = new Date().toISOString().split('T')[0];

	const staticPages = [
		{ path: '/', priority: '1.0', changefreq: 'daily' },
		{ path: '/scorecards/', priority: '0.9', changefreq: 'daily' },
		{ path: '/compare/', priority: '0.9', changefreq: 'weekly' },
		{ path: '/compare/claude-vs-gpt/', priority: '0.9', changefreq: 'weekly' },
		{ path: '/compare/deepseek-vs-claude/', priority: '0.9', changefreq: 'weekly' },
		{ path: '/compare/open-source-vs-closed/', priority: '0.9', changefreq: 'weekly' },
		{ path: '/benchmarks/swe-bench/', priority: '0.8', changefreq: 'weekly' },
		{ path: '/benchmarks/mmlu/', priority: '0.8', changefreq: 'weekly' },
		{ path: '/benchmarks/chatbot-arena/', priority: '0.8', changefreq: 'weekly' },
		{ path: '/use-cases/coding/', priority: '0.8', changefreq: 'weekly' },
		{ path: '/use-cases/reasoning/', priority: '0.8', changefreq: 'weekly' },
		{ path: '/use-cases/cost-optimization/', priority: '0.8', changefreq: 'weekly' },
		{ path: '/blog/', priority: '0.8', changefreq: 'daily' },
		{ path: '/faq/', priority: '0.7', changefreq: 'weekly' },
		{ path: '/about/', priority: '0.6', changefreq: 'monthly' },
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
    <lastmod>${now}</lastmod>
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
