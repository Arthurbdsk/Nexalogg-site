'use client';

import { Button } from '@/components/ui/Button';
import { BrandPanel } from '@/components/visuals/BrandPanel';
import { track } from '@/lib/analytics';
import { siteConfig } from '@/lib/site';

/** Três etapas do trabalho, uma palavra cada. */
const STEPS = ['Diagnóstico', 'Plano de 90 dias', 'Execução acompanhada'];

/**
 * Abertura da home. O bloco acompanha o tema do site: fundo branco com
 * lettering preto no tema claro, fundo preto com lettering branco no escuro.
 * O amarelo entra pelo token de acento, que escurece sobre fundo claro para
 * manter o contraste do título.
 */
export function Hero() {
  return (
    <section
      id="inicio"
      aria-labelledby="hero-titulo"
      className="tone-light relative flex min-h-[100svh] items-center overflow-hidden bg-surface pb-14 pt-[calc(var(--header-height)+3rem)] text-content lg:pb-20 lg:pt-[calc(var(--header-height)+4rem)]"
    >
      <BrandPanel />

      <div className="shell relative w-full">
        <div className="max-w-[46rem]">
          <h1
            id="hero-titulo"
            className="text-[clamp(1.875rem,4vw,3.375rem)] font-bold uppercase leading-[1.08] tracking-[-0.02em] motion-safe:animate-rise"
            style={{ animationDelay: '360ms' }}
          >
            Uma gestão de caixa
            <br />
            que conecta dado
            <br />
            e gera <span className="text-accent">resultado.</span>
          </h1>

          <span
            aria-hidden="true"
            className="mt-9 block h-1 w-16 bg-accent motion-safe:animate-driftin"
            style={{ animationDelay: '580ms' }}
          />

          <div
            className="mt-7 max-w-2xl space-y-4 text-lead text-content/70 motion-safe:animate-driftin"
            style={{ animationDelay: '720ms' }}
          >
            <p>
              Empresas fecham por não acompanhar a geração de caixa. Assuma o controle antes que
              esse problema vire fechamento.
            </p>
            <p>
              Do diagnóstico financeiro e operacional à execução do Programa D90, entregamos a
              gestão de caixa em tempo real para empresas de Transporte e Logística.
            </p>
            <a
              href="https://valor.globo.com/financas/noticia/2023/02/27/mais-empresas-tem-geracao-de-caixa-insuficiente-para-cobrir-despesa-financeira.ghtml"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-accent transition-opacity hover:opacity-75"
            >
              Leia a matéria no Valor Econômico
              <svg viewBox="0 0 14 14" className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" aria-hidden="true">
                <path d="M3 11 11 3M5 3h6v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
              </svg>
            </a>
          </div>

          <div
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center motion-safe:animate-driftin"
            style={{ animationDelay: '880ms' }}
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
            style={{ animationDelay: '1040ms' }}
          >
            {STEPS.map((step) => (
              <li key={step} className="flex items-center gap-3">
                <span aria-hidden="true" className="h-0.5 w-5 bg-accent" />
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

