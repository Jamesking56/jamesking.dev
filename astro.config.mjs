import { defineConfig } from 'astro/config';
import { join } from 'path';
import sitemap from '@astrojs/sitemap';
import partytown from '@astrojs/partytown';
import tailwind from '@tailwindcss/vite';
import markdownExports from './scripts/generate-markdown.js';

export default defineConfig({
  site: 'https://jamesking.dev',
  output: 'static',
  integrations: [
    sitemap(),
    markdownExports(),
    partytown({
      dest: join(process.cwd(), 'dist'),
      config: {
        forward: ["dataLayer.push"]
      }
    })
  ],
  build: {
    format: 'file'
  },
  vite: {
    plugins: [tailwind()]
  }
});
