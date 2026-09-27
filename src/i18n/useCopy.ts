import { useMessages } from 'next-intl';
import { createTranslator } from './translate';

export function useCopy() {
  const messages = useMessages();
  return createTranslator(messages.copy as Record<string, string>);
}
