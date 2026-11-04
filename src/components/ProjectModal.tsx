import React, { Suspense, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import * as SiIcons from "react-icons/si";
import * as FaIcons from "react-icons/fa";
import remarkGfm from "remark-gfm";
import type { Project } from "../types/portfolio";
import "github-markdown-css/github-markdown-light.css";

const ReactMarkdown = React.lazy(() => import("react-markdown"));

export const ProjectModal: React.FC<{
  project: Project | null;
  open: boolean;
  onClose: () => void;
}> = ({ project, open, onClose }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [readme, setReadme] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"details" | "playground">("details");
  const [iframeReady, setIframeReady] = useState(false);
  const iframeAllowed = Boolean(project?.href && /^(https?:\/\/)([^/]+\.)?(github\.io|vercel\.app|netlify\.app)(\/|$)/i.test(project.href));

  useEffect(() => {
    if (!open || !dialogRef.current) return;
    const dialog = dialogRef.current;
    const previouslyFocused = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (!dialog.open) dialog.showModal();
    closeRef.current?.focus();
    return () => {
      if (dialog.open) dialog.close();
      document.body.style.overflow = previousOverflow;
      if (previouslyFocused?.isConnected) previouslyFocused.focus();
    };
  }, [open]);

  useEffect(() => {
    if (!open || !project) return;
    const controller = new AbortController();
    setReadme(null);
    setActiveTab("details");
    setIframeReady(false);
    const github = project.links?.find((link) => link.label.toLowerCase() === "github");
    const match = github?.url.match(/^https?:\/\/(?:www\.)?github\.com\/([^/]+)\/([^/#?]+)/i);
    if (match) {
      const owner = match[1];
      const repo = match[2].replace(/\.git$/, "");
      fetch(`https://raw.githubusercontent.com/${owner}/${repo}/main/README.md`, { signal: controller.signal })
        .then((response) => response.ok ? response.text() : null)
        .then((content) => { if (!controller.signal.aborted) setReadme(content); })
        .catch(() => { if (!controller.signal.aborted) setReadme(null); });
    }
    return () => controller.abort();
  }, [open, project]);

  if (!open || !project) return null;

  return createPortal(
    <dialog
      ref={dialogRef}
      className="project-dialog"
      aria-labelledby="project-dialog-title"
      onCancel={(event) => { event.preventDefault(); onClose(); }}
      onClick={(event) => { if (event.target === event.currentTarget) onClose(); }}
    >
      <header className="project-dialog__header">
        <div>
          <p className="project-dialog__eyebrow">Selected work / Project details</p>
          <h2 id="project-dialog-title">{project.title}</h2>
        </div>
        <button ref={closeRef} type="button" className="project-dialog__close" aria-label="Close project details" onClick={onClose}>×</button>
      </header>

      {iframeAllowed && (
        <div className="project-dialog__tabs" role="tablist" aria-label="Project view">
          <button type="button" role="tab" id="project-tab-details" aria-controls="project-panel-details" aria-selected={activeTab === "details"} tabIndex={activeTab === "details" ? 0 : -1} onClick={() => setActiveTab("details")} onKeyDown={(event) => { if (event.key === "ArrowRight") { event.preventDefault(); setActiveTab("playground"); document.getElementById("project-tab-playground")?.focus(); } }}>Details</button>
          <button type="button" role="tab" id="project-tab-playground" aria-controls="project-panel-playground" aria-selected={activeTab === "playground"} tabIndex={activeTab === "playground" ? 0 : -1} onClick={() => { setIframeReady(false); setActiveTab("playground"); }} onKeyDown={(event) => { if (event.key === "ArrowLeft") { event.preventDefault(); setActiveTab("details"); document.getElementById("project-tab-details")?.focus(); } }}>Playground</button>
        </div>
      )}

      <div className="project-dialog__body">
        {activeTab === "details" ? (
          <div id="project-panel-details" role={iframeAllowed ? "tabpanel" : undefined} aria-labelledby={iframeAllowed ? "project-tab-details" : undefined}>
            {project.image && (
              <div className="project-dialog__preview">
                <img src={project.image} alt={project.imageAlt ?? `${project.title} preview`} className={project.imageFit === "contain" ? "is-contained" : undefined} />
              </div>
            )}
            {project.description && <p className="project-dialog__description">{project.description}</p>}
            {(project.href || Boolean(project.links?.length)) && (
              <div className="project-dialog__links">
                {project.href && <a href={project.href} target="_blank" rel="noopener noreferrer">Visit project <span aria-hidden="true">↗</span></a>}
                {project.links?.map((link) => {
                  const Icon = link.icon ? (SiIcons[link.icon as keyof typeof SiIcons] ?? FaIcons[link.icon as keyof typeof FaIcons]) : undefined;
                  return <a key={`${link.label}-${link.url}`} href={link.url} target="_blank" rel="noopener noreferrer">{Icon && <Icon aria-hidden="true" />} {link.label} <span aria-hidden="true">↗</span></a>;
                })}
              </div>
            )}
            {Boolean(project.tags?.length) && <div className="project-dialog__tags" aria-label="Technologies">{project.tags?.map((tag) => <span key={tag}>{tag}</span>)}</div>}
            {readme && (
              <details className="project-dialog__readme">
                <summary>Read project README <span aria-hidden="true">＋</span></summary>
                <div className="markdown-body"><Suspense fallback={<p>Loading README…</p>}><ReactMarkdown remarkPlugins={[remarkGfm]}>{readme}</ReactMarkdown></Suspense></div>
              </details>
            )}
          </div>
        ) : (
          <div id="project-panel-playground" role="tabpanel" aria-labelledby="project-tab-playground" className="project-dialog__playground">
            <p>If the preview doesn’t load, <a href={project.href} target="_blank" rel="noopener noreferrer">open the project in a new tab ↗</a>.</p>
            {!iframeReady && <p role="status">Loading preview…</p>}
            <iframe src={project.href} title={`${project.title} playground`} loading="lazy" onLoad={() => setIframeReady(true)} />
          </div>
        )}
      </div>
    </dialog>,
    document.body,
  );
};
