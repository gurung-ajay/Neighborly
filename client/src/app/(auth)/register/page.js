"use client"
import RegisterForm from "@/components/registerForm"
import { useRouter } from "next/navigation"

const Register = () => {
  const router = useRouter()

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
            className="text-xl md:text-2xl font-medium text-green-600 mb-2"
            style={{ textShadow: "1px 1px 0px rgba(0,0,0,0.1)" }}
          >
            Community Service Network
          </h2>
          <div className="text-2xl font-bold text-green-800 mt-4">Join Our Community</div>
        </div>

        <RegisterForm />

        <div className="flex text-sm justify-center items-center mt-6 space-x-2">
          <div className="text-gray-600">Already have an account?</div>
          <div
            onClick={() => router.push("/login")}
            className="cursor-pointer text-green-600 hover:text-green-700 font-medium transition-colors duration-200 underline"
          >
            Login
          </div>
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

export default Register
