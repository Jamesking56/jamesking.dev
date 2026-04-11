import { readFileSync, readdirSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const SITE_URL = 'https://jamesking.dev';
const INDEXNOW_KEY = '42d17c9636d54abca41d91f6cfa39c53';

console.log('Submitting sitemap to IndexNow...');

const distDir = join(process.cwd(), 'dist');

if (!existsSync(join(distDir, 'sitemap-index.xml'))) {
  console.log('No sitemap found, skipping IndexNow');
  process.exit(0);
}

const sitemapPath = join(distDir, 'sitemap-index.xml');
const sitemapContent = readFileSync(sitemapPath, 'utf-8');

const urlMatches = sitemapContent.match(/<loc>([^<]+)<\/loc>/g);
if (!urlMatches) {
  console.log('No URLs found in sitemap');
  process.exit(0);
}

const urls = urlMatches.map(m => m.replace(/<loc>|<\/loc>/g, ''));
console.log(`Found ${urls.length} URLs in sitemap`);

const payload = {
  host: 'jamesking.dev',
  key: INDEXNOW_KEY,
  urlList: urls
};

const ENDPOINTS = [
  'https://www.bing.com/indexnow'
];

for (const endpoint of ENDPOINTS) {
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    console.log(`Submitted to ${endpoint}: ${response.status}`);
  } catch (error) {
    console.error(`Failed to submit to ${endpoint}:`, error.message);
  }
}

console.log('IndexNow submission complete');