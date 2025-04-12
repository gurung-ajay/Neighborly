"use client"

import React from "react"
import * as Yup from "yup"
import { Formik, Form, Field, ErrorMessage } from "formik"
import axios from "axios"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useDispatch } from "react-redux"
import { login } from "@/app/redux/features/user/userSlice"
import { Eye, EyeOff } from "lucide-react"

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
})

const LoginForm = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [loading, setLoading] = React.useState(false)
  const [showPassword, setShowPassword] = React.useState(false)

  const onSubmit = async (values) => {
    setLoading(true)
    console.log(values)
    try {
      const response = await axios.post("/api/auth/login", values)
      if (response.status === 200) {
        console.log("User logged in successfully")
        console.log(response.data)
        dispatch(login(response.data))
        toast.success(response.data.message)
        router.push("/map")
      }
    } catch (error) {
      console.error("Login error:", error.response?.data?.message || "Login failed")
      toast.error(error.response?.data?.message || "Login failed")
    } finally {
      setLoading(false)
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className="w-full max-w-md">
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={LoginSchema}
        onSubmit={onSubmit}
      >
        {({ errors, touched }) => (
          <Form className="justify-center items-center flex flex-col w-full">
            <div className="flex flex-col w-full mb-4">
              <div className="relative">
                <Field
                  name="email"
                  type="email"
                  className="p-4 pl-5 border-2 border-green-200 rounded-full w-full h-12 focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-200 transition-all shadow-sm hover:shadow-md"
                  placeholder="Email"
                />
              </div>
              <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1 ml-4" />
            </div>

            <div className="flex flex-col w-full mb-6">
              <div className="relative">
                <Field
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="p-4 pl-5 border-2 border-green-200 rounded-full w-full h-12 focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-200 transition-all shadow-sm hover:shadow-md"
                  placeholder="Password"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-4 top-3 text-gray-500 hover:text-green-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              <ErrorMessage name="password" component="div" className="text-red-500 text-xs mt-1 ml-4" />
            </div>

            <button
              type="submit"
              className={`border-2 border-green-500 p-3 rounded-full cursor-pointer bg-green-500 hover:bg-green-600 text-white w-full h-12 font-medium shadow-md hover:shadow-lg transform hover:scale-105 transition-all ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <div className="mt-4 text-sm text-green-600 hover:text-green-700 cursor-pointer transition-colors">
              Forgot your password?
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default LoginForm
