'use server';

import { cookies } from 'next/headers';
import { localeCookie, locales, type Locale } from './translate';

export async function setLocale(locale: Locale) {
  if (!locales.includes(locale)) throw new Error('Invalid locale');
  (await cookies()).set(localeCookie, locale, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  });
}
