# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install
npm run dev             # dev server at http://localhost:4321
npm run build            # outputs to dist/
npm run preview          # serve dist/ to check the final build
npm run lint              # astro check (TypeScript + template diagnostics) — there is no test suite
npm run marca:sync    # re-sync tokens/logos from the design system (see below)
```

`dev` and `build` run `marca:sync` automatically via `predev`/`prebuild`.

To build for GitHub Pages instead of the default root-path build:

```bash
SITE_BASE=/neurolab-site/ SITE_URL=https://<user>.github.io npm run build
```

(On Windows PowerShell, set `$env:SITE_BASE` / `$env:SITE_URL` first instead of inline `VAR=val`.)

## Architecture

This is a single-page static marketing site (Astro + Tailwind + TypeScript) for NeuroLab, built directly on top of the brand design system that lives one level up at `../0. DesignSystem/`. Two things shape almost every file in this repo:

### 1. The design system is synced in, never hand-edited here

`scripts/sync-marca.mjs` copies tokens and logo assets from `../0. DesignSystem/` into this repo (`src/tokens/`, `src/assets/marca/`, `public/`). This exists because the site is its own git repository and CI (Vercel, GitHub Actions) has no access to the sibling design-system folder — the synced files are committed and become the source of truth *within this repo*, even though the sync script itself always treats the design system folder as canonical.

- **Never edit `src/tokens/tokens.css`, `src/tokens/tokens.json`, or `src/assets/marca/*`** — they're overwritten on the next sync. Change the design system instead, then run `npm run marca:sync`.
- The script also *generates* derivatives that don't exist in the design system: cropped/margined favicons, a transparent version of the neural-network icon (derived from a green-channel mask, since the source PNG has no alpha), and the Open Graph share image. These derivations are documented inline in the script and are commit-tracked, so a build without `sharp` installed still works from what's already committed.
- `tailwind.config.ts` reads `src/tokens/tokens.json` at build time and never hardcodes a color/size/spacing value — if you see a raw hex or px value outside `src/tokens/`, that's a bug, with two known/documented exceptions: the WhatsApp brand green (`#25D366`, in `WhatsappFlutuante.astro`) and the graphite `theme-color` meta tag (`#191919`, in `Base.astro` — can't reference a CSS var in a meta attribute).

### 2. Content lives in `src/data/*.ts`, never in markup

Every section component (`src/sections/*.astro`) imports its copy from a matching file in `src/data/`. To change any text — pilares, serviços, FAQ, contact info, WhatsApp message templates — edit the data file, not the `.astro` template. `src/data/contato.ts` is the single source for phone/email/address/agenda/social links, including the WhatsApp deep-link builder and the per-section pre-filled messages.

Two data files drive conditional rendering rather than static content:

- **`src/data/cases.ts`** starts as an empty array by design. `src/sections/Cases.astro` and the "Cases" link in `Header.astro` only render when the array is non-empty — there's no "coming soon" placeholder. Adding a case object makes both appear automatically.
- **`contato.temEmailReal`** (derived from whether `contato.email` still starts with the placeholder `contato@exemplo`) gates whether the email address shows in the footer and contact section.

### Design-system rules encoded in components, not just docs

These aren't arbitrary style choices — they're the brand's documented rules (`../0. DesignSystem/02-cores.md`, `05-componentes-ui.md`), and violating them is treated as a bug:

- **One solid-red primary CTA per visible fold.** `Botao.astro`'s `primario` variant is the only place solid `red-600` fill is allowed for backgrounds; everywhere else uses the *soft* pattern (`red-50` bg / `red-700` text). This is why the header CTA is `secundario` even though the hero CTA right below it is `primario`.
- **Body/link red text uses `red-700`, never `red-600`** — `red-600` (`#F50A11`) only meets WCAG contrast for large text/UI, not running text.
- **Logo minimum size is 120px wide**; below that only the isolated neural-network icon may be used, never the wordmark. `Logo.astro` throws at build time if given `largura < 120`, and its `formato="responsiva"` prop is how the header swaps to the icon-only mark on narrow screens.
- **Decorative neural-network texture (`RedeNeural.astro`) must render at 5–15% opacity** — the component throws if given a value outside that range. It's a deterministic seeded SVG generator (mulberry32 PRNG), not an image asset.
- The whole site is intentionally pinned to light mode: `<html data-theme="light">` in `Base.astro` overrides the design system's automatic `prefers-color-scheme: dark` switch (via CSS specificity — `:root[data-theme="light"]` beats `@media (prefers-color-scheme: dark) { :root {...} }`). Hero, Manifesto, and Footer are dark by explicit `bg-gray-900` (a primitive, not the semantic `bg-fundo` token), so they stay dark regardless. Removing `data-theme="light"` re-exposes a real bug: most section text uses hardcoded `gray-900`/`gray-800` for headings rather than the semantic text token, so it goes unreadable if `--color-bg` auto-flips to dark on the user's OS.

### SEO/deploy dual-target design

The site must build correctly for both Vercel (served at root) and GitHub Pages (served at a repo subpath), from the same source, controlled by two env vars read in `astro.config.mjs`:

- `SITE_BASE` — path prefix (`/` for Vercel/custom domain, `/neurolab-site/` for Pages, set by `.github/workflows/deploy.yml`)
- `SITE_URL` — canonical origin

Because `Astro.site` does **not** include the `base` prefix, any code building an absolute URL for SEO purposes (canonical link, Open Graph image, JSON-LD `logo`/`image`/`url`) must manually compose `origin + base + path` — see the comments in `Base.astro` around `asset()` and `dadosEstruturados()`. This was a real bug fixed once already (JSON-LD/OG image pointed to `https://host/marca/og.png` instead of `https://host/neurolab-site/marca/og.png` under the Pages base); don't reintroduce it by using `new URL(path, Astro.site)` directly for any public-facing asset URL.

The contact form (`src/sections/Contato.astro`) posts JSON to `PUBLIC_N8N_WEBHOOK_URL`. If that env var is unset, the form is not rendered at all — a fallback WhatsApp CTA shows instead, so a missing webhook never results in silently-lost leads. `PUBLIC_GA_ID`, `PUBLIC_GTM_ID`, and `PUBLIC_SEARCH_CONSOLE` are similarly all-or-nothing: unset means the corresponding script/meta tag is omitted entirely, not emitted empty. See `.env.example` for the full list.

## Known constraint (not a bug)

The logo currently uses the "Sergio Trendy" font, which is personal-use-only licensed — a known, accepted risk, tracked in `docs/pendencias.md`. Don't "fix" this unprompted (e.g. by swapping fonts or altering the logo assets); it's a deliberate business decision, not an oversight.
