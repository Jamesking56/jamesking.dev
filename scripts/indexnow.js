import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

const SITE_URL = 'https://jamesking.dev';
const INDEXNOW_KEY = '42d17c9636d54abca41d91f6cfa39c53';

async function submitIndexNow() {
  console.log('Submitting sitemap to IndexNow...');

  const distDir = join(process.cwd(), 'dist');

  if (!existsSync(join(distDir, 'sitemap-index.xml'))) {
    console.log('No sitemap found, skipping IndexNow');
    return;
  }

  const sitemapIndexContent = readFileSync(join(distDir, 'sitemap-index.xml'), 'utf-8');
  
  const sitemapMatches = sitemapIndexContent.match(/<loc>([^<]+)<\/loc>/g);
  if (!sitemapMatches || sitemapMatches.length === 0) {
    console.log('No sitemaps found in index');
    return;
  }

  const urls = [];
  
  for (const match of sitemapMatches) {
    const url = match.replace(/<loc>|<\/loc>/g, '');
    
    if (url.includes('sitemap-index.xml')) continue;
    
    const filename = url.replace(`${SITE_URL}/`, '');
    const filepath = join(distDir, filename);
    
    if (existsSync(filepath)) {
      const content = readFileSync(filepath, 'utf-8');
      const pageMatches = content.match(/<loc>([^<]+)<\/loc>/g);
      if (pageMatches) {
        pageMatches.forEach(m => urls.push(m.replace(/<loc>|<\/loc>/g, '')));
      }
    }
  }

  if (urls.length === 0) {
    console.log('No URLs found in sitemaps');
    return;
  }

  console.log(`Found ${urls.length} URLs in sitemap(s)`);

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
}

submitIndexNow();