import Link from 'next/link';
import { LegalArticle, type LegalSection } from '@/components/layout/LegalArticle';
import { PageHeader } from '@/components/layout/PageHeader';
import { JsonLd } from '@/components/ui/JsonLd';
import { breadcrumbSchema, graph, webPageSchema } from '@/lib/jsonld';
import { buildMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/site';

const title = 'Termos de Uso';
const description =
  'Condições de uso do site da NEXALLOG: finalidade do conteúdo, propriedade intelectual, responsabilidade sobre informações enviadas e legislação aplicável.';
const path = '/termos-de-uso';

export const metadata = buildMetadata({ title, description, path });

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
        O acesso e a navegação neste site implicam concordância com estes Termos de Uso. Caso não
        concorde com qualquer condição aqui descrita, recomendamos que o usuário não utilize o site.
      </p>
    ),
  },
  {
    id: 'objeto',
    title: 'Finalidade do site',
    content: (
      <>
        <p>
          Este site tem finalidade institucional e informativa. Ele apresenta a atuação da {name} com
          empresas do segmento de Transportes e Logística, sua metodologia de trabalho e suas áreas
          de cobertura.
        </p>
        <p>
          O conteúdo publicado não constitui proposta comercial, oferta vinculante, consultoria
          prestada nem recomendação aplicável a um caso concreto. Qualquer trabalho é definido em
          instrumento contratual específico entre as partes.
        </p>
      </>
    ),
  },
  {
    id: 'uso',
    title: 'Uso permitido',
    content: (
      <>
        <p>O usuário se compromete a utilizar o site de forma lícita, sendo vedado:</p>
        <ul>
          <li>Tentar obter acesso não autorizado a sistemas, servidores ou dados</li>
          <li>Interferir no funcionamento do site ou em sua disponibilidade</li>
          <li>Utilizar mecanismos automatizados para extração massiva de conteúdo</li>
          <li>Enviar dados falsos, de terceiros sem autorização ou conteúdo ilícito pelo formulário</li>
        </ul>
      </>
    ),
  },
  {
    id: 'propriedade-intelectual',
    title: 'Propriedade intelectual',
    content: (
      <p>
        A marca {name}, o conteúdo textual, a identidade visual, os elementos gráficos e a estrutura
        deste site pertencem a {holder} ou a seus licenciantes. A reprodução, distribuição ou
        modificação sem autorização prévia por escrito não é permitida.
      </p>
    ),
  },
  {
    id: 'informacoes-enviadas',
    title: 'Informações enviadas pelo usuário',
    content: (
      <>
        <p>
          Ao enviar uma solicitação pelo formulário de contato, o usuário declara que as informações
          fornecidas são verdadeiras e que possui autorização para informar os dados de contato
          indicados.
        </p>
        <p>
          O tratamento desses dados é descrito na{' '}
          <Link href="/politica-de-privacidade">Política de Privacidade</Link>.
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
          O site pode passar por manutenções, atualizações ou indisponibilidades temporárias. O
          conteúdo pode ser alterado a qualquer momento, sem aviso prévio.
        </p>
        <p>
          Eventuais links para sites de terceiros são disponibilizados apenas por conveniência. O
          conteúdo e as práticas de privacidade desses sites são de responsabilidade de seus
          respectivos operadores.
        </p>
      </>
    ),
  },
  {
    id: 'responsabilidade',
    title: 'Limitação de responsabilidade',
    content: (
      <p>
        Na máxima extensão permitida pela legislação aplicável, {holder} não responde por decisões
        tomadas exclusivamente com base no conteúdo informativo deste site, nem por danos decorrentes
        de indisponibilidade temporária, uso indevido do site ou falhas em serviços de terceiros.
      </p>
    ),
  },
  {
    id: 'legislacao',
    title: 'Legislação aplicável',
    content: (
      <p>
        Estes Termos de Uso são regidos pela legislação brasileira. Eventuais controvérsias serão
        submetidas ao foro competente nos termos da lei.
      </p>
    ),
  },
];

export default function TermsPage() {
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
          title={title}
          crumbs={crumbs}
          meta="Documento legal"
          lead={
            <p>
              Condições aplicáveis ao acesso e ao uso deste site, incluindo a finalidade do conteúdo
              publicado e a responsabilidade sobre as informações enviadas pelo formulário.
            </p>
          }
        />
        <LegalArticle sections={sections} />
      </main>
    </>
  );
}
