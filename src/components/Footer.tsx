import Link from "next/link";

import { client } from "@/sanity/lib/client";
import { configuracoesQuery } from "@/sanity/lib/queries";
import { WhatsAppButton } from "./WhatsAppButton";

type Configuracoes = {
  whatsappNumero?: string;
  whatsappMensagemPadrao?: string;
  instagram?: string;
  endereco?: string;
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
    <footer className="border-t border-neutral bg-neutral/30">
      <div className="mx-auto grid max-w-content gap-8 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <p className="font-display text-lg text-ink">Artesanal do Sítio</p>
          <p className="mt-2 text-sm text-ink/70">
            Produtos artesanais gourmet, feitos com carinho.
          </p>
        </div>

        <div className="flex flex-col gap-2 text-sm text-ink/70">
          <p className="font-medium text-ink">Navegação</p>
          <Link href="/catalogo" className="hover:text-ink">Produtos</Link>
          <Link href="/blog" className="hover:text-ink">Blog</Link>
          <Link href="/sobre" className="hover:text-ink">Sobre</Link>
          <Link href="/contato" className="hover:text-ink">Contato</Link>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-sm font-medium text-ink">Fale com a gente</p>
          {config?.endereco ? (
            <p className="text-sm text-ink/70">{config.endereco}</p>
          ) : null}
          <div className="flex flex-wrap gap-3">
            <WhatsAppButton
              numero={config?.whatsappNumero}
              mensagem={config?.whatsappMensagemPadrao}
              variant="outline"
            />
            {config?.instagram ? (
              <a
                href={config.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full border border-ink px-5 py-2.5 text-sm text-ink transition hover:bg-ink hover:text-cream"
              >
                Instagram
              </a>
            ) : null}
          </div>
        </div>
      </div>

      <div className="border-t border-neutral px-4 py-4 text-center text-xs text-ink/50 sm:px-6">
        © {ano} Artesanal do Sítio. Todos os direitos reservados.
      </div>
    </footer>
  );
}
