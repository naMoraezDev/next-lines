import React, { Dispatch, SetStateAction, useEffect } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  MarkerClusterer,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";
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
  center?: any;
  setCenter?: Dispatch<any>;
  userLocation?: any;
  origin?: google.maps.LatLngLiteral | null;
  destination?: google.maps.LatLngLiteral | null;
  setOrigin?: Dispatch<SetStateAction<google.maps.LatLngLiteral | null>>;
  setDestination?: Dispatch<SetStateAction<google.maps.LatLngLiteral | null>>;
  setStopLocation?: Dispatch<any>;
  response?: google.maps.DistanceMatrixResponse | null;
  setResponse?: Dispatch<
    SetStateAction<google.maps.DistanceMatrixResponse | null>
  >;
};

function GoogleMaps({
  itinerary,
  stops,
  setStopDetails,
  center,
  setCenter,
  userLocation,
  origin,
  destination,
  setOrigin,
  setDestination,
  setStopLocation,
  response,
  setResponse,
}: GoogleMapsProps) {
  const { isDark } = useTheme();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [path, setPath] = useState<any>([]);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCNO-HLkjdLj95mGXQLKNvzQR8hf0DExjU",
    language: "pt-BR",
  });

  useEffect(() => {
    itinerary &&
      itinerary.forEach((line, index) => {
        setTimeout(() => {
          setPath((old: any) => [
            ...old,
            { lat: Number(line.lat), lng: Number(line.lng) },
          ]);
        }, index * 5);
      });
  }, [itinerary]);

  function handleOnClick(stopLines: Line[], location: any) {
    if (setStopDetails && setStopLocation) {
      setStopDetails(stopLines);
      setStopLocation(location);
      if (setCenter) {
        setCenter(location);
      }
    }
  }

  const containerStyle = {
    width: "100%",
    height: "100vh",
  };

  const options = {
    imagePath:
      "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
  };

  const directionsServiceOptions =
    // @ts-ignore
    React.useMemo<google.maps.DirectionsRequest>(() => {
      return {
        origin,
        destination,
        travelMode: "WALKING",
      };
    }, [origin, destination]);

  const directionsCallback = React.useCallback(
    (res: any) => {
      if (res !== null && res.status === "OK") {
        setResponse && setResponse(res);
      } else {
        console.log(res);
      }
    },
    [setResponse]
  );

  const directionsRendererOptions = React.useMemo<any>(() => {
    return {
      directions: response,
    };
  }, [response]);

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
        zoom={13}
        options={{
          styles: isDark ? darkTheme : lightTheme,
        }}
      >
        <Polyline
          options={{
            path: path,
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
    return (
      <>
        <GoogleMap
          clickableIcons
          mapContainerStyle={containerStyle}
          center={center}
          zoom={11}
          options={{
            styles: isDark ? darkTheme : lightTheme,
          }}
        >
          <MarkerClusterer options={options}>
            {(clusterer) => (
              <>
                {stops?.map((stop, index) => (
                  <Marker
                    title={`Terminal ${stop.terminal}`}
                    clusterer={clusterer}
                    key={index}
                    position={{
                      lat: Number(stop.latitude),
                      lng: Number(stop.longitude),
                    }}
                    icon={{
                      url: "https://cdn-icons-png.flaticon.com/512/7491/7491334.png",
                      scaledSize: new window.google.maps.Size(30, 30),
                    }}
                    onClick={() =>
                      handleOnClick(stop.linhas, {
                        lat: Number(stop.latitude),
                        lng: Number(stop.longitude),
                      })
                    }
                  />
                ))}
              </>
            )}
          </MarkerClusterer>

          <Marker
            position={userLocation}
            icon={{
              url: "https://cdn-icons-png.flaticon.com/512/6378/6378110.png",
              scaledSize: new window.google.maps.Size(40, 40),
            }}
            title="Você está aqui"
          />

          <DirectionsService
            options={directionsServiceOptions}
            callback={directionsCallback}
          />

          <DirectionsRenderer options={directionsRendererOptions} />
        </GoogleMap>
      </>
    );
  }

  return isLoaded ? <></> : <></>;
}

export default React.memo(GoogleMaps);
