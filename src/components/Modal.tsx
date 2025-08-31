import React, { useEffect, useRef } from "react";

export const Modal: React.FC<{
  open: boolean;
  onClose: () => void;
  title?: string;
  children?: React.ReactNode;
}> = ({ open, onClose, title, children }) => {
  const dialogRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // simple focus management: focus the dialog when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => dialogRef.current?.focus(), 0);
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      <div
        onClick={onClose}
        className="absolute inset-0 bg-[color:var(--bg)/0.6] backdrop-blur-sm"
        aria-hidden
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        ref={dialogRef}
        tabIndex={-1}
        className="relative z-10 w-full max-w-3xl p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-lg focus:outline-none"
      >
        <div className="flex items-start justify-between">
          <h3 className="text-xl font-semibold text-[var(--text)]">{title}</h3>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="ml-3 p-2 rounded-md border border-[var(--border)] bg-[var(--surface)]"
          >
            ✕
          </button>
        </div>

        <div className="mt-4 text-[var(--muted)]">{children}</div>
      </div>
    </div>
  );
};
