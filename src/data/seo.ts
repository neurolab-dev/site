/**
 * Metadados de SEO e compartilhamento.
 *
 * O site é a vitrine da própria oferta de posicionamento no Google, então isto
 * não é acessório: é parte do produto sendo demonstrado.
 */

import { contato } from "./contato";

export const seo = {
  /** Até ~60 caracteres — acima disso o Google corta no resultado de busca. */
  titulo: "NeuroLab — Soluções Inteligentes para Negócios",

  /** Entre 120 e 158 caracteres. Precisa dar vontade de clicar, não só descrever. */
  descricao:
    "Automação, inteligência artificial, sites e estratégia para empresas que querem crescer com processo, não com achismo. Diagnóstico gratuito.",

  /** Usado no cabeçalho da página e como fallback de compartilhamento. */
  tituloOg: "NeuroLab — Transformamos inteligência em resultados",

  /** Caminho a partir de public/. Gerado por scripts/sync-marca.mjs. */
  imagemOg: "marca/og.png",
  imagemOgLargura: 1200,
  imagemOgAltura: 630,

  idioma: "pt-BR",
  locale: "pt_BR",

  /**
   * Área de atuação declarada no JSON-LD. Atendimento é remoto para todo o
   * Brasil, com presença física em Palmas/TO.
   */
  areaAtendimento: "Brasil",
  fundacao: "2024",
} as const;

/**
 * Variáveis de ambiente. Todas opcionais: se estiverem vazias, nada é injetado
 * na página — nenhum script de terceiro entra sem configuração explícita.
 *
 * Definir em `.env` (local) ou nas variáveis do projeto na Vercel / secrets do
 * GitHub Actions. Ver `.env.example`.
 */
export const ambiente = {
  /** Ex.: G-XXXXXXXXXX */
  ga: import.meta.env.PUBLIC_GA_ID ?? "",
  /** Ex.: GTM-XXXXXXX */
  gtm: import.meta.env.PUBLIC_GTM_ID ?? "",
  /** Conteúdo da meta tag de verificação do Google Search Console. */
  searchConsole: import.meta.env.PUBLIC_SEARCH_CONSOLE ?? "",
  /** Webhook do n8n que recebe os leads do formulário. */
  webhook: import.meta.env.PUBLIC_N8N_WEBHOOK_URL ?? "",
} as const;

/**
 * JSON-LD de organização — é o que permite ao Google entender que existe uma
 * empresa real por trás do site, com CNPJ, telefone e endereço.
 *
 * `urlSite` e `urlImagem` precisam vir já resolvidas com o prefixo de caminho
 * (`import.meta.env.BASE_URL`) incluído — no GitHub Pages ele é
 * `/neurolab-site/`, e montar a URL sem isso aqui geraria um link de imagem
 * quebrado. Ver Base.astro, que é quem resolve e chama esta função.
 */
export function dadosEstruturados(urlSite: string, urlImagem: string) {
  const perfis = [contato.instagram, contato.linkedin].filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: contato.razaoSocial,
    alternateName: `${contato.razaoSocial} — ${contato.assinatura}`,
    description: seo.descricao,
    slogan: contato.slogan,
    url: urlSite,
    // A logo do JSON-LD precisa de um arquivo com URL estável em public/ — as
    // versões em src/assets/marca/ passam pelo otimizador do Astro e ganham
    // nome com hash a cada build, o que quebraria este link a cada deploy.
    // A imagem de Open Graph (logo branca sobre grafite) cobre o mesmo papel.
    logo: urlImagem,
    image: urlImagem,
    taxID: contato.cnpj,
    telephone: contato.telefoneE164,
    foundingDate: seo.fundacao,
    address: {
      "@type": "PostalAddress",
      addressLocality: contato.cidade,
      addressRegion: contato.estado,
      addressCountry: contato.pais,
    },
    areaServed: { "@type": "Country", name: seo.areaAtendimento },
    ...(perfis.length ? { sameAs: perfis } : {}),
    knowsAbout: [
      "Automação de processos",
      "Inteligência artificial aplicada a negócios",
      "Desenvolvimento de sites e sistemas",
      "Tráfego pago e geração de leads",
      "Posicionamento no Google",
      "Inteligência de dados e dashboards",
    ],
  };
}
