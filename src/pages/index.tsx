import Head from "next/head";
import { GetStaticProps } from "next";
import { Header } from "@/components/Header";

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | lines</title>
      </Head>

      <Header />
    </>
  );
}

export const getStaticProps: GetStaticProps = () => {
  return {
    props: { isDesktop: false },
    revalidate: 60 * 60 * 24,
  };
};
