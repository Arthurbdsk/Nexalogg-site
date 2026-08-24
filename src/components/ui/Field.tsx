'use client';

import type { ReactNode } from 'react';
import { cx } from '@/lib/utils';

type FieldProps = {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  className?: string;
  children: (props: {
    id: string;
    'aria-invalid': boolean;
    'aria-describedby': string | undefined;
    className: string;
  }) => ReactNode;
};

const controlClasses =
  'peer h-12 w-full border-b border-paper/20 bg-transparent px-0 pb-2 pt-1 text-[0.9375rem] text-paper transition-colors duration-300 placeholder:text-paper/45 hover:border-paper/35 focus:border-brand-400 focus:outline-none focus-visible:outline-none';

/**
 * Campo de formulário com rótulo persistente, mensagem de erro associada por
 * aria-describedby e estado inválido comunicado por texto, borda e ícone,
 * nunca apenas por cor.
 */
export function Field({ id, label, error, hint, required, className, children }: FieldProps) {
  const errorId = error ? `${id}-erro` : undefined;
  const hintId = hint ? `${id}-ajuda` : undefined;
  const describedBy = [errorId, hintId].filter(Boolean).join(' ') || undefined;

  return (
    <div className={cx('flex flex-col', className)}>
      <label
        htmlFor={id}
        className="text-[0.6875rem] uppercase tracking-[0.16em] text-smoke-400"
      >
        {label}
        {required ? (
          <span className="ml-1 text-brand-400" aria-hidden="true">
            *
          </span>
        ) : (
          <span className="ml-2 normal-case tracking-normal text-smoke-400">(opcional)</span>
        )}
      </label>

      <div className="relative mt-2">
        {children({
          id,
          'aria-invalid': Boolean(error),
          'aria-describedby': describedBy,
          className: cx(controlClasses, error && 'border-brand-400'),
        })}
      </div>

      {hint ? (
        <p id={hintId} className="mt-2 text-xs text-paper/55">
          {hint}
        </p>
      ) : null}

      {error ? (
        <p id={errorId} className="mt-2 flex items-center gap-2 text-xs text-brand-200">
          <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 shrink-0" fill="none" aria-hidden="true">
            <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.3" />
            <path d="M8 5v4M8 11h.01" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
          </svg>
          {error}
        </p>
      ) : null}
    </div>
  );
}
