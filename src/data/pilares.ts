/**
 * Os quatro pilares de serviço, conforme 01-fundamentos-de-marca.md.
 *
 * Regra de posicionamento que vale para toda a copy: o enquadramento é sempre
 * "resolvemos um problema de negócio", nunca "vendemos uma tecnologia". Por isso
 * cada pilar abre pela dor e só depois cita a ferramenta.
 */

import { mensagens } from "./contato";

export interface Pilar {
  id: string;
  nome: string;
  icone: string;
  /** A promessa do pilar, em uma frase. */
  resumo: string;
  /** O que a empresa sente antes de contratar. */
  dor: string;
  entregas: readonly string[];
  mensagemWhatsapp: string;
}

export const pilares: readonly Pilar[] = [
  {
    id: "comercial",
    nome: "Inteligência Comercial",
    icone: "alvo",
    resumo: "Transformar atenção em oportunidade qualificada.",
    dor: "A empresa aparece, gasta com anúncio, recebe contato — e mesmo assim o time comercial fica sem agenda cheia.",
    entregas: [
      "Landing pages construídas para converter",
      "Tráfego pago com meta de custo por oportunidade",
      "Funis de conversão do primeiro clique ao fechamento",
      "Geração e qualificação de leads",
    ],
    mensagemWhatsapp: mensagens.comercial,
  },
  {
    id: "operacional",
    nome: "Inteligência Operacional",
    icone: "engrenagens",
    resumo: "Tirar do time o trabalho que a máquina faz melhor.",
    dor: "Pessoas caras gastando horas copiando dados de um sistema para outro, respondendo a mesma pergunta pela vigésima vez no dia.",
    entregas: [
      "Automações de processos manuais",
      "Agentes de IA para atendimento e triagem",
      "Integração entre sistemas que hoje não conversam",
      "Rotinas de retrabalho eliminadas na raiz",
    ],
    mensagemWhatsapp: mensagens.operacional,
  },
  {
    id: "digital",
    nome: "Inteligência Digital",
    icone: "tela",
    resumo: "Presença digital que trabalha, não que só existe.",
    dor: "O site é uma vitrine parada, os dados vivem em planilhas soltas e ninguém consegue olhar para um número e decidir.",
    entregas: [
      "Sites e portais corporativos",
      "Sistemas sob medida para o processo da empresa",
      "Dashboards de acompanhamento em tempo real",
      "Rastreamento e posicionamento no Google",
    ],
    mensagemWhatsapp: mensagens.digital,
  },
  {
    id: "estrategica",
    nome: "Inteligência Estratégica",
    icone: "bussola",
    resumo: "Saber onde mexer antes de investir em ferramenta.",
    dor: "A vontade de crescer existe, o orçamento existe — falta o diagnóstico que diz qual gargalo destravar primeiro.",
    entregas: [
      "Diagnóstico de processos e gargalos",
      "Consultoria de crescimento e expansão de mercado",
      "Estruturação de dados para decisão",
      "Transformação digital com ordem de prioridade",
    ],
    mensagemWhatsapp: mensagens.estrategica,
  },
] as const;
