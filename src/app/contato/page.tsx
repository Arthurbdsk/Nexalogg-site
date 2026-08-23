import { PageHeader } from '@/components/layout/PageHeader';
import { ContactForm } from '@/components/sections/ContactForm';
import { ContactChannels } from '@/components/ui/ContactChannels';
import { JsonLd } from '@/components/ui/JsonLd';
import { Reveal } from '@/components/ui/Reveal';
import { methodologyStages } from '@/data/methodology';
import { breadcrumbSchema, graph, webPageSchema } from '@/lib/jsonld';
import { buildMetadata } from '@/lib/seo';

const title = 'Contato';
const description =
  'Fale com a NEXALLOG sobre o momento da sua operação de transporte e logística. Envie sua solicitação e receba o retorno da equipe para definir o escopo do diagnóstico.';
const path = '/contato';

export const metadata = buildMetadata({ title, description, path });

const crumbs = [
  { name: 'Início', path: '/' },
  { name: 'Contato', path },
];

export default function ContactPage() {
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
          title="Falar com a NEXALLOG"
          crumbs={crumbs}
          meta="Solicitação de contato"
          lead={
            <p>
              Envie as informações da sua empresa e o contexto atual da operação. A partir dessa
              conversa definimos o escopo do diagnóstico e o ponto de partida do Programa D90.
            </p>
          }
        />

        <section aria-labelledby="formulario-titulo" className="bg-ink py-section">
          <div className="shell">
            <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-7">
                <Reveal>
                  <h2 id="formulario-titulo" className="text-display-sm">
                    Solicitação de contato
                  </h2>
                </Reveal>
                <Reveal delay={80}>
                  <p className="mt-4 max-w-xl text-[1.0625rem] leading-[1.7] text-paper/60">
                    Os campos marcados com asterisco são obrigatórios.
                  </p>
                </Reveal>
                <Reveal delay={140}>
                  <div className="mt-10">
                    <ContactForm />
                  </div>
                </Reveal>
              </div>

              <aside className="lg:col-span-4 lg:col-start-9">
                <Reveal delay={200}>
                  <div className="border border-paper/12 bg-ink-800/50 p-8">
                    <h2 className="label-muted">O que acontece depois</h2>
                    <ol className="mt-6 space-y-6">
                      {methodologyStages.slice(0, 3).map((stage) => (
                        <li key={stage.id} className="flex gap-4">
                          <span className="mt-1 font-mono text-[0.6875rem] tracking-[0.16em] text-copper-400">
                            {stage.order}
                          </span>
                          <span>
                            <span className="block font-display text-[1.0625rem] font-semibold text-paper">
                              {stage.title}
                            </span>
                            <span className="mt-1 block text-sm leading-relaxed text-paper/55">
                              {stage.definition}
                            </span>
                          </span>
                        </li>
                      ))}
                    </ol>

                    <ContactChannels className="mt-8 border-t border-paper/12 pt-8" local="pagina_contato" />
                  </div>
                </Reveal>
              </aside>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
