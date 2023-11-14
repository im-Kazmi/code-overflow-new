/* eslint-disable no-unused-vars */
"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

interface ThemeContextType {
  mode: string;
  // setMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState("dark");
  // const handleThemeChange = () => {
  //   if (mode === "dark") {
  //     setMode("light");
  //     document.documentElement.classList.add("bg-white");
  //   } else {
  //     setMode("dark");
  //     document.documentElement.classList.add("bg-black/80");
  //   }
  // };

  // useEffect(() => {
  //   handleThemeChange();
  // }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode }}>{children}</ThemeContext.Provider>
  );
};

export function useTheme() {
  return useContext(ThemeContext);
}
export default ThemeProvider;
