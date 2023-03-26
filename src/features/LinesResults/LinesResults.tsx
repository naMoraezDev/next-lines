import {
  Flex,
  Stack,
  Text,
  Card,
  CardBody,
  IconButton,
  Icon,
} from "@chakra-ui/react";
import { FilterSelect } from "./components/FilterSelect";
import { LinesTable } from "./components/LinesTable";
import { NoDataError } from "./components/NoDataError";
import Link from "next/link";
import { IoIosEye } from "react-icons/io";
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
    <Flex mt={23} mb={100} justify="center" pl="5" pr="5">
      <Stack w="100%">
        {showFilterSelect && <FilterSelect filter={filter} />}
        <Stack gap="2">
          {lines.map((line) => (
            <Card
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
                    <IconButton
                      borderRadius="full"
                      colorScheme="green"
                      size="sm"
                      aria-label="Search database"
                      icon={
                        <Icon as={IoIosEye} color="gray.100" fontSize="20" />
                      }
                    />
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
