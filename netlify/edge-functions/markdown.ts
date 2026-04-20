const handlers: Record<string, (c: string) => string> = {
  h1: (c) => `# ${c}\n\n`,
  h2: (c) => `## ${c}\n\n`,
  h3: (c) => `### ${c}\n\n`,
  h4: (c) => `#### ${c}\n\n`,
  h5: (c) => `##### ${c}\n\n`,
  p: (c) => `${c}\n\n`,
};

function parseTag(html: string, tag: string): string {
  const regex = new RegExp(`<${tag}[^>]*>(.*?)</${tag}>`, 'gis');
  return html.replace(regex, (_, content) => handlers[tag]?.(content) || content);
}

function htmlToMarkdown(html: string): string {
  let md = html;
  
  ['h1', 'h2', 'h3', 'h4', 'h5', 'p'].forEach(tag => {
    md = parseTag(md, tag);
  });
  
  md = md.replace(/<strong[^>]*>(.*?)<\/strong>/gis, '**$1**');
  md = md.replace(/<b[^>]*>(.*?)<\/b>/gis, '**$1**');
  md = md.replace(/<em[^>]*>(.*?)<\/em>/gis, '*$1*');
  md = md.replace(/<i[^>]*>(.*?)<\/i>/gis, '*$1*');
  md = md.replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gis, '[$2]($1)');
  md = md.replace(/<li[^>]*>(.*?)<\/li>/gis, '- $1\n');
  md = md.replace(/<code[^>]*>(.*?)<\/code>/gis, '`$1`');
  md = md.replace(/<pre[^>]*><code[^>]*>(.*?)<\/code><\/pre>/gis, '```\n$1\n```\n');
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

export default async (req: Request, ctx: { next: () => Promise<Response> }): Promise<Response> => {
  const accept = req.headers.get('Accept') || '';
  
  if (!accept.includes('text/markdown')) {
    return ctx.next();
  }
  
  const url = new URL(req.url);
  const path = url.pathname === '/' ? '/index.html' : url.pathname + '/index.html';
  
  try {
    const res = await fetch(url.origin + path);
    if (!res.ok) return ctx.next();
    
    const html = await res.text();
    const md = htmlToMarkdown(html);
    const tokens = Math.ceil(md.split(/\s+/).length * 1.3);
    
    return new Response(md, {
      headers: {
        'Content-Type': 'text/markdown; charset=utf-8',
        'Vary': 'Accept',
        'x-markdown-tokens': String(tokens),
      }
    });
  } catch {
    return ctx.next();
  }
};