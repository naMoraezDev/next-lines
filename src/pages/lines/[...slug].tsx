import { LinesContainer } from "@/features/Lines";
import { api } from "@/services/api";
import { GetServerSideProps } from "next";

type Line = {
  id: string;
  nome: string;
  codigo: string;
};

type LinesProps = {
  lines: Line[];
  filter: string;
};

export default function Lines({ lines, filter }: LinesProps) {
  return <LinesContainer lines={lines} filter={filter} />;
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (query.slug == "all") {
    const buses = await api.get("/process.php?a=nc&p=%&t=o");
    const lotations = await api.get("/process.php?a=nc&p=%&t=l");

    const lines: Line[] = [...buses.data, ...lotations.data];
    return {
      props: {
        lines,
        filter: query.slug,
      },
    };
  }

  if (query.filter === "buses" || query.filter === "lotations") {
    const filter = query.filter === "buses" ? "o" : "l";
    const { data } = await api.get(`/process.php?a=nc&p=%&t=${filter}`);

    const lines: Line[] = data;
    return {
      props: {
        lines,
        filter: query.filter,
      },
    };
  }

  return {
    props: {},
    redirect: { destination: "/404", permanent: false },
  };
};
