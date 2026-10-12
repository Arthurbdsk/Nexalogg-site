import { NextResponse, type NextRequest } from 'next/server';
import posts from '@/data/blog.json';

const slugs = new Set(posts.map((post) => post.slug));

// Valida antes do streaming para não transformar URLs inválidas em soft 404.
export function middleware(request: NextRequest) {
  const parts = request.nextUrl.pathname.split('/').filter(Boolean);
  if (parts.length === 1) return NextResponse.next();
  const validPath = slugs.has(parts[1]) &&
    (parts.length === 2 || (parts.length === 3 && parts[2] === 'opengraph-image'));
  if (validPath) return NextResponse.next();
  const url = request.nextUrl.clone();
  url.pathname = '/404';
  url.search = '';
  return NextResponse.rewrite(url, { status: 404, headers: { 'X-Robots-Tag': 'noindex, follow' } });
}

export const config = { matcher: ['/blog/:path*'] };
