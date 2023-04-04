import { useTheme } from "@/hooks/useTheme";
import { Flex, Icon, Text, Card, CardBody } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { AiOutlineArrowLeft } from "react-icons/ai";

type Line = {
  codigo: string;
  nome: string;
};

type LineTitleNavigationProps = {
  line: Line;
  isDesktop?: boolean;
};

export function LineTitleNavigation({
  line,
  isDesktop,
}: LineTitleNavigationProps) {
  const router = useRouter();
  const { isDark } = useTheme();

  return (
    <Card bgColor={isDark ? "gray.700" : "gray.200"} borderRadius="20">
      <CardBody>
        <Flex
          align="center"
          gap="10"
          justify={isDesktop ? undefined : "center"}
        >
          <Flex cursor="pointer">
            <Icon
              as={AiOutlineArrowLeft}
              fontSize="25"
              onClick={() => router.back()}
              color={isDark ? "gray.100" : "gray.900"}
            />
          </Flex>
          <Flex gap="12" align="center">
            <Text color="green.400" fontWeight="bold" fontSize="lg">
              TRAJETO
            </Text>
            <Flex gap="3" align="center">
              <Text color={isDark ? "gray.100" : "gray.900"} fontWeight="bold">
                código:
              </Text>

              <Text color={isDark ? "gray.100" : "gray.900"} fontSize="lg">
                {line.codigo}
              </Text>
            </Flex>

            <Flex gap="3" align="center">
              <Text color={isDark ? "gray.100" : "gray.900"} fontWeight="bold">
                nome:
              </Text>

              <Text color={isDark ? "gray.100" : "gray.900"} fontSize="lg">
                {line.nome.toLowerCase()}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </CardBody>
    </Card>
  );
}
