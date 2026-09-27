import { cookies } from 'next/headers';
import { getRequestConfig } from 'next-intl/server';
import { localeCookie, locales, type Locale } from './translate';

export default getRequestConfig(async () => {
  const saved = (await cookies()).get(localeCookie)?.value;
  const locale: Locale = locales.includes(saved as Locale) ? (saved as Locale) : 'pt';
  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
    timeZone: 'America/Sao_Paulo',
  };
});
