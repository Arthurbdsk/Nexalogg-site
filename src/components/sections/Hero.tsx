'use client';

import { Button } from '@/components/ui/Button';
import { RouteCanvas } from '@/components/visuals/RouteCanvas';
import { track } from '@/lib/analytics';
import { siteConfig } from '@/lib/site';

const MARKERS = [
  'Diagnóstico financeiro e operacional',
  'Causas estruturais por área e processo',
  'Plano de 90 dias com suporte na execução',
];

export function Hero() {
  return (
    <section
      id="inicio"
      aria-labelledby="hero-titulo"
      className="relative overflow-hidden bg-ink pb-16 pt-[calc(var(--header-height)+3rem)] lg:pb-24 lg:pt-[calc(var(--header-height)+5rem)]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 grid-field opacity-40 mask-fade-b"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-10 h-[38rem] w-[38rem] rounded-full bg-copper-600/10 blur-[120px]"
      />

      <div className="shell relative">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <h1
              id="hero-titulo"
              className="text-display-xl motion-safe:animate-rise"
            >
              Conectando caminhos,
              <br />
              <span className="text-copper-300">gerando resultados.</span>
            </h1>

            <p
              className="mt-8 max-w-xl text-lead text-paper/70 motion-safe:animate-driftin"
              style={{ animationDelay: '120ms' }}
            >
              A NEXALLOG trabalha com empresas e empresários de Transportes e Logística. Analisamos
              dados financeiros e operacionais, identificamos as causas estruturais que travam o
              resultado e entregamos um plano de 90 dias com suporte direto na execução.
            </p>

            <div
              className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center motion-safe:animate-driftin"
              style={{ animationDelay: '220ms' }}
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
              className="mt-14 grid gap-px border-y border-paper/10 sm:grid-cols-3 motion-safe:animate-driftin"
              style={{ animationDelay: '320ms' }}
            >
              {MARKERS.map((marker, index) => (
                <li
                  key={marker}
                  className="flex items-start gap-3 py-5 sm:flex-col sm:gap-3 sm:py-6 sm:pr-5"
                >
                  <span className="font-mono text-[0.6875rem] tracking-[0.16em] text-copper-400">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="text-sm leading-relaxed text-paper/60">{marker}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-6 lg:pl-6">
            <RouteCanvas />
          </div>
        </div>
      </div>
    </section>
  );
}
