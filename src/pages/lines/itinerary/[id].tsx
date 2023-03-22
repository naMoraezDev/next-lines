import { api } from "@/services/api";
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
  Flex,
  Stack,
  Text,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { MdLocationOn } from "react-icons/md";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Link from "next/link";

type Line = {
  codigo: string;
  nome: string;
};

type ItineraryLocations = {
  lat: string;
  lng: string;
};

type DetailsProps = {
  itinerary: ItineraryLocations[];
  line: Line;
};

export default function Itinerary({ itinerary, line }: DetailsProps) {
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
                    <Td>Ação</Td>
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

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const id = params?.id;

  const { data } = await api.get(`process.php?a=il`, {
    params: {
      p: id,
    },
  });

  const itinerary = Object.values(data);

  const line = {
    codigo: data.codigo,
    nome: data.nome,
  };

  return {
    props: {
      itinerary,
      line,
    },
  };
};
