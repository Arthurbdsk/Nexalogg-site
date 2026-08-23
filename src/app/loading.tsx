/** Estado de carregamento entre navegações, sem deslocamento de layout. */
export default function Loading() {
  return (
    <div
      className="flex min-h-[60vh] items-center justify-center bg-ink"
      role="status"
      aria-live="polite"
    >
      <span className="sr-only">Carregando conteúdo</span>
      <span
        aria-hidden="true"
        className="h-6 w-6 animate-spin rounded-full border border-paper/20 border-t-copper-400"
      />
    </div>
  );
}
