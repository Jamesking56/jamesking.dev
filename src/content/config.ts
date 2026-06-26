import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tech: z.array(z.string()),
    github: z.string().optional(),
    website: z.string().optional(),
    featured: z.boolean().optional(),
    year: z.string(),
    order: z.number().optional().default(50),
  }),
});

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    type: z.string(),
    date: z.date(),
    description: z.string().optional(),
    quote: z.string().optional(),
    ogImage: z.string().optional(),
    links: z.array(z.object({
      title: z.string(),
      url: z.string(),
      description: z.string().optional(),
    })).optional(),
    video: z.string().optional(),
  }),
});

export const collections = { projects, blog };
