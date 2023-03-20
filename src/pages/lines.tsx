import { api } from "@/services/api";
import {
  Flex,
  Icon,
  IconButton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { GetStaticProps } from "next";
import { AiOutlineArrowRight } from "react-icons/ai";

type Line = {
  id: string;
  nome: string;
  codigo: string;
};

type LinesProps = {
  lines: Line[];
};

export default function Lines({ lines }: LinesProps) {
  console.log(lines);
  return (
    <Flex>
      <Flex maxW={1480} mx="auto" mt={23}>
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
      </Flex>
    </Flex>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const buses = await api.get("/process.php?a=nc&p=%&t=o");
  const lotations = await api.get("/process.php?a=nc&p=%&t=l");

  const lines: Line[] = [...buses.data, ...lotations.data];
  return {
    props: {
      lines,
    },
    revalidate: 60 * 60 * 24,
  };
};
