// components/ScrollProgressBar.tsx
import React from "react";
import { motion, useScroll } from "framer-motion";

export const ScrollProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-0.5 bg-[var(--brand)] origin-left z-[9999]"
      style={{ scaleX: scrollYProgress }}
    />
  );
};
