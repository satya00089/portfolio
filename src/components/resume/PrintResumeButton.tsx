import React from "react";
import { AiTwotonePrinter } from "react-icons/ai";

export const PrintResumeButton: React.FC<{ targetId?: string }> = ({
  targetId = "resume-print-area",
}) => {
  const onPrint = () => {
    // Optionally focus the resume container or ensure it's visible
    const el = document.getElementById(targetId);
    if (el) {
      // ensure it is scrolled into view before printing
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      // small delay ensures scroll settles
      setTimeout(() => window.print(), 250);
    } else {
      window.print();
    }
  };

  return (
    <button
      onClick={onPrint}
      aria-label="Print resume"
      className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-[var(--surface)] border border-[var(--border)] shadow-lg hover:scale-110 transition"
    >
      <AiTwotonePrinter className="w-5 h-5 text-[var(--text)]" />
    </button>
  );
};
