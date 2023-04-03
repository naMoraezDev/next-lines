import {
  Flex,
  Stack,
  Text,
  Card,
  CardBody,
  Button,
  Icon,
} from "@chakra-ui/react";
import { FilterSelect } from "./components/FilterSelect";
import { LinesTable } from "./components/LinesTable";
import { NoDataError } from "./components/NoDataError";
import Link from "next/link";
import { TbMapSearch } from "react-icons/tb";
import { useTheme } from "@/hooks/useTheme";

type Line = {
  id: string;
  nome: string;
  codigo: string;
};

type LinesProps = {
  lines: Line[];
  filter: string;
  showFilterSelect?: boolean;
  isDesktop?: boolean;
};

export function LinesResults({
  lines,
  filter,
  showFilterSelect,
  isDesktop,
}: LinesProps) {
  const { isDark } = useTheme();

  if (isDesktop) {
    return (
      <Flex mt={23} mb={100}>
        <Flex maxW={1480} mx="auto">
          <Stack>
            {showFilterSelect && <FilterSelect filter={filter} />}

            {lines.length ? <LinesTable lines={lines} /> : <NoDataError />}
          </Stack>
        </Flex>
      </Flex>
    );
  }

  return (
    <Flex mt={150} mb={100} justify="center" pl="5" pr="5">
      <Stack w="100%">
        {lines.length ? (
          showFilterSelect && <FilterSelect filter={filter} />
        ) : (
          <NoDataError />
        )}
        <Stack gap="2">
          {lines.map((line) => (
            <Card
              href={`/lines/itinerary/${line.id}`}
              as={Link}
              key={line.id}
              color={isDark ? "gray.100" : "gray.700"}
              bg={isDark ? "gray.700" : "gray.100"}
            >
              <CardBody>
                <Flex align="center" justify="space-between">
                  <Stack>
                    <Text fontSize="xl" fontWeight="bold">
                      Código
                    </Text>
                    <Text>{line.codigo}</Text>

                    <Text fontSize="xl" fontWeight="bold">
                      Nome
                    </Text>
                    <Text>{line.nome.slice(0, 15)} ...</Text>
                  </Stack>
                  <Link href={`/lines/itinerary/${line.id}`}>
                    <Button
                      rightIcon={<Icon as={TbMapSearch} fontSize="20" />}
                      colorScheme="green"
                      borderRadius="full"
                    >
                      trajeto
                    </Button>
                  </Link>
                </Flex>
              </CardBody>
            </Card>
          ))}
        </Stack>
      </Stack>
    </Flex>
  );
}
