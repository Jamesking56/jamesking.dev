import fs from 'fs';
import path from 'path';

const unsafeTags = ['script', 'style', 'noscript', 'template', 'svg'];

function removeUnsafeContent(html) {
  let previous;
  do {
    previous = html;

    const commentStart = html.indexOf('<!--');
    if (commentStart !== -1) {
      const commentEnd = html.indexOf('-->', commentStart + 4);
      html = html.slice(0, commentStart) + (commentEnd === -1 ? '' : html.slice(commentEnd + 3));
      continue;
    }

    const lower = html.toLowerCase();
    let start = -1;
    let tag = '';
    for (const candidate of unsafeTags) {
      let index = lower.indexOf(`<${candidate}`);
      while (index !== -1 && !' \t\n\r\f/>'.includes(lower[index + candidate.length + 1])) {
        index = lower.indexOf(`<${candidate}`, index + 1);
      }
      const boundary = lower[index + candidate.length + 1];
      if (index !== -1 && ' \t\n\r\f/>'.includes(boundary)) {
        if (start === -1 || index < start) {
          start = index;
          tag = candidate;
        }
      }
    }

    if (start !== -1) {
      const openingEnd = html.indexOf('>', start);
      const closingStart = openingEnd === -1 ? -1 : lower.indexOf(`</${tag}>`, openingEnd + 1);
      html = html.slice(0, start) + (closingStart === -1 ? '' : html.slice(closingStart + tag.length + 3));
    }
  } while (html !== previous);

  return html;
}

function htmlToMarkdown(html) {
  let md = html.match(/<main\b[^>]*>(.*?)<\/main>/is)?.[1] || html;
  md = removeUnsafeContent(md);
  
  const tags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
  tags.forEach((tag, i) => {
    const prefix = '#'.repeat(i + 1) + ' ';
    md = md.replace(new RegExp(`<${tag}[^>]*>(.*?)</${tag}>`, 'gis'), (_, content) => `${prefix}${content}\n\n`);
  });
  
  md = md.replace(/<p[^>]*>(.*?)<\/p>/gis, '$1\n\n');
  md = md.replace(/<strong[^>]*>(.*?)<\/strong>/gis, '**$1**');
  md = md.replace(/<b[^>]*>(.*?)<\/b>/gis, '**$1**');
  md = md.replace(/<em[^>]*>(.*?)<\/em>/gis, '*$1*');
  md = md.replace(/<i[^>]*>(.*?)<\/i>/gis, '*$1*');
  md = md.replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gis, '[$2]($1)');
  md = md.replace(/<li[^>]*>(.*?)<\/li>/gis, '- $1\n');
  md = md.replace(/<code[^>]*>(.*?)<\/code>/gis, '`$1`');
  md = md.replace(/<pre[^>]*>(.*?)<\/pre>/gis, '\n```\n$1\n```\n');
  md = md.replace(/<blockquote[^>]*>(.*?)<\/blockquote>/gis, '> $1\n');
  md = md.replace(/<br\s*\/?>/gi, '\n');
  md = md.replace(/<hr\s*\/?>/gi, '---\n');
  md = md.replace(/&(?:nbsp|lt|gt|quot|#39|amp);/g, (m) => ({
    '&nbsp;': ' ', '&lt;': '<', '&gt;': '>',
    '&quot;': '"', '&#39;': "'", '&amp;': '&',
  })[m]);
  md = md.replaceAll('<', '').replaceAll('>', '');
  md = md.replace(/\n{3,}/g, '\n\n');
  
  return md.trim();
}

const distDir = './dist';
const pages = ['index', 'about', 'uses', 'faq', 'blog', 'projects', 'now', 'contact', 'services'];

pages.forEach(page => {
  const htmlPath = path.join(distDir, `${page}.html`);
  if (fs.existsSync(htmlPath)) {
    const html = fs.readFileSync(htmlPath, 'utf-8');
    const md = htmlToMarkdown(html);
    const mdPath = path.join(distDir, `${page}.md`);
    fs.writeFileSync(mdPath, md);
  }
});

console.log('Markdown files generated');
