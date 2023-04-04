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
  CardHeader,
} from "@chakra-ui/react";
import GoogleMaps from "@/components/GoogleMaps";
import Image from "next/image";
import { useState, useEffect } from "react";
import Link from "next/link";
import { BiDetail } from "react-icons/bi";
import { BiCurrentLocation } from "react-icons/bi";
import { MdCleaningServices } from "react-icons/md";
import { MdOutlineAltRoute } from "react-icons/md";
import { useTheme } from "@/hooks/useTheme";
import { TbMapSearch } from "react-icons/tb";

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
  const [stopLocation, setStopLocation] = useState<any>();
  const [center, setCenter] = useState<any>({
    lat: Number(stops && stops[0].latitude),
    lng: Number(stops && stops[0].longitude),
  });
  const [userLocation, setUserLocation] = useState<any>();
  const [origin, setOrigin] = useState<google.maps.LatLngLiteral | null>(null);
  const [destination, setDestination] =
    useState<google.maps.LatLngLiteral | null>(null);
  const [response, setResponse] = useState<any | null>(null);

  function get_location() {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;

      setUserLocation({ lat: latitude, lng: longitude });
    });
  }

  function handleCenterUser() {
    setCenter(userLocation);
    setUserLocation(undefined);
    get_location();
  }

  useEffect(() => {
    get_location();
  }, []);

  const traceRoute = () => {
    if (stops && setOrigin && setDestination) {
      setOrigin(userLocation);
      setDestination(stopLocation);
    }
  };
  console.log(response && response.routes[0].legs[0].distance.text);
  return (
    <>
      <Head>
        <title>Paradas | lines</title>
      </Head>

      <HeaderView isDesktop={isDesktop} />

      <Flex mt={35} mb={100} justify="center">
        <Flex w={1280} gap="10">
          <Flex w="50%">
            <GoogleMaps
              stops={stops}
              setStopDetails={setStopDetails}
              center={center}
              setCenter={setCenter}
              userLocation={userLocation}
              origin={origin}
              setOrigin={setOrigin}
              destination={destination}
              setDestination={setDestination}
              setStopLocation={setStopLocation}
              response={response}
              setResponse={setResponse}
            />
          </Flex>

          <Stack w="50%" align="center" spacing="10">
            <Image
              src="/images/bus-stop-blue.svg"
              alt=""
              width={350}
              height={350}
              priority
            />

            <Card
              width="100%"
              bgColor={isDark ? "gray.700" : "gray.200"}
              borderRadius="20"
            >
              <CardHeader>
                <Flex gap="5">
                  <Button
                    rightIcon={<Icon as={BiCurrentLocation} fontSize="20" />}
                    colorScheme="blue"
                    variant="solid"
                    borderRadius="full"
                    onClick={() => {
                      handleCenterUser();
                    }}
                  >
                    Sua localização
                  </Button>
                </Flex>
              </CardHeader>
              <CardBody>
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
                    <Flex align="center" gap={5}>
                      <Button
                        rightIcon={
                          <Icon as={MdOutlineAltRoute} fontSize="20" />
                        }
                        colorScheme="blue"
                        color={isDark ? "gray.100" : "blue.500"}
                        variant="outline"
                        borderRadius="full"
                        _hover={{
                          bgColor: isDark ? "gray.600" : "gray.300",
                        }}
                        my="5"
                        onClick={() => traceRoute()}
                      >
                        Caminho até esta parada
                      </Button>
                      {response && (
                        <Text
                          fontWeight="bold"
                          fontSize="md"
                          color={isDark ? "gray.100" : "gray.900"}
                        >
                          Distância: {response.routes[0].legs[0].distance.text}
                        </Text>
                      )}
                    </Flex>

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
                                    as={TbMapSearch}
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
