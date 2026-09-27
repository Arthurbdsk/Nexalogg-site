'use client';

import { useLocale } from 'next-intl';
import { useTransition } from 'react';
import { setLocale } from '@/i18n/actions';
import { useCopy } from '@/i18n/useCopy';
import type { Locale } from '@/i18n/translate';

export function LanguageSwitcher() {
  const locale = useLocale();
  const t = useCopy();
  const [pending, startTransition] = useTransition();

  return (
    <label className="relative flex h-11 w-[4.25rem] shrink-0 items-center justify-center gap-2 border border-line/25 text-content focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-accent">
      <span className="sr-only">{t('Idioma do site')}</span>
      <span aria-hidden="true" className="text-xs font-bold">
        {locale.toUpperCase()} <span className="ml-1">⌄</span>
      </span>
      <select
        value={locale}
        disabled={pending}
        aria-label={t('Idioma do site')}
        aria-busy={pending}
        onChange={(event) => {
          const next = event.target.value as Locale;
          startTransition(async () => {
            await setLocale(next);
          });
        }}
        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
      >
        <option value="pt" lang="pt-BR">
          Português
        </option>
        <option value="en" lang="en">
          English
        </option>
        <option value="es" lang="es">
          Español
        </option>
      </select>
      <span role="status" className="sr-only">
        {pending ? t('Alterando idioma…') : ''}
      </span>
    </label>
  );
}
