import { api } from "@/services/api";
import { GetServerSideProps } from "next";
import { Itinerary } from "@/features/Itinerary";

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
  return <Itinerary itinerary={itinerary} line={line} />;
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
