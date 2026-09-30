'use client';

import { useCopy } from '@/i18n/useCopy';
import Image from 'next/image';
import { useRef, useState } from 'react';

const screens = [
  {
    src: '/images/nexacash/painel-fluxo-caixa.png',
    title: 'Fluxo de caixa em tempo real',
    description: 'Entradas, saídas, contas a receber e contas a pagar em uma visão executiva.',
    alt: 'Painel escuro da NEXACASH com indicadores e gráficos de fluxo de caixa',
  },
  {
    src: '/images/nexacash/painel-resultado-setembro.png',
    title: 'Formação do resultado',
    description: 'Da receita bruta ao resultado final, com cada impacto financeiro identificado.',
    alt: 'Painel escuro da NEXACASH com a formação do resultado financeiro mensal',
  },
  {
    src: '/images/nexacash/painel-tendencia-resultado.png',
    title: 'Tendência anual do resultado',
    description: 'Receita, despesas e resultado comparados mês a mês, incluindo projeções.',
    alt: 'Painel escuro da NEXACASH com a tendência anual de receita, despesas e resultado',
  },
] as const;

export function NexacashScreens() {
  const t = useCopy();
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  const showScreen = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const next = (index + screens.length) % screens.length;
    track.scrollTo({
      left: next * track.clientWidth,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'instant'
        : 'smooth',
    });
  };

  return (
    <div className="overflow-hidden border border-line/10 bg-surface shadow-[0_24px_70px_rgb(0_0_0_/_0.12)]">
      <div
        ref={trackRef}
        role="group"
        aria-label={t('Telas da NEXACASH')}
        tabIndex={0}
        className="flex w-full snap-x snap-mandatory overflow-x-auto overscroll-x-contain bg-[#0d1117] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        onScroll={(event) => {
          const track = event.currentTarget;
          if (track.clientWidth) {
            setActive(
              Math.max(
                0,
                Math.min(screens.length - 1, Math.round(track.scrollLeft / track.clientWidth)),
              ),
            );
          }
        }}
        onKeyDown={(event) => {
          if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            event.preventDefault();
            showScreen(active + (event.key === 'ArrowLeft' ? -1 : 1));
          }
        }}
      >
        {screens.map((screen, index) => (
          <div
            key={screen.src}
            className="relative aspect-video w-full shrink-0 snap-center snap-always"
          >
            <Image
              src={screen.src}
              alt={t(index === active ? screen.alt : '')}
              aria-hidden={index !== active}
              fill
              sizes="(max-width: 640px) calc(100vw - 40px), (max-width: 1440px) 92vw, 1260px"
              className="select-none object-contain"
              draggable={false}
              priority={index === 0}
            />
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-3 border-t border-line/10 px-4 py-4 sm:px-8 sm:py-5">
        <div aria-live="polite" aria-atomic="true">
          <p className="text-sm font-bold uppercase tracking-[0.08em]">
            {t(screens[active].title)}
          </p>
          <p className="mt-1 text-sm text-content/60">{t(screens[active].description)}</p>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
          <div
            className="flex shrink-0 items-center"
            role="group"
            aria-label={t('Telas da NEXACASH')}
          >
            <button
              type="button"
              onClick={() => showScreen(active - 1)}
              aria-label={t('Anterior')}
              className="flex h-11 w-11 items-center justify-center border border-line/25 transition-colors hover:bg-brand-500 hover:text-ink"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
                <path
                  d="m14 5-7 7 7 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <span
              className="min-w-14 text-center text-xs font-semibold tabular-nums"
              aria-hidden="true"
            >
              {active + 1} / {screens.length}
            </span>
            <button
              type="button"
              onClick={() => showScreen(active + 1)}
              aria-label={t('Próxima')}
              className="flex h-11 w-11 items-center justify-center border border-line/25 transition-colors hover:bg-brand-500 hover:text-ink"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
                <path
                  d="m10 5 7 7-7 7"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          <a
            href={screens[active].src}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 text-xs font-semibold underline underline-offset-4"
          >
            {t('Ampliar imagem')}
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </div>
  );
}
