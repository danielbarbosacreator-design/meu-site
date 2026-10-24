import * as React from "react";
import { cn, prefersReducedMotion } from "@/lib/utils";
import type { Engine } from "@/components/ui/liquid-sculpture/engine";

type Quality = { count: number; maxDpr: number };

function pickQuality(): Quality {
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const small = window.innerWidth < 768;
  const lowCores = (navigator.hardwareConcurrency ?? 8) <= 4;
  if (coarse || small) return { count: lowCores ? 3200 : 5200, maxDpr: 1.5 };
  return { count: lowCores ? 8000 : 14000, maxDpr: 1.75 };
}

/**
 * Interactive lens sculpture. The WebGL engine is code-split and only fetched once the
 * section approaches the viewport; it pauses offscreen and when the tab is hidden.
 * Reduced-motion users and devices without WebGL get the static fallback.
 */
export function LiquidSculpture({ className }: { className?: string }) {
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const [state, setState] = React.useState<"idle" | "live" | "fallback">("idle");

  React.useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    if (prefersReducedMotion() || typeof IntersectionObserver === "undefined") {
      setState("fallback");
      return;
    }

    let engine: Engine | null = null;
    let cancelled = false;
    let visible = false;

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !engine) {
          import("@/components/ui/liquid-sculpture/engine")
            .then(({ createEngine }) => {
              if (cancelled) return;
              engine = createEngine(canvas, pickQuality());
              setState("live");
              if (visible) engine.start();
            })
            .catch(() => !cancelled && setState("fallback"));
        } else if (engine) {
          if (visible) engine.start();
          else engine.stop();
        }
      },
      { rootMargin: "200px 0px" },
    );
    io.observe(wrap);

    const onLost = (e: Event) => {
      e.preventDefault();
      engine?.destroy();
      engine = null;
      setState("fallback");
    };
    canvas.addEventListener("webglcontextlost", onLost);

    return () => {
      cancelled = true;
      io.disconnect();
      canvas.removeEventListener("webglcontextlost", onLost);
      engine?.destroy();
    };
  }, []);

  return (
    <div ref={wrapRef} className={cn("relative", className)}>
      <StaticSculpture
        className={cn(
          "absolute inset-0 transition-opacity duration-1000",
          state === "live" ? "opacity-0" : "opacity-100",
        )}
      />
      <canvas
        ref={canvasRef}
        aria-hidden
        className={cn(
          "absolute inset-0 size-full touch-pan-y transition-opacity duration-1000",
          state === "live" ? "opacity-100" : "opacity-0",
          state === "fallback" && "hidden",
        )}
      />
    </div>
  );
}

/** Static fallback: the same lens + viewfinder composition as a light SVG. */
export function StaticSculpture({ className }: { className?: string }) {
  const blades = Array.from({ length: 7 }, (_, b) => {
    const a0 = (b / 7) * Math.PI * 2;
    const pts = Array.from({ length: 12 }, (_, k) => {
      const t = k / 11;
      const ang = a0 + t * 1.25 + Math.sin(t * Math.PI) * 0.18;
      const rad = 36 + (92 - 36) * t;
      return `${(Math.cos(ang) * rad).toFixed(1)},${(Math.sin(ang) * rad).toFixed(1)}`;
    });
    return `M${pts.join(" L")}`;
  });
  return (
    <svg viewBox="-200 -150 400 300" className={cn("size-full", className)} aria-hidden>
      <defs>
        <radialGradient id="cl-glow" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="scale(130)">
          <stop offset="0" stopColor="#D97757" stopOpacity="0.22" />
          <stop offset="1" stopColor="#D97757" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle r="130" fill="url(#cl-glow)" />
      <g fill="none" strokeLinecap="round">
        {[100, 96, 92].map((r, i) => (
          <circle key={r} r={r} stroke="#F0EEE6" strokeOpacity={0.18 - i * 0.04} strokeWidth="1" strokeDasharray="1 3" />
        ))}
        {blades.map((d, i) => (
          <path key={i} d={d} stroke="#D97757" strokeOpacity="0.6" strokeWidth="1.2" strokeDasharray="1.5 3" />
        ))}
        <circle r="30" stroke="#D97757" strokeOpacity="0.5" strokeWidth="1" />
        <path
          d="M-175 -85V-130h45M175 -85V-130h-45M-175 85V130h45M175 85V130h-45"
          stroke="#D97757"
          strokeOpacity="0.85"
          strokeWidth="1.6"
          strokeDasharray="2 3"
        />
      </g>
    </svg>
  );
}
