import type { APIRoute } from "astro";

/**
 * robots.txt gerado em build em vez de escrito à mão em public/.
 *
 * O motivo é a URL do sitemap: ela muda conforme o destino (Vercel, GitHub Pages,
 * domínio próprio). Um arquivo estático apontaria para o endereço errado assim
 * que a hospedagem mudasse — e um sitemap inacessível é um erro que o Search
 * Console reclama mas ninguém vê.
 */
export const GET: APIRoute = ({ site }) => {
  const sitemap = new URL("sitemap-index.xml", site).href;

  return new Response(
    `User-agent: *\nAllow: /\n\nSitemap: ${sitemap}\n`,
    { headers: { "Content-Type": "text/plain; charset=utf-8" } }
  );
};
