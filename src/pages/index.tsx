import { Presentation } from "@/components/Presentation";
import { Flex } from "@chakra-ui/react";
import Image from "next/image";

export default function Home() {
  return (
    <Flex align="center" w="100vw" justify="center" h="80vh" gap="10">
      <Presentation />

      <Image
        src="/images/bus-stop.svg"
        alt=""
        width={450}
        height={600}
        priority
      />
    </Flex>
  );
}
