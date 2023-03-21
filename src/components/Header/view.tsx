import { Flex, Icon, Input, Switch, Text } from "@chakra-ui/react";
import { RiSearchLine } from "react-icons/ri";
import { IoIosBus } from "react-icons/io";
import { MdDarkMode } from "react-icons/md";

export function HeaderView() {
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
        <Input
          color="gray.500"
          variant="unstyled"
          placeholder="Buscar uma linha"
          _placeholder={{ color: "gray.400" }}
        />

        <Icon as={RiSearchLine} fontSize="20" color="gray.400" />
      </Flex>

      <Flex>
        <Switch size="lg" colorScheme={"green"} />
        <Icon as={MdDarkMode} fontSize="30" color="green.400" ml="3" />
      </Flex>
    </Flex>
  );
}
