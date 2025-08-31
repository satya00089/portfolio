import React from "react";
import { motion } from "framer-motion";

export type Skill = { name: string; level: number };

export const SkillsList: React.FC<{ skills?: Skill[] }> = ({ skills = [] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {skills.map((s) => (
        <div
          key={s.name}
          className="p-4 rounded-xl bg-[var(--surface)] border border-[var(--border)]"
          aria-label={`${s.name} skill ${s.level} percent`}
        >
          <div className="flex justify-between items-center">
            <div className="font-medium text-[var(--text)]">{s.name}</div>
            <div className="text-sm text-[var(--muted)]">{s.level}%</div>
          </div>

          <div className="mt-3 bg-[var(--border)]/40 h-2 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${s.level}%` }}
              transition={{ duration: 0.8 }}
              className="h-2 rounded-full"
              style={{
                // runtime gradient from your theme tokens
                background: "linear-gradient(90deg, var(--brand), var(--accent))",
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
