import LogoComponent from "@/components/LogoComponent";
import HeaderThemeButton from "@/components/HeaderThemeButton";

const HeaderComponent = () => {
  return (
    <header className="flex min-h-20 items-center justify-between border-b-2 border-b-slate-400 bg-blue-900 px-4 py-2 text-white/90 dark:border-b-slate-800 dark:bg-slate-900 dark:text-slate-100">
      <LogoComponent />
      <HeaderThemeButton />
    </header>
  );
};

export default HeaderComponent;
