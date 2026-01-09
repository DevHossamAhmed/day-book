"use client";
import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  mounted: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Get initial theme from localStorage (runs before React hydration)
function getInitialTheme(): Theme {
  if (typeof window === "undefined") {
    return "light";
  }

  try {
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    const htmlElement = document.documentElement;

    if (savedTheme === "dark") {
      htmlElement.classList.add("dark");
      htmlElement.style.colorScheme = "dark";
      return "dark";
    } else {
      // Explicitly remove dark class for light theme or invalid theme
      htmlElement.classList.remove("dark");
      htmlElement.style.colorScheme = "light";
      if (!savedTheme || (savedTheme !== "light" && savedTheme !== "dark")) {
        localStorage.setItem("theme", "light");
      }
      return "light";
    }
  } catch (e) {
    // If localStorage fails, default to light
    console.error("Failed to load theme from localStorage:", e);
    document.documentElement.classList.remove("dark");
    document.documentElement.style.colorScheme = "light";
    return "light";
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => getInitialTheme());
  const [mounted, setMounted] = useState(false);

  // Mark as mounted after initial render
  useEffect(() => {
    setMounted(true);
    // Remove disable-transitions class after mount to enable smooth transitions
    document.body.classList.remove('disable-transitions');
  }, []);

  // Update DOM and localStorage when theme changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("theme", theme);
        const htmlElement = document.documentElement;
        
        if (theme === "dark") {
          htmlElement.classList.add("dark");
          htmlElement.style.colorScheme = "dark";
        } else {
          htmlElement.classList.remove("dark");
          htmlElement.style.colorScheme = "light";
        }
      } catch (e) {
        console.error("Failed to update theme:", e);
      }
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => (prev === "light" ? "dark" : "light"));
  }, []);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
  }, []);

  const value = React.useMemo(
    () => ({ theme, toggleTheme, setTheme, mounted }),
    [theme, toggleTheme, setTheme, mounted]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}