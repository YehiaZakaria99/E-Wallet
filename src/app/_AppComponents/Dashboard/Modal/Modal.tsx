import { useEffect } from "react";

export default function Modal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [onClose]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-blue-950/50" onClick={() => onClose()} />
            <div className="relative z-10 w-full max-w-2xl py-5 mx-4 ">{children}</div>
        </div>
    );
}