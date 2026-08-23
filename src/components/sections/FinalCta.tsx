'use client';

import Link from 'next/link';
import { Reveal } from '@/components/ui/Reveal';
import { usePointerOffset } from '@/hooks/usePointerOffset';
import { track } from '@/lib/analytics';
import { siteConfig } from '@/lib/site';

/**
 * Encerramento do site. A inversão de fundo separa o convite do restante da
 * leitura e concentra a atenção em uma única ação.
 */
export function FinalCta() {
  const { ref, offset } = usePointerOffset<HTMLElement>(1);

  return (
    <section
      ref={ref}
      aria-labelledby="cta-final-titulo"
      className="relative overflow-hidden bg-paper text-ink"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(5,8,13,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(5,8,13,0.06) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 h-[30rem] w-[30rem] rounded-full border border-ink/10"
        style={{
          transform: `translate3d(${offset.x * 14}px, ${offset.y * 14}px, 0)`,
          transition: 'transform 900ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />

      <div className="shell relative py-section">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="lg:col-span-8">
            <Reveal>
              <span className="flex items-center gap-3 font-mono text-label uppercase tracking-[0.16em] text-copper-600">
                <span className="h-px w-8 bg-copper-600" aria-hidden="true" />
                Próximo passo
              </span>
            </Reveal>
            <Reveal delay={80}>
              <h2 id="cta-final-titulo" className="mt-8 text-display-lg text-ink">
                Vamos conectar caminhos e gerar resultados na sua operação?
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-8 max-w-xl text-lead text-ink/65">
                O primeiro passo é uma conversa sobre o momento da sua empresa. A partir dela,
                definimos o escopo do diagnóstico e o ponto de partida do Programa D90.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-4">
            <Reveal delay={220}>
              <div className="flex flex-col items-start gap-6">
                <Link
                  href="/contato"
                  onClick={() => track('cta_principal_click', { local: 'cta_final' })}
                  className="group inline-flex h-[3.5rem] w-full items-center justify-between gap-4 whitespace-nowrap rounded-full bg-ink pl-7 pr-3 text-[0.9375rem] font-medium text-paper transition-colors duration-300 ease-outexpo hover:bg-copper-500 sm:w-auto"
                >
                  {siteConfig.cta.primary}
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-paper/10 transition-transform duration-300 ease-outexpo group-hover:translate-x-1">
                    <svg viewBox="0 0 14 14" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
                      <path d="M1 7h11M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
                    </svg>
                  </span>
                </Link>
                <Link
                  href="/metodologia"
                  onClick={() => track('cta_metodologia_click', { local: 'cta_final' })}
                  className="group inline-flex items-center gap-3 text-[0.9375rem] text-ink/70 transition-colors duration-300 hover:text-ink"
                >
                  <span className="relative">
                    Ver como funciona o D90
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-copper-600 transition-transform duration-300 ease-outexpo group-hover:scale-x-100"
                    />
                  </span>
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
