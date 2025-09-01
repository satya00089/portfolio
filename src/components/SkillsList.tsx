import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import type { Skill } from "../types/portfolio";
import * as SiIcons from "react-icons/si"; // dynamic icon imports
import { SkillCircle } from "./SkillCircle";

// include "all" option
const STACKS: (Skill["stack"] | "all")[] = [
  "all",
  "frontend",
  "backend",
  "ai & ml",
  "database",
  "others",
];

export const SkillsList: React.FC<{ skills?: Skill[]; isBar?: boolean }> = ({
  skills = [],
  isBar = true,
}) => {
  const [selectedStacks, setSelectedStacks] = useState<(Skill["stack"] | "all")[]>([
    "all",
  ]);

  const toggleStack = (stack: Skill["stack"] | "all") => {
    if (stack === "all") {
      // selecting "all" resets everything else
      setSelectedStacks(["all"]);
    } else {
      setSelectedStacks((prev) => {
        const withoutAll = prev.filter((s) => s !== "all");

        if (withoutAll.includes(stack)) {
          // deselect stack
          const newStacks = withoutAll.filter((s) => s !== stack);
          return newStacks.length === 0 ? ["all"] : newStacks; // if none left, fallback to all
        } else {
          // select new stack
          return [...withoutAll, stack];
        }
      });
    }
  };

  // compute filtered skills
  const filteredSkills = useMemo(() => {
    if (selectedStacks.includes("all")) return skills;
    return skills.filter((s) =>
      selectedStacks.includes(s.stack ?? "others")
    );
  }, [skills, selectedStacks]);

  return (
    <div className="space-y-6">
      {/* stack filter chips */}
      <div className="flex flex-wrap gap-2">
        {STACKS.map((stack) => (
          <button
            key={stack}
            onClick={() => toggleStack(stack)}
            className={`px-3 py-1 rounded-full text-sm border transition capitalize cursor-pointer ${
              selectedStacks.includes(stack)
                ? "bg-[var(--brand)] text-white border-[var(--brand)]"
                : "bg-[var(--surface)] text-[var(--text)] border-[var(--border)] hover:bg-[var(--border)]/30"
            }`}
          >
            {stack === "all" ? "All" : stack}
          </button>
        ))}
      </div>

      {/* skills grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {filteredSkills.map((s) => {
          const Icon = SiIcons[s.icon as keyof typeof SiIcons];
          return (
            <div
              key={s.name}
              className="p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)] hover:scale-110 transition duration-300 cursor-pointer text-[var(--muted)] hover:text-[var(--text)]"
              aria-label={`${s.name} skill ${s.level} percent`}
            >
              <div className="flex justify-between items-center">
                <div className="font-medium">{s.name}</div>
                {Icon && <Icon className="w-6 h-6" />}
              </div>

              {isBar ? (
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
              ) : (
                <div className="mt-3 bg-[var(--border)]/40 rounded-full overflow-hidden">
                  <SkillCircle level={s.level} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
