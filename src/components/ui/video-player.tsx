import * as React from "react";
import { Play } from "lucide-react";

import type { VideoSource } from "@/config/site";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type VideoPlayerProps = {
  id: "hero" | "demo";
  source: VideoSource;
  title: string;
  /** Shown inside the frame while no video has been configured. */
  pendingTitle: string;
  pendingNote: string;
  priority?: boolean;
  className?: string;
};

const MILESTONES = [25, 50, 75, 100];

function useProgressTracker(id: string) {
  const sent = React.useRef(new Set<number>());
  const started = React.useRef(false);
  return React.useCallback(
    (kind: "start" | "progress", percent = 0) => {
      if (kind === "start") {
        if (started.current) return;
        started.current = true;
        track("video_start", { video_id: id });
        return;
      }
      for (const m of MILESTONES) {
        if (percent >= m && !sent.current.has(m)) {
          sent.current.add(m);
          track("video_progress", { video_id: id, video_percent: m });
        }
      }
    },
    [id],
  );
}

/**
 * 16:9 player with three modes: self-hosted MP4, Vimeo (click-to-load facade) or an
 * honest "not provided yet" slot. Never autoplays with sound; the frame reserves its
 * space up front so nothing shifts when the media loads.
 */
export function VideoPlayer({ id, source, title, pendingTitle, pendingNote, priority, className }: VideoPlayerProps) {
  const [active, setActive] = React.useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const iframeRef = React.useRef<HTMLIFrameElement>(null);
  const report = useProgressTracker(id);
  const mode: "mp4" | "vimeo" | "pending" = source.mp4 ? "mp4" : source.vimeoId ? "vimeo" : "pending";

  // Vimeo progress via the player postMessage API (no extra SDK)
  React.useEffect(() => {
    if (mode !== "vimeo" || !active) return;
    const onMessage = (e: MessageEvent) => {
      if (!/^https:\/\/player\.vimeo\.com$/.test(e.origin)) return;
      let data: { event?: string; data?: { percent?: number } };
      try {
        data = typeof e.data === "string" ? JSON.parse(e.data) : e.data;
      } catch {
        return;
      }
      if (data.event === "ready") {
        for (const ev of ["play", "timeupdate"]) {
          iframeRef.current?.contentWindow?.postMessage(JSON.stringify({ method: "addEventListener", value: ev }), "https://player.vimeo.com");
        }
      }
      if (data.event === "play") report("start");
      if (data.event === "timeupdate" && data.data?.percent != null) report("progress", data.data.percent * 100);
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [mode, active, report]);

  const start = () => {
    setActive(true);
    if (mode === "mp4") {
      requestAnimationFrame(() => {
        void videoRef.current?.play().catch(() => {
          /* user can press play in native controls */
        });
      });
    }
  };

  return (
    <div
      className={cn(
        "group/video relative aspect-video w-full overflow-hidden rounded-[14px] border border-line-strong bg-graphite shadow-[0_40px_120px_-40px_rgb(0_0_0/0.9)] sm:rounded-[20px]",
        className,
      )}
    >
      {mode === "mp4" && (
        <video
          ref={videoRef}
          className="absolute inset-0 size-full bg-ink object-cover"
          src={source.mp4}
          poster={source.poster || undefined}
          preload={active ? "auto" : "none"}
          playsInline
          controls={active}
          aria-label={title}
          onPlay={() => report("start")}
          onTimeUpdate={(e) => {
            const v = e.currentTarget;
            if (v.duration) report("progress", (v.currentTime / v.duration) * 100);
          }}
          onEnded={() => report("progress", 100)}
        />
      )}

      {mode === "vimeo" && active && (
        <iframe
          ref={iframeRef}
          className="absolute inset-0 size-full"
          src={`https://player.vimeo.com/video/${encodeURIComponent(source.vimeoId)}?autoplay=1&dnt=1&title=0&byline=0&portrait=0&color=D97757&api=1`}
          title={title}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
        />
      )}

      {/* Poster / facade layer */}
      {!active && (
        <div className="absolute inset-0">
          {source.poster ? (
            <img
              src={source.poster}
              alt=""
              className="size-full object-cover"
              fetchPriority={priority ? "high" : "auto"}
              loading={priority ? "eager" : "lazy"}
              decoding="async"
            />
          ) : (
            <FrameBackdrop />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-ink/20" />
        </div>
      )}

      {!active && mode !== "pending" && (
        <button
          type="button"
          onClick={start}
          className="absolute inset-0 flex flex-col items-center justify-center gap-5 text-cream focus-visible:outline-none"
          aria-label={`Reproduzir vídeo: ${title}`}
        >
          <span className="relative grid size-20 place-items-center rounded-full bg-terracotta text-ink shadow-[0_0_0_10px_rgb(217_119_87/0.14),0_20px_60px_-10px_rgb(217_119_87/0.7)] transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover/video:scale-[1.06] group-focus-visible/video:ring-2 sm:size-24">
            <Play className="ml-1 size-7 fill-current sm:size-8" strokeWidth={0} />
          </span>
          <span className="text-sm font-medium tracking-wide text-cream/90">{title}</span>
        </button>
      )}

      {mode === "pending" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center sm:gap-4">
          <span
            aria-hidden
            className="grid size-12 place-items-center rounded-full border border-line-strong bg-white/[0.03] text-stone sm:size-20"
          >
            <Play className="ml-0.5 size-5 sm:ml-1 sm:size-7" />
          </span>
          <div>
            <p className="text-sm font-medium text-cream sm:text-base">{pendingTitle}</p>
            <p className="mx-auto mt-1.5 hidden max-w-sm text-sm leading-relaxed text-stone sm:block">{pendingNote}</p>
          </div>
          {import.meta.env.DEV && (
            <code className="rounded-md border border-dashed border-terracotta/40 px-2 py-1 text-[10px] text-terracotta/90 sm:text-[11px]">
              DEV: defina VITE_{id.toUpperCase()}_VIDEO_MP4 ou VITE_{id.toUpperCase()}_VIDEO_VIMEO_ID
            </code>
          )}
        </div>
      )}
    </div>
  );
}

/** Branded viewfinder backdrop used while no poster image exists. */
function FrameBackdrop() {
  return (
    <div className="grain relative size-full bg-[radial-gradient(120%_90%_at_50%_0%,#23201d_0%,#151413_55%,#111110_100%)]">
      <svg className="absolute inset-0 size-full text-cream/[0.14]" viewBox="0 0 160 90" preserveAspectRatio="none" aria-hidden>
        <g fill="none" stroke="currentColor" strokeWidth="0.3" vectorEffect="non-scaling-stroke">
          <path d="M8 18V8h14M152 18V8h-14M8 72v10h14M152 72v10h-14" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
          <path d="M53.3 8v74M106.6 8v74M8 32h144M8 58h144" opacity="0.5" />
        </g>
      </svg>
      <div className="absolute left-4 top-4 flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] text-stone/70 sm:left-6 sm:top-6">
        <span className="size-1.5 rounded-full bg-terracotta" />
        CINELANE · 16:9
      </div>
    </div>
  );
}
