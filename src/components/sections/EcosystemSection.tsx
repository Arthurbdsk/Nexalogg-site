'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Section } from '@/components/layout/Section';
import { BrandMark } from '@/components/ui/Logo';
import { Reveal } from '@/components/ui/Reveal';
import { solutionAreas } from '@/data/solutions';
import { track } from '@/lib/analytics';
import { cx, polar } from '@/lib/utils';

const RADIUS = 40;

/**
 * Cobertura completa como ecossistema: a NEXALLOG no centro e as áreas em
 * órbita, ligadas por conexões que reagem ao ponteiro e ao foco. Em telas
 * menores a mesma lista vira uma sequência vertical, sem duplicar conteúdo.
 */
export function EcosystemSection() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <Section tone="dark" id="solucoes" labelledBy="solucoes-titulo">
      <div className="shell">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-7">
            <Reveal>
              <h2 id="solucoes-titulo" className="text-display-md">
                Equipe própria e <span className="text-brand-500">rede de parceiros</span>
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 lg:text-right">
            <Reveal delay={120}>
              <Link
                href="/solucoes"
                onClick={() => track('cta_solucoes_click', { local: 'ecossistema' })}
                className="group inline-flex items-center gap-3 text-[0.9375rem] font-semibold text-brand-500 transition-opacity duration-300 hover:opacity-75"
              >
                Ver todas as áreas
                <svg viewBox="0 0 14 14" className="h-3 w-3 transition-transform duration-300 ease-outexpo group-hover:translate-x-1" fill="none" aria-hidden="true">
                  <path d="M1 7h11M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" />
                </svg>
              </Link>
            </Reveal>
          </div>
        </div>

        <div className="relative mx-auto mt-12 w-full lg:mt-16 lg:aspect-square lg:max-w-[44rem]">
          <svg
            viewBox="0 0 100 100"
            className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
            aria-hidden="true"
          >
            <circle cx="50" cy="50" r={RADIUS} fill="none" stroke="#FFFFFF" strokeOpacity="0.09" strokeWidth="0.2" strokeDasharray="0.6 1.6" />
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
                  stroke={isActive ? '#E0A800' : '#FFFFFF'}
                  strokeOpacity={isActive ? 0.95 : 0.16}
                  strokeWidth={isActive ? 0.35 : 0.2}
                  strokeDasharray="1.2 1.6"
                  className={isActive ? undefined : 'motion-safe:animate-pulseline'}
                  style={{ animationDelay: `${index * 320}ms`, transition: 'stroke-opacity 400ms ease, stroke 400ms ease' }}
                />
              );
            })}
          </svg>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:block"
          >
            <div className="flex h-32 w-32 flex-col items-center justify-center rounded-full bg-brand-500 text-ink">
              <BrandMark className="h-7 w-7" />
              <span className="mt-2 text-[0.6875rem] font-bold uppercase tracking-[0.16em]">
                Nexallog
              </span>
            </div>
          </div>

          <ul className="relative flex flex-col border-y border-line/15 lg:absolute lg:inset-0 lg:block lg:border-0">
            {solutionAreas.map((area) => {
              const point = polar(50, 50, RADIUS, area.angle);
              const isActive = active === area.slug;
              return (
                <li
                  key={area.slug}
                  className="border-b border-line/10 last:border-b-0 lg:absolute lg:w-[10.5rem] lg:-translate-x-1/2 lg:-translate-y-1/2 lg:border-0"
                  style={{ left: `${point.x}%`, top: `${point.y}%` }}
                >
                  <Link
                    href={`/solucoes/${area.slug}`}
                    onMouseEnter={() => setActive(area.slug)}
                    onMouseLeave={() => setActive((c) => (c === area.slug ? null : c))}
                    onFocus={() => setActive(area.slug)}
                    onBlur={() => setActive((c) => (c === area.slug ? null : c))}
                    onClick={() => track('cta_solucoes_click', { area: area.slug })}
                    className={cx(
                      'group flex items-center gap-4 py-4 transition-colors duration-300 lg:flex-col lg:items-start lg:gap-1.5 lg:border lg:bg-surface lg:px-4 lg:py-3.5',
                      isActive
                        ? 'lg:border-brand-500 lg:bg-brand-500 lg:text-ink'
                        : 'lg:border-line/15 lg:hover:border-line/35',
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={cx(
                        'h-0.5 w-4 shrink-0 transition-colors duration-300 lg:w-5',
                        isActive ? 'bg-ink' : 'bg-brand-500',
                      )}
                    />
                    <span className="flex-1">
                      <span className="block text-[0.9375rem] font-bold leading-tight">
                        {area.name}
                      </span>
                      <span
                        className={cx(
                          'mt-1 block text-[0.8125rem] leading-snug transition-colors duration-300',
                          isActive ? 'text-ink/70' : 'text-content/50',
                        )}
                      >
                        {area.summary}
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </Section>
  );
}
