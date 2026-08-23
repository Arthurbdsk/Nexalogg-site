'use client';

import { useEffect, useState } from 'react';
import { useReveal } from '@/hooks/useReveal';
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery';

type CounterProps = {
  /** Valor final. Só deve ser usado com números reais e verificáveis. */
  value: number;
  /** Sufixo exibido junto ao número, como o sinal de mais. */
  suffix?: string;
  className?: string;
  durationMs?: number;
};

/**
 * Contador numérico animado na entrada em tela. Sob prefers-reduced-motion o
 * valor final é exibido de imediato, e o número real permanece sempre no DOM.
 */
export function Counter({ value, suffix = '', className, durationMs = 1400 }: CounterProps) {
  const { ref, visible } = useReveal<HTMLSpanElement>({ threshold: 0.4 });
  const reducedMotion = usePrefersReducedMotion();
  const [current, setCurrent] = useState(value);

  useEffect(() => {
    if (reducedMotion) {
      setCurrent(value);
      return;
    }
    if (!visible) return;

    let frame = 0;
    const start = performance.now();

    const step = (now: number) => {
      const progress = Math.min(1, (now - start) / durationMs);
      // Desaceleração cúbica, coerente com as demais transições do site.
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.round(eased * value));
      if (progress < 1) frame = requestAnimationFrame(step);
    };

    setCurrent(0);
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [visible, value, durationMs, reducedMotion]);

  return (
    <span ref={ref} className={className}>
      {current}
      {suffix}
    </span>
  );
}
