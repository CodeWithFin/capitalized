"use client";

import { useEffect, useState } from "react";

function getInitialTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  const stored = window.localStorage.getItem("theme");
  if (stored === "light" || stored === "dark") return stored;
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTheme(getInitialTheme());
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem("theme", theme);
  }, [theme, mounted]);

  if (!mounted) {
    return (
      <button className="h-9 w-9 rounded-full border border-slate-300 dark:border-slate-700" aria-label="Toggle theme" />
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative h-9 w-16 rounded-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 transition-colors"
      aria-label="Toggle theme"
      title="Toggle theme"
    >
      <span className="absolute inset-y-0 left-1 my-auto h-7 w-7 grid place-items-center rounded-full bg-slate-900 text-white dark:bg-yellow-400 dark:text-slate-900 transition-all"
        style={{ transform: theme === "dark" ? "translateX(28px)" : "translateX(0px)" }}>
        {theme === "dark" ? "☀" : "☾"}
      </span>
    </button>
  );
}


