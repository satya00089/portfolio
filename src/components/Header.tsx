// Header.tsx (theme-friendly)
import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export const Header: React.FC<{ links?: { href: string; label: string }[] }> = ({ links = [] }) => {
  const { dark, toggle } = useTheme();

  return (
    <header className="w-full border-theme bg-[var(--surface)]">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 text-lg font-semibold text-[var(--text)]">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-white">Y</div>
          <span className="sr-only">Home</span>
          <span className="hidden sm:block">Satya Subudhi</span>
        </a>

        <nav aria-label="Primary" className="flex items-center gap-4">
          <div className="hidden sm:flex gap-3">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="text-sm text-[var(--text)] hover:underline">
                {l.label}
              </a>
            ))}
          </div>

          <button
            onClick={toggle}
            aria-label="Toggle color theme"
            className="p-2 rounded-md bg-[color:var(--surface)/0.6] border border-[var(--border)]"
          >
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </nav>
      </div>
    </header>
  );
};
