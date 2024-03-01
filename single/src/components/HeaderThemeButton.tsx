"use client";

import { Moon, Sun } from "lucide-react";

const HeaderThemeButton = () => {
  return (
    <>
      <div className="cursor-pointer rounded-[50%] px-2 py-1 shadow-lg hover:bg-slate-200 active:bg-slate-300 dark:hidden">
        <Moon size={24} />
      </div>
      <div className="hidden cursor-pointer rounded-[50%] px-2 py-1 shadow-lg hover:bg-slate-700 active:bg-slate-600 dark:inline-block">
        <Sun size={24} />
      </div>
    </>
  );
};

export default HeaderThemeButton;
