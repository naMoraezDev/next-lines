import React, {
  useState,
  createContext,
  useCallback,
  ReactNode,
  useEffect,
} from "react";

import { ChakraProvider } from "@chakra-ui/react";
import { darkTheme } from "@/styles/dark-theme";
import { lightTheme } from "@/styles/light-theme";

type ThemeContextData = {
  toggleTheme(): void;
  isDark: boolean;
  theme: any;
};

export const ThemeContext = createContext<ThemeContextData>(
  {} as ThemeContextData
);

type ThemesProviderProps = {
  children: ReactNode;
};

export function ThemeProvider({ children }: ThemesProviderProps) {
  let localStorageThemeValue;
  if (typeof window !== "undefined") {
    localStorageThemeValue = localStorage.getItem("app.theme");
  }

  const localStorageTheme =
    localStorageThemeValue === "dark" ? darkTheme : lightTheme;

  const handleToggleTheme = useCallback(() => {
    setThemeData((oldState) => ({
      ...oldState,
      theme: oldState.isDark ? lightTheme : darkTheme,
      isDark: !oldState.isDark,
    }));
  }, []);

  const [themeData, setThemeData] = useState<ThemeContextData>({
    toggleTheme: handleToggleTheme,
    theme: localStorageTheme,
    isDark: localStorageThemeValue === "dark",
  });

  useEffect(() => {
    const localStorageThemeValue = themeData.isDark ? "dark" : "light";

    localStorage.setItem("app.theme", localStorageThemeValue);
  }, [themeData]);

  return (
    <ThemeContext.Provider value={themeData}>
      <ChakraProvider theme={themeData.theme}>{children}</ChakraProvider>
    </ThemeContext.Provider>
  );
}
