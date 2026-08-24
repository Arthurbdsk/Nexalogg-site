import type { ReactNode } from 'react';
import { Breadcrumbs, type Crumb } from '@/components/ui/Breadcrumbs';
import { Reveal } from '@/components/ui/Reveal';
import { BrandMark } from '@/components/ui/Logo';

type PageHeaderProps = {
  title: string;
  lead: ReactNode;
  crumbs: Crumb[];
  children?: ReactNode;
};

/**
 * Cabeçalho padrão das páginas internas. Concentra H1, trilha de navegação
 * e o texto de abertura, mantendo a mesma estrutura semântica em todo o site.
 */
export function PageHeader({ title, lead, crumbs, children }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden border-b border-paper/10 bg-ink pb-16 pt-[calc(var(--header-height)+3rem)] lg:pb-20 lg:pt-[calc(var(--header-height)+4.5rem)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 grid-field opacity-25 mask-fade-b"
      />
      <BrandMark
        outline
        strokeWidth={0.6}
        className="pointer-events-none absolute -right-24 -top-16 h-[26rem] w-[26rem] text-brand-500/10 lg:-right-10 lg:h-[32rem] lg:w-[32rem]"
      />
      <div className="shell relative">
        <Reveal>
          <Breadcrumbs items={crumbs} />
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
