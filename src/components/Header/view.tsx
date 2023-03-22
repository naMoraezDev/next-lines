import { Flex, Icon, Switch } from "@chakra-ui/react";
import { MdDarkMode } from "react-icons/md";
import { Logo } from "./components/Logo";
import { Navigation } from "./components/Navigation";
import { SearchBox } from "./components/SearchBox";

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
      <Logo />

      <Navigation />

      <SearchBox />

      <Flex>
        <Switch size="lg" colorScheme={"green"} />
        <Icon as={MdDarkMode} fontSize="30" color="green.400" ml="3" />
      </Flex>
    </Flex>
  );
}
