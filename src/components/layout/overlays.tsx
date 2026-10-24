import * as React from "react";
import { X } from "lucide-react";
import { hasAnyAnalytics } from "@/config/site";
import { getConsent, loadAnalytics, setConsent } from "@/lib/analytics";
import { CHECKOUT_UNAVAILABLE_EVENT } from "@/lib/checkout";
import { CtaButton } from "@/components/cta-button";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Mobile-only sticky CTA: appears once the hero video has scrolled away and hides
 * while the offer or closing section is on screen (they have their own buttons).
 */
export function StickyCta() {
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    const hero = document.getElementById("topo");
    const blockers = ["oferta", "fechamento"].map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    if (!hero) return;
    let pastHero = false;
    const blocking = new Set<Element>();
    const update = () => setShow(pastHero && blocking.size === 0);

    const heroIo = new IntersectionObserver(([e]) => {
      pastHero = !e.isIntersecting && e.boundingClientRect.top < 0;
      update();
    });
    const blockIo = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) blocking.add(e.target);
        else blocking.delete(e.target);
      }
      update();
    });
    heroIo.observe(hero);
    blockers.forEach((b) => blockIo.observe(b));
    return () => {
      heroIo.disconnect();
      blockIo.disconnect();
    };
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-30 border-t border-line bg-ink/90 px-4 pb-[max(12px,env(safe-area-inset-bottom))] pt-3 backdrop-blur-xl transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] md:hidden",
        show ? "translate-y-0" : "pointer-events-none translate-y-full",
      )}
      aria-hidden={!show}
    >
      <div className="flex items-center gap-3">
        <div className="shrink-0 leading-tight">
          <p className="text-[15px] font-semibold text-ivory">R$ 147</p>
          <p className="text-[11px] text-stone">pagamento único</p>
        </div>
        <CtaButton label="Quero minha Skill" placement="sticky_mobile" size="default" className="h-12 flex-1 text-[12px]" tabIndex={show ? 0 : -1} />
      </div>
    </div>
  );
}

/** Shown when a purchase CTA is used before the checkout URL exists. */
export function CheckoutNotice() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    let t = 0;
    const onEvent = () => {
      setOpen(true);
      window.clearTimeout(t);
      t = window.setTimeout(() => setOpen(false), 7000);
    };
    window.addEventListener(CHECKOUT_UNAVAILABLE_EVENT, onEvent);
    return () => {
      window.removeEventListener(CHECKOUT_UNAVAILABLE_EVENT, onEvent);
      window.clearTimeout(t);
    };
  }, []);

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "fixed left-1/2 top-20 z-50 w-[min(92vw,440px)] -translate-x-1/2 rounded-2xl border border-line-strong bg-graphite/95 p-5 shadow-2xl backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)]",
        open ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-3 opacity-0",
      )}
    >
      {open && (
        <div className="flex items-start gap-4">
          <span className="mt-1.5 size-2 shrink-0 rounded-full bg-terracotta" aria-hidden />
          <div className="flex-1">
            <p className="text-sm font-medium text-ivory">As vendas abrem em breve.</p>
            <p className="mt-1 text-sm leading-relaxed text-stone">
              O checkout da CINELANE ainda não está disponível. Nenhum pagamento foi iniciado.
            </p>
            {import.meta.env.DEV && (
              <p className="mt-3 rounded-md border border-dashed border-terracotta/40 px-2 py-1.5 font-mono text-[11px] text-terracotta">
                DEV: defina VITE_CHECKOUT_URL para habilitar os CTAs de compra.
              </p>
            )}
          </div>
          <button type="button" onClick={() => setOpen(false)} aria-label="Fechar aviso" className="rounded-full p-1 text-stone hover:text-cream">
            <X className="size-4" />
          </button>
        </div>
      )}
    </div>
  );
}

/** LGPD consent. Only rendered when at least one tracking ID is configured. */
export function ConsentBanner() {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    if (!hasAnyAnalytics) return;
    const c = getConsent();
    if (c === "granted") loadAnalytics();
    else if (c === null) setVisible(true);
  }, []);

  if (!visible) return null;
  const choose = (state: "granted" | "denied") => {
    setConsent(state);
    setVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-label="Preferências de cookies"
      className="fixed bottom-4 left-4 right-4 z-50 rounded-2xl border border-line-strong bg-graphite/95 p-5 shadow-2xl backdrop-blur-xl sm:right-auto sm:max-w-md"
    >
      <p className="text-sm leading-relaxed text-stone">
        Usamos cookies de medição (Google e Meta) para entender o desempenho da página e das campanhas, apenas com a sua
        permissão. Veja a{" "}
        <a href="/privacidade/" className="text-cream underline underline-offset-4">
          política de privacidade
        </a>
        .
      </p>
      <div className="mt-4 flex gap-3">
        <Button size="sm" onClick={() => choose("granted")}>
          Aceitar
        </Button>
        <Button size="sm" variant="outline" onClick={() => choose("denied")}>
          Recusar
        </Button>
      </div>
    </div>
  );
}
