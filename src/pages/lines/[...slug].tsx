import { api } from "@/services/api";
import {
  Flex,
  Icon,
  IconButton,
  Select,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { ChangeEvent, useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";

type Line = {
  id: string;
  nome: string;
  codigo: string;
};

type LinesProps = {
  lines: Line[];
  filter: string;
};

export default function Lines({ lines, filter }: LinesProps) {
  const router = useRouter();

  function handleSelectFilter(event: ChangeEvent<HTMLSelectElement>) {
    const filter = event.target.value;
    if (filter !== "buses" && filter !== "lotations") {
      router.push(`/lines/all`);
      return;
    }

    router.push(`/lines/filter?filter=${filter}`);
  }

  return (
    <Flex mt={23} mb={100}>
      <Flex maxW={1480} mx="auto">
        <Stack>
          <Select
            ringColor="green.400"
            borderColor="green.400"
            alignSelf="flex-end"
            w={200}
            onChange={(e) => handleSelectFilter(e)}
            value={filter}
          >
            <option value="all">Todos</option>
            <option value="buses">Ônibus</option>
            <option value="lotations">Lotação</option>
          </Select>
          <TableContainer>
            <Table variant="striped" colorScheme="facebook">
              <Thead>
                <Tr>
                  <Td>Código</Td>
                  <Td>Nome</Td>
                  <Td>Ação</Td>
                </Tr>
              </Thead>
              <Tbody>
                {lines.map((line: any) => (
                  <Tr key={line.id}>
                    <Td>{line.codigo}</Td>
                    <Td>{line.nome}</Td>
                    <Td>
                      <IconButton
                        borderRadius="full"
                        colorScheme="green"
                        size="sm"
                        aria-label="Search database"
                        icon={
                          <Icon
                            as={AiOutlineArrowRight}
                            color="gray.100"
                            fontSize="20"
                          />
                        }
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Stack>
      </Flex>
    </Flex>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (query.slug == "all") {
    const buses = await api.get("/process.php?a=nc&p=%&t=o");
    const lotations = await api.get("/process.php?a=nc&p=%&t=l");

    const lines: Line[] = [...buses.data, ...lotations.data];
    return {
      props: {
        lines,
        filter: query.slug,
      },
    };
  }

  if (query.filter === "buses" || query.filter === "lotations") {
    const filter = query.filter === "buses" ? "o" : "l";
    const { data } = await api.get(`/process.php?a=nc&p=%&t=${filter}`);

    const lines: Line[] = data;
    return {
      props: {
        lines,
        filter: query.filter,
      },
    };
  }

  return {
    props: {},
    redirect: { destination: "/404", permanent: false },
  };
};
