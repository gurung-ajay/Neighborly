'use client'

import dynamic from 'next/dynamic'
import { useMemo } from 'react'

export default function MapPage(){
  // import map component with usememo to disable server-side-redering, because leaflet has issues with it
  const Map = useMemo(() => dynamic(
    () => import('@/components/map'),
    { 
      loading: () => <p>A map is loading</p>,
      ssr: false
    }
  ), [])

  return (
    <Map />
  )
}