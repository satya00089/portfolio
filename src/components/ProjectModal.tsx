import React, { useEffect, useState } from "react";
import * as SiIcons from "react-icons/si";
import * as FaIcons from "react-icons/fa";
import remarkGfm from "remark-gfm";
import type { Project } from "../types/portfolio";
import { tagColors } from "../config/portfolioData";
import { useTheme } from "../context/ThemeContext";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { Spinner } from "./shared/Spinner";

const ReactMarkdown = React.lazy(() => import("react-markdown"));

import "github-markdown-css/github-markdown-light.css";

export const ProjectModal: React.FC<{
  project: Project | null;
  open: boolean;
  onClose: () => void;
}> = ({ project, open, onClose }) => {
  const { dark } = useTheme();
  const [readme, setReadme] = useState<string | null>(null);
  const [iframeAllowed, setIframeAllowed] = useState(false);
  const [activeTab, setActiveTab] = useState<"details" | "playground">(
    "details"
  );
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [iframeReady, setIframeReady] = useState(false);

  const bodyRef = React.useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ container: bodyRef });

  const FaLink = FaIcons["FaLink" as keyof typeof FaIcons];

  // Reset state when modal opens
  useEffect(() => {
    if (open) {
      setActiveTab("details");
      setIframeLoaded(false);
      setIframeReady(false);
    }
  }, [open]);

  // Check if href can be embedded in iframe
  useEffect(() => {
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
  }, [project]);

  // Fetch GitHub README
  useEffect(() => {
    async function fetchReadme() {
      if (!project) return;
      const githubLink = project.links?.find((l) => l.label.toLowerCase() === "github");
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
    <div
      ref={bodyRef}
      className="flex-1 overflow-y-auto mt-2 pr-1 custom-scroll relative"
    >
      {/* progress bar lives *inside* the scroll container */}
      <motion.div
        className="sticky top-0 left-0 right-0 h-1 bg-[var(--border)]/50 z-10"
        style={{ transformOrigin: "left", scaleX: scrollYProgress }}
      />
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
              className="relative z-10 w-full max-w-4xl max-h-[90vh] p-6 rounded-2xl bg-[var(--surface)] border border-[var(--border)] shadow-lg flex flex-col"
              initial={{ y: 50, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 40, opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
            >
              {/* Close */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 cursor-pointer text-[var(--muted)] hover:text-[var(--text)]"
              >
                ✕
              </button>

              {/* Title */}
              <h3 className="text-xl font-bold text-[var(--brand)] mb-2">
                {project.title}
              </h3>

              {/* Tabs (only if iframe allowed) */}
              {iframeAllowed && (
                <div className="flex border-b border-[var(--border)] mb-2">
                  <button
                    onClick={() => setActiveTab("details")}
                    className={`px-4 py-2 text-sm font-medium cursor-pointer ${
                      activeTab === "details"
                        ? "text-[var(--brand)] border-b-2 border-[var(--brand)]"
                        : "text-[var(--muted)] hover:text-[var(--text)]"
                    }`}
                  >
                    Details
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab("playground");
                      setIframeLoaded(true);
                      setIframeReady(false);
                    }}
                    className={`px-4 py-2 text-sm font-medium cursor-pointer ${
                      activeTab === "playground"
                        ? "text-[var(--brand)] border-b-2 border-[var(--brand)]"
                        : "text-[var(--muted)] hover:text-[var(--text)]"
                    }`}
                  >
                    Playground
                  </button>
                </div>
              )}

              {/* Body (scroll only here) */}
              <div className="flex-1 overflow-y-auto pr-1 max-h-[500px] custom-scroll">
                <AnimatePresence mode="wait">
                  {activeTab === "details" && (
                    <motion.div
                      key="details"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* Project image */}
                      {project.image && (
                        <img
                          src={project.image}
                          alt={project.title}
                          className="rounded-lg border border-[var(--border)] mb-4 w-full h-auto object-cover max-h-60"
                        />
                      )}
                      {/* Description */}
                      <p className="text-sm text-[var(--text)] mb-4">
                        {project.description}
                      </p>

                      {/* Links */}
                      {project.links && project.links.length > 0 && (
                        <div className="flex gap-3 flex-wrap mb-4">
                          {project.href && (
                            <a
                              href={project.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-3 py-1 text-sm font-medium rounded-md border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] hover:underline"
                            >
                              {FaLink && <FaLink className="w-4 h-4" />} Demo
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
                                className="inline-flex items-center gap-1 px-3 py-1 text-sm font-medium rounded-md border border-[var(--border)] bg-[var(--surface)] text-[var(--text)] hover:underline"
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
                            className="p-4 markdown-body"
                            style={{
                              backgroundColor: dark ? "#0d1117" : "white",
                              color: dark ? "white" : "black",
                            }}
                          >
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                              {readme}
                            </ReactMarkdown>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}

                  {activeTab === "playground" &&
                    iframeAllowed &&
                    iframeLoaded && (
                      <motion.div
                        key="playground"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="relative"
                      >
                        <AnimatePresence>
                          {!iframeReady && (
                            <motion.div
                              key="spinner"
                              className="absolute inset-0 flex items-center justify-center bg-[var(--surface)]/60 rounded-lg"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.4 }}
                            >
                              <Spinner size={40} color="var(--brand)" />
                            </motion.div>
                          )}
                        </AnimatePresence>

                        <div className="text-right">
                          <a
                            href={project.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-[var(--brand)] hover:underline"
                          >
                            Open Fullscreen ↗
                          </a>
                        </div>

                        <iframe
                          src={project.href}
                          title={project.title}
                          className="w-full h-100 rounded-lg border border-[var(--border)]"
                          loading="lazy"
                          onLoad={() => setIframeReady(true)}
                        />
                      </motion.div>
                    )}
                </AnimatePresence>
              </div>
            </motion.dialog>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
