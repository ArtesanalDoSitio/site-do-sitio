import type { Metadata } from "next";

import { ContactForm } from "@/components/ContactForm";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { client } from "@/sanity/lib/client";
import { configuracoesQuery } from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Contato",
  description: "Fale com a gente pelo formulário ou diretamente pelo WhatsApp.",
};

async function getConfiguracoes() {
  try {
    return await client.fetch(configuracoesQuery, {}, { next: { revalidate: 60 } });
  } catch {
    return null;
  }
}

export default async function ContatoPage() {
  const config = await getConfiguracoes();

  return (
    <div className="mx-auto max-w-content px-4 py-16 sm:px-6">
      <h1 className="font-display text-3xl text-ink sm:text-4xl">Contato</h1>
      <p className="mt-3 max-w-lg text-ink/70">
        Prefere falar direto? Chame no WhatsApp. Se preferir, envie uma mensagem
        pelo formulário abaixo.
      </p>

      <div className="mt-10 grid gap-12 md:grid-cols-2">
        <ContactForm whatsappNumero={config?.whatsappNumero} />

        <div className="space-y-4">
          <WhatsAppButton
            numero={config?.whatsappNumero}
            mensagem={config?.whatsappMensagemPadrao}
          />
          {config?.endereco ? (
            <div>
              <p className="text-sm font-medium text-ink">Endereço</p>
              <p className="text-sm text-ink/70">{config.endereco}</p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
