'use client';

import { useScrollState } from '@/hooks/useScrollState';

/** Indicador fino de progresso de leitura, fixo no topo da viewport. */
export function ScrollProgress() {
  const { progress } = useScrollState();

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-px bg-transparent"
      aria-hidden="true"
    >
      <div
        className="h-full origin-left bg-brand-500"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}
