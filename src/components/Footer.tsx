import React from "react";
import { SiKaggle, SiGithub, SiLinkedin } from "react-icons/si";

export const Footer: React.FC = () => {
  return (
    <footer className="text-sm text-[var(--muted)] border-t border-[var(--border)] py-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 px-6">
        {/* Left: message */}
        <div>
          Designed &amp; coded with ☕ + ❤️ by{" "}
          <span className="font-medium text-[var(--text)]">satya</span>
        </div>

        {/* Right: social icons */}
        <div className="flex items-center gap-4">
          <a
            href="https://www.kaggle.com/satyasubudhi"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Kaggle"
            className="hover:text-[var(--text)] transition-colors"
          >
            <SiKaggle size={40} />
          </a>
          <a
            href="https://github.com/satya00089"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hover:text-[var(--text)] transition-colors"
          >
            <SiGithub size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/satya-subudhi/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-[var(--text)] transition-colors"
          >
            <SiLinkedin size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};
