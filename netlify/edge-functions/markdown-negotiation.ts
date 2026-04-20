import { TurndownService } from "npm:turndown@7.2.0";

const turndownService = new TurndownService({
  headingStyle: "atx",
  codeBlockStyle: "fenced"
});

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
    const markdown = turndownService.turndown(html);
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
