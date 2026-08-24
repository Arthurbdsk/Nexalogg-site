import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { LostRoute } from '@/components/visuals/LostRoute';
import { mainNav } from '@/data/navigation';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Página não encontrada',
  description: 'O endereço acessado não existe no site da NEXALLOG.',
  path: '/404',
  noIndex: true,
});

export default function NotFound() {
  return (
    <main id="conteudo" tabIndex={-1} className="tone-light bg-surface text-content">
      <section className="shell pb-section pt-[calc(var(--header-height)+5rem)]">
        <div className="grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-16">
          <div className="lg:col-span-6">
            <p className="font-display text-[clamp(4rem,10vw,7rem)] font-bold leading-none tracking-tight text-brand-500">
              404
            </p>
            <h1 className="mt-6 text-display-lg">Esse caminho não existe</h1>
            <p className="mt-6 max-w-lg text-lead text-content/65">
              O endereço acessado não corresponde a nenhuma página do site. A rota pode ter mudado ou
              o link pode estar incompleto.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button href="/" size="lg" withArrow>
                Voltar ao início
              </Button>
              <Button href="/contato" variant="outline" size="lg">
                Falar com a NEXALLOG
              </Button>
            </div>

            <nav aria-label="Páginas do site" className="mt-12 border-t border-line/15 pt-8">
              <h2 className="label">Ir direto para</h2>
              <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
                {mainNav
                  .filter((item) => item.href !== '/')
                  .map((item) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className="group relative text-[0.9375rem] text-content/65 transition-colors duration-300 hover:text-paper"
                      >
                        {item.label}
                        <span
                          aria-hidden="true"
                          className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-brand-400 transition-transform duration-300 ease-outexpo group-hover:scale-x-100"
                        />
                      </Link>
                    </li>
                  ))}
              </ul>
            </nav>
          </div>

          <div className="lg:col-span-6 lg:pl-8">
            <LostRoute />
          </div>
        </div>
      </section>
    </main>
  );
}
