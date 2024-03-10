"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hook/ThemeContext";

const HeaderThemeButton = () => {
  const { toggle } = useTheme();

  return (
    <div
      onClick={toggle}
      className="cursor-pointer rounded-[50%] px-2 py-1 shadow-lg hover:bg-slate-200 hover:text-blue-800 active:bg-slate-50 active:text-blue-500 dark:hover:bg-slate-700 dark:hover:text-slate-200 dark:active:bg-slate-600 dark:active:text-slate-200"
    >
      <Moon className="dark:hidden" size={24} />
      <Sun className="hidden dark:inline-block" size={24} />
    </div>
  );
};

export default HeaderThemeButton;
