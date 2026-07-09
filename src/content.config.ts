import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: image().optional(),
			category: z.string().optional(),
			author: z.string().optional(),
			reviewedBy: z.string().optional(),
			verdict: z.string().optional(),
			sourceCount: z.number().int().nonnegative().optional(),
			relatedTools: z.array(z.object({ label: z.string(), href: z.string() })).optional(),
			noindex: z.boolean().optional(),
		}),
});

export const collections = { blog };
