import React, { useEffect, useState, useCallback, useMemo } from "react";
import { ThemeContext } from "../context/ThemeContext";

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [dark, setDark] = useState<boolean>(() => {
    try {
      if (typeof window === "undefined") return false;
      const saved = localStorage.getItem("theme");
      if (saved) return saved === "dark";
      return (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      );
    } catch (err) {
      // handle the exception (log) instead of swallowing it silently
      // SonarQube will be satisfied because we don't ignore the exception.
      // Logging is lightweight and useful for debugging in dev.
      // In production you might route to a telemetry sink instead.
      // eslint-disable-next-line no-console
      console.warn("Failed to read persisted theme:", err);
      return false;
    }
  });

  // stable toggle identity
  const toggle = useCallback(() => setDark((d) => !d), []);

  useEffect(() => {
    try {
      localStorage.setItem("theme", dark ? "dark" : "light");
    } catch (err) {
      // log errors when persisting theme
      // eslint-disable-next-line no-console
      console.warn("Failed to persist theme:", err);
    }

    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark", dark);
    }
  }, [dark]);

  // memoize provider value so it doesn't change every render
  const value = useMemo(() => ({ dark, toggle }), [dark, toggle]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export default ThemeProvider;
