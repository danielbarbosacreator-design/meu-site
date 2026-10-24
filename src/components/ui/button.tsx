import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group/btn relative inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-full font-medium tracking-[-0.005em] transition-[background-color,color,box-shadow,transform,border-color] duration-300 ease-[cubic-bezier(.22,1,.36,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-ink active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-terracotta text-ink shadow-[0_0_0_1px_rgb(217_119_87/0.4),0_10px_40px_-10px_rgb(217_119_87/0.55)] hover:bg-[#e2876a] hover:shadow-[0_0_0_1px_rgb(217_119_87/0.6),0_14px_50px_-8px_rgb(217_119_87/0.7)]",
        outline:
          "border border-line-strong bg-white/[0.02] text-cream hover:border-cream/30 hover:bg-white/[0.06]",
        ghost: "text-cream hover:bg-white/[0.06]",
        link: "rounded-none px-0 text-cream underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-5 text-sm",
        sm: "h-9 px-4 text-[13px]",
        lg: "h-14 px-7 text-[15px] sm:h-[60px] sm:px-9 sm:text-base",
        icon: "size-10",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
