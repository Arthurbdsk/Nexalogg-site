'use client';

import { useCopy } from '@/i18n/useCopy';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const screens = [
  {
    src: '/images/nexacash/resultado.webp',
    title: 'Acompanhamento de resultado',
    description: 'Da receita ao resultado final, com os impactos de cada grupo.',
    alt: 'Tela demonstrativa de acompanhamento de resultado com receita, despesas e margem',
  },
  {
    src: '/images/nexacash/fluxo-de-caixa.webp',
    title: 'Fluxo de caixa',
    description: 'Entradas, saídas e saldo projetado em uma visão diária.',
    alt: 'Tela demonstrativa do fluxo de caixa com recebimentos, pagamentos e saldo projetado',
  },
  {
    src: '/images/nexacash/operacao.webp',
    title: 'Visão da operação',
    description: 'Os números da operação financeira em um só lugar.',
    alt: 'Tela demonstrativa da operação financeira com indicadores de saldo e resultado',
  },
] as const;

export function NexacashScreens() {
  const t = useCopy();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [stopped, setStopped] = useState(false);

  useEffect(() => {
    if (paused || stopped || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(
      () => setActive((current) => (current + 1) % screens.length),
      5500,
    );
    return () => window.clearInterval(timer);
  }, [paused, stopped]);

  return (
    <div
      className="overflow-hidden border border-line/10 bg-surface shadow-[0_24px_70px_rgb(0_0_0_/_0.12)]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false);
      }}
    >
      <div className="relative aspect-[2/1] w-full overflow-hidden bg-[#e9f2f6]">
        {screens.map((screen, index) => (
          <Image
            key={screen.src}
            src={screen.src}
            alt={t(index === active ? screen.alt : '')}
            aria-hidden={index !== active}
            fill
            sizes="(max-width: 640px) calc(100vw - 40px), (max-width: 1440px) 92vw, 1260px"
            className={`object-contain transition-opacity duration-700 motion-reduce:transition-none ${index === active ? 'opacity-100' : 'opacity-0'}`}
            priority={index === 0}
          />
        ))}
      </div>
      <div className="flex flex-col gap-3 border-t border-line/10 px-4 py-4 sm:px-8 sm:py-5">
        <div aria-live={paused || stopped ? 'polite' : 'off'}>
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
            {screens.map((screen, index) => (
              <button
                key={screen.src}
                type="button"
                aria-label={t('Mostrar {title}', { title: t(screen.title) })}
                aria-pressed={index === active}
                onClick={() => {
                  setActive(index);
                  setStopped(true);
                }}
                className="flex h-11 w-11 items-center justify-center"
              >
                <span
                  aria-hidden="true"
                  className={`h-2 w-8 transition-colors ${index === active ? 'bg-brand-500' : 'bg-content/20 hover:bg-content/45'}`}
                />
              </button>
            ))}
            <button
              type="button"
              onClick={() => setStopped(!stopped)}
              aria-label={t(stopped ? 'Reproduzir apresentação' : 'Pausar apresentação')}
              className="flex h-11 w-11 items-center justify-center border border-line/20 text-xs"
            >
              <span aria-hidden="true">{stopped ? '▶' : 'Ⅱ'}</span>
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
