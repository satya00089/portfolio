import React, { useEffect, useState } from "react";
import * as SiIcons from "react-icons/si";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Modal } from "./Modal";
import type { Project } from "../types/portfolio";
import { tagColors } from "../config/portfolioData";

import "github-markdown-css/github-markdown-light.css";
import "github-markdown-css/github-markdown-dark.css";
import { useTheme } from "../context/ThemeContext";

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

  if (!project) return null;

  return (
    <Modal open={open} onClose={onClose} title={project.title}>
      {/* Project image */}
      {project.image && (
        <img
          src={project.image}
          alt={project.title}
          className="rounded-lg border border-[var(--border)] mb-4"
        />
      )}

      {/* Description */}
      <p className="text-sm text-[var(--text)] mb-4">{project.long}</p>

      {/* Links */}
      {project.links && project.links.length > 0 && (
        <div className="flex gap-3 flex-wrap mb-4">
          {project.href && (
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3 py-1 text-sm font-medium rounded-md border border-[var(--border)] bg-[var(--surface)] hover:underline"
            >
              🔗 Demo
            </a>
          )}
          {project.links.map((link) => {
            const Icon = (SiIcons as any)[link.icon];
            return (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1 text-sm font-medium rounded-md border border-[var(--border)] bg-[var(--surface)] hover:underline"
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

      {/* README.md if available */}
      {readme && (
        <div className="h-70 overflow-auto rounded-md border border-[var(--border)] bg-[var(--surface)] mt-6">
          <div
            className={`p-4 markdown-body ${
              dark ? "markdown-dark" : "markdown-light"
            }`}
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{readme}</ReactMarkdown>
          </div>
        </div>
      )}
    </Modal>
  );
};
