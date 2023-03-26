import { useTheme } from "@/hooks/useTheme";
import {
  Flex,
  Stack,
  Card,
  CardBody,
  Text,
  IconButton,
  Icon,
} from "@chakra-ui/react";
import { ItineraryTable } from "./components/ItineraryTable";
import { LineTitleNavigation } from "./components/LineTitleNavigation";
import { MdLocationOn } from "react-icons/md";

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
  isDesktop?: boolean;
};

export function Itinerary({ itinerary, line, isDesktop }: ItineraryProps) {
  const { isDark } = useTheme();

  if (isDesktop) {
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

  return (
    <Flex mt={23} mb={100} justify="center" pl="5" pr="5">
      <Stack w="100%" gap="5">
        <LineTitleNavigation line={line} />
        <Stack>
          {itinerary.map((line, index) => (
            <Card
              key={index}
              color={isDark ? "gray.100" : "gray.700"}
              bg={isDark ? "gray.700" : "gray.100"}
            >
              <CardBody>
                <Flex align="center" justify="space-between">
                  <Stack>
                    <Text fontSize="lg" fontWeight="bold">
                      {`Rua ${index + 1}`}
                    </Text>
                  </Stack>
                  <IconButton
                    borderRadius="full"
                    colorScheme="green"
                    size="sm"
                    aria-label="Search database"
                    onClick={() =>
                      window.open(
                        `https://www.google.com/maps/?q=${line.lat},${line.lng}`,
                        "_blank"
                      )
                    }
                    icon={
                      <Icon as={MdLocationOn} color="gray.100" fontSize="20" />
                    }
                  />
                </Flex>
              </CardBody>
            </Card>
          ))}
        </Stack>
      </Stack>
    </Flex>
  );
}
