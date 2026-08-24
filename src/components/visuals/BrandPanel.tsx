'use client';

import { BRAND_X_PATH } from '@/components/ui/Logo';
import { usePointerOffset } from '@/hooks/usePointerOffset';
import { useReveal } from '@/hooks/useReveal';

/**
 * Composição do hero: o X da marca construído a partir de quatro traços que se
 * encontram no centro, sobre um bloco amarelo. Os traços entram na ordem em que
 * se conectam e o conjunto acompanha o cursor de forma discreta.
 */
export function BrandPanel() {
  const { ref: revealRef, visible } = useReveal<HTMLDivElement>({ threshold: 0.2 });
  const { ref: pointerRef, offset } = usePointerOffset<HTMLDivElement>(1);

  return (
    <div ref={pointerRef} className="relative w-full" aria-hidden="true">
      <div
        ref={revealRef}
        className="relative aspect-square w-full max-w-[26rem] overflow-hidden bg-brand-500 p-[16%] lg:ml-auto"
        style={{
          transform: `translate3d(${offset.x * 6}px, ${offset.y * 6}px, 0)`,
          transition: 'transform 800ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <svg viewBox="0 0 100 100" className="h-full w-full" role="presentation">
          <path
            d={BRAND_X_PATH}
            fill="#111111"
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'none' : 'scale(0.94)',
              transformOrigin: '50px 50px',
              transition:
                'opacity 900ms cubic-bezier(0.16,1,0.3,1) 120ms, transform 1100ms cubic-bezier(0.16,1,0.3,1) 120ms',
            }}
          />
        </svg>
      </div>
    </div>
  );
}
