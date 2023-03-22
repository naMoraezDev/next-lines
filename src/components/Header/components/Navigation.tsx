import { Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import router from "next/router";

export function Navigation() {
  return (
    <Flex>
      <Link href="/">
        <Text
          borderBottomColor="green.400"
          borderBottomWidth={router.asPath === "/" ? 3 : 0}
          paddingBottom={2}
          borderRadius={3}
          marginRight={10}
        >
          Home
        </Text>
      </Link>

      <Link href="/lines/all">
        <Text
          borderBottom="50"
          borderBottomColor="green.400"
          borderBottomWidth={
            router.asPath.includes("/lines") ||
            router.asPath.includes("/search")
              ? 3
              : 0
          }
          paddingBottom={2}
          borderRadius={3}
          marginRight={10}
        >
          Linhas
        </Text>
      </Link>
    </Flex>
  );
}
