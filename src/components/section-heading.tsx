import type { ReactNode } from "react";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  className,
  id,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  className?: string;
  id?: string;
}) {
  return (
    <div className={cn(align === "center" && "mx-auto text-center", "max-w-3xl", className)}>
      {eyebrow && (
        <Reveal as="p" className={cn("eyebrow mb-5 flex items-center gap-3", align === "center" && "justify-center")}>
          <span className="h-px w-6 bg-terracotta" aria-hidden />
          {eyebrow}
        </Reveal>
      )}
      <Reveal as="h2" id={id} delay={60} className="display text-[36px] leading-[1.04] sm:text-5xl lg:text-[64px]">
        {title}
      </Reveal>
      {lead && (
        <Reveal as="div" delay={140} className={cn("body-copy mt-6 max-w-2xl", align === "center" && "mx-auto")}>
          {lead}
        </Reveal>
      )}
    </div>
  );
}

export function Em({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn("editorial text-terracotta", className)}>{children}</span>;
}
