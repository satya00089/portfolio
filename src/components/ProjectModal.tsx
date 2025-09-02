import React, { useEffect, useState } from "react";
import * as SiIcons from "react-icons/si";
import * as FaIcons from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Project } from "../types/portfolio";
import { tagColors } from "../config/portfolioData";
import { useTheme } from "../context/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";

import "github-markdown-css/github-markdown-light.css";
import "github-markdown-css/github-markdown-dark.css";

export const ProjectModal: React.FC<{
  project: Project | null;
  open: boolean;
  onClose: () => void;
}> = ({ project, open, onClose }) => {
  const { dark } = useTheme();
  const [readme, setReadme] = useState<string | null>(null);
  const [iframeAllowed, setIframeAllowed] = useState(false);
  const [activeTab, setActiveTab] = useState<"playground" | "details">(
    "playground"
  );

  // Reset tab when modal opens
  useEffect(() => {
    if (open) setActiveTab("playground");
  }, [open]);

  // Check if href can be embedded in iframe
  useEffect(() => {
    async function checkIframe() {
      if (!project?.href) {
        setIframeAllowed(false);
        return;
      }
      if (
        project.href.includes("github.io") ||
        project.href.includes("vercel.app") ||
        project.href.includes("netlify.app")
      ) {
        setIframeAllowed(true);
      } else {
        setIframeAllowed(false);
      }
    }
    if (open) checkIframe();
  }, [open, project]);

  // Fetch GitHub README
  useEffect(() => {
    async function fetchReadme() {
      if (!project) return;
      const githubLink = project.links?.find((l) => l.label === "GitHub");
      if (!githubLink) {
        setReadme(null);
        return;
      }

      try {
        const regex = /github\.com\/([^/]+)\/([^/]+)/;
        const match = regex.exec(githubLink.url);
        if (!match) return;

        const [, owner, repo] = match;
        const res = await fetch(
          `https://raw.githubusercontent.com/${owner}/${repo}/main/README.md`
        );

        if (res.ok) {
          setReadme(await res.text());
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
            className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-lg"
            initial={{ y: 50, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.95 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-[var(--muted)] hover:text-[var(--text)]"
            >
              ✕
            </button>

            {/* Tabs */}
            <div className="flex border-b border-[var(--border)] mb-4">
              <button
                onClick={() => setActiveTab("playground")}
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === "playground"
                    ? "text-[var(--brand)] border-b-2 border-[var(--brand)]"
                    : "text-[var(--muted)] hover:text-[var(--text)]"
                }`}
              >
                Playground
              </button>
              <button
                onClick={() => setActiveTab("details")}
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === "details"
                    ? "text-[var(--brand)] border-b-2 border-[var(--brand)]"
                    : "text-[var(--muted)] hover:text-[var(--text)]"
                }`}
              >
                Details
              </button>
            </div>

            {/* Playground Tab */}
            {activeTab === "playground" && (
              <div>
                {iframeAllowed ? (
                  <div className="mb-4">
                    <iframe
                      src={project.href}
                      title={project.title}
                      className="w-full h-[400px] rounded-lg border border-[var(--border)]"
                      loading="lazy"
                    />
                    <div className="mt-2 text-right">
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-[var(--brand)] hover:underline"
                      >
                        Open Fullscreen ↗
                      </a>
                    </div>
                  </div>
                ) : project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="rounded-lg border border-[var(--border)] mb-4"
                  />
                ) : null}
              </div>
            )}

            {/* Details Tab */}
            {activeTab === "details" && (
              <div>
                {/* Description */}
                <p className="text-sm text-[var(--text)] mb-4">
                  {project.long}
                </p>

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
                      const Icon =
                        SiIcons[link.icon as keyof typeof SiIcons] ??
                        FaIcons[link.icon as keyof typeof FaIcons];
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

                {/* README */}
                {readme && (
                  <div className="h-70 overflow-auto rounded-md border border-[var(--border)] bg-[var(--surface)] mt-6">
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
            )}
          </motion.dialog>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
