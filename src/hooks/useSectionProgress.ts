'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Progresso de 0 a 1 da travessia de um elemento pela viewport.
 * O cálculo só acontece enquanto o elemento está visível, controlado por um
 * IntersectionObserver, e sempre dentro de requestAnimationFrame.
 */
export function useSectionProgress<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let frame = 0;
    let active = false;

    const measure = () => {
      frame = 0;
      const rect = node.getBoundingClientRect();
      const viewport = window.innerHeight;
      // Início: topo do bloco a 78% da viewport. Fim: base do bloco a 40%.
      const start = viewport * 0.78;
      const end = viewport * 0.4;
      const total = rect.height + (start - end);
      const travelled = start - rect.top;
      const value = total > 0 ? travelled / total : 0;
      setProgress((previous) => {
        const next = Math.min(1, Math.max(0, value));
        return Math.abs(previous - next) < 0.004 ? previous : next;
      });
    };

    const onScroll = () => {
      if (!active || frame) return;
      frame = window.requestAnimationFrame(measure);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        active = entry.isIntersecting;
        if (active) onScroll();
      },
      { rootMargin: '20% 0px 20% 0px' },
    );

    observer.observe(node);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    measure();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return { ref, progress };
}
