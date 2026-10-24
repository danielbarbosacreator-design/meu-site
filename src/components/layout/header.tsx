import * as React from "react";
import { Logo } from "@/components/ui/logo";
import { goToCheckout } from "@/lib/checkout";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const links = [
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#identidade", label: "Sua identidade" },
  { href: "#oferta", label: "Oferta" },
  { href: "#faq", label: "Dúvidas" },
];

export function Header() {
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-500",
        scrolled ? "border-b border-line bg-ink/75 backdrop-blur-xl" : "border-b border-transparent",
      )}
    >
      <div className="container-cine flex h-16 items-center justify-between sm:h-[72px]">
        <a href="#topo" aria-label="CINELANE — início" className="rounded-md">
          <Logo />
        </a>
        <nav aria-label="Seções" className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-[13px] text-stone transition-colors hover:text-cream">
              {l.label}
            </a>
          ))}
        </nav>
        <Button
          variant="outline"
          size="sm"
          onClick={() => goToCheckout("header")}
          className="hidden sm:inline-flex"
        >
          Comprar · R$ 147
        </Button>
        <a href="#oferta" className="text-[13px] font-medium text-cream sm:hidden">
          R$ 147
        </a>
      </div>
    </header>
  );
}
