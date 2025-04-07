"use client";

import { cn } from "@/lib/utils";
import { MonitorCog, MoonIcon, SunIcon } from "lucide-react";

import { useTheme } from "next-themes";

export const PillToggleTheme = ({ className }: { className?: string }) => {
  const { setTheme, theme, resolvedTheme } = useTheme();

  const handleSwitchTheme = () => {
    if (resolvedTheme === "dark") {
      setTheme("light");
    }
    if (resolvedTheme === "light") {
      setTheme("dark");
    }
  };

  return (
    <div className={cn("relative group", className)}>
      <button
        type='button'
        onClick={handleSwitchTheme}
        className={cn(
          "group peer themeButton relative h-14 w-10 overflow-hidden transition rounded-full bg-foreground/2 p-2 border border-neutral-500/20",
          "hover:scale-110 transform-gpu transition duration-150",
        )}>
        <SunIcon
          suppressHydrationWarning
          id='sun'
          className={cn(
            "size-5 text-foreground/80 transition-all z-50 duration-300 absolute -translate-x-1/2 left-1/2 top-2 transform-gpu opacity-100 translate-y-0 scale-100 group-hover:scale-75 group-hover:opacity-90 dark:opacity-50 dark:-translate-y-8 dark:scale-90 dark:group-hover:-translate-y-3",
          )}
        />

        <MoonIcon
          suppressHydrationWarning
          id='moon'
          className={cn(
            "size-5 transition-all z-50 duration-300 absolute -translate-x-1/2 left-1/2 bottom-2 transform-gpu opacity-50 translate-y-8 scale-75 group-hover:translate-y-3 dark:opacity-100 dark:translate-y-0 dark:scale-100 dark:group-hover:scale-75 dark:group-hover:opacity-90",
          )}
        />
      </button>
      <button
        type='button'
        onClick={() => {
          setTheme("system");
        }}
        className={cn(
          "peer group themeButton absolute left-12 size-10 overflow-hidden transition rounded-full bg-background/90 top-1/2 -translate-y-1/2 p-2 border border-neutral-500/20",
          "peer-hover:scale-110 transform-gpu transition duration-300 inline-flex items-center justify-center",
          "opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0 scale-0 group-hover:scale-100",
        )}>
        <MonitorCog
          id='pc'
          suppressHydrationWarning
          className={cn(
            "size-5 text-neutral-600 transition-all dark:text-neutral-300 z-50 duration-300 transform-gpu",
            theme === "system" ? "opacity-100 translate-y-0 scale-100" : "opacity-50 scale-75",
          )}
        />
      </button>
    </div>
  );
};

export default PillToggleTheme;
