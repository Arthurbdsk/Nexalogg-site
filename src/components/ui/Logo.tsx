import { siteConfig } from '@/lib/site';
import { cx } from '@/lib/utils';

/**
 * Traçado do símbolo da marca: dois caminhos que se cruzam e se encontram no
 * centro, formando o X da NEXALLOG. Usado no logotipo, no favicon e como
 * elemento gráfico de fundo.
 */
export const BRAND_X_PATH =
  'M0 0 H24 L50 30 L76 0 H100 L62 50 L100 100 H76 L50 70 L24 100 H0 L38 50 Z';

type MarkProps = {
  className?: string;
  /** Versão vazada, usada como elemento gráfico de grande escala. */
  outline?: boolean;
  strokeWidth?: number;
};

/** Símbolo isolado da marca. */
export function BrandMark({ className, outline = false, strokeWidth = 2 }: MarkProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill={outline ? 'none' : 'currentColor'}
      stroke={outline ? 'currentColor' : 'none'}
      strokeWidth={outline ? strokeWidth : undefined}
      strokeLinejoin="miter"
      aria-hidden="true"
      focusable="false"
    >
      <path d={BRAND_X_PATH} />
    </svg>
  );
}

type LogoProps = {
  className?: string;
  /** Oculta o texto, deixando apenas o símbolo. */
  markOnly?: boolean;
  /** Exibe a assinatura sob o logotipo, conforme a versão principal do manual. */
  withTagline?: boolean;
};

/**
 * Logotipo NEXALLOG. O X central recebe o amarelo da marca, como definido no
 * manual, e o restante do lettering acompanha a cor do contexto.
 */
export function Logo({ className, markOnly = false, withTagline = false }: LogoProps) {
  if (markOnly) {
    return <BrandMark className={cx('text-brand-500', className)} />;
  }

  return (
    <span className={cx('inline-flex flex-col', className)}>
      <span className="font-display text-[1.125rem] font-bold uppercase leading-none tracking-[0.22em]">
        NE
        <span className="text-brand-500">X</span>
        ALLOG
      </span>
      {withTagline ? (
        <span className="mt-2 text-[0.5rem] font-semibold uppercase leading-none tracking-[0.28em] text-content/55 sm:text-[0.5625rem]">
          {siteConfig.tagline}
        </span>
      ) : null}
    </span>
  );
}
