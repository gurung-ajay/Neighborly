"use client"

import { useEffect, useState } from "react"
import { MapContainer, Marker, Popup, useMap, ZoomControl } from "react-leaflet"
import { TileLayer } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import RequestForm from "./requestForm"
import { useSelector } from "react-redux"
import axios from "axios"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Home, RefreshCw, Calendar, User, Clock, Trash2, CheckCircle } from "lucide-react"

const Map = () => {
  const [requests, setRequests] = useState([])
  const router = useRouter()

  const handleDeleteRequest = async (id) => {
    try {
      console.log(id)
      const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/request/delete/${id}`)

      if (response.status === 200) {
        console.log("Request deleted successfully")
        toast.success("Request deleted successfully")
        fetchRequests()
      }
    } catch (error) {
      console.error("Error deleting request:", error)
      toast.error("Failed to delete request")
    }
  }

  const fetchRequests = async () => {
    const response = await axios.get("/api/requests/request")
    setRequests(response.data)
  }

  useEffect(() => {
    fetchRequests()
  }, [])

  const { user } = useSelector((state) => state.user)
  const [mapCentre, setMapCentre] = useState(Object.values(user?.data?.home_address))

  const customIcon = new window.L.Icon({
    iconUrl: "/map/avatar/people.png",
    iconSize: [60, 60],
    iconAnchor: [30, 30],
    popupAnchor: [0, -30],
    className: "animate-pulse-slow",
  })

  const homeIcon = new window.L.Icon({
    iconUrl: "/map/home.png",
    iconSize: [64, 64],
    iconAnchor: [32, 32],
    popupAnchor: [0, -32],
    className: "drop-shadow-xl",
  })

  const MapRecenter = ({ center }) => {
    const map = useMap()
    useEffect(() => {
      if (map) {
        // Check if map is available
        map.setView(center)
      }
    }, [center, map])
    return null
  }

  const handleRecenter = () => {
    setMapCentre(Object.values(user?.data?.home_address))
    toast.success("Map centered to your home location")
  }

  // --- START: Different TileLayer URLs ---
  const osmStandard = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  const osmHOT = "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png";
  const stadiaAlidadeSmooth = "https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png";  
  const stadiaOutdoors = "https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png";
  const esriWorldStreetMap = "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}";
  const esriWorldTopo = "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}";
  const cartoDBPositron = "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png";
  const cartoDBDarkMatter = "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";

  // --- END: Different TileLayer URLs ---

  const currentTileUrl = stadiaOutdoors; // Choose your desired map style here

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-5 left-[calc(4.5rem+20px)] z-[1000] bg-white/90 px-4 py-2 rounded-full shadow-md border-2 border-green-200">
        <h1 className="text-xl font-bold text-green-700 flex items-center">
          <Home className="mr-2 text-green-500" size={20} />
          Neighborly Map
        </h1>
      </div>

      <MapContainer
        center={mapCentre}
        zoom={18}
        scrollWheelZoom={true}
        className="h-full w-full"
        dragging={true}
        zoomControl={false}
        style={{
          borderRadius: "0 0 0 0",
          border: "none",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <RequestForm refetchRequests={fetchRequests} />

        <button
          className="z-[1000] absolute bottom-10 left-10 p-3 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg transform hover:scale-105 transition-all border-2 border-white flex items-center justify-center"
          onClick={handleRecenter}
          title="Center to your home"
        >
          <RefreshCw size={24} />
        </button>

        <ZoomControl position="bottomright" />

        <TileLayer
          url={currentTileUrl} // Use the chosen URL here
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        <Marker position={Object.values(user?.data?.home_address)} icon={homeIcon}>
          <Popup className="custom-popup">
            <div className="bg-white rounded-lg overflow-hidden shadow-md w-[250px]">
              <div className="bg-green-500 p-2 text-white font-bold text-center">Your Home</div>

              {requests.data &&
              requests.data.filter((request) => request._doc.postedBy === user.data._id).length > 0 ? (
                <div className="p-3">
                  <h3 className="font-bold text-green-700 mb-2 text-center">Your Active Requests</h3>

                  {requests.data
                    .filter((request) => request._doc.postedBy === user.data._id)
                    .map((request, index) => (
                      <div key={index} className="mb-3 bg-green-50 p-3 rounded-lg border border-green-200">
                        <h4 className="font-bold text-green-800">{request._doc.title}</h4>
                        <p className="text-gray-700 text-sm my-1">{request._doc.description}</p>
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <Calendar size={12} className="mr-1" />
                          <span>Needed by: {new Date(request._doc.expiryDate).toLocaleDateString("en-CA")}</span>
                        </div>
                        <button
                          className="mt-2 bg-red-400 hover:bg-red-500 text-white px-3 py-1 rounded-full text-xs flex items-center justify-center w-full transition-colors"
                          onClick={() => handleDeleteRequest(request._doc._id)}
                        >
                          <Trash2 size={12} className="mr-1" /> Delete Request
                        </button>
                      </div>
                    ))}
                </div>
              ) : (
                <div className="p-4 text-center">
                  <p className="text-gray-600">You have no active requests</p>
                </div>
              )}
            </div>
          </Popup>
        </Marker>

        {/* Loop through requests only after requests data has been received from backend */}
        {requests?.data &&
          requests?.data.map(
            (request, index) =>
              request._doc.postedBy !== user.data._id && (
                <Marker key={index} position={Object.values(request.location)} icon={customIcon}>
                  <Popup className="custom-popup">
                    <div className="bg-white rounded-lg overflow-hidden shadow-md w-[250px]">
                      <div className="bg-blue-500 p-2 text-white font-bold text-center">Neighbor Request</div>
                      <div className="p-3">
                        <h3 className="font-bold text-blue-700 mb-1">{request._doc.title}</h3>
                        <p className="text-gray-700 text-sm my-2">{request._doc.description}</p>

                        <div className="flex flex-col gap-1 text-xs text-gray-500 mt-2">
                          <div className="flex items-center">
                            <User size={12} className="mr-1" />
                            <span>Posted by: Neighbor</span>
                          </div>
                          <div className="flex items-center">
                            <Clock size={12} className="mr-1" />
                            <span>Needed by: {new Date(request._doc.expiryDate).toLocaleDateString("en-CA")}</span>
                          </div>
                        </div>

                        <button className="mt-3 bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-full text-sm flex items-center justify-center w-full transition-colors">
                          <CheckCircle size={16} className="mr-1" /> Offer Help
                        </button>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ),
          )}
        <MapRecenter center={mapCentre} />
      </MapContainer>
    </div>
  )
}

export default Map