import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

// O mesmo código serve Vercel e GitHub Pages sem edição manual:
//
//   SITE_BASE   prefixo de caminho. "/" na Vercel e em domínio próprio.
//               O workflow do Pages exporta "/neurolab-site/".
//   SITE_URL    URL canônica — entra em canonical, Open Graph, sitemap e JSON-LD.
//               Trocar aqui quando o domínio próprio for adquirido.
//
// Ver README.md → "Publicação".
const SITE_BASE = process.env.SITE_BASE || "/";
const SITE_URL = process.env.SITE_URL || "https://neurolab.com.br";

export default defineConfig({
  site: SITE_URL,
  base: SITE_BASE,
  trailingSlash: "ignore",
  integrations: [tailwind({ applyBaseStyles: false }), sitemap()],
  build: {
    inlineStylesheets: "auto",
  },
});
