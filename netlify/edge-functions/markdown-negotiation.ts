function htmlToMarkdown(html: string): string {
  let md = html;
  
  md = md.replace(/<h1[^>]*>(.*?)<\/h1>/gis, (_, content) => `# ${content}\n\n`);
  md = md.replace(/<h2[^>]*>(.*?)<\/h2>/gis, (_, content) => `## ${content}\n\n`);
  md = md.replace(/<h3[^>]*>(.*?)<\/h3>/gis, (_, content) => `### ${content}\n\n`);
  md = md.replace(/<h4[^>]*>(.*?)<\/h4>/gis, (_, content) => `#### ${content}\n\n`);
  md = md.replace(/<h5[^>]*>(.*?)<\/h5>/gis, (_, content) => `##### ${content}\n\n`);
  md = md.replace(/<h6[^>]*>(.*?)<\/h6>/gis, (_, content) => `###### ${content}\n\n`);
  
  md = md.replace(/<p[^>]*>(.*?)<\/p>/gis, (_, content) => `${content}\n\n`);
  
  md = md.replace(/<strong[^>]*>(.*?)<\/strong>/gis, '**$1**');
  md = md.replace(/<b[^>]*>(.*?)<\/b>/gis, '**$1**');
  md = md.replace(/<em[^>]*>(.*?)<\/em>/gis, '*$1*');
  md = md.replace(/<i[^>]*>(.*?)<\/i>/gis, '*$1*');
  
  md = md.replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gis, '[$2]($1)');
  
  md = md.replace(/<ul[^>]*>/gis, '');
  md = md.replace(/<\/ul>/gis, '');
  md = md.replace(/<ol[^>]*>/gis, '');
  md = md.replace(/<\/ol>/gis, '');
  md = md.replace(/<li[^>]*>(.*?)<\/li>/gis, '- $1\n');
  
  md = md.replace(/<code[^>]*>(.*?)<\/code>/gis, '`$1`');
  md = md.replace(/<pre[^>]*>(.*?)<\/pre>/gis, '```\n$1\n```\n');
  
  md = md.replace(/<blockquote[^>]*>(.*?)<\/blockquote>/gis, '> $1\n');
  
  md = md.replace(/<br\s*\/?>/gis, '\n');
  md = md.replace(/<hr\s*\/?>/gis, '---\n');
  
  md = md.replace(/<[^>]+>/g, '');
  
  md = md.replace(/&nbsp;/g, ' ');
  md = md.replace(/&amp;/g, '&');
  md = md.replace(/&lt;/g, '<');
  md = md.replace(/&gt;/g, '>');
  md = md.replace(/&quot;/g, '"');
  md = md.replace(/&#39;/g, "'");
  
  md = md.replace(/\n{3,}/g, '\n\n');
  md = md.trim();
  
  return md;
}

export default async (request: Request, context: Response): Promise<Response> => {
  const accept = request.headers.get("Accept") || "";
  
  if (!accept.includes("text/markdown")) {
    return context.next();
  }
  
  const url = new URL(request.url);
  let htmlPath = url.pathname;
  
  if (htmlPath === "/" || htmlPath === "/index.html") {
    htmlPath = "/index.html";
  } else if (!htmlPath.endsWith(".html")) {
    htmlPath = htmlPath + "/index.html";
  }
  
  const htmlUrl = new URL(htmlPath, url.origin);
  
  try {
    const htmlResponse = await fetch(htmlUrl.toString());
    
    if (!htmlResponse.ok) {
      return context.next();
    }
    
    const html = await htmlResponse.text();
    const markdown = htmlToMarkdown(html);
    const tokenCount = Math.ceil(markdown.split(/\s+/).length * 1.3);
    
    return new Response(markdown, {
      status: 200,
      headers: {
        "Content-Type": "text/markdown; charset=utf-8",
        "Vary": "Accept",
        "x-markdown-tokens": String(tokenCount)
      }
    });
  } catch {
    return context.next();
  }
};