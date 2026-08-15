/**
 * A seção de problema — abre a conversa pela dor, não pela ferramenta.
 *
 * Cada item precisa ser reconhecível em uma leitura: o visitante tem que pensar
 * "isso é a minha empresa". Sem jargão, sem nome de tecnologia.
 */

export interface Problema {
  titulo: string;
  descricao: string;
  icone: string;
}

export const problemas: readonly Problema[] = [
  {
    titulo: "O time gasta o dia em trabalho manual",
    descricao:
      "Copiar dados entre sistemas, preencher planilha, responder a mesma pergunta pela vigésima vez. Trabalho que consome gente boa e não gera nada.",
    icone: "relogio",
  },
  {
    titulo: "O site existe, mas não gera oportunidade",
    descricao:
      "Está no ar, ninguém encontra. Ou encontra e não entende o que a empresa faz. Uma vitrine parada, não um canal de venda.",
    icone: "tela",
  },
  {
    titulo: "Os dados existem, mas ninguém decide com eles",
    descricao:
      "A informação está espalhada em planilhas, no WhatsApp e na cabeça de algumas pessoas. Na hora de decidir, usa-se o achismo.",
    icone: "banco-dados",
  },
  {
    titulo: "Cada ferramenta nova vira mais um problema",
    descricao:
      "Compraram o sistema, contrataram a agência, assinaram a plataforma. Nada conversa entre si e a operação ficou mais complicada, não menos.",
    icone: "alerta",
  },
] as const;
