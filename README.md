# NEXALLOG

Site institucional da NEXALLOG. Consultoria para empresas e empresários de Transportes e Logística:
diagnóstico financeiro e operacional, identificação de causas estruturais, plano de ação de 90 dias
e suporte na execução.

## Stack

| Camada | Escolha | Motivo |
| --- | --- | --- |
| Framework | Next.js 15 (App Router) | Renderização estática por padrão, metadata nativa, rotas de API |
| Linguagem | TypeScript (strict) | Tipagem do conteúdo e dos componentes |
| Estilos | Tailwind CSS 3 | Sistema de design centralizado em `tailwind.config.ts` |
| Animação | CSS + IntersectionObserver | Sem biblioteca de animação, apenas `opacity` e `transform` |
| Ícones | SVG próprio | Nenhuma dependência de biblioteca de ícones |
| Fontes | Montserrat | Tipografia oficial da marca, auto-hospedada em `public/fonts` |

Dependências de produção: `next`, `react`, `react-dom`. Nada além disso. O pacote `qrcode` é
dependência de desenvolvimento e roda apenas no script que gera o SVG do QR code.

## Identidade visual

O site segue o manual da marca NEXALLOG. Os valores estão centralizados em
`tailwind.config.ts` e `src/app/globals.css`.

| Elemento | Valor |
| --- | --- |
| Amarelo | `#E0A800` (`brand-500`) |
| Preto | `#111111` (`ink`) |
| Cinza escuro | `#333333` (`ink-500`) |
| Cinza claro | `#E6E6E6` (`paper-dim`) |
| Branco | `#FFFFFF` (`paper`) |
| Tipografia | Montserrat Bold em títulos, Regular em corpo de texto |

O símbolo da marca vive em `src/components/ui/Logo.tsx`, como componente
`BrandMark`. O mesmo traçado é usado no logotipo, no favicon, no ícone de
aplicativo e como elemento gráfico nas seções.

### Tons de seção

Cada bloco de conteúdo declara o próprio tom pelo componente
`src/components/layout/Section.tsx`, e os filhos herdam as cores pelos tokens
`surface`, `content` e `line`:

| Tom | Fundo | Uso |
| --- | --- | --- |
| `light` | Branco | Hero, metodologia, liderança, páginas legais |
| `muted` | Cinza claro | Diagnóstico e blocos de apoio |
| `dark` | Preto | Pilares, cobertura completa, rodapé |
| `brand` | Amarelo | Chamada final |

A alternância entre os quatro tons é o que dá ritmo à leitura. Para trocar a
cor de um bloco basta mudar a prop `tone`.

## Comandos

```bash
npm install
npm run dev            # ambiente de desenvolvimento
npm run build          # build de produção
npm run start          # servidor de produção
npm run typecheck      # verificação de tipos
npm run lint           # ESLint com next/core-web-vitals
npm run seo:generate   # regenera public/sitemap.xml e public/robots.txt
npm run qr:generate    # regenera o QR code do LinkedIn em public/images
```

## Dados da empresa: onde editar

Todo conteúdo institucional editável está centralizado. Nenhuma informação foi inventada: campos sem
dado oficial ficam vazios e simplesmente não são renderizados, sem exibir marcador ao usuário final.

### `src/lib/site.ts`

Fonte única de:

- `name`, `tagline`, `description`, `url` (domínio de produção)
- `contact.email`, `contact.phone`, `contact.whatsapp`
  Preencher o campo `value` habilita automaticamente o canal no rodapé, na página de contato e no
  JSON-LD, com evento de analytics já associado. Quando telefone e WhatsApp são o mesmo número, os
  dois são exibidos como uma única entrada.
- `address` e `legal` (razão social, CNPJ, encarregado de dados, data dos documentos legais)
- `social` (somente perfis oficiais confirmados)
- `advisor` (foto, trajetória, formação e LinkedIn de Alexandre Felix)
  Alterar `advisor.linkedin` exige rodar `npm run qr:generate` para atualizar o QR code exibido na
  seção de liderança. O SVG é versionado, então nenhuma biblioteca de QR code vai para produção.
- `analytics` (IDs de GA4 e GTM)
- `cta` (textos dos botões principais)

### `src/data/`

- `problems.ts`: os cinco problemas estruturais da seção de diagnóstico
- `methodology.ts`: as quatro etapas do Programa D90 e os resultados esperados
- `solutions.ts`: as nove áreas de cobertura, os textos das páginas de área e os três princípios
- `navigation.ts`: menus do header e do rodapé

Incluir uma nova área em `solutions.ts` cria a página `/solucoes/<slug>` e a entrada no diagrama de
ecossistema. Depois disso, rode `npm run seo:generate` para atualizar o sitemap.

## Variáveis de ambiente

Copie `.env.example` para `.env.local`:

| Variável | Uso |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Domínio usado em canonical, Open Graph, sitemap e JSON-LD |
| `NEXT_PUBLIC_GA4_ID` | Ativa o GA4. Vazio, nenhum script de terceiro é carregado |
| `NEXT_PUBLIC_GTM_ID` | Ativa o GTM nas mesmas condições |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Meta tag de verificação do Search Console |
| `CONTACT_WEBHOOK_URL` | Destino do formulário. Somente servidor, nunca exposto ao browser |
| `CONTACT_INBOX` | Caixa de destino enviada junto ao webhook |

Sem `CONTACT_WEBHOOK_URL`, a rota `/api/contact` valida e registra a solicitação no log do servidor,
mas não encaminha para nenhum destino. Configure a variável antes de publicar.

## Estrutura

```
src/
  app/                  rotas, metadata, JSON-LD, 404, erro e API de contato
  components/
    layout/             header, rodapé, cabeçalho de página, progresso, analytics
    sections/           seções de conteúdo reutilizadas entre páginas
    ui/                 botão, campo, revelação, trilha, marca, dados estruturados
    visuals/            composições SVG (rota do hero, rota da página 404)
  data/                 conteúdo institucional tipado
  hooks/                observadores de scroll, viewport, ponteiro e mídia
  lib/                  configuração, SEO, JSON-LD, analytics, validação, utilitários
public/
  fonts/                fontes auto-hospedadas
  images/               imagem de Open Graph e marca
  robots.txt            gerado por npm run seo:generate
  sitemap.xml           gerado por npm run seo:generate
```

## Analytics

`src/lib/analytics.ts` expõe `track(evento, dados)`. Sem IDs configurados a chamada é um no-op, então
o site funciona normalmente antes da configuração. Eventos já instrumentados:

`cta_principal_click`, `cta_metodologia_click`, `cta_solucoes_click`, `whatsapp_click`,
`telefone_click`, `email_click`, `form_start`, `form_submit`, `form_success`, `form_error`,
`scroll_depth`.

## SEO

- Title e meta description únicos por página, montados em `src/lib/seo.ts`
- Canonical absoluto em todas as páginas indexáveis
- Open Graph e Twitter Card com imagem 1200x630
- JSON-LD com `Organization`, `WebSite`, `WebPage`, `BreadcrumbList`, `Service` e `Person`,
  sempre sem propriedades vazias
- `sitemap.xml` e `robots.txt` físicos em `public/`, gerados a partir das rotas reais
- Páginas de erro marcadas com `noindex`
- Redirecionamentos 301 de rotas alternativas em `next.config.mjs`

## Acessibilidade

Navegação completa por teclado, atalho para o conteúdo, foco visível, estrutura semântica com um
único `h1` por página, rótulos associados no formulário, estados de erro comunicados por texto e
ícone, e suporte a `prefers-reduced-motion` em todas as animações.

## Segurança

Headers de segurança e Content Security Policy em `next.config.mjs`, validação e sanitização
compartilhadas entre cliente e servidor em `src/lib/validation.ts`, honeypot e limite de envios por
origem na rota `/api/contact`.
