import Link from 'next/link';

export type Crumb = { name: string; path: string };

type BreadcrumbsProps = {
  items: Crumb[];
};

/**
 * Trilha de navegação. O último item representa a página atual e não é link,
 * conforme prática recomendada de acessibilidade.
 */
export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Trilha de navegação">
      <ol className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-slateink-400">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-3">
              {isLast ? (
                <span aria-current="page" className="text-paper/70">
                  {item.name}
                </span>
              ) : (
                <Link
                  href={item.path}
                  className="transition-colors duration-200 hover:text-copper-300"
                >
                  {item.name}
                </Link>
              )}
              {isLast ? null : (
                <span aria-hidden="true" className="h-px w-4 bg-paper/20" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
