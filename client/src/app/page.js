'use client'
import { Button } from "@/components/ui/button"
import { Heart, Users, MapPin } from "lucide-react"
import { useRouter } from "next/navigation"

export default function LandingPage() {
  const router = useRouter()
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-green-100 to-green-200 relative overflow-hidden">
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

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 text-center relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="bg-green-500 p-4 rounded-full shadow-lg transform hover:rotate-12 transition-transform duration-300">
              <Heart className="h-10 w-10 text-white" />
            </div>
          </div>

          <h1
            className="text-5xl md:text-7xl font-bold tracking-tight text-green-700 mb-2"
            style={{ textShadow: "2px 2px 0px rgba(0,0,0,0.1)" }}
          >
            Neighborly
          </h1>
          <h2
            className="text-2xl md:text-3xl font-medium text-green-600 mb-6"
            style={{ textShadow: "1px 1px 0px rgba(0,0,0,0.1)" }}
          >
            Community Service Network
          </h2>

          <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Connect with neighbors in times of need. Offer help or request assistance right from your local community
            map!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={() => router.push('/register')}
            className="bg-green-500 hover:bg-green-600 text-white px-8 py-6 text-lg rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-all">
              Sign Up
            </Button>
            <Button onClick={() => router.push('/login')}
              variant="outline"
              className="border-green-500 text-green-600 hover:bg-green-100 px-8 py-6 text-lg rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-all"
            >
              Log In
            </Button>
          </div>

          <div className="flex justify-center gap-8 mt-16">
            <div className="flex flex-col items-center group">
              <div className="bg-green-100 p-3 rounded-full mb-2 shadow-md group-hover:bg-green-200 transition-colors">
                <MapPin className="h-6 w-6 text-green-500 group-hover:text-green-600 transition-colors" />
              </div>
              <p className="text-sm text-gray-600">Map-Based</p>
            </div>
            <div className="flex flex-col items-center group">
              <div className="bg-green-100 p-3 rounded-full mb-2 shadow-md group-hover:bg-green-200 transition-colors">
                <Users className="h-6 w-6 text-green-500 group-hover:text-green-600 transition-colors" />
              </div>
              <p className="text-sm text-gray-600">Community-Driven</p>
            </div>
            <div className="flex flex-col items-center group">
              <div className="bg-green-100 p-3 rounded-full mb-2 shadow-md group-hover:bg-green-200 transition-colors">
                <Heart className="h-6 w-6 text-green-500 group-hover:text-green-600 transition-colors" />
              </div>
              <p className="text-sm text-gray-600">Supportive</p>
            </div>
          </div>

          {/* Cartoonish houses */}
          <div className="mt-16 flex justify-center">
            <div className="relative">
              <div className="w-16 h-16 bg-red-400 rounded-t-lg"></div>
              <div className="w-16 h-12 bg-red-500"></div>
              <div className="absolute top-0 left-0 right-0 h-8 bg-red-300 transform -translate-y-4 rotate-45 origin-bottom-left"></div>
              <div className="absolute top-0 right-0 h-8 w-8 bg-red-300 transform -translate-y-4 rotate-45 origin-bottom-right"></div>
              <div className="absolute bottom-0 left-4 w-4 h-6 bg-yellow-200"></div>
              <div className="absolute top-6 right-4 w-3 h-3 bg-blue-200"></div>
            </div>

            <div className="relative mx-4">
              <div className="w-20 h-20 bg-blue-400 rounded-t-lg"></div>
              <div className="w-20 h-14 bg-blue-500"></div>
              <div className="absolute top-0 left-0 right-0 h-10 bg-blue-300 transform -translate-y-5 rotate-45 origin-bottom-left"></div>
              <div className="absolute top-0 right-0 h-10 w-10 bg-blue-300 transform -translate-y-5 rotate-45 origin-bottom-right"></div>
              <div className="absolute bottom-0 left-6 w-5 h-7 bg-yellow-200"></div>
              <div className="absolute top-8 right-5 w-4 h-4 bg-green-200"></div>
            </div>

            <div className="relative">
              <div className="w-16 h-16 bg-purple-400 rounded-t-lg"></div>
              <div className="w-16 h-12 bg-purple-500"></div>
              <div className="absolute top-0 left-0 right-0 h-8 bg-purple-300 transform -translate-y-4 rotate-45 origin-bottom-left"></div>
              <div className="absolute top-0 right-0 h-8 w-8 bg-purple-300 transform -translate-y-4 rotate-45 origin-bottom-right"></div>
              <div className="absolute bottom-0 left-4 w-4 h-6 bg-yellow-200"></div>
              <div className="absolute top-6 right-4 w-3 h-3 bg-blue-200"></div>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-4 text-center text-gray-500 text-sm relative z-10">
        <p>© {new Date().getFullYear()} Neighborly. All rights reserved.</p>
      </footer>
    </div>
  )
}
