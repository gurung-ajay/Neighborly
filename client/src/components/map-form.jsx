"use client"

import { useEffect, useState } from "react"
import { MapContainer, Marker, TileLayer, useMap, useMapEvents } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import { useDispatch } from "react-redux"
import { addHomeAddress } from "@/app/redux/features/register/registerUserSlice"

const MapForm = () => {
  const [mapCentre, setMapCentre] = useState([51.505, -0.09])
  const [markerPosition, setMarkerPosition] = useState(null)
  const [isMapReady, setIsMapReady] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    // Fix for Leaflet icon issue in Next.js
    if (typeof window !== "undefined") {
      // Only run on client side
      import("leaflet").then((L) => {
        delete L.Icon.Default.prototype._getIconUrl
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: "/map/marker.png",
          iconUrl: "/map/marker.png",
          shadowUrl: "",
        })
        setIsMapReady(true)
      })
    }
  }, [])

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latLong = [position.coords.latitude, position.coords.longitude]
          setMapCentre(latLong)
        },
        (error) => {
          console.error("Geolocation Error:", error)
        },
      )
    } else {
      console.error("Geolocation is not supported by this browser.")
    }
  }, [])

  // set home_address form field
  useEffect(() => {
    if (markerPosition) {
      dispatch(addHomeAddress({ lat: markerPosition.lat, lng: markerPosition.lng }))
    }
  }, [markerPosition, dispatch])

  // simply using state change to re-center the map by re-rendering the map is not working
  // because map only renders once with the initial default state value and wont rerender so recenter wont happen
  // So using Custom component to re-center the map,
  const ChangeView = ({ centre }) => {
    const map = useMap()
    useEffect(() => {
      map.setView(centre)
    }, [centre, map])
    return null
  }

  const MapEvents = () => {
    const map = useMapEvents({
      click: (e) => {
        setMarkerPosition(e.latlng)
      },
    })
    return null
  }

  const customIcon = new (window.L?.Icon || Object)({
    iconUrl: "/map/marker.png",
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  })

  return (
    <div className="relative">
      {/* Instruction overlay */}
      {!markerPosition && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 bg-white/80 p-4 rounded-xl shadow-lg text-center pointer-events-none">
          <p className="font-medium text-green-700">Click on the map to set your home location</p>
        </div>
      )}

      <MapContainer
        center={mapCentre}
        zoom={16}
        scrollWheelZoom={true}
        className="h-[400px] w-full"
        dragging={true}
        zoomControl={true}
        style={{ borderRadius: "0.75rem" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {/* Custom component to re-center the map */}
        {/*to prevent from recentering map each time user places a marker*/}
        {!markerPosition && <ChangeView centre={mapCentre} />}
        <MapEvents />
        {markerPosition && isMapReady && <Marker position={markerPosition} icon={customIcon} />}
      </MapContainer>

      {/* Selected location indicator */}
      {markerPosition && (
        <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-md z-[1000]">
          <p className="text-sm font-medium text-green-700">
            Location selected! <span className="text-xs text-gray-500">(Click elsewhere to change)</span>
          </p>
        </div>
      )}
    </div>
  )
}

export default MapForm
