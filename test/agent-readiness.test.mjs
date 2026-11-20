import assert from 'node:assert/strict';
import { globSync, readFileSync } from 'node:fs';
import test from 'node:test';
import markdown, { config as markdownConfig } from '../netlify/edge-functions/markdown.ts';
import { htmlToMarkdown } from '../scripts/generate-markdown.js';

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

test('every built HTML page has Markdown, discovery, and static response headers', () => {
  const headers = read('dist/_headers');
  assert.deepEqual(markdownConfig, { path: '/*' });
  assert.match(headers, /Content-Type: text\/markdown; charset=utf-8/);
  assert.equal(read('dist/llms.txt'), read('public/llms.txt'));

  for (const file of globSync('**/*.html', { cwd: new URL('../dist/', import.meta.url) })) {
    if (file.startsWith('~partytown/')) continue;
    const markdownFile = file.replace(/\.html$/, '.md');
    const body = read(`dist/${markdownFile}`);
    assert.ok(body.trim(), `${markdownFile} is not empty`);
    assert.doesNotMatch(body, /<script|<style|<svg|astro-view-transitions/i);
    assert.ok(read(`dist/${file}`).includes(`https://jamesking.dev/${markdownFile}`), `${file} links to its Markdown export`);
    const tokens = Math.ceil(body.trim().split(/\s+/).length * 1.3);
    assert.ok(headers.includes(`/${markdownFile}\n  X-Markdown-Tokens: ${tokens}\n`));
  }
});

test('build conversion preserves article headers, code, lists, links, and entities', () => {
  const body = htmlToMarkdown(`<!doctype html><nav>Navigation</nav><main>
    <header><h1>Title &amp; detail</h1><blockquote>Quote</blockquote></header>
    <p>Use <code>inline</code> and <a href="/about">About</a>.</p>
    <pre><code class="language-js">if (a &lt; b) {\n  return true;\n}</code></pre>
    <ul><li>First</li><li>Second</li></ul>
    <script>analytics()</script><style>styles</style><svg><text>icon</text></svg>
    <template>Template</template><div data-markdown-ignore>Comments</div>
    </main><footer>Footer</footer>`);
  assert.match(body, /# Title & detail/);
  assert.match(body, /> Quote/);
  assert.match(body, /`inline`/);
  assert.match(body, /\[About\]\(\/about\)/);
  assert.match(body, /```js\nif \(a < b\) \{\n  return true;\n\}\n```/);
  assert.match(body, /-\s+First\n-\s+Second/);
  assert.doesNotMatch(body, /Navigation|Footer|analytics|styles|icon|Template|Comments/);
  assert.throws(() => htmlToMarkdown('<html>No main</html>'), /no main element/);
});

test('markdown negotiation serves the built file without converting HTML', async (t) => {
  const body = read('dist/about.md');
  const fetch = t.mock.method(globalThis, 'fetch', async (url, options) => {
    assert.equal(url.href, 'https://jamesking.dev/about.md?ref=test');
    assert.equal(options.headers.Accept, 'text/markdown');
    assert.equal(options.redirect, 'manual');
    return new Response(body, { headers: {
      'X-Markdown-Tokens': '123', 'Content-Encoding': 'gzip', 'Content-Length': '42',
    } });
  });
  const response = await markdown(
    new Request('https://jamesking.dev/about?ref=test', { headers: { Accept: 'text/markdown' } }),
    { next: async () => new Response('Not the Markdown source', { headers: { 'Content-Type': 'text/html' } }) },
  );

  assert.equal(response.status, 200);
  assert.equal(response.headers.get('Content-Type'), 'text/markdown; charset=utf-8');
  assert.equal(response.headers.get('Vary'), 'Accept, Accept-Encoding');
  assert.equal(response.headers.get('Cache-Control'), 'no-store');
  assert.equal(response.headers.get('Netlify-CDN-Cache-Control'), 'no-store');
  assert.equal(response.headers.get('X-Markdown-Tokens'), '123');
  assert.equal(response.headers.get('Content-Encoding'), null);
  assert.equal(response.headers.get('Content-Length'), null);
  assert.equal(await response.text(), body);
  assert.equal(fetch.mock.callCount(), 1);
});

test('markdown requests for missing pages use the built 404 and retain its status', async (t) => {
  t.mock.method(globalThis, 'fetch', async url => {
    assert.equal(url.pathname, '/404.md');
    return new Response(read('dist/404.md'));
  });
  const response = await markdown(
    new Request('https://jamesking.dev/missing', { headers: { Accept: 'text/markdown' } }),
    { next: async () => new Response('', { status: 404 }) },
  );

  assert.equal(response.status, 404);
  assert.equal(response.headers.get('Content-Type'), 'text/markdown; charset=utf-8');
  assert.match(await response.text(), /\[Sitemap\]\(\/sitemap-index\.xml\)/);
});

test('HTML preferences, disabled Markdown, assets, and other methods bypass negotiation', async (t) => {
  t.mock.method(globalThis, 'fetch', () => assert.fail('Must not fetch Markdown'));
  for (const [pathname, accept, method = 'GET'] of [
    ['/about', 'text/html'], ['/about', '*/*'], ['/about', ''],
    ['/about', 'text/html, text/markdown;q=0.5'],
    ['/about', 'text/markdown;q=0'], ['/about', 'text/markdown;q=invalid'],
    ['/about', 'text/markdown;q=0.5, text/*;q=0.8'],
    ['/about', 'text/markdown', 'POST'],
    ['/about.md', 'text/markdown'], ['/about.html', 'text/markdown'],
    ['/cv.pdf', 'text/markdown'], ['/rss.xml', 'text/markdown'],
    ['/favicon.svg', 'text/markdown'], ['/llms.txt', 'text/markdown'],
  ]) {
    const original = new Response('Original');
    assert.equal(await markdown(
      new Request(`https://jamesking.dev${pathname}`, { method, headers: { Accept: accept } }),
      { next: async () => original },
    ), original);
  }
});

test('negotiation maps the homepage and nested pages, and supports HEAD', async (t) => {
  for (const [pathname, expected, method = 'GET'] of [
    ['/', '/index.md'], ['/blog/hello-world', '/blog/hello-world.md'],
    ['/projects/jamesking-dev/', '/projects/jamesking-dev.md'],
    ['/about', '/about.md', 'HEAD'],
  ]) {
    const fetch = t.mock.method(globalThis, 'fetch', async (url, options) => {
      assert.equal(url.pathname, expected);
      assert.equal(options.method, method);
      return new Response(method === 'HEAD' ? null : '# Built Markdown');
    });
    const response = await markdown(
      new Request(`https://jamesking.dev${pathname}`, { method, headers: { Accept: 'text/html;q=0.5, text/markdown; q=1' } }),
      { next: async () => new Response(null, { headers: { 'Content-Type': 'text/html' } }) },
    );
    assert.equal(await response.text(), method === 'HEAD' ? '' : '# Built Markdown');
    fetch.mock.restore();
  }
});

test('redirects, server errors, and non-HTML responses are preserved', async (t) => {
  t.mock.method(globalThis, 'fetch', () => assert.fail('Must not fetch Markdown'));
  for (const original of [
    new Response(null, { status: 301, headers: { Location: 'https://jamesking.dev/about' } }),
    new Response('Error', { status: 500 }),
    new Response('{}', { headers: { 'Content-Type': 'application/json' } }),
  ]) {
    assert.equal(await markdown(
      new Request('https://jamesking.dev/about', { headers: { Accept: 'text/markdown' } }),
      { next: async () => original },
    ), original);
  }
});

test('missing exports and fetch failures return the original response without retrying next', async (t) => {
  for (const result of [404, 500, 302, 'error']) {
    const fetch = t.mock.method(globalThis, 'fetch', async () => {
      if (result === 'error') throw new Error('Network failure');
      return new Response(null, { status: result });
    });
    const original = new Response('HTML', { headers: { 'Content-Type': 'text/html' } });
    const next = t.mock.fn(async () => original);
    assert.equal(await markdown(
      new Request('https://jamesking.dev/about', { headers: { Accept: 'text/markdown' } }),
      { next },
    ), original);
    assert.equal(next.mock.callCount(), 1);
    fetch.mock.restore();
  }
});
