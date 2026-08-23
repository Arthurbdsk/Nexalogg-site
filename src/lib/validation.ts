/**
 * Validação e sanitização do formulário de contato.
 * O mesmo módulo é usado no cliente (feedback imediato) e no servidor
 * (validação autoritativa), evitando divergência de regras.
 */

export const segments = [
  'Transportadora',
  'Operador logístico',
  'Distribuição',
  'Armazenagem',
  'Última milha',
  'Indústria com frota própria',
  'Outro',
] as const;

export type Segment = (typeof segments)[number];

export type ContactFields = {
  name: string;
  company: string;
  email: string;
  phone: string;
  segment: string;
  message: string;
  /** Campo honeypot: preenchido apenas por robôs. */
  website?: string;
};

export type FieldName = keyof Omit<ContactFields, 'website'>;

export type ValidationErrors = Partial<Record<FieldName, string>>;

export const contactFieldNames: FieldName[] = [
  'name',
  'company',
  'email',
  'phone',
  'segment',
  'message',
];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
const CONTROL_CHARS = /[\u0000-\u001F\u007F]/g;
const CONTROL_CHARS_KEEP_BREAKS = /[\u0000-\u0009\u000B\u000C\u000E-\u001F\u007F]/g;

/** Remove caracteres de controle, tags e espaços redundantes. */
export function sanitize(value: string, maxLength = 2000): string {
  return value
    .replace(CONTROL_CHARS, ' ')
    .replace(/<\/?[^>]*>/g, '')
    .replace(/\s{2,}/g, ' ')
    .trim()
    .slice(0, maxLength);
}

/** Sanitiza preservando quebras de linha do campo de mensagem. */
export function sanitizeMultiline(value: string, maxLength = 2000): string {
  return value
    .replace(CONTROL_CHARS_KEEP_BREAKS, ' ')
    .replace(/<\/?[^>]*>/g, '')
    .replace(/[ \t]{2,}/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
    .slice(0, maxLength);
}

/** Mantém apenas dígitos, no tamanho máximo de um número internacional. */
export function normalizePhone(value: string): string {
  return value.replace(/\D/g, '').slice(0, 15);
}

/** Máscara de telefone brasileira aplicada durante a digitação. */
export function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  if (digits.length <= 10) return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export function validateField(field: FieldName, rawValue: string): string | undefined {
  const value = rawValue.trim();

  switch (field) {
    case 'name':
      if (!value) return 'Informe seu nome.';
      if (value.length < 2) return 'Informe o nome completo.';
      if (value.length > 120) return 'Use no máximo 120 caracteres.';
      return undefined;
    case 'company':
      if (!value) return 'Informe o nome da empresa.';
      if (value.length > 140) return 'Use no máximo 140 caracteres.';
      return undefined;
    case 'email':
      if (!value) return 'Informe um e-mail corporativo.';
      if (!EMAIL_PATTERN.test(value)) return 'Formato de e-mail inválido.';
      if (value.length > 160) return 'Use no máximo 160 caracteres.';
      return undefined;
    case 'phone': {
      if (!value) return 'Informe um telefone para contato.';
      const digits = normalizePhone(value);
      if (digits.length < 10) return 'Informe DDD e número.';
      if (digits.length > 13) return 'Número de telefone inválido.';
      return undefined;
    }
    case 'segment':
      if (!value) return 'Selecione o segmento de atuação.';
      if (!segments.includes(value as Segment)) return 'Selecione uma opção da lista.';
      return undefined;
    case 'message':
      if (!value) return 'Descreva o contexto da sua operação.';
      if (value.length < 20) return 'Descreva com pelo menos 20 caracteres.';
      if (value.length > 2000) return 'Use no máximo 2000 caracteres.';
      return undefined;
    default:
      return undefined;
  }
}

export function validateContact(fields: ContactFields): ValidationErrors {
  const errors: ValidationErrors = {};
  contactFieldNames.forEach((field) => {
    const error = validateField(field, fields[field] ?? '');
    if (error) errors[field] = error;
  });
  return errors;
}

/** Normaliza os campos antes de encaminhar para o destino configurado. */
export function normalizeContact(fields: ContactFields): Omit<ContactFields, 'website'> {
  return {
    name: sanitize(fields.name, 120),
    company: sanitize(fields.company, 140),
    email: sanitize(fields.email, 160).toLowerCase(),
    phone: normalizePhone(fields.phone),
    segment: sanitize(fields.segment, 60),
    message: sanitizeMultiline(fields.message, 2000),
  };
}
