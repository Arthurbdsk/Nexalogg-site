import { getMessages } from 'next-intl/server';
import { createTranslator } from './translate';

export async function getCopy() {
  const messages = await getMessages();
  return createTranslator(messages.copy as Record<string, string>);
}
