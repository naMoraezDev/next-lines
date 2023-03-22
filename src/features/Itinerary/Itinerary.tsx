import { Flex, Stack } from "@chakra-ui/react";
import { ItineraryTable } from "./components/ItineraryTable";
import { LineTitleNavigation } from "./components/LineTitleNavigation";

type Line = {
  codigo: string;
  nome: string;
};

type ItineraryLocations = {
  lat: string;
  lng: string;
};

type ItineraryProps = {
  itinerary: ItineraryLocations[];
  line: Line;
};

export function Itinerary({ itinerary, line }: ItineraryProps) {
  return (
    <Flex mt={23} mb={100}>
      <Flex maxW={1480} mx="auto">
        <Stack>
          <LineTitleNavigation line={line} />

          <ItineraryTable itinerary={itinerary} />
        </Stack>
      </Flex>
    </Flex>
  );
}
