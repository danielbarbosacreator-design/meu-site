import { Clock3, Gem, Layers, Sparkles, Star, TrendingUp } from "lucide-react";
import { SectionHeading, Em } from "@/components/section-heading";
import { Reveal } from "@/components/ui/reveal";

const flow = [
  { n: "1", title: "Transferência", body: "Durante o evento, você transfere um conjunto de fotografias para o computador." },
  { n: "2", title: "Automação", body: "A CINELANE executa a seleção e o tratamento técnico com o seu LUT." },
  { n: "3", title: "Conferência", body: "Você revisa o lote. A decisão final continua sendo sua." },
  { n: "4", title: "Entrega", body: "As imagens aprovadas podem chegar ao cliente ainda durante a celebração." },
];

const benefits = [
  { icon: Clock3, label: "Entregas expressas" },
  { icon: Sparkles, label: "Prévias durante eventos" },
  { icon: Layers, label: "Novos pacotes comerciais" },
  { icon: Gem, label: "Diferenciação no mercado" },
  { icon: Star, label: "Melhor experiência para o cliente" },
  { icon: TrendingUp, label: "Mais oportunidades de receita" },
];

/** 06 — Revenue opportunity: same-day / during-event delivery. */
export function RevenueSection() {
  return (
    <section aria-labelledby="revenue-title" className="relative overflow-hidden border-y border-line bg-graphite/40 py-28 sm:py-40">
      <div className="container-cine">
        <SectionHeading
          id="revenue-title"
          eyebrow="Uma nova oportunidade de faturamento"
          title={
            <>
              E se você pudesse entregar fotografias editadas <Em>durante o próprio casamento?</Em>
            </>
          }
          lead="Fotografia com entrega expressa: um serviço que o trabalho manual torna difícil — e que a automação torna possível de oferecer."
        />

        <ol className="relative mt-16 grid gap-4 sm:mt-20 md:grid-cols-4 md:gap-0">
          <div aria-hidden className="absolute left-0 right-0 top-[27px] hidden h-px bg-gradient-to-r from-terracotta/60 via-terracotta/25 to-transparent md:block" />
          {flow.map((s, i) => (
            <Reveal as="li" key={s.n} delay={i * 110} className="relative flex gap-5 md:block md:pr-8">
              <span className="relative z-10 grid size-14 shrink-0 place-items-center rounded-full border border-terracotta/40 bg-ink font-mono text-sm text-terracotta">
                {s.n}
              </span>
              <div className="md:mt-7">
                <h3 className="text-lg font-medium tracking-[-0.01em] text-ivory">{s.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-stone">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>

        <div className="mt-20 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
          {benefits.map(({ icon: Icon, label }, i) => (
            <Reveal
              key={label}
              delay={i * 60}
              className="group flex flex-col gap-5 rounded-2xl border border-line bg-ink/60 p-5 transition-colors duration-500 hover:border-terracotta/30 sm:flex-row sm:items-center sm:p-6"
            >
              <Icon className="size-5 shrink-0 text-terracotta transition-transform duration-500 group-hover:scale-110" strokeWidth={1.6} />
              <span className="text-[15px] font-medium leading-snug text-cream sm:text-base">{label}</span>
            </Reveal>
          ))}
        </div>

        <Reveal as="p" className="mt-10 max-w-3xl text-sm leading-relaxed text-stone-dim">
          A velocidade de cada lote depende do seu equipamento, da quantidade e do tamanho dos arquivos e do tempo de
          conferência. A CINELANE abre a possibilidade de novos serviços; ela não garante prazos específicos nem
          faturamento.
        </Reveal>
      </div>
    </section>
  );
}
