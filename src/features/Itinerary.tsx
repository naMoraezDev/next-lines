import {
  Flex,
  Stack,
  Icon,
  TableContainer,
  Table,
  Thead,
  Tr,
  Td,
  Tbody,
  IconButton,
  Text,
  Box,
} from "@chakra-ui/react";
import Link from "next/link";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { MdLocationOn } from "react-icons/md";

type Line = {
  codigo: string;
  nome: string;
};

type ItineraryLocations = {
  lat: string;
  lng: string;
};

type ItineraryProps = {
  itinerary: ItineraryLocations[];
  line: Line;
};

export function Itinerary({ itinerary, line }: ItineraryProps) {
  return (
    <Flex mt={23} mb={100}>
      <Flex maxW={1480} mx="auto">
        <Stack>
          <Flex align="center" gap="5" fontSize="24">
            <Flex mt="2">
              <Link href="/lines/all">
                <Icon as={AiOutlineArrowLeft} />
              </Link>
            </Flex>
            <Text fontWeight="bold">
              {line.codigo} || {line.nome}
            </Text>
          </Flex>

          <TableContainer width={1080}>
            <Box overflowX="hidden" overflowY="scroll" h="70vh">
              <Table variant="striped" colorScheme="facebook">
                <Thead>
                  <Tr>
                    <Td>Localidade</Td>
                    <Td>Mapa</Td>
                  </Tr>
                </Thead>
                <Tbody>
                  {itinerary.map((line: any, index) => (
                    <Tr key={line.id}>
                      <Td>{`Rua ${index + 1}`}</Td>
                      <Td>
                        <IconButton
                          borderRadius="full"
                          colorScheme="green"
                          size="sm"
                          aria-label="Search database"
                          onClick={() =>
                            window.open(
                              `https://www.google.com/maps/?q=${line.lat},${line.lng}`,
                              "_blank"
                            )
                          }
                          icon={
                            <Icon
                              as={MdLocationOn}
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
            </Box>
          </TableContainer>
        </Stack>
      </Flex>
    </Flex>
  );
}
