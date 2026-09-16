import Link from "next/link";

import { client } from "@/sanity/lib/client";
import { configuracoesQuery } from "@/sanity/lib/queries";
import { WhatsAppButton } from "./WhatsAppButton";

type Configuracoes = {
  whatsappNumero?: string;
  whatsappMensagemPadrao?: string;
  instagram?: string;
  email?: string;
  endereco?: string;
  rodapeTexto?: string;
};

async function getConfiguracoes(): Promise<Configuracoes | null> {
  try {
    return await client.fetch(configuracoesQuery, {}, { next: { revalidate: 60 } });
  } catch {
    return null;
  }
}

export async function Footer() {
  const config = await getConfiguracoes();
  const ano = new Date().getFullYear();

  return (
    <footer className="bg-footer text-cream">
      <div className="mx-auto grid max-w-content gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <p className="font-display text-[calc(1.125rem*var(--escala-titulos,1))] text-cream">Artesanal do Sítio</p>
          <p className="mt-2 text-[calc(0.875rem*var(--escala-texto,1))] text-cream/70">
            {config?.rodapeTexto || "Produtos artesanais gourmet, feitos com carinho."}
          </p>
        </div>

        <div className="flex flex-col gap-2 text-[calc(0.875rem*var(--escala-texto,1))] text-cream/70">
          <p className="font-medium text-cream">Navegação</p>
          <Link href="/catalogo" className="hover:text-cream">Produtos</Link>
          <Link href="/blog" className="hover:text-cream">Blog</Link>
          <Link href="/sobre" className="hover:text-cream">Sobre</Link>
          <Link href="/contato" className="hover:text-cream">Contato</Link>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-[calc(0.875rem*var(--escala-texto,1))] font-medium text-cream">Fale com a gente</p>
          {config?.email ? (
            <a
              href={`mailto:${config.email}`}
              className="text-[calc(0.875rem*var(--escala-texto,1))] text-cream/70 hover:text-cream"
            >
              {config.email}
            </a>
          ) : null}
          {config?.endereco ? (
            <p className="text-[calc(0.875rem*var(--escala-texto,1))] text-cream/70">{config.endereco}</p>
          ) : null}
          <div className="flex flex-wrap gap-3">
            <WhatsAppButton
              numero={config?.whatsappNumero}
              mensagem={config?.whatsappMensagemPadrao}
              variant="outline-light"
            />
            {config?.instagram ? (
              <a
                href={config.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full border border-cream px-5 py-2.5 text-[calc(0.875rem*var(--escala-texto,1))] text-cream transition hover:bg-cream hover:text-footer"
              >
                Instagram
              </a>
            ) : null}
          </div>
        </div>
      </div>

      <div className="border-t border-cream/10 px-4 py-4 text-center text-[calc(0.75rem*var(--escala-texto,1))] text-cream/50 sm:px-6">
        © {ano} Artesanal do Sítio. Todos os direitos reservados.
      </div>
    </footer>
  );
}
