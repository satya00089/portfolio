import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaArrowUp } from "react-icons/fa6";

export const ScrollToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.button
      onClick={scrollToTop}
      initial={{ opacity: 0, scale: 0 }}
      animate={visible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="
        fixed bottom-6 right-6 z-50
        p-3 rounded-full
        bg-[var(--surface)] border border-[var(--border)]
        shadow-lg cursor-pointer
        hover:scale-110 transition
      "
      aria-label="Scroll to top"
    >
      <FaArrowUp className="w-5 h-5 text-[var(--text)]" />
    </motion.button>
  );
};
