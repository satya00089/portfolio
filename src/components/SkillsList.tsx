import React from "react";
import { motion } from "framer-motion";
import type { Skill } from "../types/portfolio";
import * as SiIcons from "react-icons/si"; // dynamic icon imports
import { SkillCircle } from "./SkillCircle";


export const SkillsList: React.FC<{ skills?: Skill[]; isBar?: boolean }> = ({
  skills = [],
  isBar = true,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 gap-4">
      {skills.map((s) => {
        const Icon = SiIcons[s.icon as keyof typeof SiIcons];
        return (
          <div
            key={s.name}
            className="p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)] hover:scale-110 transition duration-300 cursor-pointer text-[var(--muted)] hover:text-[var(--text)]"
            aria-label={`${s.name} skill ${s.level} percent`}
          >
            <div className="flex justify-between items-center">
              <div className="font-medium">{s.name}</div>
              {Icon && <Icon className="w-4 h-4" />}
            </div>
            {isBar ? (
              <div className="mt-3 bg-[var(--border)]/40 h-2 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${s.level}%` }}
                  transition={{ duration: 0.8 }}
                  className="h-2 rounded-full"
                  style={{
                    // runtime gradient from your theme tokens
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
  );
};
