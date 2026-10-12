'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { BlogPreview } from '@/lib/blog-preview';

const categories = ['Todos', 'Gestão financeira', 'Custos e margem', 'Operação e execução', 'Entrevistas'];

export function BlogList({ posts }: { posts: BlogPreview[] }) {
  const [category, setCategory] = useState('Todos');
  const [query, setQuery] = useState('');
  const normalize = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const visible = posts.filter((post) =>
    (category === 'Todos' || post.category === category) &&
    normalize(post.title + ' ' + post.description).includes(normalize(query.trim())),
  );

  return (
    <section className="tone-light bg-surface pb-section text-content" aria-labelledby="artigos-titulo">
      <div className="shell">
        <div className="flex flex-col justify-between gap-6 border-b border-line/15 pb-6 md:flex-row md:items-end">
          <h2 id="artigos-titulo" className="text-display-md">Análises para a sua operação</h2>
          <div className="md:w-80">
            <label htmlFor="busca-blog" className="mb-2 block text-sm font-semibold">Buscar no blog</label>
            <input id="busca-blog" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Caixa, margem, indicadores..." className="min-h-12 w-full border border-line/30 bg-surface px-4 text-content focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500" />
          </div>
        </div>
        <div className="my-7 flex flex-wrap gap-2" role="group" aria-label="Filtrar artigos por assunto">
          {categories.map((item) => (
            <button key={item} type="button" onClick={() => setCategory(item)} aria-pressed={category === item} className={'min-h-11 border px-4 py-2 text-sm font-semibold transition-colors ' + (category === item ? 'border-brand-500 bg-brand-500 text-ink' : 'border-line/20 hover:border-content')}>
              {item}
            </button>
          ))}
        </div>
        <p className="mb-5 text-sm text-content/60" role="status" aria-live="polite">{visible.length} {visible.length === 1 ? 'conteúdo encontrado' : 'conteúdos encontrados'}</p>
        <div className="grid border-l border-t border-line/15 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((post) => (
            <article key={post.slug} className="flex h-full flex-col border-b border-r border-line/15 p-7 md:p-8">
              <h3 className="text-2xl font-semibold leading-tight tracking-tight">
                <Link href={'/blog/' + post.slug} className="transition-colors hover:text-accent">{post.title}</Link>
              </h3>
              <p className="mt-5 text-[0.9375rem] leading-[1.75] text-content/70">{post.description}</p>
              {post.toolLabel ? <p className="mt-4 border-l-2 border-brand-500 pl-3 text-sm font-semibold">{post.toolLabel}</p> : null}
              <p className="mt-5 text-sm text-content/60">{post.category} · {post.minutes} min de leitura</p>
              <time dateTime={post.publishedAt} className="mt-2 text-xs text-content/60">{new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long', timeZone: 'UTC' }).format(new Date(post.publishedAt + 'T12:00:00Z'))}</time>
              <Link href={'/blog/' + post.slug} className="mt-auto flex min-h-12 items-center gap-4 pt-8 font-semibold" aria-label={'Ler: ' + post.title}>
                {post.hasVideo ? 'Ver entrevista' : 'Ler análise'} <span aria-hidden="true">→</span>
              </Link>
            </article>
          ))}
        </div>
        {visible.length === 0 ? <p className="py-12">Nenhum artigo encontrado. Experimente outro assunto ou selecione Todos.</p> : null}
      </div>
    </section>
  );
}
