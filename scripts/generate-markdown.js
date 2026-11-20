import { readFileSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'node-html-parser';
import TurndownService from 'turndown';

export function htmlToMarkdown(html) {
  const root = parse(html);
  const main = root.querySelector('main');
  if (!main) throw new Error('Cannot export Markdown: page has no main element');

  main.querySelectorAll('script, style, noscript, template, svg, iframe, [data-markdown-ignore]')
    .forEach(element => element.remove());

  return new TurndownService({ headingStyle: 'atx', codeBlockStyle: 'fenced', bulletListMarker: '-' })
    .turndown(main.innerHTML).trim() + '\n';
}

export default function markdownExports() {
  return {
    name: 'markdown-exports',
    hooks: {
      'astro:build:done': ({ dir, assets }) => {
        const dist = fileURLToPath(dir);
        let headers = readFileSync(join(dist, '_headers'), 'utf8');

        for (const url of [...assets.values()].flat()) {
          if (!url.pathname.endsWith('.html')) continue;
          const file = relative(dist, fileURLToPath(url));
          const markdownPath = file.replace(/\.html$/, '.md');
          const markdown = htmlToMarkdown(readFileSync(join(dist, file), 'utf8'));
          writeFileSync(join(dist, markdownPath), markdown);
          const tokens = Math.ceil(markdown.trim().split(/\s+/).length * 1.3);
          headers += `\n/${markdownPath}\n  X-Markdown-Tokens: ${tokens}\n`;
        }

        writeFileSync(join(dist, '_headers'), headers);
      },
    },
  };
}
