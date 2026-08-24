'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Logo } from '@/components/ui/Logo';
import { mainNav } from '@/data/navigation';
import { useActiveSection } from '@/hooks/useActiveSection';
import { useScrollState } from '@/hooks/useScrollState';
import { track } from '@/lib/analytics';
import { siteConfig } from '@/lib/site';
import { cx } from '@/lib/utils';

const HOME_SECTIONS = ['inicio', 'a-nexallog', 'problemas', 'metodologia', 'solucoes'];

export function Header() {
  const pathname = usePathname();
  const { scrolled } = useScrollState(16);
  const [menuOpen, setMenuOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const isHome = pathname === '/';
  const activeSection = useActiveSection(isHome ? HOME_SECTIONS : []);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  useEffect(() => {
    if (!menuOpen) return;
    const { style } = document.body;
    const previousOverflow = style.overflow;
    style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        toggleRef.current?.focus();
        return;
      }
      if (event.key !== 'Tab') return;
      const focusables = panelRef.current?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
      if (!focusables || focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    panelRef.current?.querySelector<HTMLElement>('a[href]')?.focus();
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  const isActive = (href: string, sectionId?: string) => {
    if (href.startsWith('/#')) return isHome && activeSection === sectionId;
    if (href === '/') return isHome && (activeSection === null || activeSection === 'inicio');
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header
      className={cx(
        'tone-light fixed inset-x-0 top-0 z-50 bg-surface text-content transition-shadow duration-300',
        scrolled || menuOpen
          ? 'shadow-[0_1px_0_0_rgb(17_17_17/0.10)]'
          : 'shadow-none',
      )}
    >
      <div
        className={cx(
          'shell flex items-center justify-between transition-[height] duration-300 ease-outexpo',
          scrolled || menuOpen ? 'h-[var(--header-height-compact)]' : 'h-[var(--header-height)]',
        )}
      >
        <Link
          href="/"
          className="-ml-1 rounded px-1 py-2"
          aria-label={`${siteConfig.name}. Ir para a página inicial`}
        >
          <Logo />
        </Link>

        <nav aria-label="Navegação principal" className="hidden xl:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) => {
              const active = isActive(item.href, item.sectionId);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={cx(
                      'group relative inline-flex h-9 items-center px-3.5 text-[0.9375rem] font-medium transition-colors duration-300',
                      active ? 'text-content' : 'text-content/55 hover:text-content',
                    )}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={cx(
                        'absolute inset-x-3.5 bottom-1 h-0.5 origin-left bg-brand-500 transition-transform duration-300 ease-outexpo',
                        active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100',
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/contato"
            onClick={() => track('cta_principal_click', { local: 'header' })}
            className="group hidden h-10 items-center gap-2.5 rounded-full bg-brand-500 pl-5 pr-4 text-[0.8125rem] font-bold uppercase tracking-[0.06em] text-ink transition-colors duration-300 ease-outexpo hover:bg-ink hover:text-paper xl:inline-flex"
          >
            {siteConfig.cta.primary}
            <svg viewBox="0 0 14 14" className="h-3 w-3 transition-transform duration-300 ease-outexpo group-hover:translate-x-1" fill="none" aria-hidden="true">
              <path d="M1 7h11M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" />
            </svg>
          </Link>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="menu-mobile"
            className="relative -mr-2 flex h-11 w-11 items-center justify-center rounded-full text-content transition-colors duration-300 xl:hidden"
          >
            <span className="sr-only">{menuOpen ? 'Fechar menu' : 'Abrir menu'}</span>
            <span aria-hidden="true" className="flex h-3.5 w-6 flex-col justify-between">
              <span
                className={cx(
                  'block h-0.5 w-full origin-center bg-current transition-transform duration-300 ease-outexpo',
                  menuOpen && 'translate-y-[6px] rotate-45',
                )}
              />
              <span
                className={cx(
                  'block h-0.5 w-full bg-current transition-opacity duration-200',
                  menuOpen && 'opacity-0',
                )}
              />
              <span
                className={cx(
                  'block h-0.5 w-full origin-center bg-current transition-transform duration-300 ease-outexpo',
                  menuOpen && '-translate-y-[6px] -rotate-45',
                )}
              />
            </span>
          </button>
        </div>
      </div>

      <div id="menu-mobile" ref={panelRef} hidden={!menuOpen} className="xl:hidden">
        <div className="tone-light h-[calc(100dvh-var(--header-height-compact))] overflow-y-auto border-t border-line/10 bg-surface">
          <nav aria-label="Navegação principal, versão compacta" className="shell py-6">
            <ul className="flex flex-col">
              {mainNav.map((item) => (
                <li key={item.href} className="border-b border-line/10">
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    className="flex items-center justify-between py-4 text-[1.375rem] font-bold"
                  >
                    {item.label}
                    <svg viewBox="0 0 14 14" className="h-4 w-4 text-brand-500" fill="none" aria-hidden="true">
                      <path d="M1 7h11M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" />
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              href="/contato"
              onClick={() => {
                track('cta_principal_click', { local: 'menu_mobile' });
                closeMenu();
              }}
              className="mt-8 flex h-14 w-full items-center justify-center rounded-full bg-brand-500 text-[0.8125rem] font-bold uppercase tracking-[0.06em] text-ink"
            >
              {siteConfig.cta.primary}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
