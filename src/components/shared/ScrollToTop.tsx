import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";

const SHOW_AFTER = 300;
const FLY_MS = 900;

const containerVariants: Variants = {
  hidden: { opacity: 0, scale: 0.7, y: 12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 22 },
  },
  flying: (distance: number) => ({
    opacity: 0,
    y: -distance,
    rotate: -6,
    scale: 0.7,
    transition: { duration: FLY_MS / 1000, ease: "easeIn" },
  }),
};

export const ScrollToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [flying, setFlying] = useState(false);
  const [distance, setDistance] = useState(0);
  const prefersReducedMotion = useRef(false);

  let animationState: "flying" | "visible" | "hidden";
  if (flying) {
    animationState = "flying";
  } else if (visible) {
    animationState = "visible";
  } else {
    animationState = "hidden";
  }

  useEffect(() => {
    if (typeof window !== "undefined" && "matchMedia" in window) {
      prefersReducedMotion.current = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
    }

    const onScroll = () => {
      // Only show button if not currently flying
      if (!flying) {
        setVisible(window.scrollY > SHOW_AFTER);
      }
    };

    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [flying]);

  const onActivate = () => {
    if (prefersReducedMotion.current) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const d = window.innerHeight + 220;
    setDistance(d);
    setFlying(true);

    window.scrollTo({ top: 0, behavior: "smooth" });

    // after flight, hide button completely until user scrolls again
    setTimeout(() => {
      setFlying(false);
      setVisible(false); // keep hidden until scroll
    }, FLY_MS + 150);
  };

  return (
    <motion.button
      aria-label="Scroll to top"
      type="button"
      className="fixed bottom-6 right-6 z-50 focus:outline-none cursor-pointer"
      style={{ display: "grid", placeItems: "center" }}
      onClick={onActivate}
      initial="hidden"
      animate={animationState}
      variants={containerVariants}
      custom={distance}
    >
      <motion.img
        src="./hero-up.png"
        alt=""
        width={42}
        height={42}
        style={{ pointerEvents: "none", display: "block" }}
        initial={{ y: 0, rotate: 0 }}
        animate={
          visible && !flying && !prefersReducedMotion.current
            ? { y: [0, -3, 0], rotate: [0, -2, 0] }
            : undefined
        }
        transition={
          visible && !flying && !prefersReducedMotion.current
            ? { duration: 1.4, repeat: Infinity, ease: "easeInOut" }
            : undefined
        }
        whileTap={{ scale: 0.95 }}
      />
    </motion.button>
  );
};

export default ScrollToTop;
