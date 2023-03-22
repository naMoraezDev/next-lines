import { theme } from "@/styles/theme";
import { getProgressBar } from "@/utils";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { Roboto } from "next/font/google";
import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { motion } from "framer-motion";
import "./nprogress.css";
import { SplashScreen } from "@/features/SplashScreen";

const roboto = Roboto({ weight: ["400", "500", "700"], subsets: ["latin"] });

getProgressBar();

export default function App({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  return (
    <main className={roboto.className}>
      <ChakraProvider theme={theme}>
        {loading ? (
          <SplashScreen />
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              type: "spring",
              duration: 1,
            }}
          >
            <Header />
            <Component {...pageProps} />
          </motion.div>
        )}
      </ChakraProvider>
    </main>
  );
}
