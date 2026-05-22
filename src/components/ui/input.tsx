"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, hint, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s/g, "-");
    return (
      <div className="space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-navy-700"
          >
            {label}
          </label>
        )}
        <input
          type={type}
          id={inputId}
          className={cn(
            "flex h-11 w-full rounded-xl border border-navy-200 bg-white px-4 py-2 text-sm text-navy-900 placeholder:text-navy-300 transition-all duration-200",
            "focus:outline-none focus:ring-2 focus:ring-gold-500/40 focus:border-gold-500",
            "hover:border-navy-300",
            "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-navy-50",
            error && "border-error focus:ring-error/40 focus:border-error",
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="text-xs text-error font-medium">{error}</p>}
        {hint && !error && <p className="text-xs text-navy-400">{hint}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
