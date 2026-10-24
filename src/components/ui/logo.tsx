import { cn } from "@/lib/utils";

/** CINELANE mark: viewfinder corners around a focus point. Own identity, no third-party marks. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden className={cn("size-7", className)}>
      <g fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
        <path d="M6 11V6h5M26 11V6h-5M6 21v5h5M26 21v5h-5" />
        <circle cx="16" cy="16" r="4.6" />
      </g>
      <circle cx="16" cy="16" r="1.4" fill="currentColor" />
    </svg>
  );
}

export function Logo({ className, showTagline = true }: { className?: string; showTagline?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <LogoMark className="text-terracotta" />
      <span className="flex flex-col leading-none">
        <span className="text-[15px] font-semibold tracking-[0.28em] text-ivory">CINELANE</span>
        {showTagline && (
          <span className="mt-1.5 text-[9.5px] font-medium uppercase tracking-[0.2em] text-stone">
            Skill para Claude
          </span>
        )}
      </span>
    </span>
  );
}
