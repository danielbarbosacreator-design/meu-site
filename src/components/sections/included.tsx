import { BookOpen, Code2, Crop, Download, Files, PlayCircle, SlidersHorizontal, Sparkles, SwatchBook } from "lucide-react";
import { included, installVideo } from "@/content/copy";
import { SectionHeading, Em } from "@/components/section-heading";
import { Reveal } from "@/components/ui/reveal";

const icons = [Sparkles, Code2, Crop, SlidersHorizontal, SwatchBook, Download, BookOpen];

/** 09 — What's included, with the install tutorial as the hero item. */
export function IncludedSection() {
  return (
    <section aria-labelledby="included-title" className="py-28 sm:py-40">
      <div className="container-cine">
        <SectionHeading
          id="included-title"
          eyebrow="O que está incluso"
          title={
            <>
              Uma Skill. Um processo completo. <Em>Pronta para fazer parte da sua rotina.</Em>
            </>
          }
        />

        <div className="mt-16 grid gap-4 lg:grid-cols-3">
          <Reveal className="relative overflow-hidden rounded-[22px] border border-terracotta/35 bg-[linear-gradient(160deg,rgb(217_119_87/0.14),rgb(217_119_87/0.02)_60%)] p-7 sm:p-9 lg:row-span-2">
            <span className="inline-flex items-center gap-2 rounded-full bg-terracotta px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-ink">
              Não sabe programar?
            </span>
            <PlayCircle className="mt-10 size-12 text-terracotta" strokeWidth={1.2} />
            <h3 className="mt-6 text-2xl font-semibold leading-tight tracking-[-0.02em] text-ivory sm:text-[28px]">{installVideo.title}</h3>
            <p className="mt-4 text-[16px] leading-relaxed text-cream/80">{installVideo.body}</p>
            <p className="mt-4 text-sm text-stone">{installVideo.extra}</p>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-2">
            {included.map((item, i) => {
              const Icon = icons[i] ?? Files;
              return (
                <Reveal
                  key={item.title}
                  delay={(i % 2) * 80}
                  className="group flex gap-5 sm:last:odd:col-span-2 rounded-2xl border border-line bg-graphite/40 p-5 transition-colors duration-500 hover:border-line-strong sm:p-6"
                >
                  <Icon className="mt-0.5 size-5 shrink-0 text-terracotta" strokeWidth={1.6} />
                  <div>
                    <h3 className="text-[16px] font-medium text-ivory">{item.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-stone">{item.body}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
