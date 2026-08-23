import Link from 'next/link';
import { Logo } from '@/components/ui/Logo';
import { ContactChannels } from '@/components/ui/ContactChannels';
import { footerNav } from '@/data/navigation';
import { siteConfig } from '@/lib/site';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-paper/10 bg-ink-900">
      <div className="shell py-16 lg:py-20">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)]">
          <div className="max-w-sm">
            <Logo className="text-paper" />
            <p className="mt-6 text-lead text-paper/60">{siteConfig.tagline}</p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-paper/55">
              {siteConfig.shortDescription}
            </p>

            <ContactChannels className="mt-8" local="footer" />

            {siteConfig.social.length > 0 ? (
              <ul className="mt-8 flex flex-wrap gap-3">
                {siteConfig.social.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-9 items-center rounded-full border border-paper/15 px-4 text-sm text-paper/70 transition-colors duration-300 hover:border-copper-400/60 hover:text-copper-200"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <nav aria-label="Navegação do rodapé">
            <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
              {footerNav.map((column) => (
                <div key={column.title}>
                  <h2 className="label-muted">{column.title}</h2>
                  <ul className="mt-5 space-y-3">
                    {column.items.map((item) => (
                      <li key={`${column.title}-${item.href}`}>
                        <Link
                          href={item.href}
                          className="group inline-flex text-[0.9375rem] text-paper/65 transition-colors duration-300 hover:text-paper"
                        >
                          <span className="relative">
                            {item.label}
                            <span
                              aria-hidden="true"
                              className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-copper-400 transition-transform duration-300 ease-outexpo group-hover:scale-x-100"
                            />
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </nav>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-paper/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-slateink-400">
            {year} {siteConfig.name}
            {siteConfig.legalName ? `. ${siteConfig.legalName}` : ''}
            {siteConfig.legal.cnpj ? `. CNPJ ${siteConfig.legal.cnpj}` : ''}
          </p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <li>
              <Link
                href="/politica-de-privacidade"
                className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-slateink-400 transition-colors duration-300 hover:text-copper-300"
              >
                Política de Privacidade
              </Link>
            </li>
            <li>
              <Link
                href="/termos-de-uso"
                className="font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-slateink-400 transition-colors duration-300 hover:text-copper-300"
              >
                Termos de Uso
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
