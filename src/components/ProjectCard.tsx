// ProjectCard.tsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { tagColors } from "../config/portfolioData";
import type { Project } from "../types/portfolio";
import * as SiIcons from "react-icons/si"; // dynamic icon imports

export const ProjectCard: React.FC<{
  project: Project;
  onOpen?: (p: Project) => void;
}> = ({ project, onOpen }) => {
  const [showAll, setShowAll] = useState(false);

  // how many tags to show before "+x"
  const VISIBLE_COUNT = 3;

  const visibleTags = showAll
    ? project?.tags
    : project?.tags?.slice(0, VISIBLE_COUNT);
  const hiddenCount = (project?.tags?.length ?? 0) - VISIBLE_COUNT;

  return (
    <motion.article
      layout
      whileHover={{ y: -6 }}
      className="p-4 rounded-2xl bg-[var(--surface)] border border-[var(--border)] cursor-pointer"
      onClick={() => onOpen?.(project)}
      role={onOpen ? "button" : undefined}
      tabIndex={0}
      onKeyDown={(e) =>
        (e.key === "Enter" || e.key === " ") && onOpen?.(project)
      }
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          {/* Title + Description */}
          <h3 className="font-semibold text-lg text-[var(--text)]">
            {project.title}
          </h3>
          <p className="text-sm text-[var(--muted)] mt-1">{project.desc}</p>

          {/* Links (dynamic icons) */}
          {project.links && project.links.length > 0 && (
            <div className="mt-4 flex gap-3 flex-wrap text-[var(--muted)]">
              {project.links.map((link) => {
                const Icon = SiIcons[link.icon as keyof typeof SiIcons];
                return (
                  <a
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()} // prevent triggering onOpen
                    className="hover:text-[var(--text)] inline-flex items-center gap-1 text-sm font-medium text-[var(--link)] hover:underline"
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
            {visibleTags?.map((t) => (
              <span
                key={t}
                className={`text-xs font-semibold px-2 py-1 rounded-full ${
                  tagColors[t] || "bg-gray-100 text-gray-800"
                }`}
              >
                {t}
              </span>
            ))}

            {!showAll && hiddenCount > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowAll(true);
                }}
                className="text-xs font-semibold px-2 py-1 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 cursor-pointer"
              >
                +{hiddenCount}
              </button>
            )}
          </div>
        </div>

        {/* Arrow indicator */}
        <div className="text-xs text-[var(--muted)]">→</div>
      </div>
    </motion.article>
  );
};
