import React, { useMemo, useCallback } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";

type ItineraryLocations = {
  lat: string;
  lng: string;
};

type GoogleMapsProps = {
  itinerary: ItineraryLocations[];
};

function GoogleMaps({ itinerary }: GoogleMapsProps) {
  const [response, setResponse] =
    React.useState<google.maps.DistanceMatrixResponse | null>(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCNO-HLkjdLj95mGXQLKNvzQR8hf0DExjU",
    language: "pt-BR",
  });

  const center = {
    lat: Number(itinerary[0].lat),
    lng: Number(itinerary[0].lng),
  };

  const containerStyle = {
    width: "100%",
    height: "100vh",
  };

  const directionsServiceOptions =
    // @ts-ignore
    useMemo<google.maps.DirectionsRequest>(() => {
      return {
        origin: {
          lat: Number(itinerary[0].lat),
          lng: Number(itinerary[0].lng),
        },
        destination: {
          lat: Number(itinerary[itinerary.length - 5].lat),
          lng: Number(itinerary[itinerary.length - 5].lng),
        },
        travelMode: "DRIVING",
      };
    }, [itinerary]);

  const directionsCallback = useCallback((res: any) => {
    if (res !== null && res.status === "OK") {
      setResponse(res);
    } else {
      console.error(res);
    }
  }, []);

  const directionsRendererOptions = React.useMemo<any>(() => {
    return {
      directions: response,
    };
  }, [response]);

  return isLoaded ? (
    <>
      <GoogleMap
        clickableIcons
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
      >
        <DirectionsService
          options={directionsServiceOptions}
          callback={directionsCallback}
        />

        <DirectionsRenderer options={directionsRendererOptions} />
      </GoogleMap>
    </>
  ) : (
    <></>
  );
}

export default React.memo(GoogleMaps);
