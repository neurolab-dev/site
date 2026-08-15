/**
 * Perguntas frequentes.
 *
 * Além de tirar dúvida, esta seção existe para SEO: cada pergunta vira um bloco
 * de conteúdo indexável e alimenta o rich result de FAQ do Google (o JSON-LD é
 * montado a partir daqui, em Base.astro).
 *
 * Regra: resposta curta e direta, no tom da marca. Nada de resposta que enrola
 * para não falar de preço — é melhor dizer como o preço é formado.
 */

export interface Pergunta {
  pergunta: string;
  resposta: string;
}

export const faq: readonly Pergunta[] = [
  {
    pergunta: "A NeuroLab é uma agência de marketing?",
    resposta:
      "Não. Somos uma empresa de soluções inteligentes para negócios. Marketing é uma das frentes, ao lado de automação, inteligência artificial, desenvolvimento e consultoria. A pergunta que fazemos primeiro é qual problema do negócio precisa ser resolvido — a ferramenta vem depois.",
  },
  {
    pergunta: "O que é o diagnóstico e quanto custa?",
    resposta:
      "É uma conversa estruturada sobre o processo da sua empresa, onde o resultado está travando e o que dá para destravar primeiro. Não tem custo e não obriga a nada: no fim você sai com uma leitura clara da situação, tendo contratado ou não.",
  },
  {
    pergunta: "Quanto custa um projeto?",
    resposta:
      "Depende do escopo, e por isso o preço só é apresentado depois do diagnóstico. O que podemos adiantar é como ele é formado: projetos pontuais têm valor fechado por entrega; operação contínua (tráfego, automações, presença online) trabalha com mensalidade proporcional ao escopo.",
  },
  {
    pergunta: "Qual o prazo de entrega?",
    resposta:
      "Uma landing page fica pronta em 1 a 2 semanas. Automações e agentes de IA, de 2 a 6 semanas conforme os sistemas envolvidos. Sistemas e portais sob medida são projetos maiores, com cronograma definido no diagnóstico.",
  },
  {
    pergunta: "Atendem empresas de fora de Palmas?",
    resposta:
      "Sim. O trabalho é remoto e atendemos empresas em todo o Brasil. Em Palmas e região também fazemos encontros presenciais quando o projeto pede.",
  },
  {
    pergunta: "Trabalham com empresa pequena?",
    resposta:
      "Sim. O critério não é o tamanho, é ter um problema que a tecnologia resolve. Um negócio local com um processo manual travando o crescimento é exatamente o tipo de caso em que a automação paga o próprio custo rápido.",
  },
  {
    pergunta: "E depois que o projeto termina, fico dependente de vocês?",
    resposta:
      "Não. Entregamos a documentação do que foi feito e, sempre que previsto no escopo, a equipe treinada. Manter o acompanhamento conosco é uma escolha, nunca uma amarra técnica.",
  },
] as const;
