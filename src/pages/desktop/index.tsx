import { Presentation } from "@/components/Presentation";
import { Flex } from "@chakra-ui/react";
import Image from "next/image";
import Head from "next/head";
import { GetStaticProps } from "next";
import { Header } from "@/components/Header";

type HomeProps = {
  isDesktop: boolean;
};

export default function Home({ isDesktop }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | lines</title>
      </Head>

      <Header isDesktop={isDesktop} />

      <Flex align="center" w="100vw" justify="center" h="80vh" gap="10">
        <Presentation />

        <Image
          src="/images/bus-stop.svg"
          alt=""
          width={450}
          height={600}
          priority
        />
      </Flex>
    </>
  );
}

export const getStaticProps: GetStaticProps = () => {
  return {
    props: { isDesktop: true },
    revalidate: 60 * 60 * 24,
  };
};
