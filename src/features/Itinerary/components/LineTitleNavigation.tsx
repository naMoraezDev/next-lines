import { Flex, Icon, Text } from "@chakra-ui/react";
import Link from "next/link";
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
  return (
    <Flex
      align="center"
      gap="5"
      fontSize="24"
      justify={isDesktop ? undefined : "center"}
    >
      <Flex mt="2" cursor="pointer">
        <Icon as={AiOutlineArrowLeft} onClick={() => router.back()} />
      </Flex>
      <Text fontWeight="bold">
        {line.codigo} || {line.nome}
      </Text>
    </Flex>
  );
}
