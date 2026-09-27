'use client';

import type { ReactNode } from 'react';
import { useCopy } from './useCopy';

/** Translates text in module-level rich content, such as the legal documents. */
export function Copy({ children }: { children: ReactNode }) {
  const t = useCopy();
  return <>{t(children)}</>;
}
