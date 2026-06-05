import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';

export async function GET() {
  const posts = await getCollection('blog');
  const sortedPosts = posts
    .filter(post => !post.data.draft)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());

  return rss({
    title: 'James King - AI-Augmented Software Engineer',
    description: 'Posts on development, AI, and tech',
    site: 'https://jamesking.dev',
    items: sortedPosts.map(post => ({
      title: post.data.title,
      link: `/blog/${post.id}`,
      pubDate: post.data.date,
      description: post.data.description,
    })),
    customData: `<language>en-gb</language>`,
  });
}