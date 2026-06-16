import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "success" | "warning" | "error";
}

const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = "default", ...props }, ref) => {
    const variants = {
      default: "border-transparent bg-terracotta text-white shadow hover:bg-terracotta/80",
      secondary: "border-transparent bg-surface-2 text-slate-200 hover:bg-surface-2/80",
      outline: "text-slate-300 border-white/20",
      success: "border-transparent bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
      warning: "border-transparent bg-amber-500/10 text-amber-400 border border-amber-500/20",
      error: "border-transparent bg-red-500/10 text-red-400 border border-red-500/20",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-terracotta focus:ring-offset-2 focus:ring-offset-background",
          variants[variant],
          className
        )}
        {...props}
      />
    );
  }
);

Badge.displayName = "Badge";

export { Badge };
