import { useCopy } from '@/i18n/useCopy';
import Link from 'next/link';
import { NexacashScreens } from '@/components/sections/NexacashScreens';
import { JsonLd } from '@/components/ui/JsonLd';
import { breadcrumbSchema, graph, webPageSchema } from '@/lib/jsonld';
import { localizedMetadata } from '@/lib/seo';

const title = 'NEXACASH';
const path = '/nexacash';
const description =
  'NEXACASH: gestão financeira e visão do fluxo de caixa em tempo real para empresas de Transporte e Logística.';

export function generateMetadata() {
  return localizedMetadata({ title, description, path });
}

const features = [
  'Acompanhamento da operação financeira, resultado e fluxo de caixa',
  'Conciliação automática pelo Open Finance',
  'Análise por IA',
  'Classificação das despesas do Cartão de Crédito',
  'Projeção de caixa futuro',
  'Geração de notas fiscais e boletos',
  'Disparo consolidado para sua Contabilidade',
];

export default function NexacashPage() {
  const t = useCopy();
  return (
    <>
      <JsonLd
        data={graph([
          webPageSchema({ path, name: title, description }),
          breadcrumbSchema([
            { name: 'Início', path: '/' },
            { name: title, path },
          ]),
        ])}
      />
      <main id="conteudo" tabIndex={-1}>
        <section className="tone-light bg-surface pb-section pt-[calc(var(--header-height)+4rem)] text-content">
          <div className="shell">
            <p className="label">{t('NEXACASH')}</p>
            <h1 className="mt-7 max-w-5xl text-display-lg">
              {t('O fluxo de caixa define o futuro. ')}
              <span className="text-accent">{t('A gestão define o resultado.')}</span>
            </h1>
            <p className="mt-8 text-lead font-semibold">
              {t('Mais visibilidade. Mais controle. Mais previsibilidade.')}
            </p>
            <p className="mt-5 max-w-3xl text-[1.0625rem] leading-[1.75] text-content/65">
              {t(
                'Do diagnóstico ao Programa D90, oferecemos às empresas de Transporte e Logística uma ferramenta que proporciona uma visão completa do fluxo de caixa em tempo real, permitindo decisões mais ágeis e uma gestão financeira estratégica.',
              )}
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="https://nexacash.nexallog.com.br/login"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-12 items-center gap-3 bg-brand-500 px-6 text-sm font-bold uppercase tracking-[0.06em] text-ink transition-colors hover:bg-ink hover:text-paper"
              >
                {t('Ir para a NEXACASH agora')}
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </a>
              <Link
                href="#ferramenta"
                className="inline-flex min-h-12 items-center bg-ink px-6 text-sm font-bold uppercase tracking-[0.06em] text-paper transition-colors hover:bg-brand-500 hover:text-ink"
              >
                {t('Conhecer a ferramenta')}
              </Link>
            </div>
          </div>
        </section>

        <section
          id="ferramenta"
          aria-labelledby="ferramenta-titulo"
          className="tone-muted scroll-mt-20 bg-surface py-section text-content"
        >
          <div className="shell">
            <div className="mb-10 grid gap-5 lg:grid-cols-12 lg:gap-12">
              <div className="lg:col-span-6">
                <p className="label">{t('A ferramenta')}</p>
                <h2 id="ferramenta-titulo" className="mt-5 text-display-md">
                  {t(
                    'O ERP financeiro que automatiza e facilita os seus controles e a gestão do caixa.',
                  )}
                </h2>
              </div>
              <p className="self-end text-[1.0625rem] leading-[1.75] text-content/65 lg:col-span-5 lg:col-start-8">
                {t(
                  'Automatiza contas a pagar e receber, conciliação bancária, classificação de lançamentos e organização documental. A nossa ',
                )}
                <strong className="iara-highlight">{t('IAra')}</strong>
                {t(' ')}
                {t(
                  'transforma os fluxos em análises de projeção de caixa, margem por corte e alertas antes do problema virar prejuízo.',
                )}
              </p>
            </div>
            <NexacashScreens />
            <p className="mt-4 text-xs text-content/50">
              {t('Telas demonstrativas da plataforma parceira.')}
            </p>
          </div>
        </section>

        <section
          aria-labelledby="features-titulo"
          className="tone-dark bg-surface py-section text-content"
        >
          <div className="shell">
            <p className="label">{t('Recursos')}</p>
            <h2 id="features-titulo" className="mt-5 text-display-md">
              {t('Funcionalidades da NEXACASH')}
            </h2>
            <ol className="mt-10 grid gap-px bg-line/15 sm:grid-cols-2">
              {features.map((feature, index) => (
                <li key={feature} className="flex min-h-28 items-start gap-6 bg-surface p-6 sm:p-8">
                  <span className="text-sm font-bold text-accent">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="max-w-sm text-lg font-semibold leading-snug">{t(feature)}</span>
                </li>
              ))}
            </ol>
            <Link
              href="/contato"
              className="mt-10 inline-flex min-h-12 items-center bg-brand-500 px-6 text-sm font-bold uppercase tracking-[0.06em] text-ink transition-colors hover:bg-paper"
            >
              {t('Conversar sobre a NEXACASH')}
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
