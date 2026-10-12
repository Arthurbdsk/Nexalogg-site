import { PageHeader } from '@/components/layout/PageHeader';
import { FinalCta } from '@/components/sections/FinalCta';
import { JsonLd } from '@/components/ui/JsonLd';
import { InterviewFeature } from '@/components/blog/InterviewFeature';
import { BlogList } from '@/components/blog/BlogList';
import { breadcrumbSchema, graph, webPageSchema } from '@/lib/jsonld';
import { buildMetadata } from '@/lib/seo';
import { blogPosts, postPath, readingMinutes } from '@/lib/blog';
import { absoluteUrl, siteConfig } from '@/lib/site';

const title = 'Blog de gestão financeira e operação para transportadoras';
const description = 'Análises sobre fluxo de caixa, custo por km, margem por cliente e indicadores. Referências internacionais aplicadas à realidade do transporte e da logística.';
const crumbs = [{ name: 'Início', path: '/' }, { name: 'Blog', path: '/blog' }];

export const metadata = {
  ...buildMetadata({ title, description, path: '/blog' }),
  alternates: { canonical: absoluteUrl('/blog'), types: { 'application/rss+xml': absoluteUrl('/blog-feed.xml') } },
};

export default function BlogPage() {
  return (
    <>
      <JsonLd data={graph([
        { ...webPageSchema({ path: '/blog', name: title, description }), '@type': 'CollectionPage' },
        breadcrumbSchema(crumbs),
        {
          '@type': 'Blog',
          '@id': absoluteUrl('/blog') + '#blog',
          name: title,
          description,
          inLanguage: 'pt-BR',
          publisher: { '@id': siteConfig.url + '/#organization' },
          blogPost: blogPosts.map((post) => ({ '@type': 'BlogPosting', headline: post.title, url: absoluteUrl(postPath(post)) })),
        },
      ])} />
      <main id="conteudo" tabIndex={-1} lang="pt-BR">
        <PageHeader title="Gestão financeira e operação para transportadoras." lead={<p>Caixa, margem e operação na mesma conversa. Análises práticas para quem precisa decidir e executar em Transporte e Logística.</p>} crumbs={crumbs} />
        <InterviewFeature />
        <BlogList posts={blogPosts.map(({ slug, title, description, category, publishedAt, ...post }) => ({
          slug, title, description, category, publishedAt,
          minutes: readingMinutes({ slug, title, description, category, publishedAt, ...post }),
          hasVideo: Boolean(post.videoId),
        }))} />
        <FinalCta />
      </main>
    </>
  );
}
