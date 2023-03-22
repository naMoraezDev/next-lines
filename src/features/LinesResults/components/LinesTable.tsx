import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Td,
  Tbody,
  IconButton,
  Icon,
  Box,
} from "@chakra-ui/react";
import Link from "next/link";
import { IoIosEye } from "react-icons/io";

type Line = {
  id: string;
  nome: string;
  codigo: string;
};

type LinesTableProps = {
  lines: Line[];
};

export function LinesTable({ lines }: LinesTableProps) {
  return (
    <TableContainer width={1080}>
      <Box overflowX="hidden" overflowY="scroll" h="70vh">
        <Table variant="striped" colorScheme="facebook">
          <Thead>
            <Tr>
              <Td>Código</Td>
              <Td>Nome</Td>
              <Td>Detalhes</Td>
            </Tr>
          </Thead>
          <Tbody>
            {lines.map((line: any) => (
              <Tr key={line.id}>
                <Td>{line.codigo}</Td>
                <Td>{line.nome}</Td>
                <Td>
                  <Link href={`/lines/itinerary/${line.id}`}>
                    <IconButton
                      borderRadius="full"
                      colorScheme="green"
                      size="sm"
                      aria-label="Search database"
                      icon={
                        <Icon as={IoIosEye} color="gray.100" fontSize="20" />
                      }
                    />
                  </Link>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </TableContainer>
  );
}