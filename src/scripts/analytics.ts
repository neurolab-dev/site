/**
 * Google Analytics com consentimento (LGPD).
 *
 * O gtag.js só é baixado depois que o visitante permite. Antes disso nenhuma
 * requisição vai para o Google e nenhum cookie é gravado — é o modo "básico" do
 * Consent Mode, o mais conservador. A escolha fica no localStorage do próprio
 * visitante; quem recusa não é perguntado de novo até reabrir as preferências
 * pelo rodapé.
 *
 * `rastrear()` é a única porta de saída de eventos: sem consentimento, não faz
 * nada. Assim nenhum componente precisa saber se o Analytics está ativo.
 */

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...argumentos: unknown[]) => void;
  }
}

type Escolha = "aceito" | "recusado";

const ID = import.meta.env.PUBLIC_GA_ID;
const CHAVE = "neurolab:consentimento";

let carregado = false;
let ativo = false;

window.dataLayer = window.dataLayer || [];
window.gtag = function gtag() {
  // gtag.js espera o objeto `arguments`, não um array.
  // eslint-disable-next-line prefer-rest-params
  window.dataLayer.push(arguments);
};

// Tudo negado por padrão. Anúncios ficam negados para sempre: o site não usa.
window.gtag("consent", "default", {
  analytics_storage: "denied",
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
});

export function lerEscolha(): Escolha | null {
  try {
    const valor = localStorage.getItem(CHAVE);
    return valor === "aceito" || valor === "recusado" ? valor : null;
  } catch {
    return null;
  }
}

function salvarEscolha(escolha: Escolha) {
  try {
    localStorage.setItem(CHAVE, escolha);
  } catch {
    // Navegação privada ou armazenamento bloqueado: a escolha vale só para esta visita.
  }
}

export function ativarAnalytics() {
  if (!ID) return;
  ativo = true;
  window.gtag("consent", "update", { analytics_storage: "granted" });
  if (carregado) return;

  carregado = true;
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${ID}`;
  document.head.appendChild(script);
  window.gtag("js", new Date());
  window.gtag("config", ID);
}

/** Apaga os cookies _ga* em todos os domínios onde o GA pode tê-los gravado. */
function apagarCookiesDoAnalytics() {
  const partes = location.hostname.split(".");
  const dominios = [""];
  for (let i = 0; i < partes.length - 1; i++) dominios.push(`; domain=.${partes.slice(i).join(".")}`);

  document.cookie.split(";").forEach((cookie) => {
    const nome = cookie.split("=")[0]?.trim();
    if (!nome?.startsWith("_ga")) return;
    dominios.forEach((dominio) => {
      document.cookie = `${nome}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/${dominio}`;
    });
  });
}

export function registrarEscolha(escolha: Escolha) {
  salvarEscolha(escolha);
  if (escolha === "aceito") {
    ativarAnalytics();
    return;
  }
  ativo = false;
  window.gtag("consent", "update", { analytics_storage: "denied" });
  apagarCookiesDoAnalytics();
}

export function rastrear(evento: string, parametros: Record<string, string> = {}) {
  if (ativo) window.gtag("event", evento, parametros);
}

/** Em que parte da página o elemento está — vira o parâmetro `secao` dos eventos. */
function secaoDe(elemento: Element): string {
  if (elemento.closest("#whatsapp-flutuante")) return "flutuante";
  if (elemento.closest("body > header")) return "cabecalho";
  if (elemento.closest("footer")) return "rodape";
  return elemento.closest("section[id]")?.id ?? "outro";
}

/**
 * Um único listener para a página toda: qualquer link de WhatsApp ou da agenda,
 * presente ou futuro, é medido sem precisar marcar cada um no markup.
 */
export function medirCliquesDeContato(urlAgenda: string) {
  document.addEventListener("click", (evento) => {
    const link = (evento.target as Element | null)?.closest<HTMLAnchorElement>("a[href]");
    if (!link) return;

    if (link.href.startsWith("https://wa.me/")) {
      rastrear("clique_whatsapp", { secao: secaoDe(link) });
    } else if (urlAgenda && link.href.startsWith(urlAgenda)) {
      rastrear("clique_agenda", { secao: secaoDe(link) });
    }
  });
}
