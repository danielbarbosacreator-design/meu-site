import { Reveal } from "@/components/ui/reveal";

const tasks = ["Selecionar.", "Comparar.", "Eliminar repetidas.", "Corrigir exposição.", "Aplicar seu padrão de cor.", "Exportar."];

/** 03 — Connection with the pain: the night after the event. */
export function PainSection() {
  return (
    <section aria-labelledby="pain-title" className="relative py-28 sm:py-40">
      <div className="container-cine">
        <div className="grid gap-16 lg:grid-cols-[1.1fr_1fr] lg:gap-24">
          <div>
            <Reveal as="p" className="eyebrow mb-6 flex items-center gap-3">
              <span className="h-px w-6 bg-terracotta" aria-hidden />
              Depois da festa
            </Reveal>
            <Reveal as="h2" id="pain-title" delay={60} className="display text-[38px] leading-[1.04] sm:text-[56px] lg:text-[68px]">
              O casamento acabou.{" "}
              <span className="editorial text-stone">Mas suas horas de edição estão apenas começando?</span>
            </Reveal>
          </div>

          <div className="space-y-6 text-lg leading-[1.7] text-stone sm:text-xl lg:pt-14">
            <Reveal as="p">Você passou horas fotografando.</Reveal>
            <Reveal as="p" delay={60}>
              Registrou cada detalhe, cada emoção, cada momento.
            </Reveal>
            <Reveal as="p" delay={120} className="text-cream">
              Agora chega em casa cansado e encontra centenas de fotografias esperando por você.
            </Reveal>
          </div>
        </div>

        <div className="mt-20 rounded-[22px] border border-line bg-graphite/50 p-6 sm:mt-28 sm:p-10 lg:p-14">
          <ul className="flex flex-wrap gap-x-5 gap-y-3 sm:gap-x-8" aria-label="Tarefas repetidas a cada evento">
            {tasks.map((t, i) => (
              <Reveal
                as="li"
                key={t}
                delay={i * 90}
                className="text-[26px] font-semibold leading-tight tracking-[-0.03em] text-cream/90 sm:text-4xl lg:text-5xl"
              >
                {t}
              </Reveal>
            ))}
          </ul>
          <div className="hairline my-10" />
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <Reveal as="p" className="text-lg text-stone">
              E tudo isso novamente no próximo evento.
            </Reveal>
            <Reveal as="p" delay={120} className="editorial text-[30px] leading-tight text-terracotta sm:text-[40px]">
              Seu trabalho merece um processo mais inteligente.
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
