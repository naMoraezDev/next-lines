import { useDeviceContext } from "@/context/device";
import { useTheme } from "@/hooks/useTheme";
import { Flex, Icon, Stack, Switch } from "@chakra-ui/react";
import { MdDarkMode } from "react-icons/md";
import { Logo } from "./components/Logo";
import { Navigation } from "./components/Navigation";
import { SearchBox } from "./components/SearchBox";

type HeaderViewProps = {
  isDesktop?: boolean;
  variant?: "404";
};

export function HeaderView({ isDesktop, variant }: HeaderViewProps) {
  const { toggleTheme, isDark } = useTheme();

  if (variant) {
    return (
      <Flex
        as="header"
        mx="auto"
        px="6"
        align="center"
        bg="green.400"
        justify="center"
      >
        <Logo />
      </Flex>
    );
  }

  if (isDesktop) {
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
        <Logo isDesktop />

        <Navigation />

        <SearchBox />

        <Flex>
          <Switch
            size="lg"
            colorScheme={"green"}
            onChange={toggleTheme}
            isChecked={isDark}
          />
          <Icon
            as={MdDarkMode}
            fontSize="30"
            color={isDark ? "green.400" : "gray.300"}
            ml="3"
          />
        </Flex>
      </Flex>
    );
  }

  return (
    <Flex as="header" mx="auto" px="6" align="center" bg="green.400">
      <Stack w="100%" mt={3} mb={4}>
        <Flex align="center" justify="space-between">
          <Logo />
          <Flex>
            <Switch
              size="lg"
              colorScheme={"green"}
              onChange={toggleTheme}
              isChecked={isDark}
            />
            <Icon
              as={MdDarkMode}
              fontSize="30"
              color={isDark ? "green.500" : "gray.100"}
              ml="3"
            />
          </Flex>
        </Flex>
        <Flex>
          <SearchBox />
        </Flex>
      </Stack>
    </Flex>
  );
}
