import { api } from "@/services/api";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { Header } from "@/components/Header";
import GoogleMaps from "@/components/GoogleMaps";
import { LineTitleNavigation } from "@/features/Itinerary/components/LineTitleNavigation";
import { Stack, Flex } from "@chakra-ui/react";

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
  isDesktop: boolean;
};

export default function ItineraryPage({
  itinerary,
  line,
  isDesktop,
}: DetailsProps) {
  return (
    <>
      <Head>
        <title>{line.nome}</title>
      </Head>

      <Header isDesktop={isDesktop} />

      <Flex mt={35} mb={100} justify="center">
        <Stack w={1280} gap="5">
          <LineTitleNavigation line={line} isDesktop={isDesktop} />
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

  if (
    data === '{"Linha n�o encontrada"}' ||
    data === '{ "p deve ser num�rico" }'
  ) {
    return {
      props: {},
      redirect: { destination: "/404", permanent: false },
    };
  }

  const itinerary = Object.values(data);

  const line = {
    codigo: data.codigo,
    nome: data.nome,
  };

  return {
    props: {
      itinerary,
      line,
      isDesktop: true,
    },
  };
};
