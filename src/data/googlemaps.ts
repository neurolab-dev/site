/**
 * Oferta de posicionamento no Google Maps.
 *
 * A oferta tem landing page própria, publicada à parte (projeto "4. LP Google
 * Maps", na Vercel). Este site só aponta para ela: para trocar o endereço ou o
 * texto do chamado, edite aqui. Ver GoogleMaps.astro.
 */

export const googleMaps = {
  /** Endereço público da landing page, como o visitante deve abri-lo. */
  url: "https://lp-google-maps.vercel.app/",

  etiqueta: "Google Maps",
  titulo: "Seu próximo cliente já está procurando. Ele encontra você?",
  texto:
    "Organizamos e otimizamos o Perfil da Empresa no Google para quem busca o que você vende, perto de você, chegar até o seu contato. Preparamos uma página só sobre isso.",
  botao: "Saiba mais",

  /** Três pontos que resumem o que a página detalha. Mesma linguagem da própria LP. */
  sinais: [
    "Informações corretas e atualizadas",
    "Mais confiança para quem está escolhendo",
    "Caminho mais curto até o contato",
  ],
} as const;
