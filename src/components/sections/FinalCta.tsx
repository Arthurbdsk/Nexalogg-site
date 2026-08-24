'use client';

import Link from 'next/link';
import { BrandMark } from '@/components/ui/Logo';
import { Reveal } from '@/components/ui/Reveal';
import { usePointerOffset } from '@/hooks/usePointerOffset';
import { track } from '@/lib/analytics';
import { siteConfig } from '@/lib/site';

/**
 * Encerramento do site em amarelo da marca sobre lettering preto, a aplicação
 * de maior contraste do manual. É o único bloco claro da navegação, o que
 * separa o convite do restante da leitura.
 */
export function FinalCta() {
  const { ref, offset } = usePointerOffset<HTMLElement>(1);

  return (
    <section
      ref={ref}
      aria-labelledby="cta-final-titulo"
      className="relative overflow-hidden bg-brand-500 text-ink"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(17,17,17,0.07) 1px, transparent 1px), linear-gradient(to bottom, rgba(17,17,17,0.07) 1px, transparent 1px)',
          backgroundSize: '72px 72px',
        }}
      />
      <BrandMark
        outline
        strokeWidth={0.5}
        className="pointer-events-none absolute -right-28 -top-24 h-[38rem] w-[38rem] text-ink/10"
        // O símbolo acompanha discretamente o movimento do cursor
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-24 h-[26rem] w-[26rem] rounded-full border-2 border-ink/10"
        style={{
          transform: `translate3d(${offset.x * 16}px, ${offset.y * 16}px, 0)`,
          transition: 'transform 900ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />

      <div className="shell relative py-section">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-16">
          <div className="lg:col-span-8">
            <Reveal delay={80}>
              <h2 id="cta-final-titulo" className="text-display-lg text-ink">
                Vamos conectar caminhos e gerar resultados na sua operação?
              </h2>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-8 max-w-xl text-lead text-ink/75">
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
                  className="group inline-flex h-[3.5rem] w-full items-center justify-between gap-4 whitespace-nowrap rounded-full bg-ink pl-7 pr-3 text-[0.875rem] font-semibold uppercase tracking-[0.08em] text-paper transition-colors duration-300 ease-outexpo hover:bg-ink-800 sm:w-auto"
                >
                  {siteConfig.cta.primary}
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-500 text-ink transition-transform duration-300 ease-outexpo group-hover:translate-x-1">
                    <svg viewBox="0 0 14 14" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
                      <path d="M1 7h11M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" />
                    </svg>
                  </span>
                </Link>
                <Link
                  href="/metodologia"
                  onClick={() => track('cta_metodologia_click', { local: 'cta_final' })}
                  className="group inline-flex items-center gap-3 text-[0.9375rem] font-medium text-ink/75 transition-colors duration-300 hover:text-ink"
                >
                  <span className="relative">
                    Ver como funciona o D90
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-1 left-0 h-0.5 w-full origin-left scale-x-0 bg-ink transition-transform duration-300 ease-outexpo group-hover:scale-x-100"
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
