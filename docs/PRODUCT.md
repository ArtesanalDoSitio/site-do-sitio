# PRODUCT.md

## Nome do site
Artesanal do Sítio

## Objetivo
- Site institucional para padaria/confeitaria artesanal gourmet
- Foco em branding e apresentação de produtos (vitrine, não e-commerce)

## Público-alvo
- B2C — consumidor final
- Perfil: aprecia produtos artesanais/gourmet, sensível a estética e qualidade

## Modelo de negócio
- Catálogo funciona como vitrine (sem carrinho/checkout)
- Pedidos e contato via WhatsApp

## Funcionalidades

| Funcionalidade | Detalhe |
|---|---|
| Catálogo de produtos | 20–100 produtos, organizados por categoria |
| Busca/filtro | Filtros avançados (categoria, e outros a definir) |
| Blog | Posts institucionais/editoriais |
| Contato | Integração com WhatsApp |
| Área logada (admin) | Usuário único, gestão de catálogo e posts |
| SEO | Prioridade alta |

## Papéis de usuário

| Papel | Acesso |
|---|---|
| Visitante | Navega catálogo, blog, contato |
| Admin (único) | CRUD de produtos, categorias e posts |

## Stack

| Camada | Escolha |
|---|---|
| Frontend | Next.js/React |
| Hospedagem da aplicação | Vercel |
| Domínio (DNS) | UOL |
| Backend/CMS | Sanity (headless CMS, plano gratuito) |

## Restrições técnicas
- Orçamento limitado
- Prazo apertado
- SEO forte é requisito
- Integração com WhatsApp (contato/pedidos)
- Domínio hospedado na UOL, apontando para Vercel
- CMS no plano gratuito do Sanity: 1 projeto, até 3 usuários, limites de requests/banda do free tier — suficiente para admin único e catálogo de até ~100 produtos; monitorar uso se o site crescer

## Fora de escopo (nesta fase)
- Checkout/pagamento online
- Múltiplos usuários administradores
