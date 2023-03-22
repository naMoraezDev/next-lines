import { Stack, Text } from "@chakra-ui/react";
import Image from "next/image";

export function NoDataError() {
  return (
    <Stack mt={20}>
      <Image
        src="/images/no-data.svg"
        alt=""
        width={350}
        height={350}
        priority
      />
      <Text fontWeight="bold" alignSelf="center">
        Não encontramos nada referente a esta busca :((
      </Text>
    </Stack>
  );
}
