/**
 * O método — os quatro verbos da proposta de valor da marca:
 * "Estudamos, criamos, testamos e implementamos soluções inteligentes."
 *
 * Está aqui porque é o que sustenta o posicionamento de laboratório em vez de
 * agência: existe um processo, e ele começa por estudar o negócio.
 */

export interface Etapa {
  numero: string;
  verbo: string;
  titulo: string;
  descricao: string;
}

export const metodo: readonly Etapa[] = [
  {
    numero: "01",
    verbo: "Estudamos",
    titulo: "Diagnóstico do negócio",
    descricao:
      "Antes de propor qualquer ferramenta, mapeamos o processo real da empresa e onde o resultado está travando. Sem diagnóstico, toda solução é chute caro.",
  },
  {
    numero: "02",
    verbo: "Criamos",
    titulo: "Desenho da solução",
    descricao:
      "Com o gargalo identificado, desenhamos a solução sob medida — e apresentamos o que ela deve mudar em número, prazo e esforço do time.",
  },
  {
    numero: "03",
    verbo: "Testamos",
    titulo: "Validação antes da escala",
    descricao:
      "Colocamos em operação num recorte controlado. O que funciona segue, o que não funciona é corrigido antes de virar custo fixo.",
  },
  {
    numero: "04",
    verbo: "Implementamos",
    titulo: "Operação e acompanhamento",
    descricao:
      "Solução implantada, time treinado e indicadores no ar. A entrega termina quando a empresa consegue tocar aquilo sem depender de nós.",
  },
] as const;
