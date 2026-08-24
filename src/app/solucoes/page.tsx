import Link from 'next/link';
import { PageHeader } from '@/components/layout/PageHeader';
import { EcosystemSection } from '@/components/sections/EcosystemSection';
import { FinalCta } from '@/components/sections/FinalCta';
import { JsonLd } from '@/components/ui/JsonLd';
import { Reveal } from '@/components/ui/Reveal';
import { methodologyStages } from '@/data/methodology';
import { solutionAreas } from '@/data/solutions';
import { breadcrumbSchema, graph, serviceSchema, webPageSchema } from '@/lib/jsonld';
import { buildMetadata } from '@/lib/seo';

const title = 'Soluções';
const description =
  'Nove áreas de atuação da NEXALLOG, de Operações e Tecnologia a WMS, TMS, Comercial e Fiscal, conduzidas com equipe própria e rede de parceiros especializados.';
const path = '/solucoes';

export const metadata = buildMetadata({ title, description, path });

const crumbs = [
  { name: 'Início', path: '/' },
  { name: 'Soluções', path },
];

export default function SolutionsPage() {
  return (
    <>
      <JsonLd
        data={graph([
          webPageSchema({ path, name: `${title} | NEXALLOG`, description }),
          breadcrumbSchema(crumbs),
          ...solutionAreas.map((area) =>
            serviceSchema({
              name: area.name,
              description: area.summary,
              path: `/solucoes/${area.slug}`,
            }),
          ),
        ])}
      />

      <main id="conteudo" tabIndex={-1}>
        <PageHeader
          title="Nove frentes, um único plano de trabalho"
          crumbs={crumbs}
          lead={
            <p>
              As áreas de atuação da NEXALLOG não funcionam como serviços isolados. Todas partem do
              mesmo diagnóstico e alimentam o mesmo plano de 90 dias, com equipe própria e rede de
              parceiros especializados.
            </p>
          }
        />

        <EcosystemSection />

        <section
          aria-labelledby="conexao-titulo"
          className="tone-muted bg-surface py-section text-content"
        >
          <div className="shell">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-5">
                <Reveal>
                  <h2 id="conexao-titulo" className="text-display-md">
                    Como as áreas entram no Programa D90
                  </h2>
                </Reveal>
                <Reveal delay={100}>
                  <p className="mt-6 text-[1.0625rem] leading-[1.75] text-content/60">
                    A escolha das frentes não é feita no início por preferência. Ela decorre do
                    diagnóstico: cada causa estrutural identificada aponta a área que precisa ser
                    acionada e o momento em que isso acontece dentro do plano.
                  </p>
                </Reveal>
                <Reveal delay={160}>
                  <Link
                    href="/metodologia"
                    className="group mt-8 inline-flex items-center gap-3 text-[0.9375rem] text-brand-600 transition-colors duration-300 hover:text-brand-600"
                  >
                    <span className="relative">
                      Ver como funciona o D90
                      <span
                        aria-hidden="true"
                        className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-brand-400 transition-transform duration-300 ease-outexpo group-hover:scale-x-100"
                      />
                    </span>
                  </Link>
                </Reveal>
              </div>

              <div className="lg:col-span-6 lg:col-start-7">
                <ol className="border-t border-line/15">
                  {methodologyStages.map((stage) => (
                    <Reveal as="li" key={stage.id}>
                      <div className="border-b border-line/15 py-6">
                        <div className="flex items-baseline gap-5">
                          <span className="text-[0.6875rem] tracking-[0.16em] text-brand-600">
                            {stage.order}
                          </span>
                          <h3 className="text-[1.25rem] text-paper">{stage.title}</h3>
                        </div>
                        <p className="mt-3 pl-11 text-[0.9375rem] leading-[1.7] text-content/55">
                          {stage.definition}
                        </p>
                      </div>
                    </Reveal>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>

        <FinalCta />
      </main>
    </>
  );
}
