import { Flex, Stack } from "@chakra-ui/react";
import { FilterSelect } from "./components/FilterSelect";
import { LinesTable } from "./components/LinesTable";
import { NoDataError } from "./components/NoDataError";

type Line = {
  id: string;
  nome: string;
  codigo: string;
};

type LinesProps = {
  lines: Line[];
  filter: string;
  showFilterSelect?: boolean;
};

export function LinesResults({ lines, filter, showFilterSelect }: LinesProps) {
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
