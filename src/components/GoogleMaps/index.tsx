import React, { Dispatch, SetStateAction } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text,
  Flex,
  IconButton,
  Icon,
  Stack,
} from "@chakra-ui/react";
import { useState } from "react";
import { useTheme } from "@/hooks/useTheme";
import Link from "next/link";
import { BiDetail } from "react-icons/bi";
import { lightTheme } from "./styles/lightTheme";
import { darkTheme } from "./styles/darkTheme";
import { Polyline } from "@react-google-maps/api";

type ItineraryLocations = {
  lat: string;
  lng: string;
};

type Line = {
  idLinha: string;
  codigoLinha: string;
  nomeLinha: string;
};

type Stops = {
  codigo: string;
  latitude: string;
  longitude: string;
  terminal: string;
  linhas: Line[];
};

type GoogleMapsProps = {
  itinerary?: ItineraryLocations[];
  stops?: Stops[];
  setStopDetails?: Dispatch<SetStateAction<Line[]>>;
};

function GoogleMaps({ itinerary, stops, setStopDetails }: GoogleMapsProps) {
  const { isDark } = useTheme();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCNO-HLkjdLj95mGXQLKNvzQR8hf0DExjU",
    language: "pt-BR",
  });

  function handleOnClick(stopLines: Line[]) {
    if (setStopDetails) {
      setStopDetails(stopLines);
      onOpen();
    }
  }
  itinerary &&
    console.log(
      Number(itinerary[itinerary.filter((item) => item.lat && item.lng).length])
    );
  const containerStyle = {
    width: "100%",
    height: "100vh",
  };

  if (itinerary && isLoaded) {
    const itineraryCenter = {
      lat: Number(itinerary && itinerary[0].lat),
      lng: Number(itinerary && itinerary[0].lng),
    };

    return (
      <GoogleMap
        clickableIcons
        mapContainerStyle={containerStyle}
        center={itineraryCenter}
        zoom={17}
        options={{
          styles: isDark ? darkTheme : lightTheme,
        }}
      >
        <Polyline
          options={{
            path: itinerary
              ?.filter((item) => item.lat && item.lng)
              .map((line) => ({
                lat: Number(line.lat),
                lng: Number(line.lng),
              })),
            geodesic: true,
            strokeColor: "#63B3ED",
            strokeOpacity: 1.0,
            strokeWeight: 5,
          }}
        />

        <Marker
          position={{
            lat: Number(itinerary[0].lat),
            lng: Number(itinerary[0].lng),
          }}
          icon={{
            url: "https://cdn-icons-png.flaticon.com/512/3944/3944427.png",
            scaledSize: new window.google.maps.Size(30, 30),
          }}
        />

        <Marker
          position={{
            lat: Number(itinerary[itinerary.length - 4].lat),
            lng: Number(itinerary[itinerary.length - 4].lng),
          }}
          icon={{
            url: "https://cdn-icons-png.flaticon.com/512/3944/3944427.png",
            scaledSize: new window.google.maps.Size(30, 30),
          }}
        />
      </GoogleMap>
    );
  }

  if (stops && isLoaded) {
    const stopsCenter = {
      lat: Number(stops && stops[0].latitude),
      lng: Number(stops && stops[0].longitude),
    };

    return (
      <>
        <GoogleMap
          clickableIcons
          mapContainerStyle={containerStyle}
          center={stopsCenter}
          zoom={15}
          options={{
            styles: isDark ? darkTheme : lightTheme,
          }}
        >
          {stops?.map((stop, index) => (
            <Marker
              key={index}
              position={{
                lat: Number(stop.latitude),
                lng: Number(stop.longitude),
              }}
              icon={{
                url: "https://cdn-icons-png.flaticon.com/512/7491/7491334.png",
                scaledSize: new window.google.maps.Size(20, 20),
              }}
              onClick={(e) => handleOnClick(stop.linhas)}
            />
          ))}
        </GoogleMap>
      </>
    );
  }

  return isLoaded ? <></> : <></>;
}

export default React.memo(GoogleMaps);
