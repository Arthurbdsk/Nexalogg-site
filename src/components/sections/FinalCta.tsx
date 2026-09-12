'use client';

import Link from 'next/link';
import { Section } from '@/components/layout/Section';
import { BrandMark } from '@/components/ui/Logo';
import { track } from '@/lib/analytics';
import { siteConfig } from '@/lib/site';

const CONTACT_STEPS = [
  {
    title: 'Diagnóstico inicial',
    description: 'Leitura dos principais indicadores financeiros e operacionais da empresa.',
  },
  {
    title: 'Direcionamento',
    description: 'Identificação dos desvios estruturais e das prioridades de atuação.',
  },
  {
    title: 'Próximos passos',
    description: 'Definição do plano de ação e do suporte necessário para a execução.',
  },
];

const digits = (value: string) => value.replace(/\D/g, '');

/** Fechamento comercial com contexto, próximos passos e canais diretos. */
export function FinalCta() {
  const email = siteConfig.contact.email;
  const whatsapp = siteConfig.contact.whatsapp;

  return (
    <Section tone="brand" id="proximo-passo" labelledBy="proximo-passo-titulo" className="overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-16 h-[24rem] w-[24rem] opacity-[0.07]"
      >
        <BrandMark className="block h-full w-full brightness-0" />
      </div>
      <div className="shell relative">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <h2 id="proximo-passo-titulo" className="text-display-lg">
              Vamos conectar caminhos e gerar resultados na sua operação?
            </h2>
            <p className="mt-7 max-w-2xl text-lead text-content/75">
              Conte o momento atual da operação, onde o resultado está pressionado e quais
              decisões precisam ganhar clareza. A primeira conversa organiza as prioridades e
              identifica como a NEXALLOG pode apoiar a execução.
            </p>
          </div>
          <div className="lg:col-span-4 lg:col-start-9">
            <div className="border-t border-ink/20 pt-6 lg:border-l lg:border-t-0 lg:pl-9 lg:pt-0">
              <Link
                href="/contato"
                onClick={() => track('cta_principal_click', { local: 'cta_final' })}
                className="group inline-flex h-14 w-full items-center justify-between gap-4 whitespace-nowrap bg-ink pl-7 pr-3 text-[0.8125rem] font-bold uppercase tracking-[0.06em] text-paper transition-colors duration-300 ease-outexpo hover:bg-ink-800 sm:w-auto"
              >
                {siteConfig.cta.primary}
                <span className="flex h-11 w-11 items-center justify-center bg-brand-500 text-ink transition-transform duration-300 ease-outexpo group-hover:translate-x-1">
                  <svg viewBox="0 0 14 14" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
                    <path d="M1 7h11M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" />
                  </svg>
                </span>
              </Link>

              <p className="mt-6 max-w-sm text-[0.9375rem] leading-6 text-content/70">
                Prefere falar diretamente? Entre em contato por e-mail ou WhatsApp.
              </p>

              <div className="mt-5 flex flex-col gap-3">
                {email.value ? (
                  <a
                    href={`mailto:${email.value}`}
                    onClick={() => track('email_click', { local: 'cta_final' })}
                    className="w-fit border-b border-ink/25 pb-1 text-sm font-semibold text-ink transition-colors hover:border-ink"
                  >
                    {email.label ?? email.value}
                  </a>
                ) : null}
                {whatsapp.value ? (
                  <a
                    href={`https://wa.me/${digits(whatsapp.value)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => track('whatsapp_click', { local: 'cta_final' })}
                    className="w-fit border-b border-ink/25 pb-1 text-sm font-semibold text-ink transition-colors hover:border-ink"
                  >
                    WhatsApp {whatsapp.label ?? whatsapp.value}
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 grid border-t border-ink/20 sm:grid-cols-3 lg:mt-16">
          {CONTACT_STEPS.map((step) => (
            <div
              key={step.title}
              className="border-b border-ink/20 py-6 sm:border-b-0 sm:border-r sm:px-7 sm:first:pl-0 sm:last:border-r-0 sm:last:pr-0"
            >
              <h3 className="text-base font-bold text-ink">{step.title}</h3>
              <p className="mt-2 max-w-sm text-sm leading-6 text-content/70">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
