import { Flex, Stack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Image from "next/image";

export function SplashScreen() {
  return (
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
  );
}
