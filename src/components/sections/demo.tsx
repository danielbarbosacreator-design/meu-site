import { videos } from "@/config/site";
import { demoMetrics } from "@/content/copy";
import { SectionHeading, Em } from "@/components/section-heading";
import { VideoPlayer } from "@/components/ui/video-player";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

/** 07 — Real processing demo. Metrics render only once real measurements exist. */
export function DemoSection() {
  return (
    <section aria-labelledby="demo-title" className="py-28 sm:py-40">
      <div className="container-cine">
        <SectionHeading
          id="demo-title"
          align="center"
          eyebrow="Demonstração do resultado"
          title={
            <>
              Veja o processo. <Em>Entenda o que você está economizando.</Em>
            </>
          }
        />

        <Reveal className="mx-auto mt-14 max-w-[1040px] sm:mt-16">
          <VideoPlayer
            id="demo"
            source={videos.demo}
            title="Assista à demonstração real"
            pendingTitle="Demonstração real em preparação"
            pendingNote="Um lote real de fotografias processado do início ao fim, com o LUT do próprio fotógrafo."
          />
        </Reveal>

        {demoMetrics.length > 0 ? (
          <div className="mx-auto mt-6 grid max-w-[1040px] grid-cols-2 gap-px overflow-hidden rounded-2xl border border-line bg-line lg:grid-cols-4">
            {demoMetrics.map((m) => (
              <div key={m.label} className="bg-ink p-5 sm:p-6">
                <p className="text-xs text-stone">{m.label}</p>
                <p className="mt-2 text-2xl font-semibold tracking-[-0.02em] text-ivory sm:text-3xl">{m.value}</p>
                <span
                  className={cn(
                    "mt-3 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em]",
                    m.kind === "medido" ? "bg-terracotta/15 text-terracotta" : "bg-white/[0.06] text-stone",
                  )}
                >
                  {m.kind === "medido" ? "Medição real" : "Estimativa"}
                </span>
                {m.note && <p className="mt-2 text-xs text-stone-dim">{m.note}</p>}
              </div>
            ))}
          </div>
        ) : (
          <Reveal as="p" className="mx-auto mt-8 max-w-2xl text-center text-sm leading-relaxed text-stone">
            Quantidade de arquivos, tempo medido, seleção realizada e equipamento utilizado serão publicados junto com o
            vídeo. Não apresentamos estimativas como se fossem medições.
          </Reveal>
        )}
      </div>
    </section>
  );
}
