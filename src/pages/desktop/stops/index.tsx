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
} from "@chakra-ui/react";
import GoogleMaps from "@/components/GoogleMaps";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { BiDetail } from "react-icons/bi";
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
              src="/images/bus-stop-yellow.svg"
              alt=""
              width={350}
              height={350}
              priority
            />

            {Boolean(stopDetails.length) ? (
              <>
                <Text alignSelf="flex-start" fontWeight="bold" fontSize="large">
                  Linhas que passam por este ponto:
                </Text>

                <TableContainer w="100%">
                  <Table
                    variant="striped"
                    colorScheme={isDark ? "blackAlpha" : "facebook"}
                  >
                    <Thead>
                      <Tr>
                        <Td>Código</Td>
                        <Td>Nome</Td>
                        <Td>Mapa</Td>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {stopDetails.map((detail) => (
                        <Tr key={detail.idLinha}>
                          <Td>{detail.codigoLinha}</Td>
                          <Td whiteSpace="pre-wrap">{detail.nomeLinha}</Td>
                          <Td>
                            <Link href={`/lines/itinerary/${detail.idLinha}`}>
                              <Icon
                                as={BiDetail}
                                color="green.400"
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
              <Text fontWeight="bold" fontSize="xl" textAlign="center">
                Clique sobre uma parada de ônibus <br />
                para vizualizar mais detalhes.
              </Text>
            )}
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
