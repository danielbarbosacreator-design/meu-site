import { ArrowDown } from "lucide-react";
import { videos } from "@/config/site";
import { VideoPlayer } from "@/components/ui/video-player";

/** 01 — Minimal home: brand, the "Skill para Claude" signature and one video. */
export function HeroVideo() {
  return (
    <section id="topo" aria-labelledby="hero-title" className="relative overflow-hidden pb-16 pt-28 sm:pb-24 sm:pt-36">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[80vh] bg-[radial-gradient(60%_50%_at_50%_0%,rgb(217_119_87/0.13),transparent_70%)]"
      />
      <div className="container-cine relative flex flex-col items-center text-center">
        <p className="animate-[fade-up_900ms_var(--ease-cine)_both] inline-flex items-center gap-2.5 rounded-full border border-terracotta/30 bg-terracotta/[0.07] px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-terracotta sm:text-xs">
          <span className="size-1.5 rounded-full bg-terracotta" aria-hidden />
          Skill para Claude
        </p>

        <h1 id="hero-title" className="mt-7 flex flex-col items-center sm:mt-9">
          <span className="animate-[fade-up_1000ms_var(--ease-cine)_80ms_both] text-[52px] font-semibold leading-none tracking-[0.14em] text-ivory sm:text-[88px] lg:text-[112px]">
            CINELANE
          </span>
          <span className="sr-only"> — </span>
          <span className="mt-5 animate-[fade-up_1000ms_var(--ease-cine)_160ms_both] text-[12px] font-semibold uppercase tracking-[0.26em] text-cream sm:mt-6 sm:text-[15px] sm:tracking-[0.34em]">
            Skill de edição fotográfica <span className="mt-2 block text-terracotta sm:mt-0 sm:inline">para Claude</span>
          </span>
        </h1>

        <div className="mt-12 w-full max-w-[1040px] animate-[fade-up_1200ms_var(--ease-cine)_260ms_both] sm:mt-16">
          <VideoPlayer
            id="hero"
            priority
            source={videos.hero}
            title="Assista: como a CINELANE funciona"
            pendingTitle="Vídeo de apresentação em breve"
            pendingNote="Aqui você verá o problema, a solução e a CINELANE em funcionamento."
          />
        </div>

        <a
          href="#escultura"
          className="group mt-10 inline-flex items-center gap-2 text-[13px] text-stone transition-colors hover:text-cream"
        >
          Prefere ler? Continue a página
          <ArrowDown className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" />
        </a>
      </div>
    </section>
  );
}
