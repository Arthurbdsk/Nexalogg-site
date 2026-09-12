'use client';

import Image from 'next/image';
import { useState } from 'react';
import { cx } from '@/lib/utils';

const TOTAL_PAGES = 11;

export function ProgramExampleSection() {
  const [page, setPage] = useState(1);
  const image = `/images/programa-d90-anexo/pagina-${String(page).padStart(2, '0')}.png`;

  const changePage = (next: number) => {
    setPage(Math.min(TOTAL_PAGES, Math.max(1, next)));
  };

  return (
    <section
      id="exemplo-programa-d90"
      aria-labelledby="exemplo-programa-d90-titulo"
      className="program-example bg-white py-section text-[#111111]"
    >
      <div className="shell">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-7">
            <h2 id="exemplo-programa-d90-titulo" className="text-display-md">
              Exemplo do Programa D90
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-[1.0625rem] leading-relaxed text-[#111111]/65">
              O material abaixo mostra como o diagnóstico financeiro se transforma em leitura,
              causa-raiz e plano de ação. Os números apresentados são ilustrativos.
            </p>
          </div>
        </div>

        <div className="mt-12 border border-[#111111]/15 bg-white lg:mt-16">
          <div
            className="relative aspect-video w-full select-none overflow-hidden bg-white"
            onContextMenu={(event) => event.preventDefault()}
          >
            <Image
              key={image}
              src={image}
              alt={`Exemplo do Programa D90, página ${page} de ${TOTAL_PAGES}`}
              fill
              sizes="(max-width: 1320px) 100vw, 1320px"
              loading="lazy"
              draggable={false}
              className="object-contain"
            />
          </div>

          <div className="flex flex-col gap-5 border-t border-[#111111]/15 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-semibold">
              Página {page} de {TOTAL_PAGES}
            </p>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => changePage(page - 1)}
                disabled={page === 1}
                className="inline-flex h-11 items-center border border-[#111111]/25 px-5 text-sm font-semibold transition-colors hover:border-[#111111] disabled:cursor-not-allowed disabled:opacity-35"
              >
                Anterior
              </button>
              <button
                type="button"
                onClick={() => changePage(page + 1)}
                disabled={page === TOTAL_PAGES}
                className="inline-flex h-11 items-center bg-[#111111] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#333333] disabled:cursor-not-allowed disabled:opacity-35"
              >
                Próxima
              </button>
            </div>
          </div>
        </div>

        <ol
          className="mt-5 grid grid-cols-6 gap-2 lg:[grid-template-columns:repeat(11,minmax(0,1fr))]"
          aria-label="Selecionar página do exemplo"
        >
          {Array.from({ length: TOTAL_PAGES }, (_, index) => index + 1).map((item) => (
            <li key={item}>
              <button
                type="button"
                onClick={() => changePage(item)}
                aria-current={item === page ? 'page' : undefined}
                aria-label={`Abrir página ${item}`}
                className={cx(
                  'h-9 w-full border text-xs font-semibold transition-colors',
                  item === page
                    ? 'border-[#111111] bg-[#111111] text-white'
                    : 'border-[#111111]/20 bg-white text-[#111111] hover:border-[#111111]',
                )}
              >
                {item}
              </button>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
