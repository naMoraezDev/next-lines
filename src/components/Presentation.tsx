import { Stack, Button, Text } from "@chakra-ui/react";
import Link from "next/link";

type PresentationProps = {
  isDesktop?: boolean;
};

export function Presentation({ isDesktop }: PresentationProps) {
  if (isDesktop) {
    return (
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
    );
  }

  return (
    <Text fontWeight="bold" fontSize="40">
      Consulte{" "}
      <Text as="span" color="green.400">
        itinerários
      </Text>{" "}
      completos de todas as{" "}
      <Text as="span" color="green.400">
        linhas{" "}
      </Text>
      de ônibus de Porto Alegre.
    </Text>
  );
}
