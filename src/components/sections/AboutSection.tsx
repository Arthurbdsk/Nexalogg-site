'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Section } from '@/components/layout/Section';
import { Reveal } from '@/components/ui/Reveal';
import { principles } from '@/data/solutions';
import { cx } from '@/lib/utils';

type AboutSectionProps = {
  withLink?: boolean;
};

/** Pilares da marca em um bloco escuro e curto, com uma linha cada. */
export function AboutSection({ withLink = true }: AboutSectionProps) {
  const [active, setActive] = useState(0);

  return (
    <Section tone="dark" id="a-nexallog" labelledBy="a-nexallog-titulo">
      <div className="shell">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-7">
            <Reveal>
              <h2 id="a-nexallog-titulo" className="text-display-md">
                Conectamos caminhos, pessoas e <span className="text-brand-500">empresas</span>
              </h2>
            </Reveal>
          </div>
          {withLink ? (
            <div className="lg:col-span-4 lg:col-start-9 lg:text-right">
              <Reveal delay={120}>
                <Link
                  href="/a-nexallog"
                  className="group inline-flex items-center gap-3 text-[0.9375rem] font-semibold text-brand-500 transition-opacity duration-300 hover:opacity-75"
                >
                  Conhecer a NEXALLOG
                  <svg viewBox="0 0 14 14" className="h-3 w-3 transition-transform duration-300 ease-outexpo group-hover:translate-x-1" fill="none" aria-hidden="true">
                    <path d="M1 7h11M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" />
                  </svg>
                </Link>
              </Reveal>
            </div>
          ) : null}
        </div>

        <Reveal delay={100}>
          <ol
            className="mt-12 grid gap-px overflow-hidden border-y border-line/15 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4"
            onMouseLeave={() => setActive(0)}
          >
            {principles.map((principle, index) => {
              const isActive = index === active;
              return (
                <li
                  key={principle.id}
                  onMouseEnter={() => setActive(index)}
                  className={cx(
                    'relative py-7 transition-colors duration-500 sm:px-6 lg:first:pl-0',
                    isActive ? 'bg-content/[0.04]' : 'bg-transparent',
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cx(
                      'absolute left-0 top-0 h-0.5 w-full origin-left bg-brand-500 transition-transform duration-500 ease-outexpo',
                      isActive ? 'scale-x-100' : 'scale-x-0',
                    )}
                  />
                  <h3 className="text-[1.0625rem] font-bold uppercase tracking-[0.06em]">
                    {principle.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-content/60">
                    {principle.description}
                  </p>
                </li>
              );
            })}
          </ol>
        </Reveal>
      </div>
    </Section>
  );
}
