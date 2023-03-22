import { Flex, Icon, Text } from "@chakra-ui/react";
import Link from "next/link";
import { IoIosBus } from "react-icons/io";

export function Logo() {
  return (
    <Flex>
      <Link href="/">
        <Text
          fontSize="4xl"
          fontWeight="bold"
          letterSpacing="tight"
          color="green.400"
        >
          _lines
        </Text>
      </Link>
      <Icon as={IoIosBus} fontSize="48" color="gray.500" />
    </Flex>
  );
}
