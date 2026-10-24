import * as React from "react";
import { cn } from "@/lib/utils";

let observer: IntersectionObserver | null = null;

function getObserver() {
  if (observer || typeof IntersectionObserver === "undefined") return observer;
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer?.unobserve(entry.target);
        }
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
  );
  return observer;
}

type RevealProps<T extends React.ElementType> = {
  as?: T;
  delay?: number;
  className?: string;
  children?: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<T>, "as" | "className" | "children">;

/** Fade + slight rise on first entry. One shared observer for the whole page. */
export function Reveal<T extends React.ElementType = "div">({
  as,
  delay = 0,
  className,
  children,
  style,
  ...rest
}: RevealProps<T>) {
  const ref = React.useRef<HTMLElement>(null);
  const Comp = (as ?? "div") as React.ElementType;

  React.useEffect(() => {
    const el = ref.current;
    const io = getObserver();
    if (!el) return;
    if (!io) {
      el.classList.add("is-visible");
      return;
    }
    io.observe(el);
    return () => io.unobserve(el);
  }, []);

  return (
    <Comp
      ref={ref}
      className={cn("reveal", className)}
      style={{ ...(style as React.CSSProperties), ["--reveal-delay" as string]: `${delay}ms` }}
      {...rest}
    >
      {children}
    </Comp>
  );
}
