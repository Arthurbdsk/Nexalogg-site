import { siteConfig } from '@/lib/site';
import { cx } from '@/lib/utils';

type LogoProps = {
  className?: string;
  /** Oculta o texto, deixando apenas a marca gráfica. */
  markOnly?: boolean;
};

/**
 * Marca da NEXALLOG. O símbolo desenha um trajeto em forma de N com dois nós
 * de conexão, referência direta a rota, origem e destino.
 */
export function Logo({ className, markOnly = false }: LogoProps) {
  return (
    <span className={cx('inline-flex items-center gap-2.5', className)}>
      <svg
        viewBox="0 0 28 28"
        className="h-7 w-7 shrink-0"
        fill="none"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M5 22V6l18 16V6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="square"
          strokeLinejoin="miter"
          className="text-copper-400"
        />
        <circle cx="5" cy="6" r="2.6" className="fill-copper-500" />
        <circle cx="23" cy="22" r="2.6" className="fill-paper" />
      </svg>
      {markOnly ? null : (
        <span className="font-display text-[1.0625rem] font-bold uppercase leading-none tracking-[0.14em]">
          {siteConfig.name}
        </span>
      )}
    </span>
  );
}
