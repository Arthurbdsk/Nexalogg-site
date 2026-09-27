'use client';

import { useCopy } from '@/i18n/useCopy';
import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';

/** Estado de erro de renderização, mantendo a identidade visual do site. */
export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useCopy();
  useEffect(() => {
    console.error('[erro de renderização]', error);
  }, [error]);

  return (
    <main id="conteudo" tabIndex={-1} className="tone-light bg-surface text-content">
      <section className="shell pb-section pt-[calc(var(--header-height)+5rem)]">
        <span className="text-[0.6875rem] uppercase tracking-[0.16em] text-brand-600">
          {t('Falha inesperada')}
        </span>
        <h1 className="mt-6 max-w-2xl text-display-lg">
          {t('Não foi possível carregar esta página')}
        </h1>
        <p className="mt-6 max-w-lg text-lead text-content/65">
          {t(
            'A página encontrou um erro durante o carregamento. Tente novamente ou volte ao início do site.',
          )}
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button onClick={reset} size="lg">
            {t('Tentar novamente')}
          </Button>
          <Button href="/" variant="outline" size="lg">
            {t('Voltar ao início')}
          </Button>
        </div>
      </section>
    </main>
  );
}
