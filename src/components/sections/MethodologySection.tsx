'use client';

import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';
import { useSectionProgress } from '@/hooks/useSectionProgress';
import { methodologyOutcome, methodologyStages } from '@/data/methodology';
import { track } from '@/lib/analytics';
import { cx } from '@/lib/utils';

type MethodologySectionProps = {
  /** Na página de metodologia o bloco já é o conteúdo principal da página. */
  headingLevel?: 'h2' | 'h1';
  withLink?: boolean;
};

/**
 * Programa D90 apresentado como percurso operacional.
 * A linha de progresso acompanha a rolagem e ativa cada etapa na ordem,
 * horizontalmente no desktop e verticalmente em telas menores.
 */
export function MethodologySection({
  headingLevel: Heading = 'h2',
  withLink = true,
}: MethodologySectionProps) {
  const { ref, progress } = useSectionProgress<HTMLDivElement>();
  const total = methodologyStages.length;

  return (
    <section
      id="metodologia"
      aria-labelledby="metodologia-titulo"
      className="relative scroll-mt-24 overflow-hidden border-t border-paper/10 bg-ink-900 py-section"
    >
      <div className="shell relative">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <Reveal>
              <span className="label-muted flex items-center gap-3">
                <span className="h-px w-8 bg-copper-500/70" aria-hidden="true" />
                Programa D90
              </span>
            </Reveal>
            <Reveal delay={60}>
              <Heading id="metodologia-titulo" className="mt-6 text-display-md">
                Do dado ao plano em execução, em 90 dias
              </Heading>
            </Reveal>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <Reveal delay={120}>
              <p className="text-lead text-paper/65">
                O D90 organiza o trabalho em quatro etapas encadeadas. Cada uma entrega a base da
                seguinte, do primeiro dado analisado até o acompanhamento da execução dentro da
                empresa.
              </p>
            </Reveal>
            {withLink ? (
              <Reveal delay={180}>
                <Link
                  href="/metodologia"
                  onClick={() => track('cta_metodologia_click', { local: 'home_metodologia' })}
                  className="group mt-8 inline-flex items-center gap-3 text-[0.9375rem] text-copper-300 transition-colors duration-300 hover:text-copper-200"
                >
                  <span className="relative">
                    Conhecer a metodologia completa
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
            ) : null}
          </div>
        </div>

        <div
          ref={ref}
          className="relative mt-16 lg:mt-24"
          style={{ ['--progress' as string]: progress.toFixed(3) }}
        >
          {/* Trilho do percurso */}
          <div
            aria-hidden="true"
            className="absolute bottom-2 left-[7px] top-2 w-px bg-paper/12 lg:inset-y-auto lg:left-0 lg:right-0 lg:top-[3.25rem] lg:h-px lg:w-auto"
          />
          <div
            aria-hidden="true"
            className="absolute left-[7px] top-2 w-px bg-copper-500 lg:hidden"
            style={{ height: 'calc(var(--progress) * (100% - 1rem))' }}
          />
          <div
            aria-hidden="true"
            className="absolute left-0 top-[3.25rem] hidden h-px bg-copper-500 lg:block"
            style={{ width: 'calc(var(--progress) * 100%)' }}
          />

          <ol className="relative grid gap-12 lg:grid-cols-4 lg:gap-8">
            {methodologyStages.map((stage, index) => {
              const threshold = index / total;
              const reached = progress >= threshold - 0.02;
              return (
                <li
                  key={stage.id}
                  id={stage.id}
                  className="relative scroll-mt-32 pl-10 lg:pl-0"
                >
                  {/* Marcador da etapa */}
                  <span
                    aria-hidden="true"
                    className={cx(
                      'absolute left-0 top-1.5 flex h-4 w-4 items-center justify-center rounded-full border transition-colors duration-500 ease-outexpo lg:left-0 lg:top-[2.75rem]',
                      reached ? 'border-copper-400 bg-ink-900' : 'border-paper/25 bg-ink-900',
                    )}
                  >
                    <span
                      className={cx(
                        'h-1.5 w-1.5 rounded-full transition-all duration-500 ease-outexpo',
                        reached ? 'scale-100 bg-copper-400' : 'scale-0 bg-transparent',
                      )}
                    />
                  </span>

                  <div
                    className={cx(
                      'transition-opacity duration-700 ease-outexpo lg:pt-20',
                      reached ? 'opacity-100' : 'opacity-60',
                    )}
                  >
                    <span
                      className={cx(
                        'font-mono text-[0.6875rem] uppercase tracking-[0.16em] transition-colors duration-500',
                        reached ? 'text-copper-300' : 'text-slateink-400',
                      )}
                    >
                      Etapa {stage.order}
                    </span>
                    <h3 className="mt-4 text-[1.5rem] leading-tight lg:text-[1.625rem]">
                      {stage.title}
                    </h3>
                    <p className="mt-4 text-[0.9375rem] leading-[1.7] text-paper/60">
                      {stage.definition}
                    </p>
                    <p className="mt-4 text-[0.9375rem] leading-[1.7] text-paper/55">
                      {stage.detail}
                    </p>
                    <ul className="mt-6 space-y-2 border-t border-paper/10 pt-5">
                      {stage.deliverables.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 font-mono text-[0.75rem] uppercase leading-relaxed tracking-[0.08em] text-paper/50"
                        >
                          <span aria-hidden="true" className="mt-2 h-px w-3 shrink-0 bg-copper-500/80" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        <Reveal>
          <div className="mt-16 border-t border-paper/10 pt-10 lg:mt-24 lg:flex lg:items-start lg:justify-between lg:gap-16">
            <p className="max-w-md font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-slateink-400">
              Resultado do programa
            </p>
            <p className="mt-4 max-w-2xl text-display-sm text-paper lg:mt-0">
              {methodologyOutcome}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
