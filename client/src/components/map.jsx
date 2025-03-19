import React from "react";
import { MapContainer, Marker, Popup } from "react-leaflet";
import { TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const markers = [
  {
    geocode: [51.505, -0.09],
    popUp: "Marker 1",
  },
  {
    geocode: [51.504, -0.08],
    popUp: "Marker 2",
  },
];

const Map = () => {
  const customIcon = new window.L.Icon({
    iconUrl: "/marker.png",
    iconSize: [50, 50],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12],
  });

  // TODO: Replace these with data from user address location in database
  return (
    <div>
      <MapContainer
        center={[51.505, -0.09]}
        zoom={15}
        scrollWheelZoom={true}
        className="h-[100vh] w-screen"
        dragging={true}
        zoomControl={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {markers.map((marker, index) => (
          <Marker key={index} position={marker.geocode} icon={customIcon}>
            <Popup>{marker.popUp}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map;
