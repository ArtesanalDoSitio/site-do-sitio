"use client";

import { useState } from "react";

import { buildWhatsAppLink } from "@/lib/whatsapp";

export function ContactForm({
  whatsappNumero,
}: {
  whatsappNumero?: string;
}) {
  const [nome, setNome] = useState("");
  const [mensagem, setMensagem] = useState("");

  const podeEnviar = nome.trim().length > 0 && mensagem.trim().length > 0;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!podeEnviar) return;

    const texto = `Olá! Meu nome é ${nome}. ${mensagem}`;
    const href = buildWhatsAppLink(whatsappNumero, texto);
    if (href) {
      window.open(href, "_blank", "noopener,noreferrer");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="nome" className="mb-1 block text-sm text-ink/80">
          Nome
        </label>
        <input
          id="nome"
          type="text"
          required
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="w-full rounded-md border border-neutral bg-cream px-4 py-2 text-sm text-ink focus:border-primary focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="mensagem" className="mb-1 block text-sm text-ink/80">
          Mensagem
        </label>
        <textarea
          id="mensagem"
          required
          rows={4}
          value={mensagem}
          onChange={(e) => setMensagem(e.target.value)}
          className="w-full rounded-md border border-neutral bg-cream px-4 py-2 text-sm text-ink focus:border-primary focus:outline-none"
        />
      </div>

      <button
        type="submit"
        disabled={!podeEnviar}
        className="rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-cream transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
      >
        Enviar via WhatsApp
      </button>
      <p className="text-xs text-ink/50">
        Ao enviar, você será direcionado ao WhatsApp com sua mensagem preenchida.
      </p>
    </form>
  );
}
