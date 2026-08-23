type JsonLdProps = {
  /** Grafo já montado pelos helpers de src/lib/jsonld.ts. */
  data: Record<string, unknown>;
};

/** Injeta dados estruturados no DOM da página, disponíveis ao rastreador. */
export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      // O conteúdo é gerado no servidor a partir de dados internos tipados.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  );
}
