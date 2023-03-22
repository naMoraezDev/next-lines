import { extendTheme } from "@chakra-ui/react";

export const darkTheme = extendTheme({
  fonts: {
    heading: "Roboto",
    body: "Roboto",
  },
  styles: {
    global: {
      body: {
        bg: "gray.800",
        color: "gray.100",
      },
    },
  },
});
