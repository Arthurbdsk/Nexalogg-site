import { Reveal } from '@/components/ui/Reveal';
import { expectedResults } from '@/data/methodology';

/**
 * Resultados esperados do programa, exatamente como apresentados no material
 * institucional. Nenhuma métrica é atribuída a eles.
 */
export function ResultsSection() {
  return (
    <section
      id="resultados"
      aria-labelledby="resultados-titulo"
      className="relative scroll-mt-24 border-t border-paper/10 bg-ink py-section"
    >
      <div className="shell">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <Reveal>
              <span className="label-muted flex items-center gap-3">
                <span className="h-px w-8 bg-copper-500/70" aria-hidden="true" />
                Resultados esperados
              </span>
            </Reveal>
            <Reveal delay={60}>
              <h2 id="resultados-titulo" className="mt-6 text-display-md">
                O que a empresa passa a ter ao final do programa
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <Reveal delay={120}>
              <p className="text-lead text-paper/65">
                O D90 entrega leitura, direção e acompanhamento. A empresa termina o ciclo com a
                informação organizada, a causa dos desvios identificada e um plano em execução.
              </p>
            </Reveal>
          </div>
        </div>

        <ol className="mt-14 border-t border-paper/12 lg:mt-20">
          {expectedResults.map((result, index) => (
            <Reveal as="li" key={result.id} delay={index * 80}>
              <div className="group relative grid gap-4 border-b border-paper/12 py-8 transition-colors duration-500 hover:bg-paper/[0.03] lg:grid-cols-12 lg:items-baseline lg:gap-8 lg:px-4 lg:py-10">
                <span
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-copper-500 transition-transform duration-700 ease-outexpo group-hover:scale-x-100"
                />
                <span className="font-mono text-[0.6875rem] tracking-[0.16em] text-copper-400 lg:col-span-1">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="text-[1.375rem] leading-snug text-paper lg:col-span-6 lg:text-[1.5rem]">
                  {result.title}
                </h3>
                <p className="text-[0.9375rem] leading-[1.7] text-paper/55 lg:col-span-5">
                  {result.description}
                </p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
