import React, { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import flyingTraveler from "../../assets/flying-traveler.webp";

const SHOW_AFTER = 300;
const FLIGHT_DURATION = 900;

export const ScrollToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [flying, setFlying] = useState(false);
  const [distance, setDistance] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const updateVisibility = () => setVisible(window.scrollY > SHOW_AFTER);
    window.addEventListener("scroll", updateVisibility, { passive: true });
    updateVisibility();
    return () => {
      window.removeEventListener("scroll", updateVisibility);
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const onActivate = () => {
    if (reduceMotion) {
      window.scrollTo({ top: 0, behavior: "instant" });
      return;
    }

    setDistance(window.innerHeight + 120);
    setFlying(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
    timer.current = setTimeout(() => setFlying(false), FLIGHT_DURATION);
  };

  if (!visible && !flying) return null;

  return (
    <motion.button
      type="button"
      className="story-scroll-top"
      aria-label="Back to top"
      title="Back to top"
      onClick={onActivate}
      disabled={flying}
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      animate={flying ? { opacity: 0, y: -distance, rotate: -7 } : { opacity: 1, y: 0, rotate: 0 }}
      transition={flying ? { duration: FLIGHT_DURATION / 1000, ease: "easeIn" } : { duration: 0.2 }}
    >
      <img src={flyingTraveler} alt="" className="story-scroll-top__traveler" />
    </motion.button>
  );
};

export default ScrollToTop;
