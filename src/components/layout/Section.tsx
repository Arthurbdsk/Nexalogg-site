import type { ReactNode } from 'react';
import { cx } from '@/lib/utils';

export type Tone = 'light' | 'muted' | 'dark' | 'brand';

type SectionProps = {
  children: ReactNode;
  /** Define superfície, cor de texto e linhas do bloco. */
  tone?: Tone;
  id?: string;
  labelledBy?: string;
  className?: string;
  /** Espaçamento vertical padrão da seção. */
  padded?: boolean;
};

/**
 * Bloco de conteúdo com tom próprio. A alternância entre branco, cinza claro,
 * preto e amarelo dá ritmo à leitura, e os componentes internos herdam as cores
 * pelos tokens surface, content e line.
 */
export function Section({
  children,
  tone = 'light',
  id,
  labelledBy,
  className,
  padded = true,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cx(
        `tone-${tone}`,
        'relative bg-surface text-content',
        padded && 'py-section',
        id && 'scroll-mt-20',
        className,
      )}
    >
      {children}
    </section>
  );
}
