# Site NeuroLab

Landing institucional da NeuroLab — página única, estática, construída sobre o
[design system da marca](<../0. DesignSystem/README.md>).

Astro + Tailwind + TypeScript. Sai HTML pronto do build: o visitante e o robô do
Google recebem a página montada, sem esperar JavaScript desenhar nada. O único
JS que vai para o navegador é o menu de telas estreitas, o envio do formulário e
o botão flutuante de WhatsApp — poucos KB, sem biblioteca.

## Começando

```bash
npm install
cp .env.example .env    # preencha o que já existir; tudo é opcional
npm run dev             # http://localhost:4321
```

| Comando | O que faz |
|---|---|
| `npm run dev` | Servidor de desenvolvimento, com recarga automática |
| `npm run build` | Gera o site em `dist/` |
| `npm run preview` | Serve o `dist/` para conferir o resultado final |
| `npm run lint` | Checagem de tipos e de templates Astro |
| `npm run marca:sync` | Traz tokens e logos do design system |

`dev` e `build` rodam o `marca:sync` sozinhos antes de começar.

## Onde mexer

**Para trocar texto, você nunca precisa abrir um arquivo `.astro`.** Todo o
conteúdo editável está em `src/data/`:

| Arquivo | Conteúdo |
|---|---|
| `contato.ts` | WhatsApp, e-mail, endereço, CNPJ, agenda, redes sociais e as mensagens pré-escritas do WhatsApp |
| `pilares.ts` | Os quatro pilares de serviço |
| `servicos.ts` | A grade de serviços concretos |
| `problemas.ts` | As dores da seção de abertura |
| `metodo.ts` | As quatro etapas do método |
| `faq.ts` | Perguntas frequentes (alimentam também o rich result do Google) |
| `cases.ts` | Cases e depoimentos — vazio por enquanto |
| `seo.ts` | Título, descrição, Open Graph e dados estruturados |

O resto:

```
src/
├── pages/index.astro       a landing, montando as seções na ordem
├── pages/robots.txt.ts     robots.txt gerado em build (a URL do sitemap muda por ambiente)
├── layouts/Base.astro      <head>, SEO, JSON-LD, fontes, analytics
├── sections/               uma seção da página por arquivo
├── components/             Logo, Botao, Card, Badge, Icone, RedeNeural, WhatsappFlutuante
├── styles/global.css       camada base + utilitários próprios
├── tokens/                 SINCRONIZADO — não editar aqui
└── assets/marca/           SINCRONIZADO — não editar aqui
```

## Design system

`scripts/sync-marca.mjs` copia tokens e logos de `../0. DesignSystem` para dentro
deste projeto. Isso existe porque o site é um repositório próprio: no CI da
Vercel e do GitHub Actions a pasta do design system não está lá, então os
arquivos de marca precisam estar commitados aqui.

**Nunca edite `src/tokens/` nem `src/assets/marca/`.** A fonte da verdade é o
design system; qualquer mudança se faz lá e volta com `npm run marca:sync`.

`tailwind.config.ts` lê `src/tokens/tokens.json` em tempo de build e não redeclara
nenhum valor. Na prática: se um hexadecimal aparecer escrito à mão em algum lugar
do `src/`, é bug.

As classes de cor seguem duas famílias:

- **Primitivas** (`red-600`, `gray-900`) — valor fixo, não muda com o tema. Use
  onde a cor é uma decisão de composição, como o grafite do hero.
- **Semânticas** (`bg-fundo`, `text-texto`, `border-borda`, `text-marca-texto`) —
  apontam para as custom properties de `tokens.css` e trocam sozinhas entre tema
  claro e escuro. É a família padrão.

Três regras que o design system trata como não negociáveis, e que valem para
qualquer alteração futura:

1. **70-20-10** — 70% claro, 20% grafite, 10% vermelho. Vermelho sólido só em CTA
   primário, nunca como fundo de seção.
2. **Um CTA primário por dobra visível.** É por isso que o botão do cabeçalho é
   secundário: o primário da primeira tela é o do hero.
3. **Texto vermelho corrido usa `red-700`**, não `red-600` — o vermelho oficial
   tem contraste 4.26:1 sobre branco e não passa no mínimo de 4.5:1 para texto
   normal.

## Publicação

O mesmo código serve os dois destinos, por variável de ambiente:

| Variável | Vercel / domínio próprio | GitHub Pages |
|---|---|---|
| `SITE_BASE` | `/` (padrão) | `/neurolab-site/` |
| `SITE_URL` | URL final do site | URL final do site |

Todo caminho de asset passa por `import.meta.env.BASE_URL` — nenhum é escrito
cravado no markup, que é o que quebraria no Pages.

**Vercel** — importe o repositório; o `vercel.json` já define build, saída e
cache. Cadastre as variáveis `PUBLIC_*` em Settings → Environment Variables.

**GitHub Pages** — `.github/workflows/deploy.yml` publica a cada push na `main`.
Ative em Settings → Pages → Source: GitHub Actions. As variáveis opcionais ficam
em Settings → Secrets and variables → Actions → Variables.

**Quando o domínio próprio chegar**: troque `SITE_URL`; na Vercel aponte o DNS e
está feito; no Pages, adicione `public/CNAME` com o domínio e volte `SITE_BASE`
para `/` no workflow. Vale registrar o domínio **antes** de divulgar o site em
qualquer lugar — trocar de URL depois de indexado custa autoridade no Google.

## Variáveis de ambiente

Todas opcionais. Sem valor, o recurso não é ativado e nenhum script de terceiro
entra na página. Ver `.env.example`.

| Variável | Para quê |
|---|---|
| `PUBLIC_N8N_WEBHOOK_URL` | Destino dos leads do formulário. Sem ela, o formulário não é renderizado e o bloco de contato cai para o WhatsApp |
| `PUBLIC_GA_ID` | Google Analytics 4 |
| `PUBLIC_GTM_ID` | Google Tag Manager |
| `PUBLIC_SEARCH_CONSOLE` | Meta tag de verificação do Search Console |

`PUBLIC_` é exigido pelo Astro para variáveis que chegam ao navegador — o que
significa que elas vão para o HTML final. **Não coloque segredo nenhum ali.**

## Pendências

O que ainda falta — incluindo a pendência de licença da fonte do logotipo, que é
um risco assumido conscientemente — está em [docs/pendencias.md](docs/pendencias.md).
