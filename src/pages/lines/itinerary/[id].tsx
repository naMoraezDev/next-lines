import { api } from "@/services/api";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { Header } from "@/components/Header";
import { Stack, Flex } from "@chakra-ui/react";
import { LineTitleNavigation } from "@/features/Itinerary/components/LineTitleNavigation";
import GoogleMaps from "@/components/GoogleMaps";

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

export default function ItineraryPage({ itinerary, line }: DetailsProps) {
  return (
    <>
      <Head>
        <title>{line.nome}</title>
      </Head>

      <Header />

      <Flex mt={35} mb={100} justify="center">
        <Stack w={1280} gap="5">
          <LineTitleNavigation line={line} />
          <GoogleMaps itinerary={itinerary} />
        </Stack>
      </Flex>
    </>
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
