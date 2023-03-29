import React from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

type ItineraryLocations = {
  lat: string;
  lng: string;
};

type GoogleMapsProps = {
  itinerary: ItineraryLocations[];
};

function GoogleMaps({ itinerary }: GoogleMapsProps) {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCNO-HLkjdLj95mGXQLKNvzQR8hf0DExjU",
    language: "pt-BR",
  });

  const center = {
    lat: Number(itinerary[0].lat),
    lng: Number(itinerary[0].lng),
  };

  function createKey(location: any) {
    return location.lat + location.lng;
  }

  const containerStyle = {
    width: "100%",
    height: "100vh",
  };

  return isLoaded ? (
    <>
      <GoogleMap
        clickableIcons
        mapContainerStyle={containerStyle}
        center={center}
        zoom={15}
      >
        {itinerary.map((location) => (
          <Marker
            key={createKey(location)}
            position={{ lat: Number(location.lat), lng: Number(location.lng) }}
            icon={{
              url: "https://cdn-icons-png.flaticon.com/512/3944/3944427.png",
              scaledSize: new window.google.maps.Size(30, 30),
            }}
          />
        ))}
      </GoogleMap>
    </>
  ) : (
    <></>
  );
}

export default React.memo(GoogleMaps);
