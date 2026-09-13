'use client';

import { useEffect } from 'react';
import { useScrollState } from '@/hooks/useScrollState';

const canScrollInside = (target: EventTarget | null, deltaY: number) => {
  let element = target instanceof HTMLElement ? target : null;

  while (element && element !== document.body) {
    const { overflowY } = window.getComputedStyle(element);
    const scrollable = /(auto|scroll)/.test(overflowY) && element.scrollHeight > element.clientHeight;

    if (scrollable) {
      const canMoveUp = deltaY < 0 && element.scrollTop > 0;
      const canMoveDown =
        deltaY > 0 && element.scrollTop + element.clientHeight < element.scrollHeight - 1;

      if (canMoveUp || canMoveDown) return true;
    }

    element = element.parentElement;
  }

  return false;
};

/** Indicador fino de progresso de leitura, fixo no topo da viewport. */
export function ScrollProgress() {
  const { progress } = useScrollState();

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const precisePointer = window.matchMedia('(pointer: fine)');

    if (reducedMotion.matches || !precisePointer.matches) return;

    let current = window.scrollY;
    let target = current;
    let frame = 0;
    const root = document.documentElement;
    const inlineScrollBehavior = root.style.scrollBehavior;

    const limit = () => Math.max(0, document.documentElement.scrollHeight - window.innerHeight);

    const restoreScrollBehavior = () => {
      root.style.scrollBehavior = inlineScrollBehavior;
    };

    const animate = () => {
      current += (target - current) * 0.085;

      if (Math.abs(target - current) < 0.5) {
        current = target;
        window.scrollTo(0, current);
        frame = 0;
        restoreScrollBehavior();
        return;
      }

      window.scrollTo(0, current);
      frame = window.requestAnimationFrame(animate);
    };

    const onWheel = (event: WheelEvent) => {
      if (
        event.ctrlKey ||
        event.defaultPrevented ||
        Math.abs(event.deltaX) > Math.abs(event.deltaY) ||
        canScrollInside(event.target, event.deltaY)
      ) {
        return;
      }

      event.preventDefault();

      const multiplier = event.deltaMode === 1 ? 18 : event.deltaMode === 2 ? window.innerHeight : 1;
      target = Math.min(limit(), Math.max(0, target + event.deltaY * multiplier * 1.05));

      if (!frame) {
        current = window.scrollY;
        root.style.scrollBehavior = 'auto';
        frame = window.requestAnimationFrame(animate);
      }
    };

    const syncPosition = () => {
      if (frame) return;
      current = window.scrollY;
      target = current;
    };

    const cancelAnimation = () => {
      if (frame) window.cancelAnimationFrame(frame);
      frame = 0;
      restoreScrollBehavior();
      current = window.scrollY;
      target = current;
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(event.key)) {
        cancelAnimation();
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('scroll', syncPosition, { passive: true });
    window.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', cancelAnimation);
    document.addEventListener('click', cancelAnimation);

    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('scroll', syncPosition);
      window.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', cancelAnimation);
      document.removeEventListener('click', cancelAnimation);
      cancelAnimation();
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-px bg-transparent"
      aria-hidden="true"
    >
      <div
        className="h-full origin-left bg-brand-500"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}
