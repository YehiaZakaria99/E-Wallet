"use client";

import { cn } from "@/lib/utils"; // لو عندك util للـ classNames
import { useState } from "react";

type StepperProps = {
    step: number;
    steps: number;
};

export function Stepper({ step, steps }: StepperProps) {
    return (
        <div className="flex items-center justify-center ">
            {Array.from({ length: steps }).map((_, index) => {
                const currentStep = index + 1;
                const isActive = step >= currentStep;
                const isCompleted = step > currentStep;

                return (
                    <div key={index} className="flex items-center">
                        {/* Circle */}
                        <div
                            className={cn(
                                "flex items-center justify-center w-10 h-10 rounded-full border-4 transition-colors duration-500",
                                isActive
                                    ? "border-blue-950 text-blue-950"
                                    : "border-blue-950/50 text-blue-950/50"
                            )}
                        >
                            {currentStep}
                        </div>

                        {/* Line */}
                        {currentStep < steps && (
                            <div className="relative w-20 h-1 bg-blue-950/50">
                                <div
                                    className={cn(
                                        "absolute left-0 top-0 h-1 bg-blue-950 transition-all duration-700",
                                        isCompleted ? "w-full" : "w-0"
                                    )}
                                />
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
