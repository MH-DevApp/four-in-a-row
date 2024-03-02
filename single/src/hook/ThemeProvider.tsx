"use client";

import { PropsWithChildren } from "react";
import { ThemeContext, useThemeProvider } from "@/hook/ThemeContext";

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const themeContext = useThemeProvider();

  return (
    <ThemeContext.Provider value={themeContext}>
      {themeContext.theme ? (
        <div
          className={themeContext.theme === "dark" ? themeContext.theme : ""}
        >
          <div className="flex min-h-screen flex-col bg-slate-50 text-slate-700 dark:bg-slate-700 dark:text-slate-200">
            {children}
          </div>
        </div>
      ) : null}
    </ThemeContext.Provider>
  );
};
