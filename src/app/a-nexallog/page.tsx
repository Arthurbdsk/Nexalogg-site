import Link from 'next/link';
import { PageHeader } from '@/components/layout/PageHeader';
import { AboutSection } from '@/components/sections/AboutSection';
import { AdvisorSection } from '@/components/sections/AdvisorSection';
import { FinalCta } from '@/components/sections/FinalCta';
import { JsonLd } from '@/components/ui/JsonLd';
import { Reveal } from '@/components/ui/Reveal';
import { breadcrumbSchema, graph, personSchema, webPageSchema } from '@/lib/jsonld';
import { buildMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/site';

const title = 'A NEXALLOG';
const description =
  'A NEXALLOG conecta caminhos, pessoas e empresas do setor de Transportes e Logística. Conheça a atuação, os princípios e a liderança por trás do Programa D90.';
const path = '/a-nexallog';

export const metadata = buildMetadata({
  title,
  description,
  path,
  absoluteTitle: 'A NEXALLOG | Consultoria em Transportes e Logística',
});

/** Frentes conduzidas diretamente pela NEXALLOG. */
const capabilities = [
  'Diagnóstico financeiro e operacional',
  'Indicadores gerenciais',
  'Projeções',
  'Identificação de problemas estruturais',
  'Planos de ação',
  'Execução e acompanhamento',
  'Transformação logística',
];

const crumbs = [
  { name: 'Início', path: '/' },
  { name: title, path },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={graph([
          webPageSchema({ path, name: title, description }),
          breadcrumbSchema(crumbs),
          personSchema({
            name: siteConfig.advisor.name,
            jobTitle: siteConfig.advisor.role,
            path,
          }),
        ])}
      />

      <main id="conteudo" tabIndex={-1}>
        <PageHeader
          title="Uma consultoria construída dentro da operação logística"
          crumbs={crumbs}
          meta="Institucional"
          lead={
            <p>
              A NEXALLOG atua com empresas e empresários do segmento de Transportes e Logística.
              Trabalhamos sobre os números da operação, apontamos a origem dos desvios e conduzimos o
              plano até a execução, ao lado do time da empresa.
            </p>
          }
        />

        <section
          aria-labelledby="atuacao-titulo"
          className="border-b border-paper/10 bg-ink py-section"
        >
          <div className="shell">
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-5">
                <Reveal>
                  <h2 id="atuacao-titulo" className="text-display-md">
                    O que conduzimos diretamente
                  </h2>
                </Reveal>
                <Reveal delay={100}>
                  <p className="mt-6 text-[1.0625rem] leading-[1.75] text-paper/60">
                    Estas são as frentes conduzidas pela equipe NEXALLOG ao longo do programa. Nas
                    áreas que exigem competência técnica específica, a rede de parceiros
                    especializados entra junto, sem transferir a coordenação do trabalho.
                  </p>
                </Reveal>
                <Reveal delay={160}>
                  <Link
                    href="/solucoes"
                    className="group mt-8 inline-flex items-center gap-3 text-[0.9375rem] text-copper-300 transition-colors duration-300 hover:text-copper-200"
                  >
                    <span className="relative">
                      Ver as áreas de cobertura
                      <span
                        aria-hidden="true"
                        className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-copper-400 transition-transform duration-300 ease-outexpo group-hover:scale-x-100"
                      />
                    </span>
                    <svg viewBox="0 0 14 14" className="h-3 w-3 transition-transform duration-300 ease-outexpo group-hover:translate-x-1" fill="none" aria-hidden="true">
                      <path d="M1 7h11M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
                    </svg>
                  </Link>
                </Reveal>
              </div>

              <div className="lg:col-span-6 lg:col-start-7">
                <ul className="border-t border-paper/12">
                  {capabilities.map((capability, index) => (
                    <Reveal as="li" key={capability} delay={index * 60}>
                      <div className="group flex items-baseline gap-6 border-b border-paper/12 py-5 transition-colors duration-300 hover:text-copper-200">
                        <span className="font-mono text-[0.6875rem] tracking-[0.16em] text-copper-400">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className="text-[1.0625rem] text-paper transition-colors duration-300 group-hover:text-copper-200">
                          {capability}
                        </span>
                      </div>
                    </Reveal>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <AboutSection withLink={false} />
        <AdvisorSection />
        <FinalCta />
      </main>
    </>
  );
}
