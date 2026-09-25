'use client';

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
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % screens.length), 5500);
    return () => window.clearInterval(timer);
  }, [paused]);

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
      <div className="relative aspect-[4/3] overflow-hidden bg-[#e9f2f6] sm:aspect-[2/1]">
        {screens.map((screen, index) => (
          <Image
            key={screen.src}
            src={screen.src}
            alt={index === active ? screen.alt : ''}
            aria-hidden={index !== active}
            fill
            sizes="(max-width: 1024px) 100vw, 1050px"
            className={`object-cover object-left-top transition-opacity duration-700 sm:object-top ${index === active ? 'opacity-100' : 'opacity-0'}`}
            priority={index === 0}
          />
        ))}
      </div>
      <div className="flex flex-col gap-5 border-t border-line/10 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div aria-live="polite">
          <p className="text-sm font-bold uppercase tracking-[0.08em]">{screens[active].title}</p>
          <p className="mt-1 text-sm text-content/60">{screens[active].description}</p>
        </div>
        <div className="flex gap-2" aria-label="Telas da NEXACASH">
          {screens.map((screen, index) => (
            <button
              key={screen.src}
              type="button"
              aria-label={`Mostrar ${screen.title}`}
              aria-pressed={index === active}
              onClick={() => setActive(index)}
              className={`h-2.5 w-8 transition-colors ${index === active ? 'bg-brand-500' : 'bg-content/20 hover:bg-content/45'}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
