'use client';

import { useRef, useState } from 'react';
import { Field } from '@/components/ui/Field';
import { track } from '@/lib/analytics';
import {
  contactFieldNames,
  formatPhone,
  segments,
  validateContact,
  validateField,
  type ContactFields,
  type FieldName,
  type ValidationErrors,
} from '@/lib/validation';
import { cx } from '@/lib/utils';

type Status = 'idle' | 'loading' | 'success' | 'error';

const EMPTY: ContactFields = {
  name: '',
  company: '',
  email: '',
  phone: '',
  segment: '',
  message: '',
  website: '',
};

const LABELS: Record<FieldName, string> = {
  name: 'Nome',
  company: 'Empresa',
  email: 'E-mail',
  phone: 'Telefone',
  segment: 'Segmento',
  message: 'Mensagem',
};

export function ContactForm() {
  const [values, setValues] = useState<ContactFields>(EMPTY);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [status, setStatus] = useState<Status>('idle');
  const [serverMessage, setServerMessage] = useState<string>('');
  const startedRef = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);

  const setValue = (field: FieldName, value: string) => {
    if (!startedRef.current) {
      startedRef.current = true;
      track('form_start', { form: 'contato' });
    }
    const nextValue = field === 'phone' ? formatPhone(value) : value;
    setValues((current) => ({ ...current, [field]: nextValue }));
    if (touched[field]) {
      setErrors((current) => ({ ...current, [field]: validateField(field, nextValue) }));
    }
    if (status === 'error') setStatus('idle');
  };

  const onBlur = (field: FieldName) => {
    setTouched((current) => ({ ...current, [field]: true }));
    setErrors((current) => ({ ...current, [field]: validateField(field, values[field] ?? '') }));
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = validateContact(values);
    setErrors(found);
    setTouched(Object.fromEntries(contactFieldNames.map((field) => [field, true])));

    const firstInvalid = contactFieldNames.find((field) => found[field]);
    if (firstInvalid) {
      setStatus('idle');
      formRef.current?.querySelector<HTMLElement>(`#campo-${firstInvalid}`)?.focus();
      return;
    }

    setStatus('loading');
    track('form_submit', { form: 'contato', segmento: values.segment });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as
          | { message?: string; errors?: ValidationErrors }
          | null;
        if (data?.errors) setErrors(data.errors);
        setServerMessage(
          data?.message ??
            'Não foi possível enviar sua solicitação agora. Tente novamente em alguns instantes.',
        );
        setStatus('error');
        track('form_error', { form: 'contato', status: response.status });
        return;
      }

      setStatus('success');
      setValues(EMPTY);
      setTouched({});
      setErrors({});
      startedRef.current = false;
      track('form_success', { form: 'contato' });
    } catch {
      setServerMessage(
        'Falha de conexão ao enviar a solicitação. Verifique sua rede e tente novamente.',
      );
      setStatus('error');
      track('form_error', { form: 'contato', status: 'network' });
    }
  };

  if (status === 'success') {
    return (
      <div
        className="border border-brand-500/40 bg-ink-800/70 p-8 sm:p-10"
        role="status"
        aria-live="polite"
      >
        <span className="flex h-11 w-11 items-center justify-center rounded-full border border-brand-400/60">
          <svg viewBox="0 0 20 20" className="h-5 w-5 text-brand-300" fill="none" aria-hidden="true">
            <path d="M4 10.5 8 14.5 16 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="square" />
          </svg>
        </span>
        <h3 className="mt-6 text-display-sm">Solicitação enviada</h3>
        <p className="mt-4 max-w-md text-[1.0625rem] leading-[1.7] text-paper/65">
          Recebemos suas informações. A NEXALLOG retorna o contato pelo e-mail ou telefone
          informados para entender o momento da sua operação.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="group mt-8 inline-flex items-center gap-3 text-[0.9375rem] text-brand-300 transition-colors duration-300 hover:text-brand-200"
        >
          <span className="relative">
            Enviar outra solicitação
            <span
              aria-hidden="true"
              className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-brand-400 transition-transform duration-300 ease-outexpo group-hover:scale-x-100"
            />
          </span>
        </button>
      </div>
    );
  }

  const isLoading = status === 'loading';

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="w-full">
      {/* Campo honeypot: invisível para pessoas, preenchido por robôs. */}
      <div className="pointer-events-none absolute -z-10 h-px w-px overflow-hidden opacity-0" aria-hidden="true">
        <label htmlFor="campo-website">Não preencha este campo</label>
        <input
          id="campo-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={(event) => setValues((current) => ({ ...current, website: event.target.value }))}
        />
      </div>

      <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
        <Field id="campo-name" label={LABELS.name} error={touched.name ? errors.name : undefined} required>
          {(props) => (
            <input
              {...props}
              name="name"
              type="text"
              autoComplete="name"
              placeholder="Nome completo"
              value={values.name}
              onChange={(event) => setValue('name', event.target.value)}
              onBlur={() => onBlur('name')}
              disabled={isLoading}
            />
          )}
        </Field>

        <Field id="campo-company" label={LABELS.company} error={touched.company ? errors.company : undefined} required>
          {(props) => (
            <input
              {...props}
              name="company"
              type="text"
              autoComplete="organization"
              placeholder="Razão social ou nome fantasia"
              value={values.company}
              onChange={(event) => setValue('company', event.target.value)}
              onBlur={() => onBlur('company')}
              disabled={isLoading}
            />
          )}
        </Field>

        <Field id="campo-email" label={LABELS.email} error={touched.email ? errors.email : undefined} required>
          {(props) => (
            <input
              {...props}
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="nome@empresa.com.br"
              value={values.email}
              onChange={(event) => setValue('email', event.target.value)}
              onBlur={() => onBlur('email')}
              disabled={isLoading}
            />
          )}
        </Field>

        <Field id="campo-phone" label={LABELS.phone} error={touched.phone ? errors.phone : undefined} required>
          {(props) => (
            <input
              {...props}
              name="phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="(00) 00000-0000"
              value={values.phone}
              onChange={(event) => setValue('phone', event.target.value)}
              onBlur={() => onBlur('phone')}
              disabled={isLoading}
            />
          )}
        </Field>

        <Field
          id="campo-segment"
          label={LABELS.segment}
          error={touched.segment ? errors.segment : undefined}
          required
          className="sm:col-span-2"
        >
          {(props) => (
            <div className="relative">
              <select
                {...props}
                name="segment"
                value={values.segment}
                onChange={(event) => setValue('segment', event.target.value)}
                onBlur={() => onBlur('segment')}
                disabled={isLoading}
                className={cx(props.className, 'appearance-none pr-8')}
              >
                <option value="">Selecione o segmento de atuação</option>
                {segments.map((segment) => (
                  <option key={segment} value={segment} className="bg-ink-800 text-paper">
                    {segment}
                  </option>
                ))}
              </select>
              <svg
                viewBox="0 0 16 16"
                className="pointer-events-none absolute right-0 top-4 h-4 w-4 text-paper/55"
                fill="none"
                aria-hidden="true"
              >
                <path d="M3.5 6 8 10.5 12.5 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="square" />
              </svg>
            </div>
          )}
        </Field>

        <Field
          id="campo-message"
          label={LABELS.message}
          error={touched.message ? errors.message : undefined}
          hint="Contexto da operação, principais desafios e o resultado esperado."
          required
          className="sm:col-span-2"
        >
          {(props) => (
            <textarea
              {...props}
              name="message"
              rows={5}
              maxLength={2000}
              placeholder="Descreva o momento atual da operação"
              value={values.message}
              onChange={(event) => setValue('message', event.target.value)}
              onBlur={() => onBlur('message')}
              disabled={isLoading}
              className={cx(props.className, 'h-auto min-h-[8rem] resize-y py-3 leading-relaxed')}
            />
          )}
        </Field>
      </div>

      <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={isLoading}
          className="group relative inline-flex h-[3.25rem] items-center justify-center gap-3 rounded-full bg-brand-500 px-8 text-[0.9375rem] font-medium text-paper transition-all duration-300 ease-outexpo hover:bg-brand-400 disabled:cursor-progress disabled:opacity-70"
        >
          {isLoading ? (
            <>
              <span
                aria-hidden="true"
                className="h-4 w-4 animate-spin rounded-full border border-paper/35 border-t-paper"
              />
              Enviando
            </>
          ) : (
            <>
              Enviar solicitação
              <svg viewBox="0 0 14 14" className="h-3.5 w-3.5 transition-transform duration-300 ease-outexpo group-hover:translate-x-1" fill="none" aria-hidden="true">
                <path d="M1 7h11M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
              </svg>
            </>
          )}
        </button>

        <p className="max-w-xs text-xs leading-relaxed text-paper/55">
          Ao enviar, você concorda com o tratamento dos dados informados conforme a Política de
          Privacidade.
        </p>
      </div>

      <div aria-live="polite" className="mt-6">
        {status === 'error' ? (
          <p className="flex items-start gap-3 border border-brand-500/40 bg-brand-600/10 p-4 text-sm text-brand-200">
            <svg viewBox="0 0 16 16" className="mt-0.5 h-4 w-4 shrink-0" fill="none" aria-hidden="true">
              <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.3" />
              <path d="M8 5v4M8 11h.01" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
            {serverMessage}
          </p>
        ) : null}
        {isLoading ? <p className="sr-only">Enviando sua solicitação.</p> : null}
      </div>
    </form>
  );
}
