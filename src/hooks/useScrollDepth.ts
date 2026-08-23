'use client';

import { useEffect, useRef } from 'react';
import { track } from '@/lib/analytics';

const MARKS = [25, 50, 75, 100];

/** Dispara eventos de profundidade de rolagem uma única vez por marco. */
export function useScrollDepth() {
  const fired = useRef<Set<number>>(new Set());

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const height = document.documentElement.scrollHeight - window.innerHeight;
      if (height <= 0) return;
      const percent = Math.round((window.scrollY / height) * 100);
      MARKS.forEach((mark) => {
        if (percent >= mark && !fired.current.has(mark)) {
          fired.current.add(mark);
          track('scroll_depth', { percent: mark, path: window.location.pathname });
        }
      });
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(measure);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);
}
