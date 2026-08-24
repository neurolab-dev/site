/**
 * Portfólio de sites entregues.
 *
 * Diferente de `cases.ts` — que guarda resultado de negócio com número e
 * depoimento autorizado por escrito — esta lista é só a vitrine: projetos reais
 * no ar que o visitante pode abrir e navegar antes de decidir conversar. Sem
 * métrica, sem citação, sem autorização a coletar.
 *
 * Segue a mesma convenção de `cases.ts`: com o array vazio, nem a seção nem o
 * link "Portfólio" do menu são renderizados. Ver Portfolio.astro e Header.astro.
 */

export interface ProjetoPortfolio {
  nome: string;
  categoria: string;
  /** O que o site faz e para quem, em uma frase. */
  descricao: string;
  url: string;
}

export const portfolio: readonly ProjetoPortfolio[] = [
  {
    nome: "AMBTO",
    categoria: "Institucional",
    descricao:
      "Site institucional da Associação dos Engenheiros Ambientais do Estado do Tocantins, com apresentação da entidade, benefícios de associado e notícias.",
    url: "https://ambto.org.br/index.html",
  },
  {
    nome: "Tainá Batista",
    categoria: "Link na bio",
    descricao:
      "Página de links para o Instagram de uma enfermeira esteta em Palmas (TO), reunindo serviços e contato num só lugar.",
    url: "https://tainabatista.github.io/link-bio-instagram/",
  },
  {
    nome: "Lobuloplastia sem cirurgia",
    categoria: "Landing page",
    descricao:
      "Página de conversão para reconstrução não cirúrgica do lóbulo da orelha com jato de plasma.",
    url: "https://tainabatista.github.io/lp-lobuloplastia/",
  },
  {
    nome: "Furo de orelha — adulto",
    categoria: "Landing page",
    descricao:
      "Página de conversão para piercing auricular em adultos, com agulha estéril e joia de titânio grau implante.",
    url: "https://tainabatista.github.io/lp-furoadulto/",
  },
  {
    nome: "Furo de orelha — bebê",
    categoria: "Landing page",
    descricao:
      "Página de conversão para furo de orelha humanizado em bebês, com técnica de alívio de dor e materiais hipoalergênicos.",
    url: "https://tainabatista.github.io/lp-furobebe/",
  },
  {
    nome: "Dra. Nathália Rocha",
    categoria: "Landing page",
    descricao:
      "Página de captação de pacientes para consultório médico especializado em obesidade, emagrecimento e saúde metabólica.",
    url: "https://dranathaliarocha.github.io/lp-dranathaliarocha/",
  },
];
