import { LinesResults } from "@/features/LinesResults";
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
  const term = query.term ?? "";
  if ((query.slug == "buses" || query.slug == "lotations") && term.length) {
    const filter = query.slug === "buses" ? "o" : "l";
    const { data } = await api.get(`/process.php?a=nc&p=%&t=${filter}`);

    const lines: Line[] = data.filter(
      (line: Line) =>
        line.codigo.toLowerCase().includes(term[0].toLowerCase()) ||
        line.nome.toLowerCase().includes(term[0].toLowerCase())
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
