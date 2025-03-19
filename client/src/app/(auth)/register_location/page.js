"use client";
import React from "react";
import dynamic from "next/dynamic";
import { useMemo } from "react";

const RegisterLocationPage = () => {
  const MapForm = useMemo(
    () =>
      dynamic(() => import("@/components/map-form"), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  );

  return (
    <div className="flex h-screen items-center justify-center bg-white">
      <div className="flex flex-col items-center justify-center shadow-2xl p-10 w-1/2">
        <div className="text-black text-4xl justify-center items-center flex m-4 font-bold">
          Register Home Location
        </div>
        <p className="">Please find your home in the map below and click to set the marker.</p><p>Then press submit button.</p>
        <p className="text-sm text-gray-500">For better user experience, please be as precise as possible.</p>
        <div className="w-[610] h-[310] border-8 flex items-center justify-center m-2">
          <MapForm />
        </div>
        <button className="border p-4 rounded-full cursor-pointer m-2 bg-black text-white w-40">
          Submit
        </button>
      </div>
    </div>
  );
};

export default RegisterLocationPage;
