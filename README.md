# Site do Sítio

Site institucional (Next.js + Sanity headless CMS) — catálogo de produtos e blog,
com gestão de conteúdo via Sanity Studio embutido em `/studio`.

Specs completas em `docs/PRODUCT.md`, `docs/DESIGN.md` e `docs/SCREENS.md`.

## Stack
- Next.js 15 (App Router) + TypeScript + Tailwind CSS
- Sanity (headless CMS, plano gratuito) via `next-sanity`, Studio embutido em `/studio`
- Hospedagem prevista: Vercel · Domínio: UOL (DNS apontando para a Vercel)

## ⚠️ Importante: instale as dependências localmente
Este projeto foi criado neste ambiente sem acesso à internet (o registro
`npm` não é alcançável aqui), então **as dependências nunca foram
instaladas nem o build foi testado**. Rode os passos abaixo na sua máquina
antes de considerar o setup pronto.

## Primeiros passos

1. Instale as dependências:
   ```bash
   npm install
   ```

2. Crie um projeto no Sanity (grátis): acesse https://www.sanity.io/manage
   e crie um novo projeto (ou rode `npx sanity@latest init` dentro da pasta
   e siga o assistente). Anote o **Project ID** e o **dataset** (use
   `production`).

3. Copie `.env.example` para `.env.local` e preencha:
   ```bash
   cp .env.example .env.local
   ```
   - `NEXT_PUBLIC_SANITY_PROJECT_ID` — ID do projeto Sanity
   - `NEXT_PUBLIC_SANITY_DATASET` — normalmente `production`
   - `NEXT_PUBLIC_WHATSAPP_NUMERO` — DDI+DDD+número, só dígitos
   - `NEXT_PUBLIC_SITE_URL` — URL final do site (para SEO/sitemap)

4. Rode em desenvolvimento:
   ```bash
   npm run dev
   ```
   - Site público: http://localhost:3000
   - Admin (Sanity Studio): http://localhost:3000/studio — no primeiro
     acesso, faça login com sua conta Sanity (é o único "usuário admin").

5. Cadastre pelo menos uma **Categoria** e um **Produto** no Studio para o
   catálogo deixar de mostrar o estado vazio. Configure também o documento
   **Configurações do Site** (WhatsApp, Instagram, endereço).

6. Verifique o build de produção antes de publicar:
   ```bash
   npm run build
   ```

## Estrutura

```
src/
  app/            # rotas (App Router): home, catalogo, blog, sobre, contato, studio
  components/     # componentes de UI (cards, header, footer, estados)
  sanity/         # schemas, client, queries e helpers do Sanity
  lib/            # utilitários (link de WhatsApp, formatação de data)
```

## Personalização visual
- Paleta e fontes em `tailwind.config.ts` (`colors`, `fontFamily`) e
  `src/app/layout.tsx` (fontes do Google Fonts). Ajuste conforme o logo
  definitivo — ver `docs/DESIGN.md` para a proposta atual.
- Nome do site: hoje aparece como `[Nome do site]` em `Header.tsx`,
  `Footer.tsx` e `layout.tsx` (metadata) — troque pelos 3 arquivos.

## Deploy (Vercel)
1. Suba este repositório para o GitHub/GitLab.
2. Importe o repositório na Vercel.
3. Configure as mesmas variáveis de `.env.local` nas Environment Variables
   do projeto na Vercel.
4. Aponte o domínio (registrado na UOL) para a Vercel: crie um registro
   `CNAME`/`A` conforme instruções que a Vercel mostra ao adicionar o
   domínio no projeto.
5. Em Sanity → API → CORS Origins, adicione a URL final do site e
   `http://localhost:3000` (para dev) para liberar as requisições.

## Não incluído nesta primeira entrega
- Checkout/pagamento online (fora de escopo — catálogo é vitrine)
- Múltiplos usuários administradores
- Conteúdo definitivo de texto/imagens (hoje há placeholders marcados
  entre colchetes, ex.: `[Nome do site]`)
