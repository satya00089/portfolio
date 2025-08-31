import { createContext, useContext } from "react";

export type ThemeContextType = {
  dark: boolean;
  toggle: () => void;
};

// Only defines context + hook (no component exports) — keeps fast refresh happy.
export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used inside ThemeProvider");
  return ctx;
}
