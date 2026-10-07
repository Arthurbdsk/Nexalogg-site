import { useCopy } from '@/i18n/useCopy';
import Link from 'next/link';
import { PageHeader } from '@/components/layout/PageHeader';
import { FinalCta } from '@/components/sections/FinalCta';
import { JsonLd } from '@/components/ui/JsonLd';
import { Reveal } from '@/components/ui/Reveal';
import { breadcrumbSchema, graph, webPageSchema } from '@/lib/jsonld';
import { localizedMetadata } from '@/lib/seo';

const title = 'Blog';
const description =
  'Análises da NEXALLOG sobre gestão, finanças, operação e transformação em empresas de Transporte e Logística.';
const path = '/blog';

const contents = [
  {
    title: 'Como funciona o Programa D90',
    description:
      'Entenda como diagnóstico, plano de ação e execução acompanhada organizam uma transformação em 90 dias.',
    href: '/metodologia',
    action: 'Ler sobre o Programa D90',
  },
  {
    title: 'Visibilidade financeira e fluxo de caixa com a NEXACASH',
    description:
      'Conheça a ferramenta que reúne entradas, saídas, projeções e resultado em uma visão executiva.',
    href: '/nexacash',
    action: 'Conhecer a NEXACASH',
  },
  {
    title: 'Dez frentes para atuar nas causas estruturais da operação',
    description:
      'Veja como as áreas de Pessoas, Processos, Operações, Tecnologia e Gestão entram no plano de trabalho.',
    href: '/solucoes',
    action: 'Explorar as soluções',
  },
] as const;

export function generateMetadata() {
  return localizedMetadata({ title, description, path });
}

const crumbs = [
  { name: 'Início', path: '/' },
  { name: 'Blog', path },
];

export default function BlogPage() {
  const t = useCopy();

  return (
    <>
      <JsonLd
        data={graph([
          webPageSchema({ path, name: `${title} | NEXALLOG`, description }),
          breadcrumbSchema(crumbs),
        ])}
      />

      <main id="conteudo" tabIndex={-1}>
        <PageHeader
          title={t('Conteúdo para decisões melhores em Transporte e Logística')}
          crumbs={crumbs}
          lead={
            <p>
              {t(
                'Análises sobre gestão, finanças e operação, reunidas para apoiar decisões mais claras e uma execução mais consistente.',
              )}
            </p>
          }
        />

        <section className="tone-light bg-surface pb-section pt-8 text-content" aria-labelledby="blog-conteudos">
          <div className="shell">
            <Reveal>
              <h2 id="blog-conteudos" className="text-display-md">
                {t('Comece por estes conteúdos')}
              </h2>
            </Reveal>

            <div className="mt-10 grid border-l border-t border-line/15 md:grid-cols-3">
              {contents.map((content, index) => (
                <Reveal key={content.href} delay={index * 80}>
                  <Link
                    href={content.href}
                    className="group flex min-h-80 h-full flex-col border-b border-r border-line/15 p-7 transition-colors duration-300 hover:bg-brand-500 md:p-8"
                  >
                    <span className="text-xs font-semibold tracking-[0.14em] text-brand-600 transition-colors group-hover:text-ink/65">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className="mt-8 text-[1.5rem] font-semibold leading-tight text-content transition-colors group-hover:text-ink">
                      {t(content.title)}
                    </h3>
                    <p className="mt-5 text-[0.9375rem] leading-[1.75] text-content/60 transition-colors group-hover:text-ink/70">
                      {t(content.description)}
                    </p>
                    <span className="mt-auto flex items-center gap-3 pt-9 text-sm font-semibold text-content transition-colors group-hover:text-ink">
                      {t(content.action)}
                      <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                        →
                      </span>
                    </span>
                  </Link>
                </Reveal>
              ))}
            </div>

            <Reveal delay={160}>
              <div className="mt-12 grid gap-6 border-y border-line/15 py-8 lg:grid-cols-12 lg:items-center">
                <div className="lg:col-span-7">
                  <h2 className="text-[1.5rem] font-semibold">
                    {t('Novos artigos serão publicados nesta página')}
                  </h2>
                  <p className="mt-3 max-w-2xl text-[0.9375rem] leading-[1.75] text-content/60">
                    {t(
                      'A NEXALLOG está preparando conteúdos sobre margem, produtividade, caixa e execução para empresas de Transporte e Logística.',
                    )}
                  </p>
                </div>
                <div className="lg:col-span-4 lg:col-start-9 lg:text-right">
                  <Link
                    href="/contato"
                    className="inline-flex min-h-12 items-center bg-ink px-6 text-sm font-bold uppercase tracking-[0.06em] text-paper transition-colors hover:bg-brand-500 hover:text-ink"
                  >
                    {t('Falar com a NEXALLOG')}
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <FinalCta />
      </main>
    </>
  );
}
