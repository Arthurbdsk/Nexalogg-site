import Link from 'next/link';
import { LegalArticle, type LegalSection } from '@/components/layout/LegalArticle';
import { PageHeader } from '@/components/layout/PageHeader';
import { JsonLd } from '@/components/ui/JsonLd';
import { breadcrumbSchema, graph, webPageSchema } from '@/lib/jsonld';
import { buildMetadata } from '@/lib/seo';
import { siteConfig } from '@/lib/site';

const title = 'Política de Privacidade';
const description =
  'Como a NEXALLOG trata os dados pessoais coletados neste site, com quais finalidades, por quanto tempo e de que forma o titular pode exercer seus direitos previstos na LGPD.';
const path = '/politica-de-privacidade';

export const metadata = buildMetadata({ title, description, path });

const crumbs = [
  { name: 'Início', path: '/' },
  { name: title, path },
];

const { legal, legalName, name } = siteConfig;
const controllerName = legalName || name;
const hasDpoChannel = Boolean(legal.dpoEmail);

const sections: LegalSection[] = [
  {
    id: 'controlador',
    title: 'Controlador dos dados',
    content: (
      <>
        <p>
          Esta política descreve o tratamento de dados pessoais realizado por {controllerName} em
          relação a este site, na condição de controladora, nos termos da Lei nº 13.709/2018, a Lei
          Geral de Proteção de Dados Pessoais.
        </p>
        {legal.cnpj ? <p>Inscrição no CNPJ sob o nº {legal.cnpj}.</p> : null}
        <p>
          Solicitações relacionadas a dados pessoais podem ser enviadas pelos canais indicados na
          página de <Link href="/contato">contato</Link>
          {hasDpoChannel ? (
            <>
              {' '}
              ou diretamente ao encarregado pelo tratamento de dados
              {legal.dpoName ? `, ${legal.dpoName}` : ''}, pelo endereço {legal.dpoEmail}
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
          O site coleta apenas os dados necessários ao atendimento de solicitações comerciais e à
          medição de uso das páginas.
        </p>
        <h3>Dados fornecidos pelo usuário</h3>
        <ul>
          <li>Nome</li>
          <li>Empresa</li>
          <li>E-mail</li>
          <li>Telefone</li>
          <li>Segmento de atuação</li>
          <li>Mensagem enviada no formulário</li>
        </ul>
        <h3>Dados coletados automaticamente</h3>
        <ul>
          <li>Endereço IP e identificadores técnicos da requisição</li>
          <li>Tipo de dispositivo, navegador e sistema operacional</li>
          <li>Páginas acessadas, origem do acesso e interações de navegação</li>
        </ul>
      </>
    ),
  },
  {
    id: 'finalidades',
    title: 'Finalidades e bases legais',
    content: (
      <>
        <p>Os dados são tratados para as seguintes finalidades:</p>
        <ul>
          <li>
            Responder a solicitações de contato e conduzir tratativas comerciais, com base na adoção
            de providências preliminares a pedido do titular e no legítimo interesse.
          </li>
          <li>
            Medir o uso do site, entender o desempenho das páginas e melhorar a navegação, com base no
            consentimento do usuário quanto a cookies não essenciais.
          </li>
          <li>
            Garantir a segurança do site e prevenir abusos no envio de formulários, com base no
            legítimo interesse.
          </li>
          <li>Cumprir obrigações legais e regulatórias aplicáveis.</li>
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
          Não vendemos dados pessoais. O compartilhamento ocorre apenas quando necessário à execução
          das finalidades descritas nesta política, com:
        </p>
        <ul>
          <li>Provedores de hospedagem e infraestrutura do site</li>
          <li>Ferramentas de medição de audiência e desempenho</li>
          <li>
            Parceiros especializados envolvidos na execução de um trabalho contratado, quando houver
            necessidade e mediante compromisso de confidencialidade
          </li>
          <li>Autoridades públicas, quando exigido por lei ou ordem judicial</li>
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
          Cookies e tecnologias semelhantes são utilizados para manter o funcionamento do site e, de
          forma opcional, para medir o uso das páginas. Cookies essenciais não podem ser desativados
          sem comprometer a navegação.
        </p>
        <p>
          O usuário pode bloquear ou remover cookies pelas configurações do próprio navegador. A
          restrição de cookies não essenciais não impede o acesso ao conteúdo do site.
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
          Os dados enviados por formulário são mantidos pelo tempo necessário ao atendimento da
          solicitação e ao cumprimento de obrigações legais, sendo eliminados quando deixarem de ser
          necessários para essas finalidades.
        </p>
        <p>
          Adotamos medidas técnicas e administrativas para proteger os dados contra acesso não
          autorizado, perda, alteração ou divulgação indevida, incluindo transporte por conexão
          criptografada e restrição de acesso às informações recebidas.
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
          A LGPD assegura ao titular, entre outros, os direitos de confirmação da existência de
          tratamento, acesso, correção de dados incompletos ou desatualizados, anonimização, bloqueio
          ou eliminação de dados desnecessários, portabilidade, informação sobre compartilhamento,
          revogação do consentimento e oposição a tratamento realizado com base em legítimo
          interesse.
        </p>
        <p>
          Para exercer qualquer desses direitos, envie a solicitação pela página de{' '}
          <Link href="/contato">contato</Link>. A resposta é enviada ao mesmo canal informado pelo
          titular, dentro dos prazos previstos em lei.
        </p>
      </>
    ),
  },
  {
    id: 'atualizacoes',
    title: 'Atualizações desta política',
    content: (
      <p>
        Esta política pode ser revisada a qualquer momento para refletir mudanças no site, em
        ferramentas utilizadas ou na legislação aplicável. A data da última atualização é sempre
        indicada nesta página.
      </p>
    ),
  },
];

export default function PrivacyPage() {
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
          lead={
            <p>
              Esta página descreve quais dados pessoais são tratados a partir do uso deste site, com
              quais finalidades, por quanto tempo e como o titular pode exercer seus direitos.
            </p>
          }
        />
        <LegalArticle sections={sections} />
      </main>
    </>
  );
}
