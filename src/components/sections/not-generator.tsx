import { ArrowRight, Check, Minus } from "lucide-react";
import { SectionHeading, Em } from "@/components/section-heading";
import { Reveal } from "@/components/ui/reveal";

const does = [
  "Trabalha sobre os seus arquivos originais",
  "Coordena ferramentas e scripts de processamento",
  "Seleciona, corrige e aplica o seu LUT",
  "Preserva os originais e organiza a exportação",
];
const doesNot = [
  "Recriar imagens artificialmente",
  "Substituir rostos, pessoas ou cenários",
  "Gerar uma nova realidade a partir das suas fotos",
  "Impor um estilo que não é o seu",
];

/** 08 — Not an image generator. */
export function NotGeneratorSection() {
  return (
    <section aria-labelledby="notgen-title" className="border-t border-line bg-graphite/40 py-28 sm:py-40">
      <div className="container-cine">
        <SectionHeading
          id="notgen-title"
          eyebrow="Não é um gerador de fotos"
          title={
            <>
              Suas fotografias <Em>continuam sendo fotografias.</Em>
            </>
          }
          lead="A CINELANE não foi desenvolvida para recriar imagens artificialmente. O Claude coordena a execução das ferramentas e scripts de processamento sobre os arquivos originais. É automação de um processo profissional, não geração de uma nova realidade."
        />

        <Reveal className="mt-16 flex flex-col items-stretch gap-3 rounded-2xl border border-line bg-ink p-5 font-mono text-[12px] text-stone sm:flex-row sm:items-center sm:justify-between sm:p-6 sm:text-[13px]">
          <span className="text-cream">Seus arquivos originais</span>
          <ArrowRight className="hidden size-4 text-terracotta sm:block" aria-hidden />
          <span>Claude coordena ferramentas e scripts</span>
          <ArrowRight className="hidden size-4 text-terracotta sm:block" aria-hidden />
          <span className="text-terracotta">Suas fotografias tratadas</span>
        </Reveal>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          <Reveal className="rounded-[22px] border border-terracotta/25 bg-terracotta/[0.05] p-7 sm:p-9">
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-terracotta">A CINELANE faz</h3>
            <ul className="mt-6 space-y-4">
              {does.map((d) => (
                <li key={d} className="flex gap-3.5 text-[16px] leading-snug text-cream">
                  <Check className="mt-0.5 size-[18px] shrink-0 text-terracotta" strokeWidth={2.2} />
                  {d}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={100} className="rounded-[22px] border border-line bg-ink p-7 sm:p-9">
            <h3 className="text-sm font-semibold uppercase tracking-[0.16em] text-stone">A CINELANE não faz</h3>
            <ul className="mt-6 space-y-4">
              {doesNot.map((d) => (
                <li key={d} className="flex gap-3.5 text-[16px] leading-snug text-stone">
                  <Minus className="mt-0.5 size-[18px] shrink-0 text-stone-dim" strokeWidth={2.2} />
                  {d}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
