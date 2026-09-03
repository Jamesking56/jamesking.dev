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

test('generated markdown contains only main content', () => {
  const markdown = read('dist/index.md');

  assert.match(markdown, /# Technical Lead \| AI Code Governance/);
  assert.doesNotMatch(markdown, /doctype|astro-view-transitions|<[^>]+>/i);
});

test('HTML URLs have static canonical redirects', () => {
  const redirects = read('public/_redirects');

  for (const [from, to] of [
    ['/index.html', '/'],
    ['/about.html', '/about'],
    ['/blog.html', '/blog'],
    ['/blog/article.html', '/blog/article'],
    ['/blog/giscus-comments.html', '/blog/giscus-comments'],
    ['/blog/hello-world.html', '/blog/hello-world'],
    ['/blog/links.html', '/blog/links'],
    ['/blog/note.html', '/blog/note'],
    ['/blog/question.html', '/blog/question'],
    ['/blog/reviewing-ai-generated-code.html', '/blog/reviewing-ai-generated-code'],
    ['/blog/software-golden-era.html', '/blog/software-golden-era'],
    ['/blog/video.html', '/blog/video'],
    ['/blog/what-i-stopped-doing-when-i-started-using-ai.html', '/blog/what-i-stopped-doing-when-i-started-using-ai'],
    ['/contact.html', '/contact'],
    ['/faq.html', '/faq'],
    ['/now.html', '/now'],
    ['/projects.html', '/projects'],
    ['/projects/cloudfleet-cli-aur.html', '/projects/cloudfleet-cli-aur'],
    ['/projects/coding-standards.html', '/projects/coding-standards'],
    ['/projects/dotfiles.html', '/projects/dotfiles'],
    ['/projects/jamesking-dev.html', '/projects/jamesking-dev'],
    ['/projects/laravel-moat-aur.html', '/projects/laravel-moat-aur'],
    ['/services.html', '/services'],
    ['/uses.html', '/uses'],
  ]) {
    assert.ok(redirects.includes(`${from} ${to} 301!`));
  }
});

test('markdown negotiation is registered and cache-safe', async () => {
  const edge = read('netlify/edge-functions/markdown.ts');
  const headers = read('netlify.toml');

  assert.deepEqual(markdownConfig, { path: '/*' });
  assert.match(edge, /const res = await ctx\.next\(\);/);
  assert.match(headers, /Vary = "Accept, Accept-Encoding"/);

  const response = await markdown(
    new Request('https://jamesking.dev/about', { headers: { Accept: 'text/markdown' } }),
    {
      next: async () => new Response(`<!doctype html>
        <html><head><title>About</title><script>window.analytics = true;</script></head>
        <body><nav>Navigation</nav><main><h1>About</h1><scrip<script>window.attack = true;</script>t>alert(123)</script><p>Server-rendered content.</p></main><footer>Footer</footer></body></html>`),
    },
  );

  assert.equal(response.status, 200);
  assert.equal(response.headers.get('Content-Type'), 'text/markdown; charset=utf-8');
  assert.equal(response.headers.get('Vary'), 'Accept, Accept-Encoding');
  const body = await response.text();
  assert.match(body, /# About/);
  assert.doesNotMatch(body, /doctype|analytics|attack|alert|Navigation|Footer|<[^>]+>/i);
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
