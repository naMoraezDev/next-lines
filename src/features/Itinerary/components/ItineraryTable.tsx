import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Td,
  Tbody,
  IconButton,
  Icon,
  Box,
} from "@chakra-ui/react";
import { MdLocationOn } from "react-icons/md";

type ItineraryLocations = {
  lat: string;
  lng: string;
};

type ItineraryTableProps = {
  itinerary: ItineraryLocations[];
};

export function ItineraryTable({ itinerary }: ItineraryTableProps) {
  return (
    <TableContainer width={1080}>
      <Box overflowX="hidden" overflowY="scroll" h="70vh">
        <Table variant="striped" colorScheme="facebook">
          <Thead>
            <Tr>
              <Td>Localidade</Td>
              <Td>Mapa</Td>
            </Tr>
          </Thead>
          <Tbody>
            {itinerary.map((line: any, index) => (
              <Tr key={line.id}>
                <Td>{`Rua ${index + 1}`}</Td>
                <Td>
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
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </TableContainer>
  );
}
