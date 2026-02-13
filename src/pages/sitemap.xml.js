import { getCollection } from 'astro:content';

export async function GET() {
	const posts = await getCollection('blog');
	const urls = [
		'/',
		'/about/',
		'/blog/',
		'/scorecards/',
		...posts.map((post) => `/blog/${post.id}/`),
	];

	const base = 'https://aimodelbenchmarks.com';
	const body = `<?xml version="1.0" encoding="UTF-8"?>\n` +
		`<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">` +
		urls.map((path) => `<url><loc>${base}${path}</loc></url>`).join('') +
		`</urlset>`;

	return new Response(body, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8',
		},
	});
}
