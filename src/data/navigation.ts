export type NavItem = {
  label: string;
  href: string;
  /** Âncora correspondente na home, usada para o estado ativo do menu. */
  sectionId?: string;
};

/** Navegação principal do header. */
export const mainNav: NavItem[] = [
  { label: 'Início', href: '/', sectionId: 'inicio' },
  { label: 'A NEXALLOG', href: '/a-nexallog', sectionId: 'a-nexallog' },
  { label: 'Problemas', href: '/#problemas', sectionId: 'problemas' },
  { label: 'Metodologia', href: '/metodologia', sectionId: 'metodologia' },
  { label: 'Soluções', href: '/solucoes', sectionId: 'solucoes' },
  { label: 'Contato', href: '/contato', sectionId: 'contato' },
];

/** Colunas de navegação do rodapé. */
export const footerNav: { title: string; items: NavItem[] }[] = [
  {
    title: 'Empresa',
    items: [
      { label: 'A NEXALLOG', href: '/a-nexallog' },
      { label: 'Alexandre Felix', href: '/a-nexallog#alexandre-felix' },
      { label: 'Cobertura completa', href: '/solucoes' },
    ],
  },
  {
    title: 'Metodologia',
    items: [
      { label: 'Programa D90', href: '/metodologia' },
      { label: 'Diagnóstico', href: '/metodologia#diagnostico' },
      { label: 'Resultados esperados', href: '/metodologia#resultados' },
    ],
  },
  {
    title: 'Soluções',
    items: [
      { label: 'Todas as áreas', href: '/solucoes' },
      { label: 'Operações', href: '/solucoes/operacoes' },
      { label: 'Tecnologia', href: '/solucoes/tecnologia' },
    ],
  },
  {
    title: 'Contato',
    items: [
      { label: 'Falar com a NEXALLOG', href: '/contato' },
      { label: 'Política de Privacidade', href: '/politica-de-privacidade' },
      { label: 'Termos de Uso', href: '/termos-de-uso' },
    ],
  },
];
