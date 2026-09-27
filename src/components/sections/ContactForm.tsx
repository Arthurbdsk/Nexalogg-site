'use client';

import { useCopy } from '@/i18n/useCopy';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { Field } from '@/components/ui/Field';
import { track } from '@/lib/analytics';
import { siteConfig } from '@/lib/site';

type ContactFormProps = {
  compact?: boolean;
  idPrefix?: string;
  local?: string;
  onComplete?: () => void;
};

type Values = { name: string; company: string };
type Errors = Partial<Record<keyof Values, string>>;

const EMPTY: Values = { name: '', company: '' };

const validate = (values: Values): Errors => {
  const errors: Errors = {};
  const name = values.name.trim();
  const company = values.company.trim();

  if (!name) errors.name = 'Informe seu nome.';
  else if (name.length < 2) errors.name = 'Informe seu nome completo.';
  else if (name.length > 120) errors.name = 'Use no máximo 120 caracteres.';

  if (!company) errors.company = 'Informe o nome da empresa.';
  else if (company.length > 140) errors.company = 'Use no máximo 140 caracteres.';

  return errors;
};

export function ContactForm({
  compact = false,
  idPrefix = 'contato',
  local = 'pagina_contato',
  onComplete,
}: ContactFormProps) {
  const t = useCopy();
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof Values, boolean>>>({});
  const startedRef = useRef(false);

  const update = (field: keyof Values, value: string) => {
    if (!startedRef.current) {
      startedRef.current = true;
      track('form_start', { form: 'whatsapp' });
    }
    const next = { ...values, [field]: value };
    setValues(next);
    if (touched[field]) setErrors(validate(next));
  };

  const blur = (field: keyof Values) => {
    setTouched((current) => ({ ...current, [field]: true }));
    setErrors(validate(values));
  };

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = validate(values);
    setErrors(found);
    setTouched({ name: true, company: true });
    if (Object.keys(found).length > 0) return;

    const whatsapp = siteConfig.contact.whatsapp.value?.replace(/\D/g, '');
    if (!whatsapp) return;

    const message = [
      t('Olá, NEXALLOG! Gostaria de conversar.'),
      '',
      t('Nome: {name}', { name: values.name.trim() }),
      t('Empresa: {company}', { company: values.company.trim() }),
    ].join('\n');

    track('form_submit', { form: 'whatsapp', local });
    track('whatsapp_click', { local });
    window.open(
      `https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`,
      '_blank',
      'noopener,noreferrer',
    );
    onComplete?.();
  };

  return (
    <form onSubmit={submit} noValidate className="w-full">
      <div className={compact ? 'grid gap-5' : 'grid gap-x-10 gap-y-8 sm:grid-cols-2'}>
        <Field
          id={`${idPrefix}-name`}
          label={t('Nome')}
          error={touched.name ? errors.name : undefined}
          required
        >
          {(props) => (
            <input
              {...props}
              name="name"
              type="text"
              autoComplete="name"
              placeholder={t('Nome completo')}
              value={values.name}
              onChange={(event) => update('name', event.target.value)}
              onBlur={() => blur('name')}
            />
          )}
        </Field>

        <Field
          id={`${idPrefix}-company`}
          label={t('Empresa')}
          error={touched.company ? errors.company : undefined}
          required
        >
          {(props) => (
            <input
              {...props}
              name="company"
              type="text"
              autoComplete="organization"
              placeholder={t('Razão social ou nome fantasia')}
              value={values.company}
              onChange={(event) => update('company', event.target.value)}
              onBlur={() => blur('company')}
            />
          )}
        </Field>
      </div>

      <button
        type="submit"
        className="group mt-7 inline-flex min-h-[3.375rem] w-full items-center justify-center gap-3 bg-brand-500 px-7 text-[0.8125rem] font-bold uppercase tracking-[0.06em] text-ink transition-colors duration-300 ease-outexpo hover:bg-ink hover:text-paper sm:w-auto"
      >
        {t('Abrir no WhatsApp')}
        <svg
          viewBox="0 0 14 14"
          className="h-3.5 w-3.5 transition-transform duration-300 ease-outexpo group-hover:translate-x-1"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M1 7h11M8 3l4 4-4 4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="square"
          />
        </svg>
      </button>
      <p className="mt-4 max-w-md text-xs leading-relaxed text-content/55">
        {t('Ao continuar, você concorda com o tratamento dos dados conforme a')}
        {t(' ')}
        <Link
          href="/politica-de-privacidade"
          className="underline underline-offset-4 hover:text-content"
        >
          {t('Política de Privacidade')}
        </Link>
        .
      </p>
    </form>
  );
}
