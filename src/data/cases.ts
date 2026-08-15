/**
 * Cases e depoimentos.
 *
 * A seção está construída e ligada. Enquanto este array estiver vazio, nem a
 * seção nem o link "Cases" do menu são renderizados — o HTML gerado simplesmente
 * não os contém. Sem espaço em branco, sem "em breve".
 *
 * Para publicar um case, basta acrescentar um objeto aqui.
 *
 * O que vale a pena coletar:
 *
 *   - `resultado` é o campo que sustenta o posicionamento da marca. Precisa de
 *     número e recorte de tempo — "reduziu 6h/semana de trabalho manual",
 *     "3× mais oportunidades qualificadas em 90 dias". Case sem número vira
 *     depoimento genérico e não convence ninguém.
 *
 *   - `depoimento` com nome e cargo exige autorização por escrito do cliente.
 *     Sem autorização, publique o case sem o depoimento — ou anonimize o
 *     cliente ("rede de clínicas em Palmas") e mantenha só o resultado.
 *
 *   - `imagem` é opcional. Se usar, coloque o arquivo em `public/cases/` e
 *     informe o caminho relativo. Prefira captura de dashboard, automação ou
 *     interface a foto posada de banco de imagens — regra de estilo fotográfico
 *     de 04-logo-e-elementos-graficos.md.
 */

export interface Case {
  /** Nome do cliente, ou descrição anonimizada se não houver autorização. */
  cliente: string;
  segmento: string;
  /** A situação antes: o problema de negócio, não a tecnologia faltante. */
  desafio: string;
  /** O que foi feito, em uma ou duas frases. */
  solucao: string;
  /** O resultado, com número e recorte de tempo. */
  resultado: string;
  depoimento?: string;
  autor?: string;
  cargo?: string;
  /** Caminho a partir de public/, ex.: "cases/dashboard-cliente.png". */
  imagem?: string;
}

export const cases: readonly Case[] = [];
