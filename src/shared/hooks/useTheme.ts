import { useContext } from "react";

import { ThemeContext } from "../context/Theme";

export const useTheme = () => useContext(ThemeContext);
