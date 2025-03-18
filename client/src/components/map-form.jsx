import React from "react";
import { MapContainer, Marker, Popup } from "react-leaflet";
import { TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const markers = [
  {
    geocode: [51.505, -0.09],
    popUp: "Marker 1",
  }
];

const MapForm = () => {
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
        zoom={13}
        scrollWheelZoom={true}
        className="h-[400] w-[600]"
        dragging={true}
        zoomControl={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {markers.map((marker, index) => (
          <Marker key={index} position={marker.geocode} icon={customIcon}>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapForm;
