import {
  Flex,
  Stack,
  Select,
  TableContainer,
  Table,
  Thead,
  Tr,
  Td,
  Tbody,
  IconButton,
  Icon,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { ChangeEvent } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";

type Line = {
  id: string;
  nome: string;
  codigo: string;
};

type LinesProps = {
  lines: Line[];
  filter: string;
  showFilterSelect?: boolean;
};

export function LinesResults({ lines, filter, showFilterSelect }: LinesProps) {
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
          {showFilterSelect && (
            <Flex alignSelf="flex-end" align="center" gap="15">
              Filtrar por:
              <Select
                ringColor="green.400"
                borderColor="green.400"
                w={200}
                onChange={(e) => handleSelectFilter(e)}
                value={filter}
              >
                <option value="all">Todos</option>
                <option value="buses">Ônibus</option>
                <option value="lotations">Lotação</option>
              </Select>
            </Flex>
          )}

          {lines.length ? (
            <TableContainer width={1080}>
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
          ) : (
            <Stack mt={20}>
              <Image
                src="/images/no-data.svg"
                alt=""
                width={350}
                height={350}
                priority
              />
              <Text fontWeight="bold" alignSelf="center">
                Não encontramos nada referente a esta busca :((
              </Text>
            </Stack>
          )}
        </Stack>
      </Flex>
    </Flex>
  );
}
