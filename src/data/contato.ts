/**
 * Dados de contato e canais de conversão.
 *
 * Este é o único arquivo que precisa ser editado para trocar telefone, e-mail,
 * agenda ou redes sociais. Nada disso aparece escrito no markup.
 */

export const contato = {
  razaoSocial: "NeuroLab",
  assinatura: "Soluções Inteligentes para Negócios",
  slogan: "Transformamos inteligência em resultados.",

  /** Só dígitos, com código do país — é o formato que o wa.me exige. */
  whatsappNumero: "5538991810452",
  whatsappExibicao: "(38) 99181-0452",
  telefoneE164: "+5538991810452",

  email: "neurolab.dev@gmail.com",

  cidade: "Palmas",
  estado: "TO",
  pais: "BR",
  cnpj: "24.580.667/0001-79",

  /**
   * Link curto de compartilhamento do Google Agenda. Para trocar o botão por um
   * calendário embutido na página, é preciso a URL longa de incorporação
   * (Google Agenda → Compartilhar → Incorporar). Ver docs/pendencias.md.
   */
  agenda: "https://calendar.app.google/u4vNBgLJsGyxzXz19",

  /** Perfil ainda não criado. Enquanto vazio, o ícone não é renderizado. */
  instagram: "",
  linkedin: "",
} as const;

/** O e-mail só vai para o ar quando deixar de ser placeholder. */
export const temEmailReal = !contato.email.startsWith("contato@exemplo");

/**
 * Monta o link do WhatsApp com a mensagem já escrita.
 *
 * O texto muda conforme a seção de origem — isso dá rastreabilidade de qual
 * parte da página gerou a conversa, sem depender de analytics.
 */
export function linkWhatsapp(mensagem: string): string {
  return `https://wa.me/${contato.whatsappNumero}?text=${encodeURIComponent(mensagem)}`;
}

/** Mensagens por ponto de partida. Manter curtas — quem envia é o visitante. */
export const mensagens = {
  geral: "Olá! Vim pelo site da NeuroLab e quero entender como vocês podem ajudar minha empresa.",
  hero: "Olá! Vim pelo site da NeuroLab e quero agendar um diagnóstico.",
  comercial: "Olá! Vim pelo site e quero falar sobre gerar mais oportunidades comerciais.",
  operacional: "Olá! Vim pelo site e quero falar sobre automatizar processos da minha empresa.",
  digital: "Olá! Vim pelo site e quero falar sobre site, sistema ou dashboard.",
  estrategica: "Olá! Vim pelo site e quero falar sobre diagnóstico e estratégia de crescimento.",
  flutuante: "Olá! Vim pelo site da NeuroLab.",
} as const;
