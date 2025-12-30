import { useState, useEffect } from "react";
import { ThemeContext } from "../contexts/theme.context";

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<"light" | "dark">(
    (localStorage.getItem("theme") as "light" | "dark") ?? "light"
  );
  const toggleTheme = () =>
    setTheme((prev) => (prev === "light" ? "dark" : "light"));

  useEffect(() => {
    const root = document.documentElement;
    localStorage.setItem('theme', theme)
    root.classList.remove('dark', 'light')
    root.classList.add(theme)
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ toggleTheme, theme }}>
      { children }
    </ThemeContext.Provider>
  )
};
