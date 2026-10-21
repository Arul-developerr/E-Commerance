import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', ...props }, ref) => {
    const variants = {
      primary: "bg-brand-primary text-white hover:bg-[#183aaf]",
      secondary: "bg-brand-secondary text-white hover:bg-[#a7442a]",
      outline: "border border-brand-border bg-white hover:bg-brand-bg text-brand-text-primary",
      ghost: "bg-transparent hover:bg-brand-bg text-brand-text-primary",
      danger: "bg-brand-error text-white hover:bg-[#92232a]",
    };

    const sizes = {
      sm: "min-h-9 px-3 py-2 text-xs",
      md: "min-h-11 px-5 py-2.5 text-sm",
      lg: "min-h-12 px-6 py-3 text-base",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
