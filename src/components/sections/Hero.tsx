'use client';

import { Button } from '@/components/ui/Button';
import { BrandPanel } from '@/components/visuals/BrandPanel';
import { track } from '@/lib/analytics';
import { siteConfig } from '@/lib/site';

/** Três etapas do trabalho, uma palavra cada. */
const STEPS = ['Diagnóstico', 'Plano de 90 dias', 'Execução acompanhada'];

export function Hero() {
  return (
    <section
      id="inicio"
      aria-labelledby="hero-titulo"
      className="tone-dark relative flex min-h-[max(34rem,84svh)] items-center overflow-hidden bg-surface pb-14 pt-[calc(var(--header-height)+3rem)] text-content lg:pb-20 lg:pt-[calc(var(--header-height)+4rem)]"
    >
      <BrandPanel />

      <div className="shell relative w-full">
        <div className="max-w-[46rem]">
          <h1
            id="hero-titulo"
            className="text-[clamp(1.875rem,4vw,3.375rem)] font-bold uppercase leading-[1.08] tracking-[-0.02em] motion-safe:animate-rise"
          >
            Soluções logísticas
            <br />
            que conectam, movimentam
            <br />
            e geram <span className="text-brand-500">resultados.</span>
          </h1>

          <span
            aria-hidden="true"
            className="mt-9 block h-1 w-16 bg-brand-500 motion-safe:animate-driftin"
            style={{ animationDelay: '140ms' }}
          />

          <p
            className="mt-7 max-w-xl text-lead text-content/70 motion-safe:animate-driftin"
            style={{ animationDelay: '200ms' }}
          >
            Diagnóstico, plano de ação de 90 dias e execução para empresas de transporte e
            logística.
          </p>

          <div
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center motion-safe:animate-driftin"
            style={{ animationDelay: '280ms' }}
          >
            <Button
              href="/contato"
              size="lg"
              withArrow
              onClick={() => track('cta_principal_click', { local: 'hero' })}
            >
              {siteConfig.cta.hero}
            </Button>
            <Button
              href="/metodologia"
              variant="outline"
              size="lg"
              onClick={() => track('cta_metodologia_click', { local: 'hero' })}
            >
              {siteConfig.cta.methodology}
            </Button>
          </div>

          <ul
            className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 motion-safe:animate-driftin"
            style={{ animationDelay: '360ms' }}
          >
            {STEPS.map((step) => (
              <li key={step} className="flex items-center gap-3">
                <span aria-hidden="true" className="h-0.5 w-5 bg-brand-500" />
                <span className="text-sm font-semibold uppercase tracking-[0.1em] text-content/60">
                  {step}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
