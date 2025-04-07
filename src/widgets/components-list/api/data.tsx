import { GradientCard } from "@/lib/shared/components/cards/gradient-card";
import PillToggleTheme from "@/lib/shared/components/theme/pill-toggle-theme";
import { JSX } from "react";

export interface ICode {
  slug: string;
  fileName: string;
  code: string;
  lang: "typescript";
}

export interface ComponentItemType {
  name: string;
  component: JSX.Element;
  code: ICode[];
}

export const data: ComponentItemType[] = [
  {
    name: "Gradient card",
    component: (
      <GradientCard className='flex items-center justify-center w-full h-full'>
        Gradient card preview
      </GradientCard>
    ),
    code: [
      {
        slug: "GradientCard",
        fileName: "./gradient-card.tsx",
        code: `"use client";
import { useMouse } from "@/lib/shared/hooks/use-mouse";
import { cn } from "@/lib/utils";
import { ElementType, type ReactNode } from "react";

export const GradientCard = ({
  as: Element = "div",
  circleSize = 400,
  colors = ["hsl(0, 100%, 50%)", "hsl(120, 100%, 50%)", "hsl(240, 100%, 50%)"],
  className,
  children,
  childrenClassName,
  roundness = 20,
  ...props
}: {
  as?: ElementType;
  circleSize?: number;
  colors?: string[];
  className?: string;
  children?: ReactNode;
  childrenClassName?: string;
  roundness?: number;
} & Omit<React.ComponentPropsWithRef<ElementType>, "ref">) => {
  const [mouse, parentRef] = useMouse();

  return (
    <Element
      ref={parentRef}
      className={cn("group relative overflow-hidden", className)}
      style={{
        borderRadius: \`\${roundness}px\`,
        ...props.style,
      }}
      {...props}
    >
      <div
        className="absolute inset-px -translate-x-1/2 -translate-y-1/2 transform-gpu rounded-full transition-transform duration-500 group-hover:scale-[3]"
        style={{
          maskImage: \`radial-gradient(\${circleSize / 2}px circle at center, white, transparent)\`,
          width: circleSize,
          height: circleSize,
          left: mouse.elementX ?? "50%",
          top: mouse.elementY ?? "50%",
          background: \`linear-gradient(135deg, \${colors.join(", ")})\`,
          opacity: mouse.elementX === null || mouse.elementY === null ? 0 : 1,
        }}
      />
      <div
        style={{
          borderRadius: \`\${roundness}px\`,
        }}
        className="absolute inset-px bg-neutral-100/80 dark:bg-neutral-900/80"
      />
      <div className={cn("relative", childrenClassName)}>{children}</div>
    </Element>
  );
};
`,
        lang: "typescript",
      },
      {
        slug: "Example",
        fileName: "",
        code: `import { GradientCard } from "@/lib/shared/components/cards/gradient-card";

const Component = () => {

  return (
    <div className="flex-col items-center justify-center">
      <p className="text-neutral-400">Gradient card</p>
      <GradientCard className="flex items-center justify-center w-48 h-48">
        Gradient card preview
      </GradientCard>
    </div>
  );
};
`,
        lang: "typescript",
      },
    ],
  },
  {
    name: "Theme switcher",
    component: <PillToggleTheme />,
    code: [
      {
        slug: "ThemeSwitcher",
        fileName: "./pill-toggle-theme.tsx",
        code: `"use client";

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
`,
        lang: "typescript",
      },
      {
        slug: "ThemeProvider",
        fileName: "./theme-provider.tsx",
        code: `"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import * as React from "react";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}`,
        lang: "typescript",
      },
      {
        slug: "Layout",
        fileName: "./layout.tsx",
        code: `export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}`,
        lang: "typescript",
      },
      {
        slug: "Example",
        fileName: "",
        code: `export default function Home() {
  return (
    <div className="relative">
      <div className="absolute -top-20 right-0 md:top-0 md:-right-15">
        <PillToggleTheme />
      </div>
    </div>
  );
};`,
        lang: "typescript",
      },
    ],
  },
];
