import { theme } from "@/styles/theme";
import { getProgressBar } from "@/utils";
import { ChakraProvider, Flex, Stack } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { Roboto } from "next/font/google";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { motion } from "framer-motion";
import "./nprogress.css";

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
          <>
            <Flex align="center" w="100vw" justify="center" h="80vh" gap="10">
              <Stack>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ rotate: 360, scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 150,
                    damping: 20,
                    repeat: Infinity,
                    repeatDelay: 1,
                  }}
                >
                  <Image
                    src="/images/bus-stop-splash.svg"
                    alt=""
                    width={350}
                    height={350}
                    priority
                  />
                </motion.div>
              </Stack>
            </Flex>
          </>
        ) : (
          <>
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
          </>
        )}
      </ChakraProvider>
    </main>
  );
}
