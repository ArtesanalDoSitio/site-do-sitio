export function buildWhatsAppLink(numero?: string, mensagem?: string) {
  const numeroFinal = (numero || process.env.NEXT_PUBLIC_WHATSAPP_NUMERO || "").replace(
    /\D/g,
    ""
  );
  const mensagemFinal =
    mensagem ||
    process.env.NEXT_PUBLIC_WHATSAPP_MENSAGEM_PADRAO ||
    "Ola! Vim pelo site e gostaria de mais informacoes.";

  if (!numeroFinal) return null;

  return `https://wa.me/${numeroFinal}?text=${encodeURIComponent(mensagemFinal)}`;
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}
