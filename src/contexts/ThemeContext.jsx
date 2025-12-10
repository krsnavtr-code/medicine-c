"use client";

import { createContext, useContext, useEffect, useState } from "react";

export const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const [mounted, setMounted] = useState(false);

  // Check for saved theme preference or use system preference
  useEffect(() => {
    // Ensure this only runs on the client side
    if (typeof window !== "undefined") {
      setMounted(true);
      try {
        const savedTheme =
          localStorage.getItem("theme") ||
          (window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light");
        setTheme(savedTheme);
      } catch (e) {
        console.error("Error accessing theme preferences:", e);
        setTheme("light");
      }
    }
  }, []);

  // Apply theme class to document element
  useEffect(() => {
    if (mounted && typeof document !== "undefined") {
      if (theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }

      try {
        localStorage.setItem("theme", theme);
      } catch (e) {
        console.error("Error saving theme preference:", e);
      }
    }
  }, [theme, mounted]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // Don't render children until we've determined the theme on the client
  if (!mounted) {
    return <div style={{ visibility: "hidden" }}>{children}</div>;
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    // Return a default theme when not wrapped in a ThemeProvider
    return {
      theme: 'light',
      toggleTheme: () => {
        if (process.env.NODE_ENV === 'development') {
          console.warn('Theme toggle called outside of ThemeProvider');
        }
      }
    };
  }
  
  return context;
};
