'use client';

import { useReveal } from '@/hooks/useReveal';
import { cx } from '@/lib/utils';

const LETTERS = 'NEXALLOG'.split('');
/** Posição do X, que carrega o amarelo da marca no logotipo. */
const BRAND_LETTER = 2;

/**
 * Assinatura da marca no rodapé. As letras sobem uma a uma de dentro de uma
 * máscara quando o rodapé entra na tela e reagem ao ponteiro individualmente.
 *
 * O bloco é decorativo: o nome da empresa já aparece no logotipo e na linha de
 * direitos autorais, então marcá-lo como oculto evita que leitores de tela
 * soletrem a palavra letra por letra.
 */
export function FooterWordmark() {
  const { ref, visible } = useReveal<HTMLDivElement>({ threshold: 0.2 });

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="mt-16 select-none overflow-hidden lg:mt-20"
    >
      <div className="flex w-full items-end justify-between">
        {LETTERS.map((letter, index) => (
          <span
            key={`${letter}-${index}`}
            className={cx(
              'inline-block font-bold leading-[0.78] tracking-[-0.04em] transition-[transform,color,opacity] duration-700 ease-outexpo',
              'text-[clamp(2.5rem,11.5vw,9rem)] hover:-translate-y-2 hover:text-accent',
              index === BRAND_LETTER ? 'text-accent' : 'text-content/85',
              visible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0',
            )}
            style={{ transitionDelay: `${index * 70}ms` }}
          >
            {letter}
          </span>
        ))}
      </div>
    </div>
  );
}
