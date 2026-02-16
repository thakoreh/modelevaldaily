import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';
import { isFactCheckedPost } from '../utils/fact-check';

export async function GET(context) {
	const posts = (await getCollection('blog')).filter((post) => isFactCheckedPost(post));
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: posts
			.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
			.map((post) => ({
			...post.data,
			link: `/blog/${post.id}/`,
			})),
	});
}
