import { createContext, useContext, useEffect, useState } from "react";

export type ThemeType = {
  theme: string | null;
  toggle: () => void;
};

export const ThemeContext = createContext<ThemeType | null>(null);

export const useTheme = () => {
  const theme = useContext(ThemeContext);

  if (theme === null) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return theme;
};

export const useThemeProvider = (): ThemeType => {
  const [theme, setTheme] = useState<string | null>(null);
  const toggle = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
    localStorage.setItem("theme", theme === "light" ? "dark" : "light");
  };

  useEffect(() => {
    const localTheme = localStorage.getItem("theme");
    setTheme(localTheme || "light");
  }, []);

  return { theme, toggle };
};
