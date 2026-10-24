import * as React from "react";
import { Check, Info } from "lucide-react";
import { offer } from "@/config/site";
import { cta, requirements } from "@/content/copy";
import { CtaButton } from "@/components/cta-button";
import { LogoMark } from "@/components/ui/logo";
import { Reveal } from "@/components/ui/reveal";
import { offerParams, track } from "@/lib/analytics";

const reassurance = ["Pagamento único", "Acesso digital após a compra", "Vídeo de instalação incluso", "Requisitos de uso informados abaixo"];

/** 10 — Main offer. Fires view_offer once when the price card is actually seen. */
export function OfferSection() {
  const cardRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          track("view_offer", offerParams);
          io.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section id="oferta" aria-labelledby="offer-title" className="relative overflow-hidden border-y border-line py-28 sm:py-40">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_45%_at_50%_40%,rgb(217_119_87/0.12),transparent_70%)]"
      />
      <div className="container-cine relative">
        <Reveal as="p" className="eyebrow mb-6 flex items-center justify-center gap-3">
          <span className="h-px w-6 bg-terracotta" aria-hidden />
          Oferta
          <span className="h-px w-6 bg-terracotta" aria-hidden />
        </Reveal>

        <Reveal delay={80}>
          <div
            ref={cardRef}
            className="relative mx-auto max-w-[620px] overflow-hidden rounded-[28px] border border-line-strong bg-[linear-gradient(180deg,#1d1b19,#141312)] p-7 shadow-[0_60px_160px_-60px_rgb(217_119_87/0.45)] sm:p-12"
          >
            <div aria-hidden className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-terracotta/70 to-transparent" />
            <div className="flex items-center gap-3">
              <LogoMark className="text-terracotta" />
              <span className="text-[13px] font-semibold tracking-[0.24em] text-ivory">CINELANE</span>
            </div>
            <h2 id="offer-title" className="mt-6 text-[13px] font-semibold uppercase leading-relaxed tracking-[0.18em] text-cream">
              Skill de edição fotográfica para Claude
            </h2>

            <div className="mt-10 flex items-end gap-2">
              <span className="pb-3 text-xl font-medium text-stone sm:pb-4">R$</span>
              <span className="text-[88px] font-semibold leading-[0.85] tracking-[-0.05em] text-ivory sm:text-[112px]">
                {offer.priceInteger}
              </span>
              <span className="pb-3 text-2xl font-semibold text-ivory sm:pb-4">{offer.priceCents}</span>
            </div>
            <p className="mt-4 text-[15px] text-cream">
              Pagamento único. <span className="text-stone">Sem mensalidade adicional da CINELANE.</span>
            </p>
            <p className="mt-2 text-sm leading-relaxed text-stone">
              Você compra a versão disponibilizada e pode reutilizá-la, respeitando as condições de licença.
            </p>

            <CtaButton label={cta.install} placement="offer" className="mt-10 w-full" />

            <ul className="mt-6 grid grid-cols-1 gap-x-6 gap-y-2.5 sm:grid-cols-2">
              {reassurance.map((r) => (
                <li key={r} className="flex items-center gap-2.5 text-[13px] text-stone">
                  <Check className="size-3.5 shrink-0 text-terracotta" strokeWidth={2.5} />
                  {r}
                </li>
              ))}
            </ul>

            <div className="mt-10 rounded-2xl border border-line bg-ink/60 p-5 sm:p-6">
              <p className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-cream">
                <Info className="size-3.5 text-terracotta" /> Requisitos de uso
              </p>
              <ul className="mt-4 space-y-2.5">
                {requirements.map((r) => (
                  <li key={r} className="flex gap-2.5 text-[13px] leading-relaxed text-stone">
                    <span className="mt-[9px] size-1 shrink-0 rounded-full bg-stone" aria-hidden />
                    {r}
                  </li>
                ))}
              </ul>
              <p className="mt-4 border-t border-line pt-4 text-[12px] leading-relaxed text-stone-dim">
                O Claude não está incluído e pode exigir assinatura e configuração compatíveis.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
