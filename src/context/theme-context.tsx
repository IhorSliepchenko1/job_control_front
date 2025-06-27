import { createContext, useContext, useEffect, useState } from "react";

type ThemeContextType = {
  theme: "dark" | "light";
  changeTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  changeTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const localstorageTheme = localStorage.getItem("theme") as "dark" | "light";

  const [theme, setTheme] = useState<"dark" | "light">(
    localstorageTheme || "dark"
  );

  const changeTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
