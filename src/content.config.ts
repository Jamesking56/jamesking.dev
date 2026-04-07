import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    type: z.enum(['article', 'note', 'links', 'video', 'question']).default('article'),
    date: z.coerce.date(),
    description: z.string().optional(),
    quote: z.string().optional(),
    links: z.array(z.object({
      title: z.string(),
      url: z.string(),
      description: z.string().optional()
    })).optional(),
    video: z.string().optional(),
    draft: z.boolean().default(false)
  })
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tech: z.array(z.string()),
    website: z.string().optional(),
    github: z.string().optional(),
    featured: z.boolean().default(false),
    year: z.string()
  })
});

export const collections = { blog, projects };
