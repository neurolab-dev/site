/**
 * Serviços concretos, agrupados pelos pilares de pilares.ts.
 *
 * Os pilares dizem que problema a NeuroLab resolve. Esta lista existe para quem
 * chega procurando pelo nome do serviço ("automação n8n", "tráfego pago") e
 * precisa se reconhecer na página em dois segundos.
 */

export interface Servico {
  nome: string;
  descricao: string;
  pilar: "comercial" | "operacional" | "digital" | "estrategica";
  icone: string;
}

export const servicos: readonly Servico[] = [
  {
    nome: "Sites e landing pages",
    descricao:
      "Páginas rápidas, responsivas e escritas para converter — não apenas para ficar bonitas no portfólio.",
    pilar: "digital",
    icone: "tela",
  },
  {
    nome: "Posicionamento no Google",
    descricao:
      "SEO técnico, conteúdo e ficha do Google Business para a empresa ser encontrada por quem já está procurando.",
    pilar: "digital",
    icone: "busca",
  },
  {
    nome: "Rastreamento e medição",
    descricao:
      "GA4, Tag Manager e eventos de conversão configurados para você saber de onde veio cada oportunidade.",
    pilar: "comercial",
    icone: "grafico",
  },
  {
    nome: "Tráfego pago",
    descricao:
      "Campanhas no Google e Meta com controle de custo por oportunidade, não de curtida.",
    pilar: "comercial",
    icone: "alvo",
  },
  {
    nome: "Automações",
    descricao:
      "Fluxos automatizados que conectam seus sistemas e devolvem horas de trabalho manual para a equipe.",
    pilar: "operacional",
    icone: "engrenagens",
  },
  {
    nome: "Agentes de IA",
    descricao:
      "Atendimento, triagem e qualificação com inteligência artificial — no WhatsApp e onde mais o cliente estiver.",
    pilar: "operacional",
    icone: "cerebro",
  },
  {
    nome: "Integração de sistemas",
    descricao:
      "APIs, CRM e ERP conversando entre si. O dado é digitado uma vez e chega íntegro em todo lugar.",
    pilar: "operacional",
    icone: "conexao",
  },
  {
    nome: "Dados e inteligência de negócio",
    descricao:
      "Coleta, organização e dashboards que transformam planilha solta em decisão fundamentada.",
    pilar: "digital",
    icone: "banco-dados",
  },
  {
    nome: "Design system e identidade",
    descricao:
      "O mesmo sistema de marca que sustenta este site, aplicado à sua empresa — cores, tipografia e componentes documentados.",
    pilar: "estrategica",
    icone: "camadas",
  },
  {
    nome: "Gestão de presença online",
    descricao:
      "Site, redes e canais de contato mantidos vivos e coerentes, com acompanhamento de resultado.",
    pilar: "comercial",
    icone: "megafone",
  },
  {
    nome: "Diagnóstico e consultoria",
    descricao:
      "Mapeamento dos gargalos do negócio e um plano com ordem de prioridade — antes de qualquer investimento em ferramenta.",
    pilar: "estrategica",
    icone: "bussola",
  },
  {
    nome: "Expansão de mercado",
    descricao:
      "Estruturação para atender novas praças, novos públicos e novos canais de venda sem quebrar a operação.",
    pilar: "estrategica",
    icone: "crescimento",
  },
] as const;
