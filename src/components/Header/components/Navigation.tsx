import { Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";

export function Navigation() {
  const router = useRouter();
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

      <Link href="/lines/filter?filter=buses">
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

      <Link href="/stops">
        <Text
          borderBottomColor="green.400"
          borderBottomWidth={router.asPath === "/stops" ? 3 : 0}
          paddingBottom={2}
          borderRadius={3}
          marginRight={10}
        >
          Paradas
        </Text>
      </Link>
    </Flex>
  );
}
