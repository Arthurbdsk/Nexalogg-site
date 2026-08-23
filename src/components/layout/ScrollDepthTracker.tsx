'use client';

import { useScrollDepth } from '@/hooks/useScrollDepth';

/** Componente sem marcação, responsável apenas pela medição de scroll. */
export function ScrollDepthTracker() {
  useScrollDepth();
  return null;
}
