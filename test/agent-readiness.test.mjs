import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import markdown, { config as markdownConfig } from '../netlify/edge-functions/markdown.ts';

const read = (file) => readFileSync(new URL(`../${file}`, import.meta.url), 'utf8');
test('404 page offers recovery resources', () => {
  const page = read('dist/404.html');

  assert.match(page, /href="\/sitemap-index\.xml"/);
  assert.match(page, /href="\/llms\.txt"/);
});

test('markdown negotiation is registered and cache-safe', async () => {
  const edge = read('netlify/edge-functions/markdown.ts');
  const headers = read('netlify.toml');

  assert.deepEqual(markdownConfig, { path: '/*' });
  assert.match(edge, /const res = await ctx\.next\(\);/);
  assert.match(headers, /Vary = "Accept, Accept-Encoding"/);

  const response = await markdown(
    new Request('https://jamesking.dev/about', { headers: { Accept: 'text/markdown' } }),
    { next: async () => new Response('<h1>About</h1><p>Server-rendered content.</p>') },
  );

  assert.equal(response.status, 200);
  assert.equal(response.headers.get('Content-Type'), 'text/markdown; charset=utf-8');
  assert.equal(response.headers.get('Vary'), 'Accept, Accept-Encoding');
  assert.match(await response.text(), /# About/);
});

test('markdown requests for missing pages return a recoverable 404', async () => {
  const response = await markdown(
    new Request('https://jamesking.dev/missing', { headers: { Accept: 'text/markdown' } }),
    { next: async () => new Response('', { status: 404 }) },
  );

  assert.equal(response.status, 404);
  assert.equal(response.headers.get('Content-Type'), 'text/markdown; charset=utf-8');
  assert.match(await response.text(), /\[Sitemap\]\(https:\/\/jamesking\.dev\/sitemap-index\.xml\)/);
});
