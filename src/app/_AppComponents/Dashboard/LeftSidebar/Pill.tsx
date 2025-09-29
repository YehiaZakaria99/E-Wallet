import React from "react";

export default function Pill({ children }: { children: React.ReactNode }) {
    return <span className="px-2 py-1 rounded-full bg-white/5 text-sm">{children}</span>;
}