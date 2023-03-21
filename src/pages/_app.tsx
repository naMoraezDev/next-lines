import { theme } from "@/styles/theme";
import { getProgressBar } from "@/utils";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { Roboto } from "next/font/google";
import { Header } from "../components/Header";
import "./nprogress.css";

const roboto = Roboto({ weight: ["400", "500", "700"], subsets: ["latin"] });

getProgressBar();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={roboto.className}>
      <ChakraProvider theme={theme}>
        <Header />
        <Component {...pageProps} />
      </ChakraProvider>
    </main>
  );
}
