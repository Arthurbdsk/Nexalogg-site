'use client';

import type { ElementType, ReactNode } from 'react';
import { useReveal } from '@/hooks/useReveal';
import { cx } from '@/lib/utils';

type RevealProps = {
  children: ReactNode;
  /** Atraso em milissegundos, usado para escalonar grupos de elementos. */
  delay?: number;
  className?: string;
  as?: ElementType;
  id?: string;
};

/**
 * Entrada progressiva de conteúdo. A animação usa apenas opacity e transform,
 * propriedades compostas pela GPU, e é neutralizada por prefers-reduced-motion
 * na folha de estilo global.
 */
export function Reveal({ children, delay = 0, className, as, id }: RevealProps) {
  const Tag = (as ?? 'div') as ElementType;
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <Tag
      ref={ref}
      id={id}
      className={cx('reveal', className)}
      data-visible={visible ? 'true' : 'false'}
      style={delay ? ({ '--reveal-delay': `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
