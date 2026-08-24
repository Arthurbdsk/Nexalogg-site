import Link from 'next/link';
import { Section } from '@/components/layout/Section';
import { Reveal } from '@/components/ui/Reveal';
import { solutionAreas } from '@/data/solutions';
import { SolutionAreaLink } from '@/components/sections/SolutionAreaLink';

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
                Nove áreas que partem do mesmo diagnóstico e alimentam o mesmo plano de 90 dias.
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
            </ul>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
