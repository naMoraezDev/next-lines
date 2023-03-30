import { Flex, Icon, Text } from "@chakra-ui/react";
import Link from "next/link";
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
  return (
    <Flex
      align="center"
      gap="5"
      fontSize="24"
      justify={isDesktop ? undefined : "center"}
    >
      <Flex mt="2">
        <Link href="/lines/all">
          <Icon as={AiOutlineArrowLeft} />
        </Link>
      </Flex>
      <Text fontWeight="bold">
        {line.codigo} || {line.nome}
      </Text>
    </Flex>
  );
}
