'use client';

import { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from './useMediaQuery';

type Offset = { x: number; y: number };

/**
 * Deslocamento normalizado (-1 a 1) do cursor em relação ao centro do elemento.
 * Desativado em dispositivos sem ponteiro fino e sob prefers-reduced-motion.
 */
export function usePointerOffset<T extends HTMLElement = HTMLDivElement>(strength = 1) {
  const ref = useRef<T>(null);
  const [offset, setOffset] = useState<Offset>({ x: 0, y: 0 });
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || reducedMotion) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;

    let frame = 0;
    let latest: Offset = { x: 0, y: 0 };

    const apply = () => {
      frame = 0;
      setOffset(latest);
    };

    const onMove = (event: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      latest = {
        x: ((event.clientX - rect.left) / rect.width - 0.5) * 2 * strength,
        y: ((event.clientY - rect.top) / rect.height - 0.5) * 2 * strength,
      };
      if (!frame) frame = window.requestAnimationFrame(apply);
    };

    const onLeave = () => {
      latest = { x: 0, y: 0 };
      if (!frame) frame = window.requestAnimationFrame(apply);
    };

    node.addEventListener('pointermove', onMove);
    node.addEventListener('pointerleave', onLeave);
    return () => {
      node.removeEventListener('pointermove', onMove);
      node.removeEventListener('pointerleave', onLeave);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [reducedMotion, strength]);

  return { ref, offset };
}
