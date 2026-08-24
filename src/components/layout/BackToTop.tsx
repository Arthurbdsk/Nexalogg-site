'use client';

import { useEffect, useState } from 'react';
import { usePrefersReducedMotion } from '@/hooks/useMediaQuery';

/** Retorno ao topo, exibido apenas após rolagem significativa. */
export function BackToTop() {
  const [visible, setVisible] = useState(false);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      setVisible(window.scrollY > window.innerHeight * 1.2);
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(measure);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const toTop = () => {
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
    document.getElementById('conteudo')?.focus?.();
  };

  return (
    <button
      type="button"
      onClick={toTop}
      aria-label="Voltar ao topo da página"
      tabIndex={visible ? 0 : -1}
      className={`fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-ink text-paper shadow-[0_10px_30px_-12px_rgb(17_17_17/0.5)] transition-all duration-300 ease-outexpo hover:bg-brand-500 hover:text-ink ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'
      }`}
    >
      <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none" aria-hidden="true">
        <path d="M8 13V3M3.5 7.5 8 3l4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
      </svg>
    </button>
  );
}
