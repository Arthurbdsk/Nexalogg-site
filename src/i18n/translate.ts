import portuguese from './messages/pt.json';

export type Locale = 'pt' | 'en' | 'es';
export const locales: Locale[] = ['pt', 'en', 'es'];
export const localeCookie = 'nexallog-locale';
export const normalizeCopy = (value: string) => value.replace(/\s+/g, ' ').trim();
const keys = new Map(
  Object.entries(portuguese.copy).map(([key, value]) => [normalizeCopy(value), key]),
);

/** Source text remains readable in components; catalogs supply reviewed translations. */
export function createTranslator(messages: Record<string, string>) {
  return function t<T>(value: T, values?: Record<string, string | number>): T {
    if (typeof value !== 'string') return value;
    const key = keys.get(normalizeCopy(value));
    let result =
      key && messages[key] !== undefined
        ? value.replace(/\S[\s\S]*\S|\S/, () => messages[key])
        : value;
    if (values)
      result = result.replace(/\{(\w+)\}/g, (match, name: string) => String(values[name] ?? match));
    return result as T;
  };
}
