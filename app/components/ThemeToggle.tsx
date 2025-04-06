"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Only run on client-side to avoid hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  // Return null until mounted to avoid rendering before theme is available
  if (!mounted) return null;

  const isDarkMode = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDarkMode ? "light" : "dark")}
      className="relative w-7 h-7 flex items-center justify-center rounded-md hover:opacity-70  transition-colors duration-300"
    >
      {/* Light Mode Icon */}
      <MdLightMode
        className={`absolute text-purple-700 transition-all duration-300 ease-in-out ${
          isDarkMode
            ? "opacity-0 scale-50 rotate-180"
            : "opacity-100 scale-100 rotate-0"
        }`}
        size={30}
      />

      {/* Dark Mode Icon */}
      <MdDarkMode
        className={`absolute text-purple-700 transition-all duration-300 ease-in-out ${
          isDarkMode
            ? "opacity-100 scale-100 rotate-0"
            : "opacity-0 scale-50 -rotate-180"
        }`}
        size={30}
      />
    </button>
  );
};

export default ThemeToggle;
