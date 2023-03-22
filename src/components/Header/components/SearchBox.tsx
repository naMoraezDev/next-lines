import { useTheme } from "@/shared/hooks/useTheme";
import {
  Flex,
  Badge,
  Popover,
  PopoverTrigger,
  Input,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  Stack,
  Icon,
  Text,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { ChangeEvent, KeyboardEvent, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { RiSearchLine } from "react-icons/ri";

export function SearchBox() {
  const { isDark } = useTheme();
  const router = useRouter();
  const initialFocusRef = useRef(null);
  const [inputFilters, setInputFilters] = useState<string[]>([]);
  const [popFilters, setPopFilters] = useState<string[]>([
    "ônibus",
    "lotações",
  ]);
  const [searchTerm, setSearchTerm] = useState("");

  function handleSelectFilter(filter: string) {
    if (!inputFilters.includes(filter)) {
      setInputFilters((filters) => [...filters, filter]);
      setPopFilters((filters) => filters.splice(filters.indexOf(filter), 1));
    }

    return;
  }

  function handleDeSelectFilter(filter: string) {
    if (!popFilters.includes(filter)) {
      setPopFilters((filters) => [...filters, filter]);
      setInputFilters((filters) => filters.splice(filters.indexOf(filter), 1));
    }
  }

  function handleOnChangeSearchTerm(event: ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value);
  }

  function handleSearch() {
    const filter = inputFilters.toString() === "ônibus" ? "buses" : "lotations";

    if (searchTerm.length === 0) {
      return;
    }

    if (inputFilters.length > 1) {
      router.push(`/search/all?term=${searchTerm}`);
    }

    if (inputFilters.length === 0) {
      router.push(`/search/all?term=${searchTerm}`);
    }

    if (inputFilters.length < 1) {
      router.push(`/search/all?term=${searchTerm}`);
    } else {
      router.push(`/search/${filter}?term=${searchTerm}`);
    }
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
      {inputFilters.map((filter, index) => (
        <Badge
          key={index}
          lineHeight={2}
          size="small"
          variant="solid"
          colorScheme="green"
          borderRadius="full"
          mr="3"
        >
          <Flex align="center" gap="1">
            {filter}
            <AiOutlineClose
              onClick={() => handleDeSelectFilter(filter)}
              cursor="pointer"
            />
          </Flex>
        </Badge>
      ))}

      <Popover
        initialFocusRef={initialFocusRef}
        placement="bottom"
        closeOnBlur={false}
      >
        <PopoverTrigger>
          <Input
            color="gray.500"
            variant="unstyled"
            placeholder="Buscar uma linha"
            _placeholder={{ color: "gray.400" }}
            ref={initialFocusRef}
            onChange={(e) => handleOnChangeSearchTerm(e)}
            onKeyDown={(e) => handleKeyDown(e)}
          />
        </PopoverTrigger>

        {popFilters.length && (
          <PopoverContent
            color={isDark ? "gray.300" : "gray.500"}
            bg={isDark ? "gray.700" : "gray.200"}
            mt={2}
            border="none"
          >
            <PopoverBody>
              <PopoverArrow
                bg={isDark ? "gray.700" : "gray.200"}
                boxShadow="none"
              />
              <Flex m="3">
                <Stack>
                  <Text>Filtrar por:</Text>
                  <Flex gap="3">
                    {popFilters.map((filter, index) => (
                      <Badge
                        key={index}
                        lineHeight={2}
                        size="small"
                        variant="solid"
                        colorScheme="green"
                        borderRadius="full"
                        onClick={() => handleSelectFilter(filter)}
                        cursor="pointer"
                      >
                        {filter}
                      </Badge>
                    ))}
                  </Flex>
                </Stack>
              </Flex>
            </PopoverBody>
          </PopoverContent>
        )}
      </Popover>

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
