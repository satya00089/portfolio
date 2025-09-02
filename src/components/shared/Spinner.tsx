import React from "react";
import { motion } from "framer-motion";

export const Spinner: React.FC<{ size?: number; color?: string }> = ({
  size = 32,
  color = "var(--brand)",
}) => {
  return (
    <motion.div
      className="flex items-center justify-center"
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      style={{
        width: size,
        height: size,
        border: `3px solid ${color}`,
        borderTopColor: "transparent",
        borderRadius: "50%",
      }}
    />
  );
};
