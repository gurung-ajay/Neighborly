import React, { useEffect, useState } from "react";
import { MapContainer, Marker, TileLayer, useMap, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useDispatch } from "react-redux";
import { addHomeAddress } from "@/app/redux/features/register/registerUserSlice";

const MapForm = () => {
  const [mapCentre, setMapCentre] = useState([51.505, -0.09]);
  const [markerPosition, setMarkerPosition] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latLong = [position.coords.latitude, position.coords.longitude];
          setMapCentre(latLong);
        },
        (error) => {
          console.error("Geolocation Error:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  // set home_address form field
  useEffect(() => {
    if (markerPosition) {
      dispatch(addHomeAddress({ lat: markerPosition.lat, lng: markerPosition.lng }));
    }
  }, [markerPosition])

 
  // simply using state change to re-center the map by re-rendering the map is not working
  // because map only renders once with the initial default state value and wont rerender so recenter wont happen
  // So using Custom component to re-center the map,
  const ChangeView = ({ center }) => {
    const map = useMap();
    useEffect(() => {
      map.setView(center);
    }, [center, map]);
    return null;
  };

  const MapEvents = () => {
    const map = useMapEvents({
      click: (e) => {
        setMarkerPosition(e.latlng);
      },
    });
    return null;
  };
  useEffect(() => {
    console.log(markerPosition);
  }, [markerPosition]);

  const customIcon = new window.L.Icon({
    iconUrl: "/marker.png",
    iconSize: [32, 32],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12],
  });

  return (
    <div>
      <MapContainer
        center={mapCentre}
        zoom={16}
        scrollWheelZoom={true}
        className="h-[300] w-[600]"
        dragging={true}
        zoomControl={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {/* Custom component to re-center the map */}
              {/*to prevent from recentering map each time user places a marker*/}
        {!markerPosition && (      
          <ChangeView center={mapCentre} />
        )}
        <MapEvents />
        {markerPosition && (
          <Marker position={markerPosition} icon={customIcon}/>
        )}
      </MapContainer>
    </div>
  );
};

export default MapForm;