import entries from '@/data/blog.json';
import { absoluteUrl, siteConfig } from '@/lib/site';

export type BlogSource = { id: string; name: string; url: string };
export type BlogSection = {
  id: string;
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  formula?: string;
  sourceIds?: string[];
  table?: { headers: string[]; rows: string[][] };
};
export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  category: string;
  publishedAt: string;
  updatedAt: string;
  intro: string;
  takeaway: string;
  videoId?: string;
  sources: BlogSource[];
  sections: BlogSection[];
  related: string[];
  cta: { title: string; text: string; href: string; label: string };
};

export const blogPosts: BlogPost[] = entries;
export const interview = blogPosts[0];
export const getPost = (slug: string) => blogPosts.find((post) => post.slug === slug);
export const postPath = (post: BlogPost) => '/blog/' + post.slug;
export const postImage = (post: BlogPost) => postPath(post) + '/opengraph-image';
export const formatPostDate = (value: string) =>
  new Intl.DateTimeFormat('pt-BR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(value + 'T12:00:00Z'));
export const readingMinutes = (post: BlogPost) => {
  const text = [post.intro, post.takeaway, ...post.sections.flatMap((section) => [
    section.title, ...(section.paragraphs ?? []), ...(section.bullets ?? []),
    section.formula ?? '', ...(section.table?.rows.flat() ?? []),
  ])].join(' ');
  return Math.max(1, Math.ceil(text.split(/\s+/).length / 200));
};

export function articleSchema(post: BlogPost) {
  const url = absoluteUrl(postPath(post));
  return {
    '@type': 'BlogPosting',
    '@id': url + '#article',
    headline: post.title,
    description: post.description,
    url,
    mainEntityOfPage: { '@id': url + '#webpage' },
    image: { '@type': 'ImageObject', url: absoluteUrl(postImage(post)), width: 1200, height: 630 },
    datePublished: post.publishedAt + 'T09:00:00-03:00',
    dateModified: post.updatedAt + 'T09:00:00-03:00',
    inLanguage: 'pt-BR',
    articleSection: post.category,
    author: { '@type': 'Organization', '@id': siteConfig.url + '/#organization', name: 'NEXALLOG', url: absoluteUrl('/a-nexallog') },
    publisher: { '@id': siteConfig.url + '/#organization' },
    citation: post.sources.map((source) => source.url),
  };
}
