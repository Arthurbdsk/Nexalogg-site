'use client';

import { useId, useRef, useState } from 'react';
import { Reveal } from '@/components/ui/Reveal';
import { problems } from '@/data/problems';
import { cx } from '@/lib/utils';

/**
 * Seção de diagnóstico. No desktop funciona como um painel de seleção
 * (padrão tablist, navegável por teclado). No mobile, os mesmos itens viram
 * um acordeão, com o conteúdo dentro do próprio item.
 */
export function ProblemsSection() {
  const [active, setActive] = useState(0);
  const [openMobile, setOpenMobile] = useState<number | null>(0);
  const baseId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const current = problems[active];

  const onKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    const keys: Record<string, number> = {
      ArrowDown: index + 1,
      ArrowRight: index + 1,
      ArrowUp: index - 1,
      ArrowLeft: index - 1,
      Home: 0,
      End: problems.length - 1,
    };
    const next = keys[event.key];
    if (next === undefined) return;
    event.preventDefault();
    const bounded = (next + problems.length) % problems.length;
    setActive(bounded);
    tabRefs.current[bounded]?.focus();
  };

  return (
    <section
      id="problemas"
      aria-labelledby={`${baseId}-titulo`}
      className="relative scroll-mt-24 border-t border-paper/10 bg-ink py-section"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-72 opacity-[0.45] grid-field mask-fade-b"
      />

      <div className="shell relative">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <span className="label-muted flex items-center gap-3">
                <span className="h-px w-8 bg-copper-500/70" aria-hidden="true" />
                Diagnóstico
              </span>
            </Reveal>
            <Reveal delay={60}>
              <h2 id={`${baseId}-titulo`} className="mt-6 text-display-md">
                Quando o resultado foge do controle
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal delay={120}>
              <p className="text-lead text-paper/65">
                Problemas estruturais raramente aparecem de uma vez. Eles se acumulam em silêncio
                dentro da operação, comprometem o resultado financeiro e se agravam quando não são
                identificados e diagnosticados a tempo.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Painel de seleção: notebook e desktop */}
        <div className="mt-16 hidden lg:mt-20 lg:grid lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div
              role="tablist"
              aria-orientation="vertical"
              aria-label="Problemas estruturais recorrentes"
              className="border-t border-paper/10"
            >
              {problems.map((problem, index) => {
                const isActive = index === active;
                return (
                  <button
                    key={problem.id}
                    ref={(node) => {
                      tabRefs.current[index] = node;
                    }}
                    role="tab"
                    type="button"
                    id={`${baseId}-tab-${problem.id}`}
                    aria-selected={isActive}
                    aria-controls={`${baseId}-painel`}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => setActive(index)}
                    onFocus={() => setActive(index)}
                    onMouseEnter={() => setActive(index)}
                    onKeyDown={(event) => onKeyDown(event, index)}
                    className={cx(
                      'group relative flex w-full items-baseline gap-5 border-b border-paper/10 py-6 text-left transition-colors duration-300',
                      isActive ? 'text-paper' : 'text-paper/55 hover:text-paper/80',
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={cx(
                        'absolute left-0 top-0 h-full w-px origin-top bg-copper-500 transition-transform duration-500 ease-outexpo',
                        isActive ? 'scale-y-100' : 'scale-y-0',
                      )}
                    />
                    <span
                      className={cx(
                        'font-mono text-[0.6875rem] tracking-[0.16em] transition-colors duration-300',
                        isActive ? 'text-copper-300' : 'text-slateink-400',
                      )}
                    >
                      {problem.index}
                    </span>
                    <span className="flex-1">
                      <span className="block font-display text-[1.375rem] font-semibold leading-tight">
                        {problem.title}
                      </span>
                      <span
                        className={cx(
                          'mt-1 block text-sm leading-relaxed transition-opacity duration-300',
                          isActive ? 'text-paper/55 opacity-100' : 'text-paper/55 opacity-70',
                        )}
                      >
                        {problem.summary}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <div
              role="tabpanel"
              id={`${baseId}-painel`}
              aria-labelledby={`${baseId}-tab-${current.id}`}
              tabIndex={0}
              className="sticky top-32 border border-paper/10 bg-ink-800/60 p-10"
            >
              <div key={current.id} className="motion-safe:animate-driftin">
                <div className="flex items-center justify-between border-b border-paper/10 pb-6">
                  <span className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-copper-300">
                    Leitura do problema
                  </span>
                  <span className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-slateink-400">
                    {current.index} / {String(problems.length).padStart(2, '0')}
                  </span>
                </div>

                <h3 className="mt-8 text-display-sm">{current.title}</h3>
                <p className="mt-5 text-[1.0625rem] leading-[1.7] text-paper/65">
                  {current.description}
                </p>

                <ul className="mt-9 space-y-3 border-t border-paper/10 pt-8">
                  {current.signals.map((signal) => (
                    <li key={signal} className="flex items-start gap-4 text-[0.9375rem] text-paper/70">
                      <span
                        aria-hidden="true"
                        className="mt-2.5 h-px w-6 shrink-0 bg-copper-500"
                      />
                      {signal}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Acordeão: telas menores */}
        <div className="mt-12 lg:hidden">
          <div className="border-t border-paper/10">
            {problems.map((problem, index) => {
              const isOpen = openMobile === index;
              return (
                <div key={problem.id} className="border-b border-paper/10">
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpenMobile(isOpen ? null : index)}
                      aria-expanded={isOpen}
                      aria-controls={`${baseId}-mobile-${problem.id}`}
                      className="flex w-full items-start gap-4 py-5 text-left"
                    >
                      <span className="mt-1 font-mono text-[0.6875rem] tracking-[0.16em] text-copper-300">
                        {problem.index}
                      </span>
                      <span className="flex-1">
                        <span className="block font-display text-lg font-semibold text-paper">
                          {problem.title}
                        </span>
                        <span className="mt-1 block text-sm text-paper/50">{problem.summary}</span>
                      </span>
                      <span
                        aria-hidden="true"
                        className={cx(
                          'mt-1 flex h-6 w-6 shrink-0 items-center justify-center transition-transform duration-300 ease-outexpo',
                          isOpen && 'rotate-45',
                        )}
                      >
                        <svg viewBox="0 0 16 16" className="h-4 w-4 text-copper-300" fill="none">
                          <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.5" />
                        </svg>
                      </span>
                    </button>
                  </h3>
                  <div
                    id={`${baseId}-mobile-${problem.id}`}
                    hidden={!isOpen}
                    className="pb-7 pl-10 pr-2"
                  >
                    <p className="text-[0.9375rem] leading-[1.7] text-paper/65">
                      {problem.description}
                    </p>
                    <ul className="mt-5 space-y-2.5">
                      {problem.signals.map((signal) => (
                        <li key={signal} className="flex items-start gap-3 text-sm text-paper/60">
                          <span aria-hidden="true" className="mt-2 h-px w-4 shrink-0 bg-copper-500" />
                          {signal}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
