'use client';

import { BRAND_X_PATH } from '@/components/ui/Logo';
import { usePointerOffset } from '@/hooks/usePointerOffset';
import { useReveal } from '@/hooks/useReveal';

/**
 * Símbolo da marca em grande escala, vazado e cortado pela margem direita,
 * como nas capas institucionais. O traço é desenhado na entrada e o conjunto
 * acompanha o cursor de forma discreta.
 */
export function BrandPanel() {
  const { ref: revealRef, visible } = useReveal<HTMLDivElement>({ threshold: 0.1 });
  const { ref: pointerRef, offset } = usePointerOffset<HTMLDivElement>(1);

  return (
    <div
      ref={pointerRef}
      className="pointer-events-none absolute inset-y-0 right-[-22%] hidden w-[70%] items-center sm:flex lg:right-[-12%] lg:w-[54%]"
      aria-hidden="true"
    >
      <div
        ref={revealRef}
        className="w-full"
        style={{
          transform: `translate3d(${offset.x * 10}px, ${offset.y * 10}px, 0)`,
          transition: 'transform 900ms cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <svg viewBox="0 0 100 100" className="h-auto w-full" role="presentation">
          {/* Contorno externo, desenhado da origem ao destino */}
          <path
            d={BRAND_X_PATH}
            fill="none"
            stroke="#E0A800"
            strokeWidth="0.55"
            strokeDasharray="620"
            strokeDashoffset={visible ? 0 : 620}
            style={{ transition: 'stroke-dashoffset 2200ms cubic-bezier(0.16, 1, 0.3, 1) 150ms' }}
          />
          {/* Segundo contorno, em escala menor, para dar profundidade */}
          <g transform="translate(50 50) scale(0.72) translate(-50 -50)">
            <path
              d={BRAND_X_PATH}
              fill="none"
              stroke="#E0A800"
              strokeOpacity="0.35"
              strokeWidth="0.5"
              style={{
                opacity: visible ? 1 : 0,
                transition: 'opacity 1200ms ease-out 700ms',
              }}
            />
          </g>
        </svg>
      </div>
    </div>
  );
}
