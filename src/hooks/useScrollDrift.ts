import { useEffect } from "react";

// Elements that drift as they pass through the viewport. Each one gets a
// --drift custom property: 0 when its top edge enters at the bottom of the
// viewport, 1 when its bottom edge leaves at the top. CSS reads it to move
// and scale the element.
const DRIFT_SELECTOR = ".story-hero, #featured-projects .project-image, .story-client-preview img";

export const useScrollDrift = () => {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;

    const update = () => {
      frame = 0;
      const viewportHeight = window.innerHeight;
      document.querySelectorAll<HTMLElement>(DRIFT_SELECTOR).forEach((el) => {
        const rect = el.getBoundingClientRect();
        const progress = (viewportHeight - rect.top) / (viewportHeight + rect.height);
        const clamped = Math.min(1, Math.max(0, progress));
        el.style.setProperty("--drift", clamped.toFixed(3));
      });
    };

    const requestUpdate = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);
};
