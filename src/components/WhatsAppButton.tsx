import { buildWhatsAppLink } from "@/lib/whatsapp";

export function WhatsAppButton({
  numero,
  mensagem,
  label = "Falar no WhatsApp",
  variant = "solid",
  className = "",
}: {
  numero?: string;
  mensagem?: string;
  label?: string;
  variant?: "solid" | "outline" | "outline-light";
  className?: string;
}) {
  const href = buildWhatsAppLink(numero, mensagem);

  if (!href) return null;

  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-[calc(0.875rem*var(--escala-texto,1))] font-medium transition";
  const stylesByVariant = {
    solid: "bg-primary text-cream hover:opacity-90",
    outline: "border border-ink text-texto hover:bg-ink hover:text-cream",
    "outline-light": "border border-cream text-cream hover:bg-cream hover:text-ink",
  } as const;
  const styles = stylesByVariant[variant];

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${styles} ${className}`}
    >
      {label}
    </a>
  );
}
