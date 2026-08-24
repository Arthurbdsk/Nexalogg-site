'use client';

import { useId, useRef, useState } from 'react';
import { Section } from '@/components/layout/Section';
import { Reveal } from '@/components/ui/Reveal';
import { problems } from '@/data/problems';
import { cx } from '@/lib/utils';

/**
 * Diagnóstico em formato de seleção. A lista mostra apenas o título de cada
 * problema e o painel traz uma linha de leitura e os sinais correspondentes,
 * sem parágrafos longos.
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
    <Section tone="muted" id="problemas" labelledBy={`${baseId}-titulo`}>
      <div className="shell">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-6">
            <Reveal>
              <h2 id={`${baseId}-titulo`} className="text-display-md">
                Quando o resultado foge do controle
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <Reveal delay={100}>
              <p className="text-[1.0625rem] leading-relaxed text-content/65">
                Problemas estruturais se acumulam em silêncio e só aparecem no resultado.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Seleção: notebook e desktop */}
        <div className="mt-12 hidden lg:mt-16 lg:grid lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <div
              role="tablist"
              aria-orientation="vertical"
              aria-label="Problemas estruturais recorrentes"
              className="border-t border-line/15"
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
                      'group relative flex w-full items-center gap-5 border-b border-line/15 py-5 text-left transition-colors duration-300',
                      isActive ? 'text-content' : 'text-content/45 hover:text-content/80',
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={cx(
                        'absolute left-0 top-0 h-full w-0.5 origin-top bg-brand-500 transition-transform duration-500 ease-outexpo',
                        isActive ? 'scale-y-100' : 'scale-y-0',
                      )}
                    />
                    <span className="w-8 text-[0.75rem] font-bold tracking-[0.12em] text-brand-600">
                      {problem.index}
                    </span>
                    <span className="font-bold text-[1.25rem] leading-tight">{problem.title}</span>
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
              className="tone-light bg-surface p-9 text-content shadow-[0_1px_0_0_rgb(var(--line)/0.10),0_24px_60px_-40px_rgb(17_17_17/0.35)]"
            >
              <div key={current.id} className="motion-safe:animate-driftin">
                <h3 className="text-display-sm">{current.title}</h3>
                <p className="mt-4 text-[1.0625rem] leading-relaxed text-content/65">
                  {current.description}
                </p>
                <ul className="mt-7 flex flex-wrap gap-2">
                  {current.signals.map((signal) => (
                    <li
                      key={signal}
                      className="border border-line/15 px-3.5 py-2 text-[0.8125rem] text-content/70"
                    >
                      {signal}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Acordeão: telas menores */}
        <div className="mt-10 lg:hidden">
          <div className="border-t border-line/15">
            {problems.map((problem, index) => {
              const isOpen = openMobile === index;
              return (
                <div key={problem.id} className="border-b border-line/15">
                  <h3>
                    <button
                      type="button"
                      onClick={() => setOpenMobile(isOpen ? null : index)}
                      aria-expanded={isOpen}
                      aria-controls={`${baseId}-mobile-${problem.id}`}
                      className="flex w-full items-center gap-4 py-4 text-left"
                    >
                      <span className="w-7 text-[0.75rem] font-bold tracking-[0.12em] text-brand-600">
                        {problem.index}
                      </span>
                      <span className="flex-1 text-[1.0625rem] font-bold">{problem.title}</span>
                      <span
                        aria-hidden="true"
                        className={cx(
                          'flex h-6 w-6 shrink-0 items-center justify-center transition-transform duration-300 ease-outexpo',
                          isOpen && 'rotate-45',
                        )}
                      >
                        <svg viewBox="0 0 16 16" className="h-4 w-4 text-brand-600" fill="none">
                          <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="1.8" />
                        </svg>
                      </span>
                    </button>
                  </h3>
                  <div id={`${baseId}-mobile-${problem.id}`} hidden={!isOpen} className="pb-6 pl-11 pr-2">
                    <p className="text-[0.9375rem] leading-relaxed text-content/65">
                      {problem.description}
                    </p>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {problem.signals.map((signal) => (
                        <li
                          key={signal}
                          className="border border-line/15 px-3 py-1.5 text-xs text-content/70"
                        >
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
    </Section>
  );
}
