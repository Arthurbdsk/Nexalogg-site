import Link from 'next/link';
import { useCopy } from '@/i18n/useCopy';
import { Reveal } from '@/components/ui/Reveal';

const capabilities = [
  'Diagnóstico financeiro e operacional',
  'Indicadores gerenciais',
  'Projeções',
  'Identificação de problemas estruturais',
  'Planos de ação',
  'Acompanhamento da execução com o “O que fazer?” e o “Como fazer?”',
  'Transformação logística',
];

export function CompanyOverview() {
  const t = useCopy();
  return (
    <section id="a-nexallog" aria-labelledby="empresa-titulo" className="tone-muted bg-surface py-section text-content">
      <div className="shell">
        <div className="grid gap-8 border-b border-line/15 pb-12 lg:grid-cols-12 lg:gap-16 lg:pb-16">
          <Reveal className="lg:col-span-5">
            <h2 id="empresa-titulo" className="text-display-md">
              {t('Eficiência de caixa para Transporte e Logística')}
            </h2>
          </Reveal>
          <Reveal delay={100} className="lg:col-span-6 lg:col-start-7">
            <p className="text-lead text-content/80">
              {t('A NEXALLOG foi lançada para melhorar a eficiência de caixa das empresas de Logística e Transporte. A solução NEXACASH responde a essa dor, amplamente identificada no segmento.')}
            </p>
            <p className="mt-5 text-[1.0625rem] leading-[1.75] text-content/65">
              {t('A NEXALLOG atua com empresas e empresários do segmento de Transportes e Logística. Trabalhamos sobre os números financeiros da operação, apontamos a origem dos desvios estruturais dentro das suas áreas e processos, e conduzimos o plano até a execução, ao lado do time da empresa.')}
            </p>
            <Link href="/nexacash" className="mt-6 inline-flex min-h-11 items-center font-semibold underline underline-offset-4 hover:text-accent">
              {t('Conhecer a NEXACASH')}
            </Link>
          </Reveal>
        </div>
        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <h2 id="atuacao-titulo" className="text-display-md">{t('O que conduzimos diretamente')}</h2>
              <p className="mt-6 text-[1.0625rem] leading-[1.75] text-content/60">
                {t('Estas são as frentes conduzidas pela equipe NEXALLOG ao longo do programa. Nas áreas que exigem competência técnica específica, a rede de parceiros especializados entra junto, sem transferir a coordenação do trabalho.')}
              </p>
              <Link href="/solucoes" className="mt-8 inline-flex min-h-11 items-center gap-3 font-semibold text-accent underline underline-offset-4">
                {t('Ver as áreas de cobertura')} <span aria-hidden="true">→</span>
              </Link>
            </Reveal>
          </div>
          <ol aria-labelledby="atuacao-titulo" className="border-t border-line/15 lg:col-span-6 lg:col-start-7">
            {capabilities.map((capability, index) => (
              <Reveal as="li" key={capability} delay={index * 60}>
                <div className="flex items-baseline gap-6 border-b border-line/15 py-5">
                  <span aria-hidden="true" className="shrink-0 text-[0.6875rem] tracking-[0.16em] text-accent">{String(index + 1).padStart(2, '0')}</span>
                  <span className="text-[1.0625rem] leading-relaxed">{t(capability)}</span>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
