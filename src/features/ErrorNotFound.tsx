import { Flex, Stack, Button, Text } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";

export function ErrorNotFound() {
  return (
    <Flex align="center" w="100vw" justify="center" h="80vh" gap="10">
      <Stack gap="5">
        <Image src="/images/404.svg" alt="" width={350} height={350} priority />
        <Text fontWeight="bold" alignSelf="center">
          Página não encontrada :((
        </Text>
        <Button
          href={"/"}
          borderRadius="full"
          colorScheme="green"
          width={250}
          alignSelf="center"
          as={Link}
        >
          Voltar para a página inicial
        </Button>
      </Stack>
    </Flex>
  );
}
