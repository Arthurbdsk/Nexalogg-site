import Link from 'next/link';
import { ContactChannels } from '@/components/ui/ContactChannels';
import { Logo } from '@/components/ui/Logo';
import { footerNav } from '@/data/navigation';
import { siteConfig } from '@/lib/site';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="tone-dark bg-surface text-content">
      <div className="shell py-14 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-16">
          <div className="max-w-sm">
            <Logo withTagline />
            <ContactChannels className="mt-8" local="footer" />
            {siteConfig.social.length > 0 ? (
              <ul className="mt-7 flex flex-wrap gap-3">
                {siteConfig.social.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-9 items-center rounded-full border border-line/20 px-4 text-sm text-content/70 transition-colors duration-300 hover:border-brand-500 hover:text-brand-500"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <nav aria-label="Navegação do rodapé">
            <div className="grid grid-cols-2 gap-x-6 gap-y-9 sm:grid-cols-4">
              {footerNav.map((column) => (
                <div key={column.title}>
                  <h2 className="label">{column.title}</h2>
                  <ul className="mt-4 space-y-2.5">
                    {column.items.map((item) => (
                      <li key={`${column.title}-${item.href}`}>
                        <Link
                          href={item.href}
                          className="text-[0.9375rem] text-content/65 transition-colors duration-300 hover:text-brand-500"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </nav>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-line/15 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-content/45">
            {year} {siteConfig.name}
            {siteConfig.legalName ? `. ${siteConfig.legalName}` : ''}
            {siteConfig.legal.cnpj ? `. CNPJ ${siteConfig.legal.cnpj}` : ''}
          </p>
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <li>
              <Link
                href="/politica-de-privacidade"
                className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-content/45 transition-colors duration-300 hover:text-brand-500"
              >
                Política de Privacidade
              </Link>
            </li>
            <li>
              <Link
                href="/termos-de-uso"
                className="text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-content/45 transition-colors duration-300 hover:text-brand-500"
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
