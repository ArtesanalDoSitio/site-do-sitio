# SCREENS.md

## Páginas

| Página | Rótulo no menu | Rota | Tipo |
|---|---|---|---|
| Home | Principal | / | Pública |
| Sobre | Sobre | /sobre | Pública |
| Catálogo | Produtos | /catalogo | Pública |
| Produto (individual) | — | /catalogo/[slug] | Pública |
| Blog | Blog | /blog | Pública |
| Post (individual) | — | /blog/[slug] | Pública |
| Contato | Contato | /contato | Pública |
| Admin (Sanity Studio embutido) | — | /studio | Autenticada |

Rotas (URLs) mantidas como /catalogo por trás dos panos — só o rótulo exibido no menu e os títulos de página mudaram para "Produtos".

## Navegação
- Menu horizontal simples no header (Principal, Produtos, Blog, Sobre, Contato)
- /studio fora do menu principal (acesso via URL direta)
- Footer com contato/WhatsApp e redes sociais

## Detalhe por página

### Home (Principal)
- Hero em foto de fundo (produto artesanal) com sobreposição escura para legibilidade do texto
- Chamada para produtos
- Prévia de posts do blog
- CTA WhatsApp

### Catálogo (Produtos)
- Listagem de produtos por categoria
- Filtros avançados (categoria, outros a definir)
- Busca

### Produto (individual)
- Imagem(ns), nome, descrição, categoria
- CTA "Pedir via WhatsApp"

### Blog / Post
- Listagem cronológica com imagem de capa
- Post individual: conteúdo rico (texto + imagens)

### Contato
- Formulário simples + link direto WhatsApp
- Endereço/mapa (se aplicável)

### Admin (Sanity Studio)
- Studio do Sanity embutido em /studio (via next-sanity), sem tela de login própria — autenticação é a do Sanity (usuário único convidado no projeto)
- Schemas: Produto (nome, descrição, categoria, imagens), Categoria, Post (título, conteúdo, capa, publicação)

## Estados por tela (padrão global)

| Estado | Tratamento |
|---|---|
| Carregando | Skeleton/spinner padrão |
| Vazio/sem resultados | Mensagem + CTA (ex. "limpar filtros") |
| Erro | Mensagem neutra + ação de retry |
| Sem conexão | Aviso padrão + retry |

Login/erro de acesso ao /studio é tratado pela própria UI do Sanity (fora do escopo de design custom).
