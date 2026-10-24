import { ArrowRight } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { goToCheckout } from "@/lib/checkout";
import { cn } from "@/lib/utils";

type CtaButtonProps = Omit<ButtonProps, "onClick" | "children"> & {
  label: string;
  /** Where on the page the click happened — sent with initiate_checkout. */
  placement: string;
};

/** Every purchase CTA goes through here, so all of them reach the same checkout. */
export function CtaButton({ label, placement, className, size = "lg", ...props }: CtaButtonProps) {
  return (
    <Button
      type="button"
      size={size}
      onClick={() => goToCheckout(placement)}
      className={cn("uppercase tracking-[0.08em]", className)}
      {...props}
    >
      {label}
      <ArrowRight className="transition-transform duration-300 group-hover/btn:translate-x-1" />
    </Button>
  );
}
