import { site } from "@/config/site";
import { Logo } from "@/components/ui/logo";

export function Footer() {
  return (
    <footer className="border-t border-line bg-ink pb-28 pt-16 sm:pb-14">
      <div className="container-cine">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-5 text-sm leading-relaxed text-stone">
              Automação fotográfica para quem quer recuperar tempo sem abrir mão da própria identidade.
            </p>
          </div>
          <nav aria-label="Institucional" className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
            <a href={`${import.meta.env.BASE_URL}termos/`} className="text-stone transition-colors hover:text-cream">
              Termos de uso
            </a>
            <a href={`${import.meta.env.BASE_URL}privacidade/`} className="text-stone transition-colors hover:text-cream">
              Privacidade
            </a>
            {site.contactEmail ? (
              <a href={`mailto:${site.contactEmail}`} className="text-stone transition-colors hover:text-cream">
                Contato · {site.contactEmail}
              </a>
            ) : (
              import.meta.env.DEV && <span className="text-terracotta/80">DEV: defina VITE_CONTACT_EMAIL</span>
            )}
          </nav>
        </div>
        <div className="hairline my-10" />
        <div className="flex flex-col gap-4 text-xs leading-relaxed text-stone-dim md:flex-row md:justify-between">
          <p>© {site.year} CINELANE. Todos os direitos reservados.</p>
          <p className="max-w-2xl md:text-right">
            A CINELANE é um produto independente, sem afiliação, patrocínio ou endosso da Anthropic. Claude é uma marca
            da Anthropic, PBC, mencionada apenas para indicar compatibilidade.
          </p>
        </div>
      </div>
    </footer>
  );
}
