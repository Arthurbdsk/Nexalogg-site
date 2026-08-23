'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Reveal } from '@/components/ui/Reveal';
import { principles } from '@/data/solutions';
import { cx } from '@/lib/utils';

type AboutSectionProps = {
  withLink?: boolean;
};

/**
 * Apresentação institucional. Os três princípios não são cards isolados:
 * dividem uma mesma linha de percurso, e o item em foco assume a linha.
 */
export function AboutSection({ withLink = true }: AboutSectionProps) {
  const [active, setActive] = useState(0);

  return (
    <section
      id="a-nexallog"
      aria-labelledby="a-nexallog-titulo"
      className="relative scroll-mt-24 border-t border-paper/10 bg-ink-900 py-section"
    >
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <span className="label-muted flex items-center gap-3">
                <span className="h-px w-8 bg-copper-500/70" aria-hidden="true" />
                A NEXALLOG
              </span>
            </Reveal>
            <Reveal delay={60}>
              <h2 id="a-nexallog-titulo" className="mt-6 text-display-md">
                Conectamos caminhos, pessoas e empresas
              </h2>
            </Reveal>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <Reveal delay={120}>
              <p className="text-lead text-paper/70">
                Conectamos caminhos, pessoas e empresas para entregar soluções simples que geram
                resultados consistentes e impulsionam o futuro.
              </p>
            </Reveal>
            <Reveal delay={180}>
              <p className="mt-6 text-[1.0625rem] leading-[1.75] text-paper/55">
                O trabalho começa pelos números da operação e termina dentro dela, junto do time que
                executa. Entre um ponto e outro, a NEXALLOG organiza a informação gerencial, aponta a
                causa de cada desvio e transforma o diagnóstico em uma rota de trabalho possível.
              </p>
            </Reveal>
            {withLink ? (
              <Reveal delay={240}>
                <Link
                  href="/a-nexallog"
                  className="group mt-8 inline-flex items-center gap-3 text-[0.9375rem] text-copper-300 transition-colors duration-300 hover:text-copper-200"
                >
                  <span className="relative">
                    Conhecer a NEXALLOG
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

        <Reveal delay={120}>
          <ol
            className="mt-16 grid border-t border-paper/12 lg:mt-24 lg:grid-cols-3"
            onMouseLeave={() => setActive(0)}
          >
            {principles.map((principle, index) => {
              const isActive = index === active;
              return (
                <li
                  key={principle.id}
                  onMouseEnter={() => setActive(index)}
                  className="group relative border-b border-paper/12 py-9 lg:border-b-0 lg:border-r lg:px-8 lg:first:pl-0 lg:last:border-r-0"
                >
                  <span
                    aria-hidden="true"
                    className={cx(
                      'absolute left-0 top-0 h-px w-full origin-left bg-copper-500 transition-transform duration-700 ease-outexpo',
                      isActive ? 'scale-x-100' : 'scale-x-0',
                    )}
                  />
                  <span className="font-mono text-[0.6875rem] tracking-[0.16em] text-copper-400">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-5 text-display-sm uppercase tracking-[-0.01em]">
                    {principle.title}
                  </h3>
                  <p
                    className={cx(
                      'mt-4 max-w-md text-[0.9375rem] leading-[1.7] transition-colors duration-500',
                      isActive ? 'text-paper/70' : 'text-paper/55',
                    )}
                  >
                    {principle.description}
                  </p>
                </li>
              );
            })}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
