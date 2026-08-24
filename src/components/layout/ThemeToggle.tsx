'use client';

import { useEffect, useState } from 'react';
import { THEME_STORAGE_KEY, type Theme } from '@/lib/theme';
import { cx } from '@/lib/utils';

/**
 * Alternância entre tema claro e escuro. O claro é o padrão do site e a
 * escolha do usuário fica guardada no navegador.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    const current = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
    setTheme(current);
  }, []);

  const toggle = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    setTheme(next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Navegador sem armazenamento disponível: a troca vale só para esta visita.
    }
  };

  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={isDark}
      className={cx(
        'flex h-10 w-10 items-center justify-center rounded-full border-2 border-line/15 text-content transition-colors duration-300 hover:border-brand-500 hover:text-brand-500',
        className,
      )}
    >
      <span className="sr-only">
        {isDark ? 'Usar tema claro' : 'Usar tema escuro'}
      </span>
      <svg viewBox="0 0 20 20" className="h-4 w-4" fill="none" aria-hidden="true">
        {isDark ? (
          <path
            d="M16.5 12.4A7 7 0 0 1 7.6 3.5a7 7 0 1 0 8.9 8.9Z"
            fill="currentColor"
          />
        ) : (
          <>
            <circle cx="10" cy="10" r="3.6" fill="currentColor" />
            <path
              d="M10 1.6v2M10 16.4v2M1.6 10h2M16.4 10h2M4.1 4.1l1.4 1.4M14.5 14.5l1.4 1.4M15.9 4.1l-1.4 1.4M5.5 14.5l-1.4 1.4"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </>
        )}
      </svg>
    </button>
  );
}
