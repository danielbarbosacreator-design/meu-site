import { LiquidSculpture } from "@/components/ui/liquid-sculpture-hero";
import { Reveal } from "@/components/ui/reveal";
import { CtaButton } from "@/components/cta-button";
import { cta } from "@/content/copy";

/** 02 — Interactive particle sculpture + first emotional promise. */
export function SculptureSection() {
  return (
    <section
      id="escultura"
      aria-labelledby="sculpture-title"
      className="relative overflow-hidden border-y border-line bg-[radial-gradient(70%_60%_at_70%_50%,#1d1a18_0%,#111110_70%)]"
    >
      <div className="container-cine relative grid grid-cols-1 items-center gap-4 py-16 lg:min-h-[86vh] lg:grid-cols-[1fr_1.15fr] lg:py-0">
        <LiquidSculpture className="order-1 aspect-square w-full min-w-0 lg:order-2 lg:aspect-auto lg:h-[78vh]" />

        <div className="relative z-10 order-2 min-w-0 lg:order-1">
          <Reveal as="p" className="eyebrow mb-6 flex items-center gap-3">
            <span className="h-px w-6 bg-terracotta" aria-hidden />
            CINELANE · Skill para Claude
          </Reveal>
          <Reveal as="h2" id="sculpture-title" delay={60} className="display text-[44px] leading-[0.98] sm:text-[68px] lg:text-[84px]">
            Fotografe mais.
            <br />
            <span className="editorial text-terracotta">Edite menos.</span>
          </Reveal>
          <Reveal delay={140} className="mt-8 max-w-md space-y-3">
            <p className="text-xl font-medium tracking-[-0.01em] text-cream sm:text-2xl">Sua identidade continua sendo sua.</p>
            <p className="body-copy">O trabalho repetitivo não precisa continuar nas suas mãos.</p>
          </Reveal>
          <Reveal delay={220} className="mt-10">
            <CtaButton label={cta.automate} placement="sculpture" className="w-full sm:w-auto" />
          </Reveal>
          <p className="mt-6 hidden text-xs text-stone-dim lg:block" aria-hidden>
            Mova o cursor sobre a escultura.
          </p>
        </div>
      </div>
    </section>
  );
}
