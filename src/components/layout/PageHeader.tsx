import type { ReactNode } from 'react';
import { Breadcrumbs, type Crumb } from '@/components/ui/Breadcrumbs';
import { Reveal } from '@/components/ui/Reveal';

type PageHeaderProps = {
  title: string;
  lead: ReactNode;
  crumbs: Crumb[];
  /** Rótulo técnico da página, exibido junto à trilha. */
  meta?: string;
  children?: ReactNode;
};

/**
 * Cabeçalho padrão das páginas internas. Concentra H1, trilha de navegação
 * e o texto de abertura, mantendo a mesma estrutura semântica em todo o site.
 */
export function PageHeader({ title, lead, crumbs, meta, children }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden border-b border-paper/10 bg-ink pb-16 pt-[calc(var(--header-height)+3rem)] lg:pb-20 lg:pt-[calc(var(--header-height)+4.5rem)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 grid-field opacity-30 mask-fade-b"
      />
      <div className="shell relative">
        <Reveal>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Breadcrumbs items={crumbs} />
            {meta ? (
              <span className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-copper-400">
                {meta}
              </span>
            ) : null}
          </div>
        </Reveal>

        <div className="mt-10 grid gap-8 lg:mt-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal delay={60}>
              <h1 className="text-display-lg">{title}</h1>
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <Reveal delay={140}>
              <div className="text-lead text-paper/65">{lead}</div>
            </Reveal>
            {children ? <Reveal delay={200}>{children}</Reveal> : null}
          </div>
        </div>
      </div>
    </section>
  );
}
