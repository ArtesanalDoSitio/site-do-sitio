// O Studio do Sanity tem seu proprio chrome (login, navegacao, tema).
// Este layout existe apenas para nao herdar Header/Footer do site publico.
export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
