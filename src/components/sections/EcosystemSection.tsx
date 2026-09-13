import Image from 'next/image';
import Link from 'next/link';
import { Section } from '@/components/layout/Section';
import { Reveal } from '@/components/ui/Reveal';
import { solutionAreas } from '@/data/solutions';
import { SolutionAreaLink } from '@/components/sections/SolutionAreaLink';

const deliveryCards = [
  {
    title: 'Equipe NEXALLOG',
    summary: 'Condução direta do diagnóstico, do plano e do acompanhamento da execução.',
    href: '/a-nexallog#atuacao-titulo',
  },
  {
    title: 'Rede de parceiros',
    summary: 'Especialistas acionados conforme a frente e a causa estrutural identificada.',
    href: '/a-nexallog#atuacao-titulo',
    partners: [
      {
        src: '/images/parceiros/simoes-pires.png',
        alt: 'Simões Pires',
        width: 560,
        height: 101,
      },
      {
        src: '/images/parceiros/numera.png',
        alt: 'Numera',
        width: 700,
        height: 107,
      },
    ],
  },
] as const;

/**
 * Cobertura completa em grade. Cada área ocupa uma célula da mesma malha, com
 * índice, nome e uma linha de leitura, e leva para a página da área. A grade
 * usa o vão de 1px sobre o fundo para desenhar as divisórias, então o desenho
 * se mantém em uma, duas ou três colunas sem regra de borda por célula.
 */
export function EcosystemSection() {
  return (
    <Section tone="dark" id="solucoes" labelledBy="solucoes-titulo">
      <div className="shell">
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-7">
            <Reveal>
              <h2 id="solucoes-titulo" className="text-display-md">
                Equipe própria e <span className="text-accent">rede de parceiros</span>
              </h2>
            </Reveal>
            <Reveal delay={80}>
              <p className="mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-content/60">
                Dez frentes de atuação, sustentadas pela equipe NEXALLOG e por uma rede de
                parceiros especializados. São 12 blocos distintos no total.
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 lg:text-right">
            <Reveal delay={120}>
              <Link
                href="/solucoes"
                className="group inline-flex items-center gap-3 text-[0.9375rem] font-semibold text-accent transition-opacity duration-300 hover:opacity-75"
              >
                Ver todas as áreas
                <svg viewBox="0 0 14 14" className="h-3 w-3 transition-transform duration-300 ease-outexpo group-hover:translate-x-1" fill="none" aria-hidden="true">
                  <path d="M1 7h11M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" />
                </svg>
              </Link>
            </Reveal>
          </div>
        </div>

        <Reveal delay={140}>
          <div className="mt-12 bg-line/15 p-px lg:mt-16">
            <ul className="grid gap-px sm:grid-cols-2 lg:grid-cols-3">
              {solutionAreas.map((area, index) => (
                <li key={area.slug} className="bg-surface">
                  <SolutionAreaLink area={area} index={index} />
                </li>
              ))}
              {deliveryCards.map((card, index) => (
                <li
                  key={card.title}
                  className={index === 0 ? 'bg-[#f6e7b5] text-ink' : 'bg-brand-500 text-ink'}
                >
                  <Link
                    href={card.href}
                    className={`group flex h-full flex-col justify-between gap-6 p-6 transition-colors duration-300 lg:gap-8 lg:p-8 ${
                      index === 0 ? 'hover:bg-[#efd784]' : 'hover:bg-brand-400'
                    }`}
                  >
                    <span>
                      <span className="block text-[0.6875rem] font-bold tracking-[0.16em] text-ink/60">
                        {String(solutionAreas.length + index + 1).padStart(2, '0')}
                      </span>
                      <span className="mt-4 block text-[1.1875rem] font-bold leading-tight">
                        {card.title}
                      </span>
                      <span className="mt-2 block text-[0.9375rem] leading-relaxed text-ink/70">
                        {card.summary}
                      </span>
                      {'partners' in card ? (
                        <span className="mt-6 grid grid-cols-2 gap-2" aria-label="Empresas parceiras">
                          {card.partners.map((partner) => (
                            <span
                              key={partner.src}
                              className="flex h-14 items-center justify-center bg-paper px-3"
                            >
                              <Image
                                src={partner.src}
                                alt={partner.alt}
                                width={partner.width}
                                height={partner.height}
                                sizes="(max-width: 639px) 38vw, (max-width: 1023px) 20vw, 10rem"
                                className="h-auto max-h-8 w-auto max-w-full object-contain"
                              />
                            </span>
                          ))}
                        </span>
                      ) : null}
                    </span>

                    <svg
                      viewBox="0 0 14 14"
                      className="h-3.5 w-3.5 shrink-0 text-ink/50 transition-transform duration-300 ease-outexpo group-hover:translate-x-1"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M1 7h11M8 3l4 4-4 4"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="square"
                      />
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
