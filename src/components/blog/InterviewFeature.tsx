import Image from 'next/image';
import Link from 'next/link';
import { interview, postPath } from '@/lib/blog';

export function InterviewFeature() {
  return (
    <section className="tone-light bg-surface py-12 text-content md:py-20" aria-labelledby="entrevista-titulo">
      <div className="shell">
        <div className="grid border border-line/15 lg:grid-cols-12">
          <div className="tone-dark bg-surface p-7 text-content sm:p-10 lg:col-span-8 lg:p-12">
            <h2 id="entrevista-titulo" className="max-w-3xl text-[clamp(1.8rem,3.6vw,3.3rem)] font-bold leading-[1.1] tracking-tight">
              Crescer exige mais do que aumentar a receita.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-content/75">
              Alexandre Felix no Logística do Futuro. A entrevista publicada pela MundoLogística conecta crescimento, concentração de clientes e controle do caixa.
            </p>
            <p className="mt-6 text-sm text-content/60">MundoLogística · Publicada em 6 de outubro de 2026</p>
            <Link href={postPath(interview)} className="mt-8 inline-flex min-h-12 items-center gap-5 bg-brand-500 px-6 py-3 font-semibold text-ink transition-colors hover:bg-paper">
              Assistir à entrevista <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="relative min-h-64 overflow-hidden bg-ink lg:col-span-4">
            <Image src="/images/alexandre-felix.jpg" alt="Alexandre Felix, fundador da NEXALLOG e entrevistado no Logística do Futuro" fill sizes="(max-width: 1024px) 90vw, 35vw" className="object-cover object-center" />
          </div>
        </div>
      </div>
    </section>
  );
}
