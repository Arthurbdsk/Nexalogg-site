# Kit da marca NEXALLOG

Arquivos do logotipo e do símbolo, gerados a partir dos mesmos valores usados
no site. Para regenerar tudo depois de qualquer alteração:

```bash
npm i -D playwright   # necessário só para rodar o script
npm run marca:generate
```

O script é `scripts/generate-brand-kit.mjs`. Ele lê o traçado do símbolo em
`src/components/ui/Logo.tsx`, a paleta de `tailwind.config.ts` e a Montserrat
de `public/fonts`, então o kit nunca sai de sincronia com o que está no ar.

## Formatos

| Extensão | Para que serve |
| --- | --- |
| `.pdf` | Vetor. Impressão, gráfica, Illustrator, CorelDRAW. Não perde qualidade em nenhum tamanho |
| `.svg` | Vetor. Tela, web, Figma, e qualquer editor. É o melhor arquivo para editar |
| `.png` | 4096px de largura, fundo transparente. Para quem só consegue abrir imagem |

## Peças

### Logotipo

| Arquivo | Uso |
| --- | --- |
| `nexallog-logotipo-positivo` | Lettering preto. Sobre fundo branco ou claro |
| `nexallog-logotipo-negativo` | Lettering branco sobre preto. Sobre fundo escuro |
| `nexallog-logotipo-assinatura-positivo` | Com a assinatura da marca, sobre fundo claro |
| `nexallog-logotipo-assinatura-negativo` | Com a assinatura da marca, sobre fundo escuro |

### Símbolo

| Arquivo | Uso |
| --- | --- |
| `nexallog-simbolo-x-amarelo` | Símbolo preenchido, aplicação principal |
| `nexallog-simbolo-x-preto` | Símbolo preenchido, uma cor, sobre fundo claro |
| `nexallog-simbolo-x-branco` | Símbolo preenchido, uma cor, sobre fundo escuro |
| `nexallog-simbolo-x-vazado-amarelo` | Versão de contorno, a mesma que aparece em grande escala na abertura do site |
| `nexallog-icone-aplicativo` | Símbolo sobre quadrado preto de cantos arredondados, usado como favicon e ícone de aplicativo |

## Paleta

| Cor | Hexadecimal | RGB | CMYK aproximado |
| --- | --- | --- | --- |
| Amarelo | `#E0A800` | 224, 168, 0 | 0, 25, 100, 12 |
| Preto | `#111111` | 17, 17, 17 | 0, 0, 0, 93 |
| Cinza escuro | `#333333` | 51, 51, 51 | 0, 0, 0, 80 |
| Cinza claro | `#E6E6E6` | 230, 230, 230 | 0, 0, 0, 10 |
| Branco | `#FFFFFF` | 255, 255, 255 | 0, 0, 0, 0 |

Os valores CMYK são conversão direta e servem como ponto de partida. Para
material impresso, peça à gráfica a prova de cor e ajuste o amarelo pelo
resultado físico, não pelo número.

## Tipografia

Montserrat. Bold (700) no logotipo, SemiBold (600) na assinatura, Regular (400)
em texto corrido. É uma fonte aberta, disponível no Google Fonts.

## Observação sobre os PDF

O lettering do logotipo sai como texto com a fonte embutida no arquivo, então
o PDF abre e imprime igual em qualquer computador, mesmo sem a Montserrat
instalada. Quem for editar em Illustrator ou CorelDRAW pode converter o texto
em curvas depois de abrir, se preferir trabalhar só com traçados.
