'use client';

import type { CSSProperties } from 'react';
import { useReveal } from '@/hooks/useReveal';
import { cx } from '@/lib/utils';

const WORDMARK = 'NEXALLOG'.split('');

export function FooterWordmark() {
  const { ref, visible } = useReveal<HTMLDivElement>({ threshold: 0.3 });

  return (
    <div className="mt-16 border-t border-line/15 pt-12 lg:mt-20 lg:pt-16">
      <div ref={ref} className="footer-wordmark" data-visible={visible ? 'true' : 'false'}>
        <span className="sr-only">NEXALLOG. Conectando caminhos, gerando resultados.</span>

        <span
          aria-hidden="true"
          className="flex items-end justify-between overflow-hidden text-[clamp(3rem,10.5vw,8.75rem)] font-extrabold uppercase leading-[0.78] tracking-[-0.08em]"
        >
          {WORDMARK.map((letter, index) => (
            <span
              key={`${letter}-${index}`}
              className={cx('footer-wordmark-letter', letter === 'X' ? 'text-paper' : 'text-brand-500')}
              style={{ '--letter-delay': `${80 + index * 65}ms` } as CSSProperties}
            >
              {letter}
            </span>
          ))}
        </span>

        <span aria-hidden="true" className="mt-7 flex items-center gap-5">
          <span className="footer-wordmark-line h-px flex-1 origin-left bg-brand-500/55" />
          <span className="footer-wordmark-tagline max-w-[22rem] text-right text-[0.625rem] font-semibold uppercase leading-relaxed tracking-[0.14em] text-content/60 sm:text-[0.6875rem] sm:tracking-[0.22em]">
            Conectando caminhos, gerando resultados.
          </span>
        </span>
      </div>
    </div>
  );
}
