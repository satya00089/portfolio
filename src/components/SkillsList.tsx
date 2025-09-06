import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import type { Skill } from "../types/portfolio";
import * as SiIcons from "react-icons/si";
import { SkillCircle } from "./SkillCircle";
import { FaChevronUp, FaChevronDown } from "react-icons/fa6";

// include "all" option
const STACKS: (Skill["category"] | "all")[] = [
  "all",
  "frontend",
  "backend",
  "data",
  "database",
  "devops",
  "tooling",
  "other",
];

export const SkillsList: React.FC<{ skills?: Skill[]; isBar?: boolean }> = ({
  skills = [],
  isBar = true,
}) => {
  const [selectedStacks, setSelectedStacks] = useState<
    (Skill["category"] | "all")[]
  >(["all"]);
  const [expanded, setExpanded] = useState(false);

  // toggle stack chip
  const toggleStack = (stack: Skill["category"] | "all") => {
    if (stack === "all") {
      setSelectedStacks(["all"]);
    } else {
      setSelectedStacks((prev) => {
        const withoutAll = prev.filter((s) => s !== "all");
        if (withoutAll.includes(stack)) {
          const newStacks = withoutAll.filter((s) => s !== stack);
          return newStacks.length === 0 ? ["all"] : newStacks;
        } else {
          return [...withoutAll, stack];
        }
      });
    }
  };

  // filtered skills
  const filteredSkills = useMemo(() => {
    if (selectedStacks.includes("all")) return skills;
    return skills.filter((s) => selectedStacks.includes(s.category ?? "other"));
  }, [skills, selectedStacks]);

  // count per stack
  const getCount = (category: Skill["category"] | "all") => {
    if (category === "all") return category.length;
    return skills.filter((s) => (s.category ?? "other") === category).length;
  };

  // Netflix-style grid height
  const rowHeight = 140; // px per row
  const maxHeight = `${rowHeight * 3}px`;

  return (
    <div className="space-y-6">
      {/* stack filter chips */}
      <div className="flex flex-wrap gap-2">
        {STACKS.map((stack) => (
          <button
            key={stack}
            onClick={() => toggleStack(stack)}
            onKeyDown={(e) =>
              (e.key === "Enter" || e.key === " ") && toggleStack(stack)
            }
            tabIndex={0}
            className={`px-3 py-1 rounded-full text-sm border transition capitalize cursor-pointer ${
              selectedStacks.includes(stack)
                ? "bg-[var(--brand)] text-white border-[var(--brand)]"
                : "bg-[var(--surface)] text-[var(--text)] border-[var(--border)] hover:bg-[var(--border)]/30"
            }`}
          >
            {stack === "all" ? "All" : stack} ({getCount(stack)})
          </button>
        ))}
      </div>

      <motion.div
        animate={{ height: expanded ? "auto" : maxHeight }}
        transition={{ duration: 0.5 }}
        className="overflow-hidden"
      >
        <motion.div
          key={selectedStacks.join("-")}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 gap-4"
        >
          {filteredSkills.map((s) => {
            const Icon = SiIcons[s.icon as keyof typeof SiIcons];
            return (
              <div
                key={s.name}
                className="p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)] hover:scale-105 transition duration-300 cursor-pointer text-[var(--muted)] hover:text-[var(--text)]"
                aria-label={`${s.name} skill ${s.level} percent`}
              >
                <div className="flex justify-between items-center">
                  <div className="font-medium">{s.name}</div>
                  {Icon && <Icon className="w-6 h-6" />}
                </div>

                {s.level && isBar && (
                  <div className="mt-3 bg-[var(--border)]/40 h-2 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${s.level}%` }}
                      transition={{ duration: 0.8 }}
                      className="h-2 rounded-full"
                      style={{
                        background:
                          "linear-gradient(90deg, var(--brand), var(--accent))",
                      }}
                    />
                  </div>
                )}
                {s.level && !isBar && (
                  <div className="mt-3 bg-[var(--border)]/40 rounded-full overflow-hidden sm:h-32 sm:w-32 w-24 h-24 mx-auto">
                    <SkillCircle level={s.level} />
                  </div>
                )}
              </div>
            );
          })}
        </motion.div>
      </motion.div>

      {/* expand/collapse button */}
      {filteredSkills.length > 3 * 6 && (
        <div className="flex justify-center">
          <button
            onClick={() => setExpanded((prev) => !prev)}
            className="flex items-center gap-2 px-2 py-2 rounded-full cursor-pointer border-4 border-[var(--border)] bg-[var(--surface)] hover:bg-[var(--border)]/30 text-[var(--text)] transition"
          >
            {expanded ? <FaChevronUp size={24} /> : <FaChevronDown size={24} />}
          </button>
        </div>
      )}
    </div>
  );
};
