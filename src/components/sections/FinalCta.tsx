'use client';

import Link from 'next/link';
import { Section } from '@/components/layout/Section';
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
    <Section tone="brand" id="proximo-passo" labelledBy="proximo-passo-titulo">
      <div className="shell">
        <div className="border border-ink/25">
          <div className="grid lg:grid-cols-12">
            <div className="flex flex-col justify-between px-6 py-9 sm:px-10 sm:py-12 lg:col-span-7 lg:min-h-[27rem] lg:px-12 lg:py-14">
              <h2 id="proximo-passo-titulo" className="max-w-3xl text-display-md">
                Vamos conectar caminhos e gerar resultados na sua operação?
              </h2>
              <p className="mt-10 max-w-2xl text-lead text-content/75 lg:mt-16">
                Conte o momento atual da operação, onde o resultado está pressionado e quais
                decisões precisam ganhar clareza. A primeira conversa organiza as prioridades e
                identifica como a NEXALLOG pode apoiar a execução.
              </p>
            </div>

            <aside className="flex flex-col justify-between bg-ink px-6 py-9 text-paper sm:px-10 sm:py-12 lg:col-span-5 lg:px-12 lg:py-14">
              <div>
                <p className="max-w-sm text-[1.0625rem] leading-7 text-paper/75">
                  Prefere falar diretamente? Entre em contato por e-mail ou WhatsApp.
                </p>

                <address className="mt-8 flex flex-col gap-4 not-italic">
                  {email.value ? (
                    <a
                      href={`mailto:${email.value}`}
                      onClick={() => track('email_click', { local: 'cta_final' })}
                      className="w-fit border-b border-paper/25 pb-1 text-[0.9375rem] font-semibold text-paper transition-colors hover:border-brand-500 hover:text-brand-500"
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
                      className="w-fit border-b border-paper/25 pb-1 text-[0.9375rem] font-semibold text-paper transition-colors hover:border-brand-500 hover:text-brand-500"
                    >
                      WhatsApp {whatsapp.label ?? whatsapp.value}
                    </a>
                  ) : null}
                </address>
              </div>

              <Link
                href="/contato"
                onClick={() => track('cta_principal_click', { local: 'cta_final' })}
                className="group mt-12 inline-flex h-14 w-full items-center justify-between gap-4 bg-brand-500 pl-6 pr-2 text-[0.8125rem] font-bold uppercase tracking-[0.06em] text-ink transition-colors duration-300 ease-outexpo hover:bg-paper"
              >
                {siteConfig.cta.primary}
                <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-ink/20 text-ink transition-transform duration-300 ease-outexpo group-hover:translate-x-1">
                  <svg viewBox="0 0 14 14" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
                    <path d="M1 7h11M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="square" />
                  </svg>
                </span>
              </Link>
            </aside>
          </div>

          <ol className="grid border-t border-ink/25 sm:grid-cols-3">
            {CONTACT_STEPS.map((step, index) => (
              <li
                key={step.title}
                className="group min-h-[11rem] border-b border-ink/25 px-6 py-7 transition-colors duration-300 last:border-b-0 hover:bg-ink hover:text-paper sm:border-b-0 sm:border-r sm:px-8 sm:last:border-r-0"
              >
                <span className="text-sm font-bold text-ink/55 transition-colors duration-300 group-hover:text-brand-500">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-7 text-base font-bold">{step.title}</h3>
                <p className="mt-2 max-w-sm text-sm leading-6 text-content/70 transition-colors duration-300 group-hover:text-paper/65">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}
