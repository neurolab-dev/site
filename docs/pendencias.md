# Pendências

O que ainda falta resolver neste site, e o que cada item bloqueia de fato.
Atualize esta lista conforme os pontos forem sendo fechados.

---

## Risco assumido — licença da fonte do logotipo

**Situação**: o logotipo da NeuroLab usa a fonte **Sergio Trendy** (Kulokale
Studio) no wordmark. A licença dessa fonte é **para uso pessoal apenas** — usá-la
comercialmente exige licença paga. O design system registra isso em
[03-tipografia.md](<../../0. DesignSystem/03-tipografia.md>) e é explícito: o
logotipo atual não deve ir para peça comercial nova enquanto a licença não for
resolvida.

Um site institucional público é exatamente uma peça comercial nova.

**Decisão**: publicar assim mesmo, com o risco conhecido e registrado. Não é um
impedimento técnico — é uma decisão de negócio, tomada por quem responde pela
empresa.

**Como sair disso**, quando for a hora:

1. Comprar a licença comercial com a Kulokale Studio (contato no
   `readme.txt` da fonte) e manter o logotipo como está; ou
2. Terminar a **Tiago Trendy** — tipografia autoral já em rascunho v0.4, em
   `0. DesignSystem/0. Logo/Tiago Trendy/` — e redesenhar o wordmark a partir do
   `.cdr` mestre.

**Impacto no site quando isso mudar**: mínimo. A logo entra por um único
componente, [`src/components/Logo.astro`](../src/components/Logo.astro). Trocados
os arquivos no design system, `npm run marca:sync` propaga tudo.

---

## Precisa de você

| Item | O que fazer | O que muda |
|---|---|---|
| **Webhook do n8n** | Criar o fluxo com um nó Webhook (POST) e colar a URL em `PUBLIC_N8N_WEBHOOK_URL` | Sem isso o formulário não é renderizado — o bloco de contato mostra um aviso e cai para o WhatsApp |
| **Instagram** | Preencher `instagram` em `src/data/contato.ts` | O ícone aparece sozinho no rodapé e o perfil entra no `sameAs` do JSON-LD |
| **Cases e depoimentos** | Acrescentar objetos em [`src/data/cases.ts`](../src/data/cases.ts) | A seção e o link do menu aparecem sozinhos assim que houver o primeiro item |
| **Domínio próprio** | Registrar, apontar o DNS e trocar `SITE_URL` | Ver README → Publicação |

### Sobre o formato do payload do webhook

O formulário envia um JSON com estes campos:

```json
{
  "nome": "", "empresa": "", "whatsapp": "", "email": "",
  "desafio": "", "mensagem": "", "site": "",
  "origem": "site", "pagina": "https://…", "enviadoEm": "2026-01-01T00:00:00.000Z"
}
```

`site` é o campo honeypot — se vier preenchido, é robô, e o envio nem chega ao
webhook. Se algum dia chegar preenchido, o filtro do lado do n8n deve descartar.

O webhook precisa responder **2xx**. Qualquer outro status faz o site mostrar a
mensagem de erro e reabilitar o botão. E o n8n precisa aceitar a origem do site
via **CORS** — configure o nó Webhook para responder com
`Access-Control-Allow-Origin` do domínio do site (ou `*` enquanto estiver
testando), senão o navegador bloqueia o envio antes mesmo de sair.

### Sobre a agenda

O link atual (`calendar.app.google/…`) é o **link curto de compartilhamento** do
Google Agenda, e abre em aba nova. Para embutir o calendário na própria página é
preciso a **URL longa de incorporação** — Google Agenda → a agenda de
compromissos → Compartilhar → Incorporar. Se você trouxer essa URL, o botão vira
um `<iframe>` na seção de contato.

---

## Coleta de cases — o que pedir ao cliente

Quando for montar os primeiros cases, o campo que sustenta o posicionamento da
marca é o **resultado**, e ele precisa de número com recorte de tempo:

- ✅ "Reduziu 6h/semana de trabalho manual no faturamento"
- ✅ "3× mais oportunidades qualificadas em 90 dias"
- ❌ "Ficou muito mais organizado"

Depoimento com nome, cargo ou foto exige **autorização por escrito** do cliente.
Sem autorização, publique só o case com o cliente anonimizado ("rede de clínicas
em Palmas") — continua valendo, desde que o número esteja lá.

---

## Melhorias previstas, não bloqueantes

- **Imagem de Open Graph por seção** — hoje há uma só, gerada da logo sobre
  grafite. Quando houver cases, vale gerar variações.
- **Página de política de privacidade** — passa a ser necessária quando o GA4
  ou o Tag Manager forem ativados de fato.
- **Símbolo isolado em vetor** — o favicon hoje é derivado do PNG de redes
  sociais. Um SVG gerado a partir do `.cdr` mestre daria nitidez perfeita em
  qualquer tamanho.
