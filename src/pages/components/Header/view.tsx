import { Flex, Switch, Tab, TabList, Tabs, Text } from "@chakra-ui/react";

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
    >
      <Text
        fontSize={["md", "3xl"]}
        fontWeight="bold"
        letterSpacing="tight"
        w="64"
      >
        <Text color="green.400" as="span" ml="1">
          POA{" "}
        </Text>
        _ lines
      </Text>

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
        Itinerário
      </Text>

      <Switch size="lg" colorScheme={"green"} ml="auto" mr="2" />
    </Flex>
  );
}
