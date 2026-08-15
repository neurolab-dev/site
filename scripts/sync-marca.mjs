#!/usr/bin/env node
/**
 * sync-marca.mjs — traz tokens e logos do design system para dentro do site.
 *
 * Por que existe: o site é um repositório Git próprio e no CI (GitHub Actions,
 * Vercel) não existe "../0. DesignSystem". Então os arquivos de marca são
 * copiados para dentro do repositório e commitados. Este script é o único
 * caminho legítimo para atualizá-los.
 *
 * Roda sozinho em `predev` e `prebuild`. Também dá para chamar direto:
 *     npm run marca:sync
 *
 * Regras:
 *   - Idempotente. Só reescreve o que mudou (compara mtime).
 *   - Nunca edita nada dentro do design system — leitura apenas.
 *   - Se o design system não estiver no caminho esperado, avisa e sai sem
 *     erro quando as cópias anteriores já existem (caso do CI), e falha
 *     quando não existem (caso de um clone novo sem a pasta da marca).
 */

import { existsSync, statSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const raiz = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const designSystem = resolve(raiz, "../0. DesignSystem");
const logos = join(designSystem, "0. Logo/Arte Final");

const AVISO = "GERADO POR scripts/sync-marca.mjs — NÃO EDITAR AQUI";
const ORIGEM = "Fonte da verdade: 0. BrandOS/0. DesignSystem/";

/**
 * Assets de marca, com o destino de cada um.
 *
 * As logos vão para `src/assets/` — de lá o Astro as processa (redimensiona,
 * converte para WebP, gera o `srcset` e crava width/height no HTML para não
 * haver deslocamento de layout). Se ficassem em `public/`, seriam servidas
 * como estão: 3538px de largura para exibir 136px na tela.
 *
 * Só fica em `public/` o que precisa de URL fixa e previsível: favicon,
 * apple-touch-icon e a imagem de Open Graph.
 */
const logoCor = join(logos, "Logo - NeuroLab.png");
const logoBranca = join(logos, "Logo - NeuroLab_White.png");
const iconeRedes = join(logos, "Logo - NeuroLab_redes-sociais-icone.png");

const log = (msg) => console.log(`  ${msg}`);

/** Precisa regerar? Sim se o destino não existe ou está mais velho que a origem. */
function desatualizado(origem, destino) {
  if (!existsSync(destino)) return true;
  return statSync(origem).mtimeMs > statSync(destino).mtimeMs;
}

async function garantirPasta(caminhoArquivo) {
  await mkdir(dirname(caminhoArquivo), { recursive: true });
}

/** tokens.css — cópia com cabeçalho de aviso. */
async function sincronizarTokensCss() {
  const origem = join(designSystem, "tokens/tokens.css");
  const destino = join(raiz, "src/tokens/tokens.css");
  if (!desatualizado(origem, destino)) return false;

  const conteudo = await readFile(origem, "utf-8");
  await garantirPasta(destino);
  await writeFile(destino, `/* ${AVISO}\n   ${ORIGEM}tokens/tokens.css */\n\n${conteudo}`, "utf-8");
  return true;
}

/** tokens.json — cópia com chave de aviso (o arquivo original já usa `_comment`). */
async function sincronizarTokensJson() {
  const origem = join(designSystem, "tokens/tokens.json");
  const destino = join(raiz, "src/tokens/tokens.json");
  if (!desatualizado(origem, destino)) return false;

  const tokens = JSON.parse(await readFile(origem, "utf-8"));
  const comAviso = { _gerado: `${AVISO}. ${ORIGEM}tokens/tokens.json`, ...tokens };
  await garantirPasta(destino);
  await writeFile(destino, `${JSON.stringify(comAviso, null, 2)}\n`, "utf-8");
  return true;
}

/**
 * Derivados de imagem — favicon em vários tamanhos, ícone transparente para a
 * textura de rede neural e a imagem de Open Graph.
 *
 * Dependem do `sharp`. Se ele não estiver instalado, o script segue em frente:
 * os derivados são commitados no repositório, então um build sem sharp continua
 * funcionando com o que já está lá. Só avisa se algum estiver faltando.
 */
async function gerarDerivados() {
  let sharp;
  try {
    ({ default: sharp } = await import("sharp"));
  } catch {
    const faltando = [
      "public/favicon-32.png",
      "public/favicon-192.png",
      "public/apple-touch-icon.png",
      "public/marca/og.png",
      "src/assets/marca/icone.png",
    ].filter((p) => !existsSync(join(raiz, p)));

    if (faltando.length) {
      console.error(`\n  ERRO: sharp não está instalado e faltam derivados:\n    ${faltando.join("\n    ")}`);
      console.error("  Rode `npm install` e depois `npm run marca:sync`.\n");
      process.exit(1);
    }
    log("sharp ausente — mantendo os derivados já commitados");
    return 0;
  }

  const icone = iconeRedes;
  let gerados = 0;

  // As duas versões da logo completa, com a margem vazia removida.
  //
  // `trim` não altera um pixel da arte: os masters vêm com ~580px de margem
  // transparente à direita, e é essa moldura vazia que sai. Sem isso, uma caixa
  // de 136px no cabeçalho renderiza só ~114px de lockup — abaixo do tamanho
  // mínimo de 120px de 04-logo-e-elementos-graficos.md. Recortando, a medida
  // passa a valer para a arte de verdade, e a área de proteção é reaplicada por
  // CSS no componente Logo.astro, onde dá para controlá-la com precisão.
  for (const [origem, destino] of [
    [logoCor, "src/assets/marca/logo.png"],
    [logoBranca, "src/assets/marca/logo-branca.png"],
  ]) {
    const saida = join(raiz, destino);
    if (!desatualizado(origem, saida)) continue;
    await garantirPasta(saida);
    await sharp(origem).trim({ threshold: 5 }).png({ compressionLevel: 9 }).toFile(saida);
    log(`gerado  ${destino}`);
    gerados++;
  }

  // Favicons e apple-touch-icon, a partir do símbolo isolado da rede neural.
  // Regra de 04-logo-e-elementos-graficos.md: abaixo de 120px de largura, usar
  // só o símbolo — nunca o wordmark.
  //
  // O arquivo de origem vem com margem branca larga (foi feito para post de rede
  // social). Sem recortar, o símbolo ficaria minúsculo dentro de um favicon de
  // 32px. Então: `trim` remove a moldura branca e a margem é recolocada em
  // proporção fixa — o equivalente digital da área de proteção da logo.
  const simbolo = await sharp(icone).trim({ threshold: 10 }).toBuffer();

  for (const [tamanho, destino] of [
    [32, "public/favicon-32.png"],
    [192, "public/favicon-192.png"],
    [180, "public/apple-touch-icon.png"],
  ]) {
    const saida = join(raiz, destino);
    if (!desatualizado(icone, saida)) continue;
    await garantirPasta(saida);
    const margem = Math.round(tamanho * 0.08);
    await sharp(simbolo)
      .resize(tamanho - margem * 2, tamanho - margem * 2, { fit: "contain", background: "#FFFFFF" })
      .extend({ top: margem, bottom: margem, left: margem, right: margem, background: "#FFFFFF" })
      .png({ compressionLevel: 9 })
      .toFile(saida);
    log(`gerado  ${destino}`);
    gerados++;
  }

  // Símbolo isolado com fundo transparente. É o que aparece no cabeçalho em
  // telas estreitas (regra de tamanho mínimo: abaixo de 120px de largura, só o
  // símbolo) e como textura de rede neural sobre o grafite.
  //
  // O arquivo de origem é RGB sem canal alfa (fundo branco chapado, arte em
  // vermelho chapado). O canal verde separa os dois de forma limpa: branco tem
  // verde 255, o vermelho da marca tem verde ~10. Invertendo o verde temos uma
  // máscara de opacidade que ainda preserva o anti-aliasing das bordas.
  //
  // Isto é uma DERIVAÇÃO local, não um asset oficial do design system.
  const transparente = join(raiz, "src/assets/marca/icone.png");
  if (desatualizado(icone, transparente)) {
    await garantirPasta(transparente);
    const base = sharp(simbolo).resize(512, 512, { fit: "contain", background: "#FFFFFF" });
    const alfa = await base.clone().extractChannel("green").negate().toBuffer();
    await base.clone().joinChannel(alfa).png({ compressionLevel: 9 }).toFile(transparente);
    log("gerado  src/assets/marca/icone.png");
    gerados++;
  }

  // Imagem de compartilhamento (Open Graph) — 1200×630, logo branca sobre
  // grafite oficial. Fundo escuro porque a versão White é a única com contraste
  // garantido em qualquer miniatura de rede social.
  const og = join(raiz, "public/marca/og.png");
  if (desatualizado(logoBranca, og)) {
    await garantirPasta(og);
    const marca = await sharp(logoBranca).resize({ width: 820, fit: "inside" }).toBuffer();
    await sharp({
      create: { width: 1200, height: 630, channels: 4, background: "#191919" },
    })
      .composite([{ input: marca, gravity: "centre" }])
      .png({ compressionLevel: 9 })
      .toFile(og);
    log("gerado  public/marca/og.png");
    gerados++;
  }

  return gerados;
}

async function principal() {
  console.log("\nsync-marca — design system → site");

  if (!existsSync(designSystem)) {
    const jaCopiado = existsSync(join(raiz, "src/tokens/tokens.json"));
    if (jaCopiado) {
      log(`design system não encontrado em ${designSystem}`);
      log("usando os arquivos de marca já commitados (esperado no CI)\n");
      return;
    }
    console.error(`\n  ERRO: design system não encontrado em:\n    ${designSystem}`);
    console.error("  Este script precisa da pasta 0. BrandOS/0. DesignSystem ao lado do site.\n");
    process.exit(1);
  }

  let mudou = 0;
  if (await sincronizarTokensCss()) (log("copiado src/tokens/tokens.css"), mudou++);
  if (await sincronizarTokensJson()) (log("copiado src/tokens/tokens.json"), mudou++);

  for (const origem of [logoCor, logoBranca, iconeRedes]) {
    if (!existsSync(origem)) {
      console.error(`\n  ERRO: asset da marca não encontrado:\n    ${origem}\n`);
      process.exit(1);
    }
  }

  mudou += await gerarDerivados();
  log(mudou ? `${mudou} arquivo(s) atualizado(s)\n` : "tudo em dia\n");
}

principal().catch((erro) => {
  console.error("\n  sync-marca falhou:", erro.message, "\n");
  process.exit(1);
});
