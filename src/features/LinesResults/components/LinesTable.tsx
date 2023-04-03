import { useTheme } from "@/hooks/useTheme";
import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Td,
  Tbody,
  Button,
  Icon,
} from "@chakra-ui/react";
import Link from "next/link";
import { TbMapSearch } from "react-icons/tb";

type Line = {
  id: string;
  nome: string;
  codigo: string;
};

type LinesTableProps = {
  lines: Line[];
};

export function LinesTable({ lines }: LinesTableProps) {
  const { isDark } = useTheme();

  return (
    <TableContainer width={1080}>
      <Table variant="striped" colorScheme={isDark ? "blackAlpha" : "facebook"}>
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
                  <Button
                    rightIcon={<Icon as={TbMapSearch} fontSize="20" />}
                    colorScheme="green"
                    borderRadius="full"
                  >
                    trajeto
                  </Button>
                </Link>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
}
