import * as React from "react";
import { ImageIcon, MoveHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

export type ComparisonPair = {
  before: string;
  after: string;
  alt: string;
  /** Short real context, e.g. "RAW Canon R6 · LUT do fotógrafo · tratamento sem retoque manual" */
  caption: string;
};

/**
 * Accessible before/after slider (pointer drag + keyboard via native range input).
 * With no pair supplied it renders an explicit slot instead of a fabricated result.
 */
export function BeforeAfter({ pair, className, slotLabel }: { pair?: ComparisonPair; className?: string; slotLabel: string }) {
  const [pos, setPos] = React.useState(50);

  if (!pair) {
    return (
      <figure
        className={cn(
          "relative flex aspect-[4/5] flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl border border-dashed border-line-strong bg-graphite/60 p-6 text-center sm:aspect-[3/2]",
          className,
        )}
      >
        <div className="absolute inset-y-0 left-1/2 w-px bg-line-strong" aria-hidden />
        <span className="absolute left-4 top-4 rounded-full bg-ink/80 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-stone">
          Antes
        </span>
        <span className="absolute right-4 top-4 rounded-full bg-ink/80 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-stone">
          Depois
        </span>
        <span className="relative grid size-12 place-items-center rounded-full border border-line-strong bg-ink text-stone">
          <ImageIcon className="size-5" />
        </span>
        <figcaption className="relative max-w-xs text-sm leading-relaxed text-stone">{slotLabel}</figcaption>
      </figure>
    );
  }

  return (
    <figure className={cn("group relative overflow-hidden rounded-2xl border border-line-strong bg-graphite", className)}>
      <div className="relative aspect-[4/5] select-none sm:aspect-[3/2]">
        <img src={pair.after} alt={`${pair.alt} — depois`} className="absolute inset-0 size-full object-cover" loading="lazy" decoding="async" />
        <img
          src={pair.before}
          alt={`${pair.alt} — antes`}
          className="absolute inset-0 size-full object-cover"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
          loading="lazy"
          decoding="async"
        />
        <div className="pointer-events-none absolute inset-y-0 w-px bg-ivory/90" style={{ left: `${pos}%` }}>
          <span className="absolute left-1/2 top-1/2 grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-ivory text-ink shadow-xl">
            <MoveHorizontal className="size-5" />
          </span>
        </div>
        <span className="absolute left-4 top-4 rounded-full bg-ink/80 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-cream">Antes</span>
        <span className="absolute right-4 top-4 rounded-full bg-ink/80 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.18em] text-cream">Depois</span>
        <input
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label="Comparar antes e depois"
          className="absolute inset-0 size-full cursor-ew-resize opacity-0"
        />
      </div>
      <figcaption className="border-t border-line px-5 py-4 text-sm text-stone">{pair.caption}</figcaption>
    </figure>
  );
}
