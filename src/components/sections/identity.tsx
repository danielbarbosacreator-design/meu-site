import { Fingerprint, Palette, ShieldCheck } from "lucide-react";
import { comparisons } from "@/content/copy";
import { SectionHeading, Em } from "@/components/section-heading";
import { BeforeAfter } from "@/components/ui/before-after";
import { Reveal } from "@/components/ui/reveal";

const principles = [
  { icon: Palette, title: "O seu LUT, não um preset nosso", body: "A cor final vem do arquivo que você escolheu ao longo da sua carreira." },
  { icon: Fingerprint, title: "Sem estética imposta", body: "As correções são técnicas e servem ao seu tratamento — não o substituem." },
  { icon: ShieldCheck, title: "Originais preservados", body: "Os arquivos originais permanecem intactos. Você sempre pode voltar a eles." },
];

/** 05 — Preserving the photographer's identity (the main trust section). */
export function IdentitySection() {
  const slots = comparisons.length > 0 ? comparisons.slice(0, 2) : [undefined, undefined];

  return (
    <section id="identidade" aria-labelledby="identity-title" className="relative py-28 sm:py-40">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_40%_at_20%_10%,rgb(217_119_87/0.07),transparent_70%)]"
      />
      <div className="container-cine relative">
        <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-24">
          <SectionHeading
            id="identity-title"
            eyebrow="Sua identidade fotográfica"
            title={
              <>
                Seu LUT. Suas cores. <Em>Sua assinatura.</Em>
              </>
            }
          />
          <div className="space-y-5 text-lg leading-[1.7] text-stone lg:pt-14">
            <Reveal as="p">Você levou tempo para desenvolver seu olhar.</Reveal>
            <Reveal as="p" delay={60}>
              Escolheu cuidadosamente suas cores, contrastes e estilo. É isso que torna sua fotografia reconhecível.
            </Reveal>
            <Reveal as="p" delay={120}>
              A CINELANE não foi criada para substituir sua identidade visual. Ela foi desenvolvida para utilizar seus
              próprios arquivos e seu tratamento de cor, automatizando etapas técnicas sem impor uma nova estética.
            </Reveal>
            <Reveal as="p" delay={180} className="editorial pt-2 text-[34px] leading-tight text-ivory sm:text-[42px]">
              O fotógrafo continua sendo você.
            </Reveal>
          </div>
        </div>

        <div className="mt-20 grid gap-5 sm:mt-24 md:grid-cols-2">
          {slots.map((pair, i) => (
            <Reveal key={i} delay={i * 120}>
              <BeforeAfter
                pair={pair}
                slotLabel="Comparação real — mesma fotografia, LUT do próprio fotógrafo — será publicada aqui."
              />
            </Reveal>
          ))}
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-[22px] border border-line bg-line sm:grid-cols-3">
          {principles.map(({ icon: Icon, title, body }, i) => (
            <Reveal key={title} delay={i * 90} className="bg-ink p-7 sm:p-8">
              <Icon className="size-6 text-terracotta" strokeWidth={1.5} />
              <h3 className="mt-6 text-lg font-medium tracking-[-0.01em] text-ivory">{title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-stone">{body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
