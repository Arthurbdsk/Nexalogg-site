'use client';

import { useEffect, useState } from 'react';

type ScrollState = {
  /** Passou do limiar definido, usado para compactar o header. */
  scrolled: boolean;
  /** Progresso de leitura do documento, de 0 a 1. */
  progress: number;
};

/**
 * Estado de rolagem calculado dentro de requestAnimationFrame, com listener
 * passivo, para evitar layout thrashing durante o scroll.
 */
export function useScrollState(threshold = 24): ScrollState {
  const [state, setState] = useState<ScrollState>({ scrolled: false, progress: 0 });

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const top = window.scrollY;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const progress = height > 0 ? Math.min(1, Math.max(0, top / height)) : 0;
      setState((previous) => {
        const scrolled = top > threshold;
        if (previous.scrolled === scrolled && Math.abs(previous.progress - progress) < 0.002) {
          return previous;
        }
        return { scrolled, progress };
      });
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [threshold]);

  return state;
}
