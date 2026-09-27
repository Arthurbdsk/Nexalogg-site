import { useCopy } from '@/i18n/useCopy';
import { Copy } from '@/i18n/Copy';
import Link from 'next/link';
import { LegalArticle, type LegalSection } from '@/components/layout/LegalArticle';
import { PageHeader } from '@/components/layout/PageHeader';
import { JsonLd } from '@/components/ui/JsonLd';
import { breadcrumbSchema, graph, webPageSchema } from '@/lib/jsonld';
import { localizedMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/site';

const title = 'Política de Privacidade';
const description =
  'Como a NEXALLOG trata os dados pessoais coletados neste site, com quais finalidades, por quanto tempo e de que forma o titular pode exercer seus direitos previstos na LGPD.';
const path = '/politica-de-privacidade';

export function generateMetadata() {
  return localizedMetadata({ title, description, path });
}

const crumbs = [
  { name: 'Início', path: '/' },
  { name: title, path },
];

const { address, contact, legal, legalName, name } = siteConfig;
const controllerName = legalName || name;
const hasDpoChannel = Boolean(legal.dpoEmail);
const controllerAddress = [address.street, address.city, address.state].filter(Boolean).join(', ');

const sections: LegalSection[] = [
  {
    id: 'controlador',
    title: 'Controlador dos dados',
    content: (
      <>
        <p>
          <Copy>{'Esta política descreve o tratamento de dados pessoais realizado por '}</Copy>
          <Copy>{controllerName}</Copy>
          <Copy>
            {
              ' em relação a este site, na condição de controladora, nos termos da Lei nº 13.709/2018, a Lei Geral de Proteção de Dados Pessoais.'
            }
          </Copy>
        </p>
        {legal.cnpj ? (
          <p>
            <Copy>{'Inscrição no CNPJ sob o nº '}</Copy>
            <Copy>{legal.cnpj}</Copy>.
          </p>
        ) : null}
        {controllerAddress ? (
          <p>
            <Copy>{'Endereço: '}</Copy>
            <Copy>{controllerAddress}</Copy>.
          </p>
        ) : null}
        <p>
          <Copy>{'Solicitações relacionadas a dados pessoais podem ser enviadas para'}</Copy>
          <Copy> </Copy>
          <a href={`mailto:${contact.email.value}`}>
            <Copy>{contact.email.value}</Copy>
          </a>
          <Copy>{' ou pelos canais indicados na página de '}</Copy>
          <Link href="/contato">
            <Copy>{'contato'}</Copy>
          </Link>
          {hasDpoChannel ? (
            <>
              <Copy> </Copy>
              <Copy>{'ou diretamente ao encarregado pelo tratamento de dados'}</Copy>
              <Copy>{legal.dpoName ? `, ${legal.dpoName}` : ''}</Copy>
              <Copy>{', pelo endereço '}</Copy>
              <Copy>{legal.dpoEmail}</Copy>
            </>
          ) : null}
          .
        </p>
      </>
    ),
  },
  {
    id: 'dados-coletados',
    title: 'Dados que coletamos',
    content: (
      <>
        <p>
          <Copy>
            {
              'O site coleta apenas os dados necessários ao atendimento de solicitações comerciais e à medição de uso das páginas.'
            }
          </Copy>
        </p>
        <h3>
          <Copy>{'Dados fornecidos pelo usuário'}</Copy>
        </h3>
        <ul>
          <li>
            <Copy>{'Nome'}</Copy>
          </li>
          <li>
            <Copy>{'Empresa'}</Copy>
          </li>
        </ul>
        <h3>
          <Copy>{'Dados coletados automaticamente'}</Copy>
        </h3>
        <ul>
          <li>
            <Copy>{'Endereço IP e identificadores técnicos da requisição'}</Copy>
          </li>
          <li>
            <Copy>{'Tipo de dispositivo, navegador e sistema operacional'}</Copy>
          </li>
          <li>
            <Copy>{'Páginas acessadas, origem do acesso e interações de navegação'}</Copy>
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'finalidades',
    title: 'Finalidades e bases legais',
    content: (
      <>
        <p>
          <Copy>{'Os dados são tratados para as seguintes finalidades:'}</Copy>
        </p>
        <ul>
          <li>
            <Copy>
              {
                'Responder a solicitações de contato e conduzir tratativas comerciais, com base na adoção de providências preliminares a pedido do titular e no legítimo interesse.'
              }
            </Copy>
          </li>
          <li>
            <Copy>
              {
                'Medir o uso do site, entender o desempenho das páginas e melhorar a navegação, com base no consentimento do usuário quanto a cookies não essenciais.'
              }
            </Copy>
          </li>
          <li>
            <Copy>
              {
                'Garantir a segurança do site e prevenir abusos nos canais de contato, com base no legítimo interesse.'
              }
            </Copy>
          </li>
          <li>
            <Copy>{'Cumprir obrigações legais e regulatórias aplicáveis.'}</Copy>
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'compartilhamento',
    title: 'Compartilhamento de dados',
    content: (
      <>
        <p>
          <Copy>
            {
              'Não vendemos dados pessoais. O compartilhamento ocorre apenas quando necessário à execução das finalidades descritas nesta política, com:'
            }
          </Copy>
        </p>
        <ul>
          <li>
            <Copy>{'Provedores de hospedagem e infraestrutura do site'}</Copy>
          </li>
          <li>
            <Copy>{'Ferramentas de medição de audiência e desempenho'}</Copy>
          </li>
          <li>
            <Copy>
              {
                'Parceiros especializados envolvidos na execução de um trabalho contratado, quando houver necessidade e mediante compromisso de confidencialidade'
              }
            </Copy>
          </li>
          <li>
            <Copy>{'Autoridades públicas, quando exigido por lei ou ordem judicial'}</Copy>
          </li>
        </ul>
      </>
    ),
  },
  {
    id: 'cookies',
    title: 'Cookies e medição de uso',
    content: (
      <>
        <p>
          <Copy>
            {
              'Cookies e tecnologias semelhantes são utilizados para manter o funcionamento do site e, de forma opcional, para medir o uso das páginas. Cookies essenciais não podem ser desativados sem comprometer a navegação.'
            }
          </Copy>
        </p>
        <p>
          <Copy>
            {
              'O usuário pode bloquear ou remover cookies pelas configurações do próprio navegador. A restrição de cookies não essenciais não impede o acesso ao conteúdo do site.'
            }
          </Copy>
        </p>
      </>
    ),
  },
  {
    id: 'retencao',
    title: 'Retenção e segurança',
    content: (
      <>
        <p>
          <Copy>
            {
              'Os dados informados antes do redirecionamento ao WhatsApp são usados para compor a mensagem inicial. A continuidade do atendimento ocorre no próprio WhatsApp, conforme as configurações e políticas desse serviço.'
            }
          </Copy>
        </p>
        <p>
          <Copy>
            {
              'Adotamos medidas técnicas e administrativas para proteger os dados contra acesso não autorizado, perda, alteração ou divulgação indevida, incluindo transporte por conexão criptografada e restrição de acesso às informações recebidas.'
            }
          </Copy>
        </p>
      </>
    ),
  },
  {
    id: 'direitos',
    title: 'Direitos do titular',
    content: (
      <>
        <p>
          <Copy>
            {
              'A LGPD assegura ao titular, entre outros, os direitos de confirmação da existência de tratamento, acesso, correção de dados incompletos ou desatualizados, anonimização, bloqueio ou eliminação de dados desnecessários, portabilidade, informação sobre compartilhamento, revogação do consentimento e oposição a tratamento realizado com base em legítimo interesse.'
            }
          </Copy>
        </p>
        <p>
          <Copy>{'Para exercer qualquer desses direitos, envie a solicitação pela página de'}</Copy>
          <Copy> </Copy>
          <Link href="/contato">
            <Copy>{'contato'}</Copy>
          </Link>
          <Copy>
            {
              '. A resposta é enviada ao mesmo canal informado pelo titular, dentro dos prazos previstos em lei.'
            }
          </Copy>
        </p>
      </>
    ),
  },
  {
    id: 'atualizacoes',
    title: 'Atualizações desta política',
    content: (
      <p>
        <Copy>
          {
            'Esta política pode ser revisada a qualquer momento para refletir mudanças no site, em ferramentas utilizadas ou na legislação aplicável. A data da última atualização é sempre indicada nesta página.'
          }
        </Copy>
      </p>
    ),
  },
];

export default function PrivacyPage() {
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
                'Esta página descreve quais dados pessoais são tratados a partir do uso deste site, com quais finalidades, por quanto tempo e como o titular pode exercer seus direitos.',
              )}
            </p>
          }
        />
        <LegalArticle sections={sections} />
      </main>
    </>
  );
}
