"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const isDarkMode = theme === "dark";

  const toggleTheme = () => {
    setTheme(isDarkMode ? "light" : "dark");
  };

  return (
    <div
      onClick={toggleTheme}
      className="flex items-center gap-x-4 w-full text-md font-medium hover:bg-purple-200 dark:hover:bg-purple-500 dark:bg-gray-900 rounded-md cursor-pointer transition text-black dark:text-white py-1 px-2"
    >
      <div className="relative w-7 h-7 flex items-center justify-center">
        <MdLightMode
          className={`absolute text-purple-700 transition-all duration-300 ease-in-out ${
            isDarkMode
              ? "opacity-0 scale-50 rotate-180"
              : "opacity-100 scale-100 rotate-0"
          }`}
          size={27}
        />
        <MdDarkMode
          className={`absolute text-purple-700 transition-all duration-300 ease-in-out ${
            isDarkMode
              ? "opacity-100 scale-100 rotate-0"
              : "opacity-0 scale-50 -rotate-180"
          }`}
          size={27}
        />
      </div>
      <p className="truncate w-full">
        {isDarkMode ? "Dark mode" : "Light mode"}
      </p>
    </div>
  );
};

export default ThemeToggle;
