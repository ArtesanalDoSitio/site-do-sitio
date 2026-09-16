import { groq } from "next-sanity";

export const categoriasQuery = groq`
  *[_type == "categoria"] | order(titulo asc) {
    _id,
    titulo,
    "slug": slug.current
  }
`;

export const produtosQuery = groq`
  *[_type == "produto"] | order(destaque desc, nome asc) {
    _id,
    nome,
    "slug": slug.current,
    descricaoCurta,
    destaque,
    imagens,
    "categoria": categoria->{ titulo, "slug": slug.current }
  }
`;

export const produtosDestaqueQuery = groq`
  *[_type == "produto" && destaque == true] | order(nome asc) [0...4] {
    _id,
    nome,
    "slug": slug.current,
    descricaoCurta,
    imagens,
    "categoria": categoria->{ titulo, "slug": slug.current }
  }
`;

export const produtoPorSlugQuery = groq`
  *[_type == "produto" && slug.current == $slug][0] {
    _id,
    nome,
    "slug": slug.current,
    descricao,
    descricaoCurta,
    imagens,
    "categoria": categoria->{ titulo, "slug": slug.current }
  }
`;

export const produtoSlugsQuery = groq`
  *[_type == "produto" && defined(slug.current)][].slug.current
`;

export const postsQuery = groq`
  *[_type == "post"] | order(publicadoEm desc) {
    _id,
    titulo,
    "slug": slug.current,
    resumo,
    capa,
    publicadoEm
  }
`;

export const postsRecentesQuery = groq`
  *[_type == "post"] | order(publicadoEm desc) [0...3] {
    _id,
    titulo,
    "slug": slug.current,
    resumo,
    capa,
    publicadoEm
  }
`;

export const postPorSlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    titulo,
    "slug": slug.current,
    resumo,
    capa,
    conteudo,
    publicadoEm
  }
`;

export const postSlugsQuery = groq`
  *[_type == "post" && defined(slug.current)][].slug.current
`;

export const configuracoesQuery = groq`
  *[_type == "configuracoes"][0] {
    whatsappNumero,
    whatsappMensagemPadrao,
    instagram,
    email,
    endereco,
    rodapeTexto,
    heroImagem,
    heroTitulo,
    heroTexto,
    tipografia
  }
`;

export const sobreQuery = groq`
  *[_type == "sobre"][0] {
    titulo,
    conteudo,
    imagem
  }
`;
