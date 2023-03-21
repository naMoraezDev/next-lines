import {
  Badge,
  Flex,
  Icon,
  Input,
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverTrigger,
  Stack,
  Switch,
  Text,
} from "@chakra-ui/react";
import { RiSearchLine } from "react-icons/ri";
import { AiOutlineClose } from "react-icons/ai";
import { IoIosBus } from "react-icons/io";
import { MdDarkMode } from "react-icons/md";
import { ChangeEvent, useRef, useState } from "react";
import { useRouter } from "next/router";

export function HeaderView() {
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
    const filter = inputFilters[0] == "ônibus" ? "buses" : "lotations";

    if (searchTerm.length === 0) {
      return;
    }

    if (inputFilters.length > 1 || inputFilters.length === 0) {
      router.push(`/search/all?term=${searchTerm}`);
    }

    router.push(`/search/${filter}?term=${searchTerm}`);
  }

  return (
    <Flex
      as="header"
      w="100%"
      maxW={1480}
      h="20"
      mx="auto"
      px="6"
      align="center"
      justify="space-between"
    >
      <Flex>
        <Text
          fontSize="4xl"
          fontWeight="bold"
          letterSpacing="tight"
          color="green.400"
        >
          _lines
        </Text>
        <Icon as={IoIosBus} fontSize="48" color="gray.500" />
      </Flex>

      <Flex>
        <Text
          borderBottom="50"
          borderBottomColor="green.400"
          borderBottomWidth={3}
          paddingBottom={2}
          borderRadius={3}
          marginRight={10}
        >
          Home
        </Text>

        <Text
          borderBottom="50"
          borderBottomColor="green.400"
          borderBottomWidth={3}
          paddingBottom={2}
          borderRadius={3}
          marginRight={10}
        >
          Linhas
        </Text>
      </Flex>

      <Flex
        as="label"
        flex="1"
        py="2"
        px="8"
        maxW={400}
        alignSelf="center"
        color="gray.200"
        position="relative"
        bg="gray.200"
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
            />
          </PopoverTrigger>

          {popFilters.length && (
            <PopoverContent color="gray.500" bg="gray.200" mt={2}>
              <PopoverArrow bg="gray.200" />
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

      <Flex>
        <Switch size="lg" colorScheme={"green"} />
        <Icon as={MdDarkMode} fontSize="30" color="green.400" ml="3" />
      </Flex>
    </Flex>
  );
}
