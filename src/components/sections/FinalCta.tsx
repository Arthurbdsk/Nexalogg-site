'use client';

import Link from 'next/link';
import { Section } from '@/components/layout/Section';
import { BrandMark } from '@/components/ui/Logo';
import { Reveal } from '@/components/ui/Reveal';
import { track } from '@/lib/analytics';
import { siteConfig } from '@/lib/site';

/** Fechamento em amarelo: uma frase e uma ação. */
export function FinalCta() {
  return (
    <Section tone="brand" className="overflow-hidden">
      <BrandMark
        outline
        strokeWidth={0.6}
        className="pointer-events-none absolute -right-24 -top-20 h-[26rem] w-[26rem] text-ink/10"
      />
      <div className="shell relative">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
          <div className="lg:col-span-7">
            <Reveal>
              <h2 className="text-display-lg">
                Vamos conectar caminhos e gerar resultados na sua operação?
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <Reveal delay={140}>
              <Link
                href="/contato"
                onClick={() => track('cta_principal_click', { local: 'cta_final' })}
                className="group inline-flex h-14 w-full items-center justify-between gap-4 whitespace-nowrap rounded-full bg-ink pl-7 pr-3 text-[0.8125rem] font-bold uppercase tracking-[0.06em] text-paper transition-colors duration-300 ease-outexpo hover:bg-ink-800 sm:w-auto"
              >
                {siteConfig.cta.primary}
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-500 text-ink transition-transform duration-300 ease-outexpo group-hover:translate-x-1">
                  <svg viewBox="0 0 14 14" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
                    <path d="M1 7h11M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" />
                  </svg>
                </span>
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </Section>
  );
}
