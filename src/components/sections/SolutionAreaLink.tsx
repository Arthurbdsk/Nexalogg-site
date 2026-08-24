'use client';

import Link from 'next/link';
import { track } from '@/lib/analytics';
import type { SolutionArea } from '@/data/solutions';

/**
 * Célula da grade de cobertura. Fica isolada em componente cliente para que a
 * seção continue sendo renderizada no servidor e apenas o evento de analytics
 * exija JavaScript.
 */
export function SolutionAreaLink({ area, index }: { area: SolutionArea; index: number }) {
  return (
    <Link
      href={`/solucoes/${area.slug}`}
      onClick={() => track('cta_solucoes_click', { area: area.slug })}
      className="group flex h-full flex-col justify-between gap-6 p-6 transition-colors duration-300 hover:bg-accent hover:text-ink lg:gap-8 lg:p-8"
    >
      <span>
        <span className="block text-[0.6875rem] font-bold tracking-[0.16em] text-accent transition-colors duration-300 group-hover:text-ink/60">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="mt-4 block text-[1.1875rem] font-bold leading-tight">{area.name}</span>
        <span className="mt-2 block text-[0.9375rem] leading-relaxed text-content/55 transition-colors duration-300 group-hover:text-ink/70">
          {area.summary}
        </span>
      </span>

      <svg
        viewBox="0 0 14 14"
        className="h-3.5 w-3.5 shrink-0 text-content/30 transition-[transform,color] duration-300 ease-outexpo group-hover:translate-x-1 group-hover:text-ink"
        fill="none"
        aria-hidden="true"
      >
        <path d="M1 7h11M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" />
      </svg>
    </Link>
  );
}
