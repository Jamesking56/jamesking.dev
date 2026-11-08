export const config = { path: '/*' };

function prefersMarkdown(accept: string): boolean {
  const types = new Map(accept.toLowerCase().split(',').map(part => {
    const [type, ...parameters] = part.trim().split(';');
    const quality = parameters.find(parameter => parameter.trim().startsWith('q='));
    return [type.trim(), quality ? Number(quality.trim().slice(2)) : 1] as const;
  }));
  const markdown = types.get('text/markdown') ?? 0;
  const html = types.get('text/html') ?? types.get('text/*') ?? types.get('*/*') ?? 0;
  return markdown > 0 && markdown <= 1 && markdown >= html;
}

export default async (req: Request, ctx: { next: () => Promise<Response> }): Promise<Response> => {
  const url = new URL(req.url);
  if (!['GET', 'HEAD'].includes(req.method) || /\.[^/]+$/.test(url.pathname) ||
      !prefersMarkdown(req.headers.get('Accept') || '')) {
    return ctx.next();
  }

  // Resolve the original route first so canonical redirects and errors keep their status.
  const response = await ctx.next();
  if (response.status !== 404 && (!response.ok || !response.headers.get('Content-Type')?.includes('text/html'))) {
    return response;
  }

  url.pathname = response.status === 404 ? '/404.md' : `${url.pathname.replace(/\/$/, '') || '/index'}.md`;
  try {
    const markdown = await fetch(url, {
      method: req.method,
      headers: { Accept: 'text/markdown' },
      redirect: 'manual',
    });
    if (!markdown.ok) return response;

    const headers = new Headers(markdown.headers);
    // fetch may decode the body, so upstream transfer headers no longer describe it.
    headers.delete('Content-Encoding');
    headers.delete('Content-Length');
    headers.set('Content-Type', 'text/markdown; charset=utf-8');
    headers.set('Vary', 'Accept, Accept-Encoding');
    // Negotiated responses must not enter a CDN cache keyed only by URL.
    headers.set('Cache-Control', 'no-store');
    headers.set('Netlify-CDN-Cache-Control', 'no-store');
    return new Response(req.method === 'HEAD' ? null : markdown.body, {
      status: response.status,
      headers,
    });
  } catch {
    return response;
  }
};
