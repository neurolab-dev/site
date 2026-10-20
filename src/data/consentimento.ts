/**
 * Textos do aviso de cookies (LGPD).
 *
 * O aviso só existe quando o Google Analytics está configurado — sem
 * PUBLIC_GA_ID o site não grava cookie nenhum e não há o que pedir.
 */

export const consentimento = {
  titulo: "Cookies de medição",
  texto:
    "Usamos o Google Analytics para entender como o site é usado e melhorar o conteúdo. Ele só é ativado se você permitir. Nada é usado para anúncios.",
  aceitar: "Permitir",
  recusar: "Recusar",
  /** Link do rodapé que reabre o aviso para mudar a escolha. */
  preferencias: "Preferências de cookies",
} as const;
