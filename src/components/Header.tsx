import React from "react";
import { useTheme } from "../context/ThemeContext";
import { PERSONAL } from "../config/portfolioData";
import { PiSunDuotone, PiMoonDuotone } from "react-icons/pi";


export const Header: React.FC<{
  links?: { href: string; label: string }[];
}> = ({ links = [] }) => {
  const { dark, toggle } = useTheme();

  return (
    <header className="w-full border-theme bg-[var(--surface)]">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a
          href="/"
          className="flex items-center gap-3 text-lg font-semibold text-[var(--text)]"
        >
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-pink-500 flex items-center justify-center text-white font-bold">{PERSONAL.name?.split(' ')[0]?.[0] || 'Y'}</div>
          <span className="sr-only">Home</span>
          <div>
            <div className="font-semibold text-[var(--brand)]">{PERSONAL.name}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {PERSONAL.title}
            </div>
          </div>
        </a>

        <nav aria-label="Primary" className="flex items-center gap-4">
          <div className="hidden sm:flex gap-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-[var(--text)] hover:underline duration-300 hover:scale-110 transition"
              >
                {l.label}
              </a>
            ))}
          </div>

          <button
            onClick={toggle}
            aria-label="Toggle color theme"
            className="p-2 rounded-md bg-[color:var(--surface)/0.6] cursor-pointer hover:bg-[color:var(--surface)/0.8] duration-300 hover:scale-110 transition"
          >
            {dark ? <PiSunDuotone size={24} /> : <PiMoonDuotone size={24} />}
          </button>
        </nav>
      </div>
    </header>
  );
};
