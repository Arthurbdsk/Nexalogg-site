'use client';

import Link from 'next/link';
import { Section } from '@/components/layout/Section';
import { Reveal } from '@/components/ui/Reveal';
import { useSectionProgress } from '@/hooks/useSectionProgress';
import { expectedResults, methodologyOutcome, methodologyStages } from '@/data/methodology';
import { track } from '@/lib/analytics';
import { cx } from '@/lib/utils';

type MethodologySectionProps = {
  /** Na página de metodologia o bloco exibe também o detalhamento de cada etapa. */
  detailed?: boolean;
  withLink?: boolean;
};

/**
 * Programa D90 como percurso. A linha de progresso acompanha a rolagem e ativa
 * as etapas na ordem, horizontalmente no desktop e verticalmente no mobile.
 */
export function MethodologySection({ detailed = false, withLink = true }: MethodologySectionProps) {
  const { ref, progress } = useSectionProgress<HTMLDivElement>();
  const total = methodologyStages.length;

  return (
    <Section tone="light" id="metodologia" labelledBy="metodologia-titulo">
      <div className="shell">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-7">
            <Reveal>
              <h2 id="metodologia-titulo" className="text-display-md">
                Do dado ao <span className="text-brand-500">plano em execução</span>, em 90 dias
              </h2>
            </Reveal>
          </div>
          {withLink ? (
            <div className="lg:col-span-4 lg:col-start-9 lg:text-right">
              <Reveal delay={120}>
                <Link
                  href="/metodologia"
                  onClick={() => track('cta_metodologia_click', { local: 'home_metodologia' })}
                  className="group inline-flex items-center gap-3 text-[0.9375rem] font-semibold transition-opacity duration-300 hover:opacity-70"
                >
                  Ver a metodologia
                  <svg viewBox="0 0 14 14" className="h-3 w-3 transition-transform duration-300 ease-outexpo group-hover:translate-x-1" fill="none" aria-hidden="true">
                    <path d="M1 7h11M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" />
                  </svg>
                </Link>
              </Reveal>
            </div>
          ) : null}
        </div>

        <div
          ref={ref}
          className="relative mt-12 lg:mt-16"
          style={{ ['--progress' as string]: progress.toFixed(3) }}
        >
          <div
            aria-hidden="true"
            className="absolute bottom-2 left-[7px] top-2 w-0.5 bg-line/15 lg:inset-y-auto lg:left-0 lg:right-0 lg:top-[7px] lg:h-0.5 lg:w-auto"
          />
          <div
            aria-hidden="true"
            className="absolute left-[7px] top-2 w-0.5 bg-brand-500 lg:hidden"
            style={{ height: 'calc(var(--progress) * (100% - 1rem))' }}
          />
          <div
            aria-hidden="true"
            className="absolute left-0 top-[7px] hidden h-0.5 bg-brand-500 lg:block"
            style={{ width: 'calc(var(--progress) * 100%)' }}
          />

          <ol className="relative grid gap-10 lg:grid-cols-4 lg:gap-8">
            {methodologyStages.map((stage, index) => {
              const reached = progress >= index / total - 0.02;
              return (
                <li key={stage.id} id={stage.id} className="relative scroll-mt-28 pl-10 lg:pl-0">
                  <span
                    aria-hidden="true"
                    className={cx(
                      'absolute left-0 top-1.5 flex h-4 w-4 items-center justify-center rounded-full border-2 transition-colors duration-500 ease-outexpo lg:top-0',
                      reached ? 'border-brand-500 bg-brand-500' : 'border-line/25 bg-surface',
                    )}
                  />
                  <div
                    className={cx(
                      'transition-opacity duration-500 ease-outexpo lg:pt-9',
                      reached ? 'opacity-100' : 'opacity-45',
                    )}
                  >
                    <span className="text-[0.75rem] font-bold tracking-[0.14em] text-brand-600">
                      {stage.order}
                    </span>
                    <h3 className="mt-3 text-[1.375rem] leading-tight">{stage.title}</h3>
                    <p className="mt-3 text-[0.9375rem] leading-relaxed text-content/65">
                      {stage.definition}
                    </p>
                    {detailed ? (
                      <>
                        <p className="mt-3 text-[0.9375rem] leading-relaxed text-content/55">
                          {stage.detail}
                        </p>
                        <ul className="mt-5 space-y-2 border-t border-line/15 pt-4">
                          {stage.deliverables.map((item) => (
                            <li
                              key={item}
                              className="flex items-start gap-3 text-[0.8125rem] leading-relaxed text-content/60"
                            >
                              <span aria-hidden="true" className="mt-2 h-0.5 w-3 shrink-0 bg-brand-500" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </>
                    ) : null}
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* O que a empresa recebe ao final: uma linha por item */}
        <Reveal delay={80}>
          <div className="mt-14 border-t border-line/15 pt-10 lg:mt-20">
            <p className="max-w-3xl text-display-sm">{methodologyOutcome}</p>
            <ul className="mt-8 grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
              {expectedResults.map((result) => (
                <li key={result.id} className="flex items-start gap-3">
                  <span aria-hidden="true" className="mt-2 h-0.5 w-4 shrink-0 bg-brand-500" />
                  <span className="text-[0.9375rem] leading-snug text-content/70">
                    {result.title}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
