import { HeaderView } from "@/components/Header/view";
import { LinesResults } from "@/features/LinesResults/LinesResults";
import { api } from "@/services/api";
import { GetServerSideProps } from "next";
import Head from "next/head";

type Line = {
  id: string;
  nome: string;
  codigo: string;
};

type LinesProps = {
  lines: Line[];
  filter: string;
  isDesktop: boolean;
};

export default function Lines({ lines, filter, isDesktop }: LinesProps) {
  return (
    <>
      <Head>
        <title>Linhas | lines</title>
      </Head>

      <HeaderView isDesktop={isDesktop} />

      <LinesResults
        showFilterSelect
        lines={lines}
        filter={filter}
        isDesktop={isDesktop}
      />
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (query.filter == "buses" || query.filter == "lotations") {
    const filter = query.filter == "buses" ? "o" : "l";

    const { data } = await api.get(`/process.php?a=nc&p=%&t=${filter}`);

    const lines: Line[] = data;

    return {
      props: {
        lines,
        filter: query.filter,
        isDesktop: true,
      },
    };
  }

  return {
    redirect: { destination: "/404", permanent: false },
  };
};
