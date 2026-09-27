import { useCopy } from '@/i18n/useCopy';
/** Atalho de teclado para pular a navegação e ir direto ao conteúdo. */
export function SkipLink() {
  const t = useCopy();
  return (
    <a
      href="#conteudo"
      className="sr-only bg-ink px-5 py-3 text-sm font-semibold text-paper focus-visible:not-sr-only focus-visible:fixed focus-visible:left-4 focus-visible:top-4 focus-visible:z-[70]"
    >
      {t('Ir para o conteúdo principal')}
    </a>
  );
}
