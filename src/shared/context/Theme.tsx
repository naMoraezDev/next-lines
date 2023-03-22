import React, { useState, createContext, useCallback, ReactNode } from "react";

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
  const handleToggleTheme = useCallback(() => {
    setThemeData((oldState) => ({
      ...oldState,
      theme: oldState.isDark ? lightTheme : darkTheme,
      isDark: !oldState.isDark,
    }));
  }, []);

  const [themeData, setThemeData] = useState<ThemeContextData>({
    toggleTheme: handleToggleTheme,
    theme: lightTheme,
    isDark: false,
  });

  return (
    <ThemeContext.Provider value={themeData}>
      <ChakraProvider theme={themeData.theme}>{children}</ChakraProvider>
    </ThemeContext.Provider>
  );
}
