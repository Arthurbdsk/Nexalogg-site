'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Reveal } from '@/components/ui/Reveal';
import { solutionAreas } from '@/data/solutions';
import { track } from '@/lib/analytics';
import { cx, polar } from '@/lib/utils';

const RADIUS = 40;

/**
 * Cobertura completa apresentada como ecossistema: a NEXALLOG no centro e as
 * áreas de atuação em órbita, ligadas por conexões que reagem ao foco e ao
 * ponteiro. Em telas menores a mesma lista vira uma sequência vertical, sem
 * duplicação de conteúdo no DOM.
 */
export function EcosystemSection() {
  const [active, setActive] = useState<string | null>(null);
  const activeArea = solutionAreas.find((area) => area.slug === active) ?? null;

  return (
    <section
      id="solucoes"
      aria-labelledby="solucoes-titulo"
      className="relative scroll-mt-24 border-t border-paper/10 bg-ink py-section"
    >
      <div className="shell relative">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <Reveal>
              <span className="label-muted flex items-center gap-3">
                <span className="h-px w-8 bg-copper-500/70" aria-hidden="true" />
                Cobertura completa
              </span>
            </Reveal>
            <Reveal delay={60}>
              <h2 id="solucoes-titulo" className="mt-6 text-display-md">
                Equipe própria e rede de parceiros especializados
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <Reveal delay={120}>
              <p className="text-lead text-paper/65">
                Cada frente exige uma competência diferente. A NEXALLOG conduz o programa com equipe
                própria e aciona a rede de parceiros especializados nas áreas em que a execução pede
                profundidade técnica.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-16 lg:mt-24">
          <div className="relative mx-auto w-full lg:aspect-square lg:max-w-[46rem]">
            {/* Malha de conexões: elemento puramente visual */}
            <svg
              viewBox="0 0 100 100"
              className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
              aria-hidden="true"
            >
              <circle cx="50" cy="50" r={RADIUS} fill="none" stroke="#F4F3EF" strokeOpacity="0.08" strokeWidth="0.2" strokeDasharray="0.6 1.6" />
              <circle cx="50" cy="50" r={RADIUS * 0.55} fill="none" stroke="#F4F3EF" strokeOpacity="0.06" strokeWidth="0.2" />
              {solutionAreas.map((area, index) => {
                const point = polar(50, 50, RADIUS, area.angle);
                const isActive = active === area.slug;
                return (
                  <line
                    key={area.slug}
                    x1="50"
                    y1="50"
                    x2={point.x}
                    y2={point.y}
                    stroke={isActive ? '#D98A4C' : '#F4F3EF'}
                    strokeOpacity={isActive ? 0.95 : 0.2}
                    strokeWidth={isActive ? 0.35 : 0.2}
                    strokeDasharray="1.2 1.6"
                    className={isActive ? undefined : 'motion-safe:animate-pulseline'}
                    style={{ animationDelay: `${index * 320}ms`, transition: 'stroke-opacity 400ms ease, stroke 400ms ease' }}
                  />
                );
              })}
            </svg>

            {/* Núcleo */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:block"
            >
              <div className="flex h-36 w-36 flex-col items-center justify-center rounded-full border border-paper/15 bg-ink-800 text-center">
                <span className="font-display text-[0.9375rem] font-bold uppercase tracking-[0.18em] text-paper">
                  Nexallog
                </span>
                <span className="mt-2 h-px w-8 bg-copper-500" />
                <span className="mt-2 max-w-[7rem] font-mono text-[0.625rem] uppercase leading-relaxed tracking-[0.1em] text-slateink-400">
                  Coordenação do programa
                </span>
              </div>
            </div>

            <ul className="relative flex flex-col divide-y divide-paper/10 border-y border-paper/10 lg:absolute lg:inset-0 lg:block lg:divide-y-0 lg:border-0">
              {solutionAreas.map((area) => {
                const point = polar(50, 50, RADIUS, area.angle);
                const isActive = active === area.slug;
                return (
                  <li
                    key={area.slug}
                    className="lg:absolute lg:w-[11rem] lg:-translate-x-1/2 lg:-translate-y-1/2"
                    style={{ left: `${point.x}%`, top: `${point.y}%` }}
                  >
                    <Link
                      href={`/solucoes/${area.slug}`}
                      onMouseEnter={() => setActive(area.slug)}
                      onMouseLeave={() => setActive((current) => (current === area.slug ? null : current))}
                      onFocus={() => setActive(area.slug)}
                      onBlur={() => setActive((current) => (current === area.slug ? null : current))}
                      onClick={() => track('cta_solucoes_click', { area: area.slug })}
                      className={cx(
                        'group flex items-start gap-4 py-5 transition-colors duration-300 lg:flex-col lg:gap-2 lg:border lg:bg-ink-800/85 lg:px-5 lg:py-4 lg:backdrop-blur-sm',
                        isActive
                          ? 'lg:border-copper-400/70 lg:bg-ink-700'
                          : 'lg:border-paper/12 lg:hover:border-paper/25',
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className={cx(
                          'mt-2 h-1.5 w-1.5 shrink-0 rounded-full transition-colors duration-300 lg:mt-0',
                          isActive ? 'bg-copper-400' : 'bg-paper/30 group-hover:bg-copper-400',
                        )}
                      />
                      <span className="flex-1">
                        <span
                          className={cx(
                            'block font-display text-[1.0625rem] font-semibold leading-tight transition-colors duration-300',
                            isActive ? 'text-copper-200' : 'text-paper',
                          )}
                        >
                          {area.name}
                        </span>
                        <span className="mt-1 block text-sm leading-relaxed text-paper/50 lg:text-[0.8125rem]">
                          {area.summary}
                        </span>
                      </span>
                      <span
                        aria-hidden="true"
                        className="mt-1.5 hidden h-3 w-3 shrink-0 text-copper-300 transition-transform duration-300 ease-outexpo group-hover:translate-x-1 sm:block lg:hidden"
                      >
                        <svg viewBox="0 0 14 14" fill="none" className="h-3 w-3">
                          <path d="M1 7h11M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
                        </svg>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="mt-10 hidden min-h-[4.5rem] items-start justify-between gap-10 border-t border-paper/10 pt-8 lg:flex">
            <p className="max-w-2xl text-[1.0625rem] leading-[1.7] text-paper/60">
              {activeArea ? activeArea.intro : 'Nove frentes de atuação conectadas ao mesmo diagnóstico e ao mesmo plano de 90 dias.'}
            </p>
            <Link
              href="/solucoes"
              onClick={() => track('cta_solucoes_click', { local: 'ecossistema' })}
              className="group inline-flex shrink-0 items-center gap-3 text-[0.9375rem] text-copper-300 transition-colors duration-300 hover:text-copper-200"
            >
              <span className="relative">
                Ver todas as áreas
                <span
                  aria-hidden="true"
                  className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-copper-400 transition-transform duration-300 ease-outexpo group-hover:scale-x-100"
                />
              </span>
              <svg viewBox="0 0 14 14" className="h-3 w-3 transition-transform duration-300 ease-outexpo group-hover:translate-x-1" fill="none" aria-hidden="true">
                <path d="M1 7h11M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
              </svg>
            </Link>
          </div>

          <div className="mt-10 lg:hidden">
            <Link
              href="/solucoes"
              onClick={() => track('cta_solucoes_click', { local: 'ecossistema_mobile' })}
              className="inline-flex h-12 items-center gap-3 rounded-full border border-paper/20 px-6 text-[0.9375rem] text-paper transition-colors duration-300 hover:border-copper-400/70 hover:text-copper-200"
            >
              Ver todas as áreas
              <svg viewBox="0 0 14 14" className="h-3 w-3" fill="none" aria-hidden="true">
                <path d="M1 7h11M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
