import { useTheme } from "@/hooks/useTheme";
import { Flex, Icon, Text } from "@chakra-ui/react";
import Link from "next/link";
import { IoIosBus } from "react-icons/io";

export function Logo() {
  const { isDark } = useTheme();

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
      <Icon
        as={IoIosBus}
        fontSize="48"
        color={isDark ? "gray.100" : "gray.500"}
      />
    </Flex>
  );
}
