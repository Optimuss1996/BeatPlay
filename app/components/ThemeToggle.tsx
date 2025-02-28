import { useState, useEffect } from "react";

const ThemeToggle: React.FC = () => {
  // Define state type
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  useEffect(() => {
    // Retrieve saved theme from localStorage
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
      document.documentElement.classList.add(savedTheme); // Apply saved theme
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = isDarkMode ? "light" : "dark"; // Toggle between light and dark
    setIsDarkMode(!isDarkMode); // Switch the state value
    document.documentElement.classList.remove(isDarkMode ? "dark" : "light"); // Remove the current theme class
    document.documentElement.classList.add(newTheme); // Add the new theme class
    localStorage.setItem("theme", newTheme); // Save the new theme to localStorage
  };

  return (
    <button onClick={toggleTheme}>
      {isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
    </button>
  );
};

export default ThemeToggle;
