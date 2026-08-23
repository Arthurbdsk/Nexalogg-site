import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PageHeader } from '@/components/layout/PageHeader';
import { FinalCta } from '@/components/sections/FinalCta';
import { JsonLd } from '@/components/ui/JsonLd';
import { Reveal } from '@/components/ui/Reveal';
import { getSolutionArea, solutionAreas } from '@/data/solutions';
import { breadcrumbSchema, graph, serviceSchema, webPageSchema } from '@/lib/jsonld';
import { buildMetadata } from '@/lib/seo';

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return solutionAreas.map((area) => ({ slug: area.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const area = getSolutionArea(slug);

  if (!area) {
    return buildMetadata({
      title: 'Área não encontrada',
      description: 'A área de atuação solicitada não existe no site da NEXALLOG.',
      path: `/solucoes/${slug}`,
      noIndex: true,
    });
  }

  return buildMetadata({
    title: area.name,
    description: `${area.summary} Frente de atuação da NEXALLOG dentro do Programa D90, para empresas de Transportes e Logística.`,
    path: `/solucoes/${area.slug}`,
  });
}

export default async function SolutionAreaPage({ params }: PageProps) {
  const { slug } = await params;
  const area = getSolutionArea(slug);

  if (!area) notFound();

  const path = `/solucoes/${area.slug}`;
  const crumbs = [
    { name: 'Início', path: '/' },
    { name: 'Soluções', path: '/solucoes' },
    { name: area.name, path },
  ];
  const related = solutionAreas.filter((item) => item.slug !== area.slug).slice(0, 3);

  return (
    <>
      <JsonLd
        data={graph([
          webPageSchema({ path, name: `${area.name} | NEXALLOG`, description: area.intro }),
          breadcrumbSchema(crumbs),
          serviceSchema({ name: area.name, description: area.intro, path }),
        ])}
      />

      <main id="conteudo" tabIndex={-1}>
        <PageHeader
          title={area.name}
          crumbs={crumbs}
          meta="Área de atuação"
          lead={<p>{area.intro}</p>}
        />

        <section aria-labelledby="frentes-titulo" className="border-b border-paper/10 bg-ink py-section">
          <div className="shell">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-5">
                <Reveal>
                  <h2 id="frentes-titulo" className="text-display-md">
                    Frentes de trabalho
                  </h2>
                </Reveal>
                <Reveal delay={100}>
                  <p className="mt-6 text-[1.0625rem] leading-[1.75] text-paper/60">
                    O escopo dentro de {area.name} é definido pelo diagnóstico. As frentes abaixo são
                    acionadas conforme a causa estrutural identificada e a prioridade estabelecida no
                    plano de 90 dias.
                  </p>
                </Reveal>
              </div>

              <div className="lg:col-span-6 lg:col-start-7">
                <ul className="border-t border-paper/12">
                  {area.fronts.map((front, index) => (
                    <Reveal as="li" key={front} delay={index * 70}>
                      <div className="group flex items-baseline gap-6 border-b border-paper/12 py-5">
                        <span className="font-mono text-[0.6875rem] tracking-[0.16em] text-copper-400">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className="text-[1.0625rem] leading-relaxed text-paper/85 transition-colors duration-300 group-hover:text-copper-200">
                          {front}
                        </span>
                      </div>
                    </Reveal>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="sinais-titulo" className="border-b border-paper/10 bg-ink-900 py-section">
          <div className="shell">
            <Reveal>
              <h2 id="sinais-titulo" className="text-display-md">
                Sinais que costumam apontar para esta frente
              </h2>
            </Reveal>
            <ul className="mt-10 grid gap-px sm:grid-cols-3">
              {area.signals.map((signal, index) => (
                <Reveal as="li" key={signal} delay={index * 80}>
                  <div className="h-full border-t border-paper/12 pr-6 pt-6">
                    <span className="font-mono text-[0.6875rem] tracking-[0.16em] text-copper-400">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <p className="mt-4 text-[1.0625rem] leading-[1.6] text-paper/75">{signal}</p>
                  </div>
                </Reveal>
              ))}
            </ul>

            <Reveal delay={160}>
              <div className="mt-14 border-t border-paper/12 pt-10">
                <h3 className="label-muted">Outras áreas</h3>
                <ul className="mt-6 flex flex-wrap gap-3">
                  {related.map((item) => (
                    <li key={item.slug}>
                      <Link
                        href={`/solucoes/${item.slug}`}
                        className="inline-flex h-10 items-center rounded-full border border-paper/15 px-5 text-sm text-paper/70 transition-colors duration-300 hover:border-copper-400/60 hover:text-copper-200"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link
                      href="/solucoes"
                      className="inline-flex h-10 items-center rounded-full border border-copper-500/40 px-5 text-sm text-copper-300 transition-colors duration-300 hover:border-copper-400 hover:text-copper-200"
                    >
                      Ver todas as áreas
                    </Link>
                  </li>
                </ul>
              </div>
            </Reveal>
          </div>
        </section>

        <FinalCta />
      </main>
    </>
  );
}
