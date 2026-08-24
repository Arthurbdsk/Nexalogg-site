'use client';

import { Button } from '@/components/ui/Button';
import { BrandMark } from '@/components/ui/Logo';
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
        className="pointer-events-none absolute inset-0 grid-field opacity-30 mask-fade-b"
      />
      {/* Símbolo da marca em grande escala, como nas aplicações do manual */}
      <BrandMark
        outline
        strokeWidth={0.5}
        className="pointer-events-none absolute -right-52 -top-16 h-[40rem] w-[40rem] text-brand-500/[0.055] lg:-right-40 lg:-top-24 lg:h-[54rem] lg:w-[54rem]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 top-32 h-[30rem] w-[30rem] rounded-full bg-brand-500/[0.05] blur-[140px]"
      />

      <div className="shell relative">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <h1 id="hero-titulo" className="text-display-xl motion-safe:animate-rise">
              Conectando caminhos,
              <br />
              <span className="text-brand-500">gerando resultados.</span>
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
              className="mt-14 grid border-t border-paper/12 sm:grid-cols-3 motion-safe:animate-driftin"
              style={{ animationDelay: '320ms' }}
            >
              {MARKERS.map((marker) => (
                <li
                  key={marker}
                  className="flex items-start gap-4 border-b border-paper/12 py-5 sm:border-b-0 sm:pr-6"
                >
                  <span aria-hidden="true" className="mt-[0.6rem] h-0.5 w-4 shrink-0 bg-brand-500" />
                  <span className="text-sm leading-relaxed text-paper/65">{marker}</span>
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
