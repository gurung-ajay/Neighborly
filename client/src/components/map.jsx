import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, useMap } from "react-leaflet";
import { TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import RequestForm from "./requestForm";
import { useSelector } from "react-redux";
import axios from "axios";

const markers = [
  {
    geocode: [51.505, -0.09],
    popUp: "Marker 1",
  },
  {
    geocode: [51.504, -0.08],
    popUp: "Marker 2",
  },
  {
    geocode: [27.727519, 85.306063],
    popUp: <div className="flex flex-col items-center"><h1 className="font-bold">Request Title</h1> <p>Request description</p> <img src="/map/recenter.png" alt="Re-center" width={50} height={50} /> <button className="bg-black text-white p-2 rounded-full mt-2">Accept</button></div>,
  }
];

const Map = () => {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    const response = await axios.get("/api/requests/request");
    setRequests(response.data);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  useEffect(() => {
    console.log(requests.data)
    console.log(typeof(requests.data))
  }, [requests]);

  const { user } = useSelector((state) => state.user);
  const [mapCentre, setMapCentre] = useState(Object.values(user.data?.home_address));

  const customIcon = new window.L.Icon({
    iconUrl: "/map/avatar/people.png",
    iconSize: [60, 60],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12],
  });

  const homeIcon = new window.L.Icon({
    iconUrl: "/map/home.png",
    iconSize: [64, 64],
    iconAnchor: [12, 12],
    popupAnchor: [0, -12],
  });

  const MapRecenter = ({ center }) => {
    const map = useMap();
    useEffect(() => {
       if (map) { // Check if map is available
            map.setView(center);
        }
    }, [center, map]);
    return null;
  };

  const handleRecenter = () => {
    setMapCentre(Object.values(user.data?.home_address));
  };

  return (
    <div>
      <MapContainer
        center={mapCentre}
        zoom={18}
        scrollWheelZoom={false}
        className="h-[100vh] w-screen"
        dragging={true}
        zoomControl={false}
      >
        <RequestForm refetchRequests={fetchRequests} />

        <button
          className="z-999 relative top-[600px] left-[50px] text-white p-2 rounded-full bg-white border-2 border-gray-300 shadow-2xl"
          onClick={handleRecenter}
        >
          <img src="/map/recenter.png" alt="Re-center" width={50} height={50} />
        </button>

        <TileLayer
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={Object.values(user.data?.home_address)} icon={homeIcon}>
          <Popup>
            {requests.data && requests.data.filter(request => request._doc.postedBy === user.data._id).map((request, index) => (
              <div key={index} className="flex flex-col items-center">
                <h3 className="font-bold text-center">{request._doc.title}</h3>
                <p className="text-center">{request._doc.description}</p>
                <p className="text-center">Help needed by: {new Date(request._doc.expiryDate).toLocaleDateString('en-CA')}</p>
                <button className="bg-red-300 text-white p-2 rounded-full">Delete</button>
                <hr />
              </div>
            ))}
          </Popup>
        </Marker>
        {markers.map((marker, index) => (
          <Marker key={index} position={marker.geocode} icon={customIcon}>
            <Popup>{marker.popUp}</Popup>
          </Marker>
        ))}
        // loop through requests only after requests data has been received from backend
        {requests.data && 
          requests.data.map((request, index) => (
            request._doc.postedBy !== user.data._id &&
            (
            <Marker key={index} position={Object.values(request.location)} icon={customIcon}>
              <Popup>
                <div className="flex flex-col items-center">
                  <h3 className="font-bold text-center">{request._doc.title}</h3>
                  <p className="text-center">{request._doc.description}</p>
                  <p className="text-center">Help needed by: {new Date(request._doc.expiryDate).toLocaleDateString('en-CA')}</p>
                  <button className="bg-green-400 text-white p-2 rounded-full">Accept</button>
                </div>
              </Popup>
            </Marker>
            )
          ))
        }
        <MapRecenter center={mapCentre} />
      </MapContainer>
    </div>
  );
};

export default Map;