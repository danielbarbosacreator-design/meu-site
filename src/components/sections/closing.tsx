import { cta } from "@/content/copy";
import { CtaButton } from "@/components/cta-button";
import { Reveal } from "@/components/ui/reveal";
import { StaticSculpture } from "@/components/ui/liquid-sculpture-hero";

/** 12 — Closing. */
export function ClosingSection() {
  return (
    <section id="fechamento" aria-labelledby="closing-title" className="relative overflow-hidden border-t border-line py-32 sm:py-44">
      <StaticSculpture className="pointer-events-none absolute left-1/2 top-1/2 h-[120%] w-[160%] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-[0.22] sm:w-[110%]" />
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_50%,transparent,#111110_80%)]" />
      <div className="container-cine relative text-center">
        <Reveal as="h2" id="closing-title" className="display mx-auto max-w-4xl text-[38px] leading-[1.04] sm:text-6xl lg:text-[76px]">
          Suas próximas fotografias merecem seu olhar.{" "}
          <span className="editorial text-terracotta">Não suas próximas madrugadas.</span>
        </Reveal>
        <Reveal delay={120} className="body-copy mx-auto mt-8 max-w-xl">
          <p>Continue criando, fotografando e construindo sua identidade.</p>
          <p>Deixe a CINELANE automatizar grande parte do trabalho repetitivo.</p>
        </Reveal>
        <Reveal delay={200} className="mt-12 flex flex-col items-center gap-5">
          <CtaButton label={cta.mySkill} placement="closing" className="w-full sm:w-auto" />
          <p className="text-sm text-stone">
            <span className="font-semibold text-ivory">R$ 147,00</span> · pagamento único · acesso digital
          </p>
        </Reveal>
      </div>
    </section>
  );
}
