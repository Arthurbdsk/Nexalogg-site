import { PageHeader } from '@/components/layout/PageHeader';
import { FinalCta } from '@/components/sections/FinalCta';
import { MethodologySection } from '@/components/sections/MethodologySection';
import { ResultsSection } from '@/components/sections/ResultsSection';
import { JsonLd } from '@/components/ui/JsonLd';
import { Reveal } from '@/components/ui/Reveal';
import { methodologyStages } from '@/data/methodology';
import { breadcrumbSchema, graph, serviceSchema, webPageSchema } from '@/lib/jsonld';
import { buildMetadata } from '@/lib/seo';

const title = 'Programa D90';
const description =
  'Metodologia da NEXALLOG em quatro etapas: diagnóstico de dados gerenciais e operacionais, identificação das causas estruturais, plano de ação de 90 dias e suporte na execução.';
const path = '/metodologia';

export const metadata = buildMetadata({ title, description, path });

const crumbs = [
  { name: 'Início', path: '/' },
  { name: 'Metodologia', path },
];

export default function MethodologyPage() {
  return (
    <>
      <JsonLd
        data={graph([
          webPageSchema({ path, name: `${title} | NEXALLOG`, description }),
          breadcrumbSchema(crumbs),
          serviceSchema({ name: 'Programa D90', description, path }),
        ])}
      />

      <main id="conteudo" tabIndex={-1}>
        <PageHeader
          title="Programa D90"
          crumbs={crumbs}
          lead={
            <p>
              O D90 é o programa da NEXALLOG para empresas de transporte e logística. Ele parte dos
              dados da operação, chega à causa estrutural de cada desvio e termina com um plano de 90
              dias em execução dentro da empresa.
            </p>
          }
        >
          <ol className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
            {methodologyStages.map((stage) => (
              <li key={stage.id} className="flex items-center gap-2">
                <span className="text-[0.6875rem] tracking-[0.16em] text-brand-400">
                  {stage.order}
                </span>
                <a
                  href={`#${stage.id}`}
                  className="text-sm text-paper/60 transition-colors duration-300 hover:text-brand-200"
                >
                  {stage.title}
                </a>
              </li>
            ))}
          </ol>
        </PageHeader>

        <MethodologySection withLink={false} />

        <section aria-labelledby="janela-titulo" className="border-t border-paper/10 bg-ink py-section">
          <div className="shell">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-5">
                <Reveal>
                  <h2 id="janela-titulo" className="text-display-md">
                    Por que uma janela de 90 dias
                  </h2>
                </Reveal>
              </div>
              <div className="lg:col-span-6 lg:col-start-7">
                <Reveal delay={100}>
                  <p className="text-[1.0625rem] leading-[1.75] text-paper/65">
                    Noventa dias é o intervalo em que uma empresa de transporte e logística consegue
                    organizar a informação gerencial, agir sobre as causas prioritárias e verificar o
                    efeito no resultado sem perder o fio da operação corrente.
                  </p>
                </Reveal>
                <Reveal delay={160}>
                  <p className="mt-6 text-[1.0625rem] leading-[1.75] text-paper/55">
                    O plano é priorizado por impacto, e a execução é acompanhada pela NEXALLOG junto
                    ao time responsável. O que exige competência técnica específica é conduzido com a
                    rede de parceiros especializados.
                  </p>
                </Reveal>
              </div>
            </div>
          </div>
        </section>

        <ResultsSection />
        <FinalCta />
      </main>
    </>
  );
}
