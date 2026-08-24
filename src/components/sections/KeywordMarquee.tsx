import { BrandMark } from '@/components/ui/Logo';
import { solutionAreas } from '@/data/solutions';

/**
 * Faixa de palavras-chave que corre da esquerda para a direita logo abaixo do
 * hero. Os termos vêm das áreas de cobertura, então a faixa acompanha o que
 * está em `src/data/solutions.ts` e nenhum texto é escrito duas vezes.
 *
 * A lista é renderizada duas vezes: a primeira é lida por leitores de tela e
 * a segunda, oculta, existe só para fechar o laço da animação sem emenda
 * visível. Com `prefers-reduced-motion` a faixa fica parada na posição
 * inicial, pela regra global de movimento reduzido.
 */
export function KeywordMarquee() {
  const words = solutionAreas.map((area) => area.name);

  return (
    <section
      aria-label="Áreas de atuação da NEXALLOG"
      className="tone-brand relative overflow-hidden bg-surface py-5 text-content"
    >
      <div className="flex w-max motion-safe:animate-marquee-right">
        {[false, true].map((duplicata) => (
          <ul
            key={String(duplicata)}
            aria-hidden={duplicata || undefined}
            className="flex shrink-0 items-center"
          >
            {words.map((word) => (
              <li key={word} className="flex shrink-0 items-center">
                <span className="whitespace-nowrap px-7 text-[0.9375rem] font-bold uppercase tracking-[0.18em] sm:text-[1.0625rem]">
                  {word}
                </span>
                <BrandMark className="h-2.5 w-2.5 shrink-0 opacity-70" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}
