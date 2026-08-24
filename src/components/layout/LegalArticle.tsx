import type { ReactNode } from 'react';
import { Reveal } from '@/components/ui/Reveal';
import { siteConfig } from '@/lib/site';
import { formatDate } from '@/lib/utils';

export type LegalSection = {
  id: string;
  title: string;
  content: ReactNode;
};

type LegalArticleProps = {
  sections: LegalSection[];
};

/**
 * Estrutura das páginas legais: sumário navegável à esquerda e conteúdo
 * hierarquizado à direita, com H2 por seção e âncoras estáveis.
 */
export function LegalArticle({ sections }: LegalArticleProps) {
  return (
    <section className="bg-ink py-section">
      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <nav aria-label="Sumário do documento" className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <h2 className="label-muted">Sumário</h2>
              <ol className="mt-6 space-y-3 border-l border-paper/12 pl-5">
                {sections.map((section, index) => (
                  <li key={section.id} className="flex gap-3">
                    <span className="text-[0.6875rem] leading-6 tracking-[0.16em] text-brand-400">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <a
                      href={`#${section.id}`}
                      className="text-[0.9375rem] leading-6 text-paper/60 transition-colors duration-300 hover:text-brand-200"
                    >
                      {section.title}
                    </a>
                  </li>
                ))}
              </ol>
              <p className="mt-8 text-[0.6875rem] uppercase tracking-[0.14em] text-smoke-400">
                Atualizado em {formatDate(siteConfig.legal.lastUpdated)}
              </p>
            </div>
          </nav>

          <div className="prose-nx lg:col-span-7 lg:col-start-6">
            {sections.map((section, index) => (
              <Reveal key={section.id} as="section" id={section.id} className="scroll-mt-32">
                <h2 className={index === 0 ? 'mt-0 text-display-sm' : 'text-display-sm'}>
                  {section.title}
                </h2>
                {section.content}
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
