import { Button, Flex, Stack, Text } from "@chakra-ui/react";
import Image from "next/image";

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
        <Button
          borderRadius="full"
          colorScheme="green"
          width={400}
          alignSelf="center"
        >
          Navegar
        </Button>
      </Stack>

      <Image src="/bus-stop.svg" alt="" width={450} height={600} priority />
    </Flex>
  );
}
