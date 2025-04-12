"use client"

import dynamic from 'next/dynamic'
import { useMemo } from 'react'
import { Heart } from 'lucide-react'

export default function MapPage() {
  // import map component with usememo to disable server-side-rendering, because leaflet has issues with it
  const Map = useMemo(() => dynamic(
    () => import('@/components/map'),
    { 
      loading: () => (
        <div className="flex items-center justify-center h-screen w-full bg-gradient-to-b from-green-100 to-green-200">
          <div className="flex flex-col items-center bg-white/90 p-8 rounded-3xl shadow-xl border-2 border-green-200">
            <div className="bg-green-500 p-4 rounded-full shadow-lg mb-4 animate-pulse">
              <Heart className="h-10 w-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-green-700 mb-4">Loading Neighborly Map</h2>
            <div className="flex space-x-2">
              <div className="w-4 h-4 rounded-full bg-green-400 animate-bounce" style={{ animationDelay: "0s" }}></div>
              <div className="w-4 h-4 rounded-full bg-green-500 animate-bounce" style={{ animationDelay: "0.2s" }}></div>
              <div className="w-4 h-4 rounded-full bg-green-600 animate-bounce" style={{ animationDelay: "0.4s" }}></div>
            </div>
            <p className="text-green-600 mt-4 text-sm">Connecting you with your community...</p>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-20 left-10 w-16 h-16 bg-yellow-300 rounded-full opacity-50 animate-bounce" style={{ animationDuration: "3s" }}></div>
          <div className="absolute bottom-20 right-10 w-12 h-12 bg-blue-300 rounded-full opacity-50 animate-bounce" style={{ animationDuration: "2.5s" }}></div>
          <div className="absolute top-40 right-20 w-8 h-8 bg-pink-300 rounded-full opacity-50 animate-bounce" style={{ animationDuration: "4s" }}></div>
        </div>
      ),
      ssr: false
    }
  ), [])

  return (
    <Map />
  )
}
