type ClassValue = string | false | null | undefined;

/** Concatenação simples de classes, sem dependência externa. */
export function cx(...values: ClassValue[]): string {
  return values.filter(Boolean).join(' ');
}

/** Formata uma data ISO (AAAA-MM-DD) no padrão brasileiro. */
export function formatDate(iso: string): string {
  const [year, month, day] = iso.split('-');
  return `${day}/${month}/${year}`;
}

