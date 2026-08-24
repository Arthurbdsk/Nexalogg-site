import type { ReactNode } from 'react';
import { Breadcrumbs, type Crumb } from '@/components/ui/Breadcrumbs';
import { Reveal } from '@/components/ui/Reveal';

type PageHeaderProps = {
  title: string;
  lead: ReactNode;
  crumbs: Crumb[];
  children?: ReactNode;
};

/** Cabeçalho das páginas internas: trilha, H1 e uma linha de abertura. */
export function PageHeader({ title, lead, crumbs, children }: PageHeaderProps) {
  return (
    <section className="tone-light relative overflow-hidden bg-surface pb-10 pt-[calc(var(--header-height)+2.25rem)] text-content lg:pb-12 lg:pt-[calc(var(--header-height)+3.5rem)]">
      <div className="shell relative">
        <Reveal>
          <Breadcrumbs items={crumbs} />
        </Reveal>

        <div className="mt-8 grid gap-6 lg:mt-10 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-7">
            <Reveal delay={60}>
              <h1 className="text-display-lg">{title}</h1>
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <Reveal delay={120}>
              <div className="text-[1.0625rem] leading-relaxed text-content/65">{lead}</div>
            </Reveal>
            {children ? <Reveal delay={180}>{children}</Reveal> : null}
          </div>
        </div>
      </div>
    </section>
  );
}
