import { Button, Flex, Stack, Text } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <Flex align="center" w="100vw" justify="center" h="80vh" gap="10">
      <Stack gap={5}>
        <Text fontWeight="bold" fontSize="50">
          Consulte{" "}
          <Text as="span" color="green.400">
            itinerários
          </Text>{" "}
          <br /> completos de todas as <br />
          <Text as="span" color="green.400">
            linhas{" "}
          </Text>
          de ônibus de <br /> Porto Alegre.
        </Text>
        <Link href="/lines/all">
          <Button
            borderRadius="full"
            colorScheme="green"
            width={400}
            alignSelf="center"
          >
            Navegar
          </Button>
        </Link>
      </Stack>

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
