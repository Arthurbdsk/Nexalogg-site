'use client';

import Link from 'next/link';
import { track } from '@/lib/analytics';
import type { BlogPost } from '@/lib/blog';

export function ArticleActions({ post }: { post: Pick<BlogPost, 'slug' | 'cta'> }) {
  return (
    <Link href={post.cta.href} onClick={() => track('blog_cta_click', { article: post.slug, destination: post.cta.href })} className="mt-6 inline-flex min-h-12 items-center gap-4 bg-ink px-6 py-3 font-semibold text-paper transition-colors hover:bg-paper hover:text-ink">
      {post.cta.label} <span aria-hidden="true">→</span>
    </Link>
  );
}
