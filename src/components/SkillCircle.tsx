import { motion } from "framer-motion";

export const SkillCircle: React.FC<{ level: number }> = ({ level }) => {
  const size = 100; // "virtual" size for viewBox
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (level / 100) * circumference;

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      preserveAspectRatio="xMidYMid meet"
      className="w-full h-auto rotate-[-90deg]" // scales to parent width
    >
      {/* Background circle */}
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="var(--border)"
        strokeWidth={strokeWidth}
        fill="transparent"
      />

      {/* Animated foreground circle */}
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="url(#gradient)"
        strokeWidth={strokeWidth}
        fill="transparent"
        strokeDasharray={circumference}
        strokeDashoffset={circumference}
        animate={{ strokeDashoffset: circumference - progress }}
        transition={{ duration: 1, ease: "easeInOut" }}
        strokeLinecap="round"
      />

      {/* Percentage text */}
      <text
        x="50%"
        y="-50%"
        dy="0.3em"
        textAnchor="middle"
        className="fill-[var(--text)] text-sm font-semibold rotate-[90deg]"
      >
        {level}%
      </text>

      {/* Gradient */}
      <defs>
        <linearGradient id="gradient" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--brand)" />
          <stop offset="100%" stopColor="var(--accent)" />
        </linearGradient>
      </defs>
    </svg>
  );
};
