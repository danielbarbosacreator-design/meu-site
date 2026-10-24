import * as React from "react";
import { Check, Flag, FolderCheck, FolderOpen, FolderLock } from "lucide-react";
import { pipelineSteps } from "@/content/copy";
import { SectionHeading, Em } from "@/components/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { cn, prefersReducedMotion } from "@/lib/utils";

const STEP_MS = 5200;

/** 04 — How CINELANE executes the job: six steps + an illustrative visualiser. */
export function PipelineSection() {
  const [active, setActive] = React.useState(0);
  const [auto, setAuto] = React.useState(true);
  const [inView, setInView] = React.useState(false);
  const panelRef = React.useRef<HTMLDivElement>(null);
  const tabRefs = React.useRef<(HTMLButtonElement | null)[]>([]);

  React.useEffect(() => {
    if (prefersReducedMotion()) setAuto(false);
    const el = panelRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  React.useEffect(() => {
    if (!auto || !inView) return;
    const t = window.setTimeout(() => setActive((a) => (a + 1) % pipelineSteps.length), STEP_MS);
    return () => window.clearTimeout(t);
  }, [active, auto, inView]);

  const select = (i: number) => {
    setAuto(false);
    setActive(i);
  };

  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    const n = pipelineSteps.length;
    let next = -1;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = (i + 1) % n;
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = (i - 1 + n) % n;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = n - 1;
    if (next >= 0) {
      e.preventDefault();
      select(next);
      tabRefs.current[next]?.focus();
    }
  };

  return (
    <section id="como-funciona" aria-labelledby="pipeline-title" className="relative border-t border-line bg-graphite/40 py-28 sm:py-40">
      <div className="container-cine">
        <SectionHeading
          id="pipeline-title"
          eyebrow="Como a CINELANE executa o trabalho"
          title={
            <>
              Você entrega as fotografias. <Em>A CINELANE executa o processo.</Em>
            </>
          }
          lead="Não é um prompt solto. É um processo de automação desenvolvido, estruturado e pronto para usar: o Claude coordena ferramentas e scripts que trabalham sobre os seus arquivos, etapa por etapa."
        />

        <div className="mt-16 grid gap-6 sm:mt-20 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
          <div role="tablist" aria-label="Etapas do processo" aria-orientation="vertical" className="flex flex-col">
            {pipelineSteps.map((s, i) => {
              const on = i === active;
              return (
                <button
                  key={s.n}
                  ref={(el) => (tabRefs.current[i] = el)}
                  role="tab"
                  id={`step-tab-${i}`}
                  aria-selected={on}
                  aria-controls="step-panel"
                  tabIndex={on ? 0 : -1}
                  onClick={() => select(i)}
                  onKeyDown={(e) => onKeyDown(e, i)}
                  className={cn(
                    "group relative grid grid-cols-[44px_1fr] gap-x-4 border-t border-line py-5 text-left transition-colors duration-500 last:border-b sm:py-6",
                    on ? "text-ivory" : "text-stone hover:text-cream",
                  )}
                >
                  <span className={cn("pt-0.5 font-mono text-xs tracking-wider transition-colors", on ? "text-terracotta" : "text-stone-dim")}>
                    {s.n}
                  </span>
                  <span>
                    <span className="block text-lg font-medium tracking-[-0.01em] sm:text-xl">{s.title}</span>
                    <span
                      className={cn(
                        "grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(.22,1,.36,1)]",
                        on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                      )}
                    >
                      <span className="overflow-hidden">
                        <span className="block pt-2 text-[15px] leading-relaxed text-stone">{s.body}</span>
                      </span>
                    </span>
                  </span>
                  {on && auto && inView && (
                    <span className="absolute inset-x-0 -top-px h-px origin-left bg-terracotta" style={{ animation: `progress ${STEP_MS}ms linear both` }} aria-hidden />
                  )}
                  {on && !(auto && inView) && <span className="absolute inset-x-0 -top-px h-px bg-terracotta" aria-hidden />}
                </button>
              );
            })}
          </div>

          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <div
              ref={panelRef}
              id="step-panel"
              role="tabpanel"
              aria-labelledby={`step-tab-${active}`}
              className="relative overflow-hidden rounded-[22px] border border-line-strong bg-ink shadow-[0_40px_120px_-50px_rgb(0_0_0/0.9)]"
            >
              <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
                <div className="flex items-center gap-2" aria-hidden>
                  <span className="size-2.5 rounded-full bg-white/10" />
                  <span className="size-2.5 rounded-full bg-white/10" />
                  <span className="size-2.5 rounded-full bg-white/10" />
                </div>
                <span className="rounded-full border border-terracotta/30 bg-terracotta/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-terracotta">
                  Demonstração ilustrativa
                </span>
              </div>
              <div className="relative aspect-[4/3.4] overflow-hidden sm:aspect-[4/3]">
                <div key={active} className="absolute inset-0 animate-[fade-up_700ms_var(--ease-cine)_both] p-5 sm:p-8">
                  <StepVisual step={active} />
                </div>
              </div>
              <div className="flex items-center justify-between gap-4 border-t border-line px-5 py-4">
                <p className="font-mono text-[11px] text-stone">
                  <span className="text-terracotta">{pipelineSteps[active].n}</span> / 06 · {pipelineSteps[active].title}
                </p>
                <div className="flex gap-1.5" aria-hidden>
                  {pipelineSteps.map((_, i) => (
                    <span key={i} className={cn("h-1 rounded-full transition-all duration-500", i === active ? "w-5 bg-terracotta" : "w-1.5 bg-white/15")} />
                  ))}
                </div>
              </div>
            </div>
            <p className="mt-4 text-xs leading-relaxed text-stone-dim">
              Animação meramente ilustrativa das etapas. Não representa um processamento real nem resultados medidos.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

const tile = "rounded-md border border-line bg-gradient-to-br from-[#2a2724] to-[#1a1918]";

function StepVisual({ step }: { step: number }) {
  switch (step) {
    case 0:
      return (
        <div className="relative grid h-full grid-cols-4 grid-rows-3 gap-2 sm:gap-3">
          {Array.from({ length: 12 }, (_, i) => (
            <div key={i} className={cn(tile, "relative overflow-hidden")}>
              <span className="absolute bottom-1.5 left-1.5 font-mono text-[8px] text-stone-dim sm:text-[9px]">{i % 3 === 0 ? "RAW" : i % 3 === 1 ? "JPG" : "META"}</span>
            </div>
          ))}
          <div className="pointer-events-none absolute inset-x-0 h-16 animate-[scan_2.6s_ease-in-out_infinite] bg-gradient-to-b from-transparent via-terracotta/25 to-transparent" />
        </div>
      );
    case 1:
      return (
        <div className="grid h-full grid-cols-3 gap-3 sm:gap-4">
          {[0, 1, 2].map((g) => (
            <div key={g} className="flex flex-col gap-2 rounded-xl border border-line p-2 sm:p-3">
              <p className="font-mono text-[9px] uppercase tracking-wider text-stone-dim">Grupo {g + 1}</p>
              {[0, 1, 2].map((k) => {
                const best = k === (g + 1) % 3;
                return (
                  <div
                    key={k}
                    className={cn(tile, "relative flex-1 transition-all duration-700", best ? "border-terracotta/70 shadow-[0_0_0_1px_rgb(217_119_87/0.5)]" : "opacity-35")}
                    style={{ transitionDelay: `${(g * 3 + k) * 80}ms` }}
                  >
                    {best && (
                      <span className="absolute right-1.5 top-1.5 grid size-5 place-items-center rounded-full bg-terracotta text-ink">
                        <Check className="size-3" strokeWidth={3} />
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      );
    case 2: {
      const before = [6, 10, 18, 30, 44, 52, 40, 22, 12, 8, 6, 30, 70, 92];
      const after = [8, 14, 22, 34, 46, 54, 58, 52, 44, 34, 24, 16, 10, 6];
      return (
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-stone-dim">
            <span>Sombras</span>
            <span>Exposição</span>
            <span>Altas luzes</span>
          </div>
          <div className="mt-4 flex flex-1 items-end gap-1 sm:gap-1.5">
            {before.map((b, i) => (
              <div key={i} className="relative flex-1 self-stretch">
                <div className="absolute inset-x-0 bottom-0 rounded-t-sm bg-white/10" style={{ height: `${b}%` }} />
                <div
                  className="absolute inset-x-0 bottom-0 origin-bottom rounded-t-sm bg-terracotta/80"
                  style={{ height: `${after[i]}%`, animation: `grow 900ms var(--ease-cine) ${200 + i * 45}ms both` }}
                />
              </div>
            ))}
          </div>
          <div className="mt-4 flex gap-4 text-[11px] text-stone">
            <span className="flex items-center gap-1.5"><span className="size-2 rounded-sm bg-white/20" />Original</span>
            <span className="flex items-center gap-1.5"><span className="size-2 rounded-sm bg-terracotta" />Ajuste técnico</span>
          </div>
        </div>
      );
    }
    case 3:
      return (
        <div className="flex h-full flex-col items-stretch justify-center gap-3 sm:gap-4">
          {[
            { k: "Entrada", v: "Espaço de cor de origem do arquivo" },
            { k: "Seu LUT", v: "O arquivo de LUT que você já usa", hot: true },
            { k: "Saída", v: "Espaço de cor especificado pelo LUT" },
          ].map((row, i) => (
            <div
              key={row.k}
              className={cn(
                "flex items-center justify-between gap-4 rounded-xl border px-4 py-4 sm:px-5",
                row.hot ? "border-terracotta/50 bg-terracotta/10" : "border-line bg-white/[0.02]",
              )}
              style={{ animation: `fade-up 700ms var(--ease-cine) ${i * 140}ms both` }}
            >
              <span className={cn("text-sm font-medium", row.hot ? "text-terracotta" : "text-cream")}>{row.k}</span>
              <span className="text-right text-xs text-stone sm:text-sm">{row.v}</span>
            </div>
          ))}
          <p className="mt-1 text-center font-mono text-[10px] uppercase tracking-wider text-stone-dim">Sem preset da CINELANE. Sem estética nova.</p>
        </div>
      );
    case 4:
      return (
        <ul className="flex h-full flex-col justify-center gap-2.5">
          {["Foco", "Exposição", "Altas luzes", "Sombras", "Arquivo íntegro"].map((label, i) => {
            const flag = i === 2;
            return (
              <li
                key={label}
                className={cn("flex items-center gap-3 rounded-lg border px-4 py-3", flag ? "border-terracotta/50 bg-terracotta/[0.08]" : "border-line")}
                style={{ animation: `fade-up 600ms var(--ease-cine) ${i * 110}ms both` }}
              >
                <span className={cn(tile, "h-8 w-11 shrink-0")} />
                <span className="flex-1 text-sm text-cream">{label}</span>
                {flag ? (
                  <span className="flex items-center gap-1.5 text-xs font-medium text-terracotta">
                    <Flag className="size-3.5" /> Revisar
                  </span>
                ) : (
                  <Check className="size-4 text-stone" />
                )}
              </li>
            );
          })}
        </ul>
      );
    default:
      return (
        <div className="grid h-full grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            { icon: FolderCheck, name: "Selecionadas", note: "Alta resolução", hot: true },
            { icon: FolderOpen, name: "Para revisar", note: "Sinalizadas" },
            { icon: FolderLock, name: "Originais", note: "Preservados, intactos" },
          ].map(({ icon: Icon, name, note, hot }, i) => (
            <div
              key={name}
              className={cn("flex items-center gap-4 rounded-xl border p-4 sm:flex-col sm:items-start sm:justify-end sm:p-5", hot ? "border-terracotta/50 bg-terracotta/[0.08]" : "border-line")}
              style={{ animation: `fade-up 700ms var(--ease-cine) ${i * 140}ms both` }}
            >
              <Icon className={cn("size-7 sm:size-9", hot ? "text-terracotta" : "text-stone")} strokeWidth={1.4} />
              <div>
                <p className="text-sm font-medium text-cream">{name}</p>
                <p className="text-xs text-stone">{note}</p>
              </div>
            </div>
          ))}
        </div>
      );
  }
}
