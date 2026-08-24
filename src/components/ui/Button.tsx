'use client';

import Link from 'next/link';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { cx } from '@/lib/utils';

type Variant = 'primary' | 'outline' | 'ghost';
type Size = 'md' | 'lg';

const base =
  'group relative inline-flex select-none items-center justify-center gap-4 overflow-hidden whitespace-nowrap rounded-full transition-[transform,background-color,border-color,color,box-shadow] duration-300 ease-outexpo active:translate-y-px disabled:pointer-events-none disabled:opacity-55';

const variants: Record<Variant, string> = {
  // Amarelo da marca com lettering preto, conforme aplicação oficial
  primary: 'bg-brand-500 text-ink hover:bg-ink hover:text-paper',
  outline: 'border-2 border-line/20 text-content hover:border-content hover:bg-content hover:text-surface',
  ghost: 'text-content/70 hover:text-content',
};

const sizes: Record<Size, string> = {
  md: 'h-11 px-6 text-[0.8125rem] font-bold uppercase tracking-[0.06em]',
  lg: 'h-[3.375rem] px-8 text-[0.8125rem] font-bold uppercase tracking-[0.06em]',
};

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  /** Seta de direção, usada nos CTAs principais. */
  withArrow?: boolean;
};

type ButtonAsLink = CommonProps & {
  href: string;
  external?: boolean;
  onClick?: () => void;
};

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

function Inner({ children, withArrow }: { children: ReactNode; withArrow?: boolean }) {
  return (
    <>
      <span className="relative z-10">{children}</span>
      {withArrow ? (
        <svg
          className="relative z-10 h-3.5 w-3.5 transition-transform duration-300 ease-outexpo group-hover:translate-x-1"
          viewBox="0 0 14 14"
          fill="none"
          aria-hidden="true"
        >
          <path d="M1 7h11M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
        </svg>
      ) : null}
    </>
  );
}

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { variant = 'primary', size = 'md', className, children, withArrow } = props;
  const classes = cx(base, variants[variant], sizes[size], className);

  if ('href' in props && props.href) {
    const { href, external, onClick } = props;
    if (external) {
      return (
        <a href={href} className={classes} target="_blank" rel="noopener noreferrer" onClick={onClick}>
          <Inner withArrow={withArrow}>{children}</Inner>
        </a>
      );
    }
    return (
      <Link href={href} className={classes} onClick={onClick}>
        <Inner withArrow={withArrow}>{children}</Inner>
      </Link>
    );
  }

  const { variant: _v, size: _s, className: _c, withArrow: _w, children: _ch, ...rest } =
    props as ButtonAsButton;

  return (
    <button className={classes} {...rest}>
      <Inner withArrow={withArrow}>{children}</Inner>
    </button>
  );
}
