'use client';

import { useCopy } from '@/i18n/useCopy';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo, NexacashLogo } from '@/components/ui/Logo';
import { ThemeToggle } from '@/components/layout/ThemeToggle';
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher';
import { mainNav } from '@/data/navigation';
import { useActiveSection } from '@/hooks/useActiveSection';
import { useScrollState } from '@/hooks/useScrollState';
import { track } from '@/lib/analytics';
import { siteConfig } from '@/lib/site';
import { cx } from '@/lib/utils';

const HOME_SECTIONS = ['inicio', 'a-nexallog', 'problemas', 'metodologia', 'solucoes'];

export function Header() {
  const t = useCopy();
  const pathname = usePathname();
  const { scrolled } = useScrollState(16);
  const isHome = pathname === '/';
  const isNexacash = pathname === '/nexacash';
  const activeSection = useActiveSection(isHome ? HOME_SECTIONS : []);

  const isActive = (href: string, sectionId?: string) => {
    if (href.startsWith('/#')) return isHome && activeSection === sectionId;
    if (href === '/') return isHome && (activeSection === null || activeSection === 'inicio');
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  // Na home o cabeçalho começa transparente sobre o hero, que segue o tema.
  const overHero = isHome && !scrolled;

  return (
    <header
      className={cx(
        'fixed inset-x-0 top-0 z-50 text-content transition-[background-color,box-shadow] duration-300',
        'tone-light',
        overHero
          ? 'bg-surface 2xl:bg-transparent'
          : 'bg-surface shadow-[0_1px_0_0_rgb(var(--line)/0.12)]',
      )}
    >
      <div
        className={cx(
          'shell flex items-center justify-between gap-3 transition-[height] duration-300 ease-outexpo',
          scrolled
            ? 'h-[3.5rem] 2xl:h-[var(--header-height-compact)]'
            : 'h-[3.75rem] 2xl:h-[var(--header-height)]',
        )}
      >
        <Link
          href="/"
          className="-ml-1 w-[min(42vw,13.5rem)] shrink px-1 py-2"
          aria-label={t('{brand}. Ir para a página inicial', {
            brand: isNexacash ? 'NEXACASH' : siteConfig.name,
          })}
        >
          {isNexacash ? <NexacashLogo /> : <Logo />}
        </Link>

        <nav aria-label={t('Navegação principal')} className="hidden 2xl:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => {
              const active = isActive(item.href, item.sectionId);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={cx(
                      'group relative inline-flex h-9 items-center whitespace-nowrap px-2.5 text-[0.9375rem] font-medium transition-colors duration-300',
                      active ? 'text-content' : 'text-content/55 hover:text-content',
                    )}
                  >
                    {t(item.label)}
                    <span
                      aria-hidden="true"
                      className={cx(
                        'absolute inset-x-2.5 bottom-1 h-0.5 origin-left bg-accent transition-transform duration-300 ease-outexpo',
                        active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100',
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
          <Link
            href="/contato"
            onClick={() => track('cta_principal_click', { local: 'header' })}
            className="group hidden h-10 items-center gap-2.5 whitespace-nowrap bg-brand-500 pl-4 pr-3 text-[0.8125rem] font-bold uppercase tracking-[0.06em] text-ink transition-colors duration-300 ease-outexpo hover:bg-ink hover:text-paper 2xl:inline-flex"
          >
            {t(siteConfig.cta.primary)}
            <svg
              viewBox="0 0 14 14"
              className="h-3 w-3 transition-transform duration-300 ease-outexpo group-hover:translate-x-1"
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

        </div>
      </div>

      <nav
        aria-label={t('Navegação principal')}
        className="h-12 overflow-x-auto overscroll-x-contain border-t border-line/10 bg-surface [scrollbar-width:none] [&::-webkit-scrollbar]:hidden 2xl:hidden"
      >
        <ul className="flex w-max items-center gap-1 px-[var(--shell-padding)]">
          {mainNav.map((item) => {
            const active = isActive(item.href, item.sectionId);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={cx(
                    'relative inline-flex h-12 shrink-0 items-center whitespace-nowrap px-3 text-xs font-semibold uppercase tracking-[0.04em] transition-colors',
                    active ? 'text-content' : 'text-content/65 hover:text-content',
                  )}
                >
                  {t(item.label)}
                  <span
                    aria-hidden="true"
                    className={cx(
                      'absolute inset-x-3 bottom-0 h-0.5 bg-accent',
                      active ? 'block' : 'hidden',
                    )}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
