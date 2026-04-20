import fs from 'fs';
import path from 'path';

function htmlToMarkdown(html) {
  let md = html;
  
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
  md = md.replace(/<[^>]+>/g, '');
  md = md.replace(/&nbsp;/g, ' ');
  md = md.replace(/&amp;/g, '&');
  md = md.replace(/&lt;/g, '<');
  md = md.replace(/&gt;/g, '>');
  md = md.replace(/&quot;/g, '"');
  md = md.replace(/&#39;/g, "'");
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
