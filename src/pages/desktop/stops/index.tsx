import { HeaderView } from "@/components/Header/view";
import { api } from "@/services/api";
import { GetServerSideProps } from "next";
import Head from "next/head";
import {
  Stack,
  Flex,
  Text,
  TableContainer,
  Table,
  Thead,
  Tr,
  Td,
  Tbody,
  Icon,
  Card,
  CardBody,
  Button,
  Divider,
} from "@chakra-ui/react";
import GoogleMaps from "@/components/GoogleMaps";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { BiDetail } from "react-icons/bi";
import { BiCurrentLocation } from "react-icons/bi";
import { TbLocationFilled } from "react-icons/tb";
import { MdOutlineAltRoute } from "react-icons/md";
import { useTheme } from "@/hooks/useTheme";

type Line = {
  idLinha: string;
  codigoLinha: string;
  nomeLinha: string;
};

type Stops = {
  codigo: string;
  latitude: string;
  longitude: string;
  terminal: string;
  linhas: Line[];
};

type StopsProps = {
  isDesktop: boolean;
  stops: Stops[];
};

export default function Stops({ isDesktop, stops }: StopsProps) {
  const { isDark } = useTheme();
  const [stopDetails, setStopDetails] = useState<Line[]>([]);

  return (
    <>
      <Head>
        <title>Paradas | lines</title>
      </Head>

      <HeaderView isDesktop={isDesktop} />

      <Flex mt={35} mb={100} justify="center">
        <Flex w={1280} gap="10">
          <Flex w="50%">
            <GoogleMaps stops={stops} setStopDetails={setStopDetails} />
          </Flex>

          <Stack w="50%" align="center" spacing="10">
            <Image
              src="/images/bus-stop-blue.svg"
              alt=""
              width={350}
              height={350}
              priority
            />

            <Card width="100%">
              <CardBody bgColor={isDark ? "gray.700" : "gray.200"}>
                <Flex gap="5" mb="10">
                  <Button
                    rightIcon={<Icon as={BiCurrentLocation} fontSize="20" />}
                    colorScheme="blue"
                    variant="solid"
                    borderRadius="full"
                  >
                    Sua localização
                  </Button>

                  <Button
                    rightIcon={<Icon as={TbLocationFilled} fontSize="20" />}
                    colorScheme="blue"
                    color={isDark ? "gray.100" : "blue.500"}
                    variant="outline"
                    borderRadius="full"
                    _hover={{
                      bgColor: isDark ? "gray.600" : "gray.300",
                    }}
                  >
                    Rota para a parada mais próximo
                  </Button>
                </Flex>

                {Boolean(stopDetails.length) ? (
                  <>
                    <Text
                      alignSelf="flex-start"
                      fontWeight="bold"
                      fontSize="large"
                      color={isDark ? "gray.100" : "gray.900"}
                    >
                      Detalhes da parada
                    </Text>
                    <Button
                      rightIcon={<Icon as={MdOutlineAltRoute} fontSize="20" />}
                      colorScheme="blue"
                      color={isDark ? "gray.100" : "blue.500"}
                      variant="outline"
                      borderRadius="full"
                      _hover={{
                        bgColor: isDark ? "gray.600" : "gray.300",
                      }}
                      my="5"
                    >
                      Caminho até esta parada
                    </Button>

                    <Text
                      alignSelf="flex-start"
                      fontWeight="bold"
                      fontSize="large"
                      color={isDark ? "gray.100" : "gray.900"}
                    >
                      Linhas que passam por esta parada:
                    </Text>

                    <TableContainer w="100%">
                      <Table
                        variant="striped"
                        colorScheme={isDark ? "blackAlpha" : "facebook"}
                        color={isDark ? "gray.100" : "gray.900"}
                      >
                        <Thead>
                          <Tr>
                            <Td>Código</Td>
                            <Td>Nome</Td>
                            <Td>Rota</Td>
                          </Tr>
                        </Thead>
                        <Tbody>
                          {stopDetails.map((detail) => (
                            <Tr key={detail.idLinha}>
                              <Td>{detail.codigoLinha}</Td>
                              <Td whiteSpace="pre-wrap">{detail.nomeLinha}</Td>
                              <Td>
                                <Link
                                  href={`/lines/itinerary/${detail.idLinha}`}
                                >
                                  <Icon
                                    as={BiDetail}
                                    color="blue.500"
                                    fontSize="20"
                                  />
                                </Link>
                              </Td>
                            </Tr>
                          ))}
                        </Tbody>
                      </Table>
                    </TableContainer>
                  </>
                ) : (
                  <Text
                    fontWeight="bold"
                    fontSize="xl"
                    textAlign="center"
                    color={isDark ? "gray.100" : "gray.900"}
                  >
                    Clique sobre uma parada de ônibus <br />
                    para vizualizar mais detalhes 🚌
                  </Text>
                )}
              </CardBody>
            </Card>
          </Stack>
        </Flex>
      </Flex>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const { data } = await api.get("/process.php?a=tp&p=");

  return {
    props: {
      stops: data,
      isDesktop: true,
    },
  };
};
