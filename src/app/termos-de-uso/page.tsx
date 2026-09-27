import { useCopy } from '@/i18n/useCopy';
import { Copy } from '@/i18n/Copy';
import Link from 'next/link';
import { LegalArticle, type LegalSection } from '@/components/layout/LegalArticle';
import { PageHeader } from '@/components/layout/PageHeader';
import { JsonLd } from '@/components/ui/JsonLd';
import { breadcrumbSchema, graph, webPageSchema } from '@/lib/jsonld';
import { localizedMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/site';

const title = 'Termos de Uso';
const description =
  'Condições de uso do site da NEXALLOG: finalidade do conteúdo, propriedade intelectual, responsabilidade sobre informações enviadas e legislação aplicável.';
const path = '/termos-de-uso';

export function generateMetadata() {
  return localizedMetadata({ title, description, path });
}

const crumbs = [
  { name: 'Início', path: '/' },
  { name: title, path },
];

const { legalName, name } = siteConfig;
const holder = legalName || name;

const sections: LegalSection[] = [
  {
    id: 'aceitacao',
    title: 'Aceitação dos termos',
    content: (
      <p>
        <Copy>
          {
            'O acesso e a navegação neste site implicam concordância com estes Termos de Uso. Caso não concorde com qualquer condição aqui descrita, recomendamos que o usuário não utilize o site.'
          }
        </Copy>
      </p>
    ),
  },
  {
    id: 'objeto',
    title: 'Finalidade do site',
    content: (
      <>
        <p>
          <Copy>
            {'Este site tem finalidade institucional e informativa. Ele apresenta a atuação da '}
          </Copy>
          <Copy>{name}</Copy>
          <Copy>
            {
              ' com empresas do segmento de Transportes e Logística, sua metodologia de trabalho e suas áreas de cobertura.'
            }
          </Copy>
        </p>
        <p>
          <Copy>
            {
              'O conteúdo publicado não constitui proposta comercial, oferta vinculante, consultoria prestada nem recomendação aplicável a um caso concreto. Qualquer trabalho é definido em instrumento contratual específico entre as partes.'
            }
          </Copy>
        </p>
      </>
    ),
  },
  {
    id: 'uso',
    title: 'Uso permitido',
    content: (
      <>
        <p>
          <Copy>{'O usuário se compromete a utilizar o site de forma lícita, sendo vedado:'}</Copy>
        </p>
        <ul>
          <li>
            <Copy>{'Tentar obter acesso não autorizado a sistemas, servidores ou dados'}</Copy>
          </li>
          <li>
            <Copy>{'Interferir no funcionamento do site ou em sua disponibilidade'}</Copy>
          </li>
          <li>
            <Copy>{'Utilizar mecanismos automatizados para extração massiva de conteúdo'}</Copy>
          </li>
          <li>
            <Copy>
              {
                'Enviar dados falsos, de terceiros sem autorização ou conteúdo ilícito pelo formulário'
              }
            </Copy>
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'propriedade-intelectual',
    title: 'Propriedade intelectual',
    content: (
      <p>
        <Copy>{'A marca '}</Copy>
        <Copy>{name}</Copy>
        <Copy>
          {
            ', o conteúdo textual, a identidade visual, os elementos gráficos e a estrutura deste site pertencem a '
          }
        </Copy>
        <Copy>{holder}</Copy>
        <Copy>
          {
            ' ou a seus licenciantes. A reprodução, distribuição ou modificação sem autorização prévia por escrito não é permitida.'
          }
        </Copy>
      </p>
    ),
  },
  {
    id: 'informacoes-enviadas',
    title: 'Informações enviadas pelo usuário',
    content: (
      <>
        <p>
          <Copy>
            {
              'Ao enviar uma solicitação pelo formulário de contato, o usuário declara que as informações fornecidas são verdadeiras e que possui autorização para informar os dados de contato indicados.'
            }
          </Copy>
        </p>
        <p>
          <Copy>{'O tratamento desses dados é descrito na'}</Copy>
          <Copy> </Copy>
          <Link href="/politica-de-privacidade">
            <Copy>{'Política de Privacidade'}</Copy>
          </Link>
          .
        </p>
      </>
    ),
  },
  {
    id: 'disponibilidade',
    title: 'Disponibilidade e conteúdo',
    content: (
      <>
        <p>
          <Copy>
            {
              'O site pode passar por manutenções, atualizações ou indisponibilidades temporárias. O conteúdo pode ser alterado a qualquer momento, sem aviso prévio.'
            }
          </Copy>
        </p>
        <p>
          <Copy>
            {
              'Eventuais links para sites de terceiros são disponibilizados apenas por conveniência. O conteúdo e as práticas de privacidade desses sites são de responsabilidade de seus respectivos operadores.'
            }
          </Copy>
        </p>
      </>
    ),
  },
  {
    id: 'responsabilidade',
    title: 'Limitação de responsabilidade',
    content: (
      <p>
        <Copy>{'Na máxima extensão permitida pela legislação aplicável, '}</Copy>
        <Copy>{holder}</Copy>
        <Copy>
          {
            ' não responde por decisões tomadas exclusivamente com base no conteúdo informativo deste site, nem por danos decorrentes de indisponibilidade temporária, uso indevido do site ou falhas em serviços de terceiros.'
          }
        </Copy>
      </p>
    ),
  },
  {
    id: 'legislacao',
    title: 'Legislação aplicável',
    content: (
      <p>
        <Copy>
          {
            'Estes Termos de Uso são regidos pela legislação brasileira. Eventuais controvérsias serão submetidas ao foro competente nos termos da lei.'
          }
        </Copy>
      </p>
    ),
  },
];

export default function TermsPage() {
  const t = useCopy();
  return (
    <>
      <JsonLd
        data={graph([
          webPageSchema({ path, name: `${title} | NEXALLOG`, description }),
          breadcrumbSchema(crumbs),
        ])}
      />

      <main id="conteudo" tabIndex={-1}>
        <PageHeader
          title={t(title)}
          crumbs={crumbs}
          lead={
            <p>
              {t(
                'Condições aplicáveis ao acesso e ao uso deste site, incluindo a finalidade do conteúdo publicado e a responsabilidade sobre as informações enviadas pelo formulário.',
              )}
            </p>
          }
        />
        <LegalArticle sections={sections} />
      </main>
    </>
  );
}
