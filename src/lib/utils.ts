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

/** Converte um ponto polar em coordenadas cartesianas. Usado nos diagramas. */
export function polar(cx: number, cy: number, radius: number, angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return { x: cx + radius * Math.cos(rad), y: cy + radius * Math.sin(rad) };
}
