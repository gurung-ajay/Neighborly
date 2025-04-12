"use client"
import React from "react"
import dynamic from "next/dynamic"
import { useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import axios from "axios"
import { resetFormData } from "@/app/redux/features/register/registerUserSlice"
import { MapPin } from "lucide-react"

const RegisterLocationPage = () => {
  const [loading, setLoading] = React.useState(false)
  const registerData = useSelector((state) => state.registerUser)
  const router = useRouter()
  const dispatch = useDispatch()

  const MapForm = useMemo(
    () =>
      dynamic(() => import("@/components/map-form"), {
        loading: () => (
          <div className="flex items-center justify-center h-[400px] w-full bg-green-50 rounded-xl">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mb-4"></div>
              <p className="text-green-600 font-medium">Loading map...</p>
            </div>
          </div>
        ),
        ssr: false,
      }),
    [],
  )

  const handleSubmit = async () => {
    if (registerData.home_address?.lat !== 0 && registerData.home_address?.lng !== 0) {
      setLoading(true)
      try {
        const response = await axios.post("/api/auth/register", registerData)
        if (response.status === 201 || response.status === 200) {
          console.log("User registered successfully")
          toast.success(response.data.message)
          router.push("/login")
        }
      } catch (error) {
        console.error("Registration error:", error)
        toast.error(error.response?.data?.message || "Registration failed")
      } finally {
        dispatch(resetFormData())
        setLoading(false)
      }
    } else {
      toast.error("Please select your home location on the map")
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-green-100 to-green-200 relative overflow-hidden py-10">
      {/* Decorative elements */}
      <div
        className="absolute top-20 left-10 w-16 h-16 bg-yellow-300 rounded-full opacity-50 animate-bounce"
        style={{ animationDuration: "3s" }}
      ></div>
      <div
        className="absolute bottom-20 right-10 w-12 h-12 bg-blue-300 rounded-full opacity-50 animate-bounce"
        style={{ animationDuration: "2.5s" }}
      ></div>
      <div
        className="absolute top-40 right-20 w-8 h-8 bg-pink-300 rounded-full opacity-50 animate-bounce"
        style={{ animationDuration: "4s" }}
      ></div>

      <div className="flex flex-col items-center justify-center bg-white/90 shadow-2xl p-6 md:p-10 w-11/12 sm:w-4/5 md:w-3/4 lg:w-2/3 border-2 border-green-200 rounded-3xl relative z-10 my-10">
        <div className="text-center mb-6">
          <h1
            className="text-4xl md:text-5xl font-bold tracking-tight text-green-700 mb-1"
            style={{ textShadow: "2px 2px 0px rgba(0,0,0,0.1)" }}
          >
            Neighborly
          </h1>
          <h2
            className="text-xl md:text-2xl font-medium text-green-600 mb-4"
            style={{ textShadow: "1px 1px 0px rgba(0,0,0,0.1)" }}
          >
            Community Service Network
          </h2>
        </div>

        <div className="flex items-center justify-center mb-4">
          <div className="bg-green-100 p-3 rounded-full shadow-md">
            <MapPin className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-green-800 ml-3">Set Your Home Location</h3>
        </div>

        <div className="text-center mb-6 max-w-2xl">
          <p className="text-gray-700 mb-2">Please find your home on the map below and click to set the marker.</p>
          <p className="text-sm text-gray-500">
            For better user experience, please be as precise as possible. Your location helps us connect you with
            neighbors nearby.
          </p>
        </div>

        <div className="w-full max-w-4xl border-4 border-green-300 rounded-xl overflow-hidden shadow-lg mb-6 hover:shadow-xl transition-shadow">
          <MapForm />
        </div>

        <button
          type="submit"
          onClick={handleSubmit}
          className={`border-2 border-green-500 p-3 rounded-full cursor-pointer bg-green-500 hover:bg-green-600 text-white w-60 h-12 font-medium shadow-md hover:shadow-lg transform hover:scale-105 transition-all ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Complete Registration"}
        </button>

        <div className="mt-4 text-sm">
          <button
            onClick={() => router.back()}
            className="text-green-600 hover:text-green-700 font-medium transition-colors duration-200 underline"
          >
            &larr; Back to previous step
          </button>
        </div>

        {/* Cartoonish houses at bottom */}
        <div className="flex justify-center mt-8">
          <div className="relative scale-75">
            <div className="w-12 h-12 bg-red-400 rounded-t-lg"></div>
            <div className="w-12 h-8 bg-red-500"></div>
            <div className="absolute top-0 left-0 right-0 h-6 bg-red-300 transform -translate-y-3 rotate-45 origin-bottom-left"></div>
            <div className="absolute top-0 right-0 h-6 w-6 bg-red-300 transform -translate-y-3 rotate-45 origin-bottom-right"></div>
            <div className="absolute bottom-0 left-3 w-3 h-4 bg-yellow-200"></div>
            <div className="absolute top-4 right-3 w-2 h-2 bg-blue-200"></div>
          </div>

          <div className="relative mx-3 scale-75">
            <div className="w-14 h-14 bg-blue-400 rounded-t-lg"></div>
            <div className="w-14 h-10 bg-blue-500"></div>
            <div className="absolute top-0 left-0 right-0 h-7 bg-blue-300 transform -translate-y-4 rotate-45 origin-bottom-left"></div>
            <div className="absolute top-0 right-0 h-7 w-7 bg-blue-300 transform -translate-y-4 rotate-45 origin-bottom-right"></div>
            <div className="absolute bottom-0 left-4 w-3 h-5 bg-yellow-200"></div>
            <div className="absolute top-6 right-4 w-3 h-3 bg-green-200"></div>
          </div>

          <div className="relative scale-75">
            <div className="w-12 h-12 bg-purple-400 rounded-t-lg"></div>
            <div className="w-12 h-8 bg-purple-500"></div>
            <div className="absolute top-0 left-0 right-0 h-6 bg-purple-300 transform -translate-y-3 rotate-45 origin-bottom-left"></div>
            <div className="absolute top-0 right-0 h-6 w-6 bg-purple-300 transform -translate-y-3 rotate-45 origin-bottom-right"></div>
            <div className="absolute bottom-0 left-3 w-3 h-4 bg-yellow-200"></div>
            <div className="absolute top-4 right-3 w-2 h-2 bg-blue-200"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterLocationPage
