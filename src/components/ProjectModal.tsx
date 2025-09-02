import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import * as SiIcons from "react-icons/si";
import * as FaIcons from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Project } from "../types/portfolio";
import { tagColors } from "../config/portfolioData";
import { useTheme } from "../context/ThemeContext";


import "github-markdown-css/github-markdown-light.css";
import "github-markdown-css/github-markdown-dark.css";

export const ProjectModal: React.FC<{
  project: Project | null;
  open: boolean;
  onClose: () => void;
}> = ({ project, open, onClose }) => {
  const { dark } = useTheme();
  const [readme, setReadme] = useState<string | null>(null);

  // Try fetching GitHub README if github link exists
  useEffect(() => {
    async function fetchReadme() {
      if (!project) return;
      const githubLink = project.links?.find((l) => l.label === "GitHub");
      if (!githubLink) {
        setReadme(null);
        return;
      }

      try {
        // Extract owner/repo from GitHub URL
        const regex = /github\.com\/([^/]+)\/([^/]+)/;
        const match = regex.exec(githubLink.url);
        if (!match) return;

        const [, owner, repo] = match;
        const res = await fetch(
          `https://raw.githubusercontent.com/${owner}/${repo}/main/README.md`
        );

        if (res.ok) {
          const text = await res.text();
          setReadme(text);
        } else {
          setReadme(null);
        }
      } catch {
        setReadme(null);
      }
    }

    if (open) fetchReadme();
  }, [open, project]);

  return (
    <AnimatePresence>
      {open && project && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            onClick={onClose}
            className="absolute inset-0 bg-[color:var(--bg)/0.6] backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* Modal Content */}
          <motion.dialog
            open={open}
            aria-modal="true"
            className="relative z-10 w-full max-w-3xl rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-lg flex flex-col max-h-[90vh]"
            initial={{ y: 50, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
          >
            {/* Header */}
            <div className="p-6 border-b border-[var(--border)] flex items-center justify-between">
              <h3 className="text-xl font-bold text-[var(--brand)]">
                {project.title}
              </h3>
              <button
                onClick={onClose}
                className="cursor-pointer text-[var(--muted)] hover:text-[var(--text)]"
              >
                ✕
              </button>
            </div>

            {/* Scrollable content */}
            <div className="p-6 overflow-y-auto flex-1">
              {project.image && (
                <div className="w-full flex justify-center mb-4">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="rounded-lg border border-[var(--border)] mb-4 w-full h-auto object-cover max-h-70"
                  />
                </div>
              )}

              <p className="text-sm text-[var(--text)] mb-4">{project.long}</p>

              {/* Links */}
              {project.links && project.links.length > 0 && (
                <div className="flex gap-3 flex-wrap mb-4">
                  {project.href && (
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-3 py-1 text-sm font-medium rounded-md border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] hover:bg-[var(--border)]/30"
                    >
                      🔗 Demo
                    </a>
                  )}
                  {project.links.map((link) => {
                    const Icon =
                      SiIcons[link.icon as keyof typeof SiIcons] ??
                      FaIcons[link.icon as keyof typeof FaIcons];
                    return (
                      <a
                        key={link.label}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 px-3 py-1 text-sm font-medium rounded-md border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] hover:bg-[var(--border)]/30"
                      >
                        {Icon && <Icon className="w-4 h-4" />}
                        {link.label}
                      </a>
                    );
                  })}
                </div>
              )}

              {/* Tags */}
              <div className="mt-3 flex gap-2 flex-wrap">
                {project.tags?.map((t) => (
                  <span
                    key={t}
                    className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      tagColors[t] || "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* README */}
              {readme && (
                <div className="h-full overflow-auto rounded-md border border-[var(--border)] bg-[var(--surface)] mt-6">
                  <div
                    className={`p-4 markdown-body ${
                      dark ? "markdown-body-dark" : "markdown-body-light"
                    }`}
                  >
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {readme}
                    </ReactMarkdown>
                  </div>
                </div>
              )}
            </div>
          </motion.dialog>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
