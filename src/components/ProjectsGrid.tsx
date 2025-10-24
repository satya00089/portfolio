import React, { useMemo, useState } from "react";
import { ProjectCard } from "./ProjectCard";
import type { Project } from "../types/portfolio";

export const ProjectsGrid: React.FC<{
  projects?: Project[];
  onOpen?: (p: Project) => void;
  showFilters?: boolean;
}> = ({ projects = [], onOpen, showFilters = false }) => {
  const [filter, setFilter] = useState<string>("All");
  const filters = useMemo(
    () => [
      "All",
      ...Array.from(new Set(projects.flatMap((p) => p.tags || []))),
    ],
    [projects]
  );
  const visible = projects.filter(
    (p) => filter === "All" || (p.tags || []).includes(filter)
  );

  return (
    <section>
      {showFilters && (
        <div className="flex gap-3 flex-wrap">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 cursor-pointer font-semibold rounded-full text-sm ${
                filter === f
                  ? "bg-[var(--brand)] text-white"
                  : "bg-[var(--surface)] border border-[var(--border)] text-[var(--text)]"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      )}

      <div
        className={`${
          showFilters ? "mt-6" : ""
        } grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`}
      >
        {visible.map((p) => (
          <ProjectCard key={p.id} project={p} onOpen={onOpen} />
        ))}
      </div>
    </section>
  );
};
