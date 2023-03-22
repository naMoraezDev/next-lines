import { extendTheme } from "@chakra-ui/react";

export const lightTheme = extendTheme({
  fonts: {
    heading: "Roboto",
    body: "Roboto",
  },
  styles: {
    global: {
      body: {
        bg: "gray.100",
        color: "gray.500",
      },
    },
  },
});
