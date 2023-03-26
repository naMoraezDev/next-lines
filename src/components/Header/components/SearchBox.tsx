import { useTheme } from "@/hooks/useTheme";
import { Flex, Input, Icon } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ChangeEvent, KeyboardEvent, useRef, useState } from "react";
import { RiSearchLine } from "react-icons/ri";

export function SearchBox() {
  const { isDark } = useTheme();
  const router = useRouter();
  const initialFocusRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");

  function handleOnChangeSearchTerm(event: ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value);
  }

  function handleSearch() {
    if (searchTerm.length === 0) {
      return;
    }

    router.push(`/search/all?term=${searchTerm}`);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") {
      handleSearch();
    }
  }

  return (
    <Flex
      as="label"
      flex="1"
      py="2"
      px="8"
      maxW={400}
      alignSelf="center"
      color="gray.200"
      position="relative"
      bg={isDark ? "gray.700" : "gray.200"}
      borderRadius="full"
    >
      <Input
        color="gray.500"
        variant="unstyled"
        placeholder="Buscar uma linha"
        _placeholder={{ color: "gray.400" }}
        ref={initialFocusRef}
        onChange={(e) => handleOnChangeSearchTerm(e)}
        onKeyDown={(e) => handleKeyDown(e)}
      />

      <Icon
        as={RiSearchLine}
        fontSize="20"
        color="gray.400"
        cursor="pointer"
        onClick={() => handleSearch()}
      />
    </Flex>
  );
}
