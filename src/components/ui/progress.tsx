"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface ProgressProps {
  steps: string[];
  currentStep: number;
  className?: string;
}

export function StepProgress({ steps, currentStep, className }: ProgressProps) {
  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between relative">
        {/* Background line */}
        <div className="absolute left-0 right-0 top-5 h-0.5 bg-navy-100" />
        {/* Active line */}
        <div
          className="absolute left-0 top-5 h-0.5 bg-gradient-to-r from-gold-500 to-gold-300 transition-all duration-500"
          style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
        />

        {steps.map((step, index) => (
          <div key={step} className="flex flex-col items-center relative z-10">
            <div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300",
                index < currentStep
                  ? "bg-gradient-to-r from-gold-500 to-gold-300 text-navy-900 shadow-lg shadow-gold-500/25"
                  : index === currentStep
                  ? "bg-navy-900 text-white ring-4 ring-gold-200"
                  : "bg-navy-100 text-navy-400"
              )}
            >
              {index < currentStep ? (
                <Check className="w-5 h-5" />
              ) : (
                index + 1
              )}
            </div>
            <span
              className={cn(
                "mt-2 text-xs font-medium text-center max-w-[80px]",
                index <= currentStep ? "text-navy-900" : "text-navy-400"
              )}
            >
              {step}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
