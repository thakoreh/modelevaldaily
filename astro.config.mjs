// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	site: 'https://aimodelbenchmarks.com',
	trailingSlash: 'always',
	build: {
		format: 'directory',
	},
	integrations: [
		mdx(),
		sitemap({
			changefreq: 'daily',
			priority: 0.7,
			lastmod: new Date(),
			filter: (page) => !page.includes('template'),
			customPages: [
				'https://aimodelbenchmarks.com/',
				'https://aimodelbenchmarks.com/blog/',
				'https://aimodelbenchmarks.com/scorecards/',
				'https://aimodelbenchmarks.com/about/',
			],
		}),
	],
});
