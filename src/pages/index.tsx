import Head from "next/head";
import { Header } from "@/components/Header";
import { Presentation } from "@/components/Presentation";
import Image from "next/image";
import { Stack, Button } from "@chakra-ui/react";
import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | lines</title>
      </Head>

      <Header />

      <Stack gap={5} p="10" mt={120}>
        <Presentation />

        <Image
          src="/images/bus-stop.svg"
          alt=""
          width={450}
          height={600}
          priority
        />

        <Link href="/lines/filter?filter=buses">
          <Button
            borderRadius="full"
            colorScheme="green"
            width="100%"
            alignSelf="center"
          >
            Navegar
          </Button>
        </Link>
      </Stack>
    </>
  );
}
