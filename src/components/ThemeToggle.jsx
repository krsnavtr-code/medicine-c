"use client";

import { useTheme } from "@/contexts/ThemeContext";
import { FiSun, FiMoon } from "react-icons/fi";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-bg-secondary text-text-light hover:text-text transition-colors duration-200 cursor-pointer"
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      {theme === "light" ? (
        <div className="flex items-center cursor-pointer">
          <FiMoon className="w-5 h-5" />
        </div>
      ) : (
        <div className="flex items-center cursor-pointer">
          <FiSun className="w-5 h-5" />
        </div>
      )}
    </button>
  );
}
