import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import type { Config } from "tailwindcss";

// Única fonte da verdade: src/tokens/tokens.json, sincronizado do design system
// por scripts/sync-marca.mjs. NUNCA escrever um hexadecimal, tamanho de fonte ou
// medida de espaçamento neste arquivo — só ler do token.
const __dirname = dirname(fileURLToPath(import.meta.url));
const tokens = JSON.parse(
  readFileSync(resolve(__dirname, "src/tokens/tokens.json"), "utf-8")
) as Tokens;

type Escala = Record<string, string>;
interface Tokens {
  color: Record<string, Escala>;
  typography: { size: Escala; weight: Record<string, number>; fontFamily: Record<string, string> };
  space: Escala;
  radius: Escala;
  shadow: Escala;
  focusRing: Escala;
  zIndex: Record<string, number>;
}

// O arquivo de tokens carrega chaves de documentação (`_comment`, `$description`,
// `_gerado`). Elas não são valores — precisam sair antes de virar utilitário CSS.
const limpar = <T,>(obj: Record<string, T>): Record<string, T> =>
  Object.fromEntries(Object.entries(obj).filter(([k]) => !k.startsWith("_") && !k.startsWith("$")));

// Cores semânticas apontam para as custom properties de tokens.css, não para o
// valor literal — é isso que faz o modo escuro do design system funcionar sozinho,
// sem uma única variante `dark:` espalhada pelo markup.
const semantico = (nome: string) => `var(--color-${nome})`;

export default {
  content: ["./src/**/*.{astro,ts,tsx,md,mdx}"],
  darkMode: "media",
  theme: {
    extend: {
      colors: {
        // primitivos — rampas oficiais da marca
        red: limpar(tokens.color.red),
        gray: limpar(tokens.color.gray),
        success: limpar(tokens.color.success),
        warning: limpar(tokens.color.warning),
        info: limpar(tokens.color.info),
        danger: limpar(tokens.color.danger),
        // semânticos — trocam sozinhos entre tema claro e escuro
        fundo: semantico("bg"),
        "fundo-sutil": semantico("bg-subtle"),
        superficie: semantico("surface"),
        borda: semantico("border"),
        "borda-forte": semantico("border-strong"),
        texto: semantico("text"),
        "texto-secundario": semantico("text-secondary"),
        "texto-inverso": semantico("text-inverse"),
        marca: semantico("brand"),
        "marca-hover": semantico("brand-hover"),
        "marca-ativo": semantico("brand-active"),
        "marca-texto": semantico("brand-text"),
      },
      fontFamily: {
        // A fonte do logotipo (Sergio Trendy) é deliberadamente omitida: ela é
        // exclusiva de artwork da marca e nunca entra em UI. Ver 03-tipografia.md.
        sans: ["'Montserrat Variable'", ...tokens.typography.fontFamily.institutional.split(", ")],
      },
      fontSize: limpar(tokens.typography.size),
      fontWeight: Object.fromEntries(
        Object.entries(tokens.typography.weight).map(([k, v]) => [k, String(v)])
      ),
      spacing: limpar(tokens.space),
      borderRadius: limpar(tokens.radius),
      boxShadow: {
        ...limpar(tokens.shadow),
        foco: tokens.focusRing.default,
        "foco-inverso": tokens.focusRing.inverse,
      },
      zIndex: Object.fromEntries(Object.entries(tokens.zIndex).map(([k, v]) => [k, String(v)])),
      maxWidth: {
        conteudo: "72rem",
        leitura: "44rem",
      },
      transitionDuration: {
        rapida: "150ms",
        media: "250ms",
      },
    },
  },
  plugins: [],
} satisfies Config;
