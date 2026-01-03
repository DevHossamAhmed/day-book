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
        className="relative p-2.5 rounded-lg transition-all duration-200 bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-wait"
        aria-label="Loading theme"
        disabled
        suppressHydrationWarning
      >
        <div className="w-5 h-5 animate-pulse">
          <Moon size={20} />
        </div>
      </button>
    );
  }

  return (
    <button
      onClick={handleToggle}
      type="button"
      className="relative p-2.5 rounded-lg transition-all duration-200 group hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 hover:text-[#1520eb] dark:hover:text-blue-400 overflow-hidden"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      <div className="relative w-5 h-5">
        {/* Moon Icon - Show in Light Mode (to switch to dark) */}
        <Moon
          size={20}
          className={`absolute inset-0 transition-all duration-300 transform ${
            theme === "light"
              ? "rotate-0 scale-100 opacity-100"
              : "-rotate-90 scale-0 opacity-0"
          }`}
        />

        {/* Sun Icon - Show in Dark Mode (to switch to light) */}
        <Sun
          size={20}
          className={`absolute inset-0 transition-all duration-300 transform ${
            theme === "dark"
              ? "rotate-0 scale-100 opacity-100"
              : "rotate-90 scale-0 opacity-0"
          }`}
        />
      </div>

      {/* Hover ripple effect */}
      <span className="absolute inset-0 rounded-lg bg-gray-200 dark:bg-gray-700 opacity-0 group-hover:opacity-0 group-active:opacity-20 transition-opacity duration-200" />
    </button>
  );
}
