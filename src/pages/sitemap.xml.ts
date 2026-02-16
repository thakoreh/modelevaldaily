import { getCollection } from 'astro:content';
import { SITE_UPDATED } from '../consts';
import { isFactCheckedPost } from '../utils/fact-check';

export async function GET() {
	const posts = (await getCollection('blog')).filter((post) => isFactCheckedPost(post));
	const base = 'https://aimodelbenchmarks.com';
	const defaultLastmod = SITE_UPDATED;

	const staticPages = [
		{ path: '/', priority: '1.0', changefreq: 'daily', lastmod: '2026-02-16' },
		{ path: '/scorecards/', priority: '0.9', changefreq: 'daily', lastmod: '2026-02-16' },
		{ path: '/compare/', priority: '0.8', changefreq: 'weekly', lastmod: '2026-02-16' },
		{ path: '/blog/', priority: '0.8', changefreq: 'daily', lastmod: '2026-02-16' },
		{ path: '/model-data/', priority: '0.8', changefreq: 'weekly', lastmod: '2026-02-16' },
		{ path: '/faq/', priority: '0.7', changefreq: 'weekly', lastmod: '2026-02-16' },
		{ path: '/about/', priority: '0.6', changefreq: 'monthly', lastmod: '2026-02-16' },
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
