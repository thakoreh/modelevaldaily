import { getCollection } from 'astro:content';

export async function GET() {
	const posts = await getCollection('blog');
	const base = 'https://aimodelbenchmarks.com';
	const now = new Date().toISOString().split('T')[0];

	const staticPages = [
		{ path: '/', priority: '1.0', changefreq: 'daily' },
		{ path: '/scorecards/', priority: '0.9', changefreq: 'daily' },
		{ path: '/blog/', priority: '0.8', changefreq: 'daily' },
		{ path: '/about/', priority: '0.6', changefreq: 'monthly' },
	];

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages
	.map(
		(page) => `  <url>
    <loc>${base}${page.path}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
	)
	.join('\n')}
${posts
	.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
	.map(
		(post) => `  <url>
    <loc>${base}/blog/${post.id}/</loc>
    <lastmod>${post.data.updatedDate ? post.data.updatedDate.toISOString().split('T')[0] : post.data.pubDate.toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>`
	)
	.join('\n')}
</urlset>`;

	return new Response(body, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8',
			'Cache-Control': 'public, max-age=3600',
		},
	});
}
