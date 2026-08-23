/** Atalho de teclado para pular a navegação e ir direto ao conteúdo. */
export function SkipLink() {
  return (
    <a
      href="#conteudo"
      className="sr-only rounded-full bg-copper-500 px-5 py-3 text-sm font-medium text-paper focus-visible:not-sr-only focus-visible:fixed focus-visible:left-4 focus-visible:top-4 focus-visible:z-[70]"
    >
      Ir para o conteúdo principal
    </a>
  );
}
