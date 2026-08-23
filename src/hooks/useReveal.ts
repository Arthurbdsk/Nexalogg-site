'use client';

import { useEffect, useRef, useState } from 'react';

type Options = {
  /** Margem inferior do viewport para antecipar a entrada. */
  rootMargin?: string;
  threshold?: number;
  /** Revela apenas uma vez, evitando trabalho de observação contínuo. */
  once?: boolean;
};

/**
 * Observa a entrada de um elemento no viewport com IntersectionObserver.
 * Não usa listeners de scroll, o que mantém o custo em tempo de rolagem baixo.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>({
  rootMargin = '0px 0px -12% 0px',
  threshold = 0.15,
  once = true,
}: Options = {}) {
  const ref = useRef<T>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            setVisible(false);
          }
        });
      },
      { rootMargin, threshold },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin, threshold, once]);

  return { ref, visible };
}
