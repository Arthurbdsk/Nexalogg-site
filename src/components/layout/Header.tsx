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

const HOME_SECTIONS = ['inicio', 'a-nexallog', 'problemas', 'metodologia', 'solucoes', 'contato'];

export function Header() {
  const pathname = usePathname();
  const { scrolled } = useScrollState(24);
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

      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
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
    const firstLink = panelRef.current?.querySelector<HTMLElement>('a[href]');
    firstLink?.focus();

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  const isActive = (href: string, sectionId?: string) => {
    if (href.startsWith('/#')) {
      return isHome && activeSection === sectionId;
    }
    if (href === '/') {
      return isHome && (activeSection === null || activeSection === 'inicio');
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header
      className={cx(
        'fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500 ease-outexpo',
        scrolled || menuOpen
          ? 'bg-ink-900/85 shadow-[0_1px_0_0_rgba(244,243,239,0.08),0_18px_40px_-32px_rgba(0,0,0,0.9)] backdrop-blur-md'
          : 'bg-transparent',
      )}
    >
      <div
        className={cx(
          'shell flex items-center justify-between transition-[height] duration-500 ease-outexpo',
          scrolled || menuOpen
            ? 'h-[var(--header-height-compact)]'
            : 'h-[var(--header-height)]',
        )}
      >
        <Link
          href="/"
          className="group relative -ml-1 rounded px-1 py-2 text-paper transition-colors duration-300 hover:text-paper"
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
                      'group relative inline-flex h-9 items-center px-3.5 text-[0.9375rem] transition-colors duration-300',
                      active ? 'text-paper' : 'text-paper/60 hover:text-paper',
                    )}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={cx(
                        'absolute inset-x-3.5 bottom-1 h-px origin-left bg-brand-400 transition-transform duration-300 ease-outexpo',
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
            className="group hidden h-10 items-center gap-2.5 rounded-full border border-paper/20 pl-5 pr-4 text-[0.9375rem] text-paper transition-all duration-300 ease-outexpo hover:border-brand-400/70 hover:bg-brand-500 xl:inline-flex"
          >
            {siteConfig.cta.primary}
            <svg viewBox="0 0 14 14" className="h-3 w-3 transition-transform duration-300 ease-outexpo group-hover:translate-x-1" fill="none" aria-hidden="true">
              <path d="M1 7h11M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
            </svg>
          </Link>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="menu-mobile"
            className="relative -mr-2 flex h-11 w-11 items-center justify-center rounded-full text-paper transition-colors duration-300 hover:text-brand-200 xl:hidden"
          >
            <span className="sr-only">{menuOpen ? 'Fechar menu' : 'Abrir menu'}</span>
            <span aria-hidden="true" className="flex h-4 w-6 flex-col justify-between">
              <span
                className={cx(
                  'block h-px w-full origin-center bg-current transition-transform duration-300 ease-outexpo',
                  menuOpen && 'translate-y-[7.5px] rotate-45',
                )}
              />
              <span
                className={cx(
                  'block h-px w-full bg-current transition-opacity duration-200',
                  menuOpen && 'opacity-0',
                )}
              />
              <span
                className={cx(
                  'block h-px w-full origin-center bg-current transition-transform duration-300 ease-outexpo',
                  menuOpen && '-translate-y-[7.5px] -rotate-45',
                )}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        id="menu-mobile"
        ref={panelRef}
        hidden={!menuOpen}
        className="xl:hidden"
      >
        <div className="h-[calc(100dvh-var(--header-height-compact))] overflow-y-auto border-t border-paper/10 bg-ink-900/97 backdrop-blur-xl">
          <nav aria-label="Navegação principal, versão compacta" className="shell py-8">
            <ul className="flex flex-col">
              {mainNav.map((item, index) => (
                <li key={item.href} className="border-b border-paper/10">
                  <Link
                    href={item.href}
                    onClick={closeMenu}
                    className="group flex items-center justify-between py-5 text-display-sm text-paper transition-colors duration-300 hover:text-brand-200"
                    style={{ transitionDelay: `${index * 20}ms` }}
                  >
                    <span className="flex items-baseline gap-4">
                      <span className="text-[0.6875rem] text-brand-400">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      {item.label}
                    </span>
                    <svg viewBox="0 0 14 14" className="h-4 w-4 text-paper/30 transition-transform duration-300 ease-outexpo group-hover:translate-x-1 group-hover:text-brand-300" fill="none" aria-hidden="true">
                      <path d="M1 7h11M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
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
              className="mt-10 flex h-14 w-full items-center justify-center rounded-full bg-brand-500 text-[0.9375rem] font-medium text-paper transition-colors duration-300 hover:bg-brand-400"
            >
              {siteConfig.cta.primary}
            </Link>

            <p className="mt-8 max-w-sm text-sm leading-relaxed text-paper/50">
              {siteConfig.tagline}
            </p>
          </nav>
        </div>
      </div>
    </header>
  );
}
