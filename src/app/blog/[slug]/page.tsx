import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { JsonLd } from '@/components/ui/JsonLd';
import { InterviewVideo } from '@/components/blog/InterviewVideo';
import { ArticleActions } from '@/components/blog/ArticleActions';
import { CostPerKmCalculator } from '@/components/blog/CostPerKmCalculator';
import { ScrollDepthTracker } from '@/components/layout/ScrollDepthTracker';
import { graph, webPageSchema, breadcrumbSchema } from '@/lib/jsonld';
import { buildMetadata } from '@/lib/seo';
import { articleSchema, blogPosts, formatPostDate, getPost, postImage, postPath, readingMinutes } from '@/lib/blog';

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}
export async function generateMetadata({ params }: Props) {
  const post = getPost((await params).slug);
  if (!post) return buildMetadata({ title: 'Artigo não encontrado', description: 'Conteúdo não encontrado.', path: '/blog', noIndex: true });
  const metadata = buildMetadata({ title: post.title, description: post.description, path: postPath(post), image: postImage(post), type: 'article' });
  return {
    ...metadata,
    authors: [{ name: 'NEXALLOG', url: '/a-nexallog' }],
    openGraph: { ...metadata.openGraph, type: 'article', publishedTime: post.publishedAt + 'T09:00:00-03:00', modifiedTime: post.updatedAt + 'T09:00:00-03:00', authors: ['https://www.nexallog.com.br/a-nexallog'], section: post.category },
  };
}

export default async function ArticlePage({ params }: Props) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  const crumbs = [{ name: 'Início', path: '/' }, { name: 'Blog', path: '/blog' }, { name: post.title, path: postPath(post) }];
  const related = post.related.map(getPost).filter((item) => item !== undefined);
  return (
    <>
      <JsonLd data={graph([webPageSchema({ path: postPath(post), name: post.title, description: post.description }), breadcrumbSchema(crumbs), articleSchema(post)])} />
      <ScrollDepthTracker />
      <main id="conteudo" tabIndex={-1} lang="pt-BR" className="tone-light bg-surface text-content">
        <article>
          <header className="shell pt-[calc(var(--header-height)+2.5rem)]">
            <Breadcrumbs items={crumbs} />
            <h1 className="mt-9 max-w-5xl text-[clamp(2rem,4.5vw,4.6rem)] font-bold leading-[1.08] tracking-tight">{post.title}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-content/75">{post.intro}</p>
            <div className="mt-8 flex flex-wrap gap-x-5 gap-y-2 border-y border-line/15 py-5 text-sm text-content/65">
              <Link href="/a-nexallog" className="font-semibold text-content underline underline-offset-4">Por NEXALLOG</Link>
              <span>{post.category}</span>
              <time dateTime={post.publishedAt}>Publicado em {formatPostDate(post.publishedAt)}</time>
              {post.updatedAt !== post.publishedAt ? <time dateTime={post.updatedAt}>Atualizado em {formatPostDate(post.updatedAt)}</time> : null}
              <span>{readingMinutes(post)} min de leitura{post.videoId ? ' + vídeo' : ''}</span>
            </div>
          </header>
          <div className="shell grid gap-10 py-12 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-16">
            <div className="min-w-0 max-w-3xl">
              <p className="border-l-4 border-brand-500 bg-content/[0.04] p-6 text-xl font-semibold leading-relaxed">{post.takeaway}</p>
              {post.videoId ? <InterviewVideo videoId={post.videoId} /> : null}
              {post.slug === 'custo-por-km-transportadora' ? <CostPerKmCalculator /> : null}
              {post.sections.map((section) => (
                <section key={section.id} id={section.id} aria-labelledby={section.id + '-titulo'} className="mt-12 scroll-mt-28">
                  <h2 id={section.id + '-titulo'} className="text-[clamp(1.5rem,2.5vw,2rem)] font-semibold leading-tight tracking-tight">{section.title}</h2>
                  {section.paragraphs?.map((paragraph) => <p key={paragraph} className="mt-5 text-[1.0625rem] leading-[1.85] text-content/80">{paragraph}</p>)}
                  {section.formula ? <p className="mt-6 border-y border-line/20 py-5 text-lg font-semibold leading-relaxed">{section.formula}</p> : null}
                  {section.bullets ? <ul className="mt-5 list-disc space-y-3 pl-5 text-[1.0625rem] leading-relaxed text-content/80">{section.bullets.map((item) => <li key={item}>{item}</li>)}</ul> : null}
                  {section.table ? (
                    <div className="mt-7 overflow-x-auto border border-line/20" role="region" aria-label={'Tabela: ' + section.title} tabIndex={0}>
                      <table className="w-full min-w-[32rem] border-collapse text-left text-sm leading-relaxed">
                        <caption className="sr-only">{section.title}</caption>
                        <thead className="bg-content/[0.06]"><tr>{section.table.headers.map((heading) => <th key={heading} scope="col" className="border-b border-line/20 px-5 py-4 font-semibold">{heading}</th>)}</tr></thead>
                        <tbody>{section.table.rows.map((row) => <tr key={row[0]}>{row.map((cell, index) => index === 0 ? <th key={index} scope="row" className="border-b border-line/10 px-5 py-4 font-medium">{cell}</th> : <td key={index} className="border-b border-line/10 px-5 py-4 text-content/80">{cell}</td>)}</tr>)}</tbody>
                      </table>
                    </div>
                  ) : null}
                  {section.sourceIds ? <p className="mt-5 text-sm leading-relaxed text-content/60">Referência: {section.sourceIds.map((id, index) => {
                    const source = post.sources.find((item) => item.id === id);
                    return source ? <span key={id}>{index > 0 ? '; ' : ''}<a href={source.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-content">{source.name}</a></span> : null;
                  })}</p> : null}
                </section>
              ))}
              <section id="referencias" className="mt-12 scroll-mt-28 border-t border-line/20 pt-8" aria-labelledby="referencias-titulo">
                <h2 id="referencias-titulo" className="text-2xl font-semibold">Referências e critérios editoriais</h2>
                <ul className="mt-5 space-y-4">{post.sources.map((source) => <li key={source.id}><a href={source.url} target="_blank" rel="noopener noreferrer" className="text-sm underline underline-offset-4">{source.name}</a></li>)}</ul>
                <p className="mt-5 text-sm leading-relaxed text-content/60">Conteúdo editorial da NEXALLOG. Referências consultadas em 12 de outubro de 2026. Os exemplos numéricos são ilustrativos e não representam resultados de clientes. As fontes citadas não implicam parceria, certificação ou endosso.</p>
              </section>
              <section className="mt-10 border-y border-line/15 py-7" aria-labelledby="autoria-titulo">
                <h2 id="autoria-titulo" className="text-xl font-semibold">Sobre a NEXALLOG</h2>
                <p className="mt-3 leading-relaxed text-content/75">Consultoria para empresas de Transporte e Logística, com diagnóstico financeiro e operacional, plano de ação e suporte na execução. Fundada por Alexandre Felix, com 25 anos de experiência no setor.</p>
                <Link href="/a-nexallog" className="mt-4 inline-block font-semibold underline underline-offset-4">Conheça a empresa e a trajetória do fundador</Link>
              </section>
              <section className="tone-brand mt-10 bg-surface p-7 text-content md:p-9" aria-labelledby="artigo-cta-titulo">
                <h2 id="artigo-cta-titulo" className="text-2xl font-bold">{post.cta.title}</h2>
                <p className="mt-4 leading-relaxed">{post.cta.text}</p>
                <ArticleActions post={{ slug: post.slug, cta: post.cta }} />
              </section>
            </div>
            <aside className="min-w-0">
              <nav aria-label="Nesta análise" className="border-l border-line/20 pl-6 lg:sticky lg:top-28">
                <h2 className="text-lg font-semibold">Nesta análise</h2>
                <ul className="mt-5 space-y-4 text-sm leading-relaxed">{post.sections.map((section) => <li key={section.id}><a href={'#' + section.id} className="text-content/65 hover:text-content">{section.title}</a></li>)}</ul>
                <a href="#referencias" className="mt-5 inline-block text-sm font-semibold underline underline-offset-4">Fontes e referências</a>
              </nav>
            </aside>
          </div>
        </article>
        <section className="shell pb-section" aria-labelledby="relacionados-titulo">
          <h2 id="relacionados-titulo" className="text-display-md">Continue a análise</h2>
          <div className="mt-8 grid border-l border-t border-line/15 md:grid-cols-3">{related.map((item) => <Link href={postPath(item)} key={item.slug} className="border-b border-r border-line/15 p-7 transition-colors hover:bg-brand-500 hover:text-ink"><h3 className="text-xl font-semibold leading-snug">{item.title}</h3><p className="mt-4 text-sm leading-relaxed">{item.description}</p><span className="mt-6 inline-block font-semibold">Ler análise <span aria-hidden="true">→</span></span></Link>)}</div>
          <Link href="/blog" className="mt-8 inline-block min-h-11 py-3 font-semibold underline underline-offset-4">Ver todos os conteúdos</Link>
        </section>
      </main>
    </>
  );
}
