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
import { setCookie, parseCookies } from "nookies";

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
  const { "app.theme": themeCookie } = parseCookies();
  const themeC = themeCookie === "dark" ? darkTheme : lightTheme;

  const handleToggleTheme = useCallback(() => {
    setThemeData((oldState) => ({
      ...oldState,
      theme: oldState.isDark ? lightTheme : darkTheme,
      isDark: !oldState.isDark,
    }));
  }, []);

  const [themeData, setThemeData] = useState<ThemeContextData>({
    toggleTheme: handleToggleTheme,
    theme: themeC,
    isDark: themeCookie === "dark",
  });

  useEffect(() => {
    const themeCookie = themeData.isDark ? "dark" : "light";
    console.log(themeCookie);
    setCookie(undefined, "app.theme", themeCookie, {
      maxAge: 60 * 60 * 24 * 30,
    });
  }, [themeData]);

  return (
    <ThemeContext.Provider value={themeData}>
      <ChakraProvider theme={themeData.theme}>{children}</ChakraProvider>
    </ThemeContext.Provider>
  );
}
