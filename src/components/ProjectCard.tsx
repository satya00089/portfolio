// ProjectCard.tsx (theme-friendly)
import React from "react";
import { motion } from "framer-motion";

export type Project = {
  id: string | number;
  title: string;
  desc?: string;
  tags?: string[];
  href?: string;
};

export const ProjectCard: React.FC<{ project: Project; onOpen?: (p: Project) => void }> = ({ project, onOpen }) => {
  return (
    <motion.article
      layout
      whileHover={{ y: -6 }}
      className="p-4 rounded-2xl bg-[var(--surface)] border border-[var(--border)] cursor-pointer"
      onClick={() => onOpen?.(project)}
      role={onOpen ? "button" : undefined}
      tabIndex={0}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onOpen?.(project)}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-semibold text-lg text-[var(--text)]">{project.title}</h3>
          <p className="text-sm text-[var(--muted)] mt-1">{project.desc}</p>

          <div className="mt-3 flex gap-2 flex-wrap">
            {project.tags?.map((t) => (
              <span key={t} className="text-xs px-2 py-1 rounded-full bg-[color:var(--border)/0.6] text-[var(--text)]">
                {t}
              </span>
            ))}
          </div>
        </div>
        <div className="text-xs text-[var(--muted)]">→</div>
      </div>
    </motion.article>
  );
};
