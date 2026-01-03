"use client";
import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme();

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    toggleTheme();
  };

  // Show loading state until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <button
        type="button"
        className="relative p-2.5 rounded-lg transition-all duration-200 group hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-[#1520eb] dark:hover:text-blue-400"
        aria-label="Switch theme"
        title="Switch theme"
        disabled
        suppressHydrationWarning
      >
        <Moon className="text-[22px] transition-transform duration-200 group-hover:scale-110" />
      </button>
    );
  }

  return (
    <button
      onClick={handleToggle}
      type="button"
      className="relative p-2.5 rounded-lg transition-all duration-200 group hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-[#1520eb] dark:hover:text-blue-400"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? (
        <Moon className="text-[22px] transition-transform duration-200 group-hover:scale-110" />
      ) : (
        <Sun className="text-[22px] transition-transform duration-200 group-hover:scale-110" />
      )}
    </button>
  );
}

