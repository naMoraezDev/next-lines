import { LinesResults } from "@/features/LinesResults/LinesResults";
import { api } from "@/services/api";
import { GetServerSideProps } from "next";

type Line = {
  id: string;
  nome: string;
  codigo: string;
};

type SearchProps = {
  lines: Line[];
  filter: string;
};

export default function Search({ lines, filter }: SearchProps) {
  return <LinesResults lines={lines} filter={filter} />;
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const term = query.term?.toString().toLowerCase() ?? "";
  if (query.slug == "all" && term.length) {
    const buses = await api.get("/process.php?a=nc&p=%&t=o");
    const lotations = await api.get("/process.php?a=nc&p=%&t=l");

    const lines: Line[] = [...buses.data, ...lotations.data];

    const filterdlines: Line[] = lines.filter(
      (line: Line) =>
        line.codigo.toLowerCase().includes(term) ||
        line.nome.toLowerCase().includes(term)
    );

    return {
      props: {
        lines: filterdlines,
      },
    };
  }

  if ((query.slug == "buses" || query.slug == "lotations") && term.length) {
    const filter = query.slug == "buses" ? "o" : "l";
    console.log(filter);
    const { data } = await api.get(`/process.php?a=nc&p=%&t=${filter}`);

    const lines: Line[] = data.filter(
      (line: Line) =>
        line.codigo.toLowerCase().includes(term) ||
        line.nome.toLowerCase().includes(term)
    );

    return {
      props: {
        lines,
      },
    };
  }

  return {
    props: {},
    redirect: { destination: "/404", permanent: false },
  };
};
