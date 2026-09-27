import { useCopy } from '@/i18n/useCopy';
/** Estado de carregamento entre navegações, sem deslocamento de layout. */
export default function Loading() {
  const t = useCopy();
  return (
    <div
      className="flex min-h-[60vh] items-center justify-center bg-surface"
      role="status"
      aria-live="polite"
    >
      <span className="sr-only">{t('Carregando conteúdo')}</span>
      <span
        aria-hidden="true"
        className="h-6 w-6 animate-spin rounded-full border border-line/20 border-t-brand-400"
      />
    </div>
  );
}
