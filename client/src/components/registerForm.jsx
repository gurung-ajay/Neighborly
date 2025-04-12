"use client"
import React, { useEffect } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import { useRouter } from "next/navigation"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useDispatch, useSelector } from "react-redux"
import { addFormData } from "@/app/redux/features/register/registerUserSlice"
import { Input } from "./ui/input"
import { Eye, EyeOff, User, Phone, Calendar, Mail, Lock } from "lucide-react"

const SignupSchema = Yup.object().shape({
  name: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required"),
  phone: Yup.string()
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(10, "Must be exactly 10 digits")
    .max(10, "Must be exactly 10 digits")
    .required("Required"),
  gender: Yup.string().required("Required"),
  dateOfBirth: Yup.date().required("Required"),
  introduction: Yup.string().max(200, "Too Long!"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().min(8, "Password must be at least 8 characters").required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Required"),
})

const RegisterForm = () => {
  const router = useRouter()
  const [loading, setLoading] = React.useState(false)
  const [showPassword, setShowPassword] = React.useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false)
  const userRegisterData = useSelector((state) => state.registerUser)
  const dispatch = useDispatch()

  const handleSubmit = async (values) => {
    setLoading(true)
    console.log(values)
    dispatch(addFormData(values))
    router.push("/register_location")
    setLoading(false)
  }

  useEffect(() => {
    console.log(userRegisterData)
  }, [userRegisterData])

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  return (
    <Formik
      initialValues={{
        name: "",
        phone: "",
        gender: "",
        dateOfBirth: "",
        introduction: "",
        email: "",
        password: "",
        confirmPassword: "",
      }}
      validationSchema={SignupSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched, setFieldValue }) => (
        <Form className="w-full max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* Personal Information Section */}
            <div className="col-span-1 md:col-span-2">
              <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-green-300 to-transparent my-4"></div>
              <div className="text-green-700 text-xl font-bold mb-4 flex items-center">
                <User className="mr-2 text-green-600" size={20} />
                Personal Information
              </div>
            </div>

            <div className="flex flex-col">
              <div className="relative">
                <Field
                  name="name"
                  className="p-4 pl-5 border-2 border-green-200 rounded-full w-full h-12 focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-200 transition-all shadow-sm hover:shadow-md"
                  placeholder="Name"
                />
              </div>
              <ErrorMessage name="name" component="div" className="text-red-500 text-xs mt-1 ml-4" />
            </div>

            <div className="flex flex-col">
              <div className="relative">
                <Field
                  name="phone"
                  className="p-4 pl-5 border-2 border-green-200 rounded-full w-full h-12 focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-200 transition-all shadow-sm hover:shadow-md"
                  placeholder="Phone"
                />
                <Phone className="absolute right-4 top-3 text-gray-400" size={18} />
              </div>
              <ErrorMessage name="phone" component="div" className="text-red-500 text-xs mt-1 ml-4" />
            </div>

            <div className="flex flex-col">
              <Field name="gender">
                {({ field }) => (
                  <Select onValueChange={(value) => setFieldValue(field.name, value)} defaultValue={field.value}>
                    <SelectTrigger className="p-4 pl-5 border-2 border-green-200 rounded-full w-full h-12 focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-200 transition-all shadow-sm hover:shadow-md">
                      <SelectValue placeholder="Gender" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-green-200 rounded-xl">
                      <SelectItem value="male" className="focus:bg-green-100">
                        Male
                      </SelectItem>
                      <SelectItem value="female" className="focus:bg-green-100">
                        Female
                      </SelectItem>
                      <SelectItem value="other" className="focus:bg-green-100">
                        Other
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}
              </Field>
              <ErrorMessage name="gender" component="div" className="text-red-500 text-xs mt-1 ml-4" />
            </div>

            <div className="flex flex-col">
              <div className="relative">
                <Field
                  name="dateOfBirth"
                  type="date"
                  className="p-4 pl-5 border-2 border-green-200 rounded-full w-full h-12 focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-200 transition-all shadow-sm hover:shadow-md"
                  placeholder="Date of Birth"
                />
                <Calendar className="absolute right-4 top-3 text-gray-400" size={18} />
              </div>
              <ErrorMessage name="dateOfBirth" component="div" className="text-red-500 text-xs mt-1 ml-4" />
            </div>

            <div className="flex flex-col col-span-1 md:col-span-2">
              <Field
                name="introduction"
                as={Textarea}
                className="p-4 border-2 border-green-200 rounded-xl w-full h-24 resize-none focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-200 transition-all shadow-sm hover:shadow-md"
                placeholder="Introduce yourself to the community"
                rows={4}
              />
              <ErrorMessage name="introduction" component="div" className="text-red-500 text-xs mt-1 ml-4" />
            </div>

            {/* Profile Picture Section */}
            <div className="col-span-1 md:col-span-2">
              <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-green-300 to-transparent my-4"></div>
              <div className="text-green-700 text-xl font-bold mb-4">Profile Picture</div>
            </div>

            <div className="flex flex-col col-span-1 md:col-span-2 items-center">
              <div className="w-full max-w-md">
                <Input
                  type="file"
                  name="profilePicture"
                  className="border-2 border-green-200 rounded-full p-2 w-full h-12 focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-200 transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-100 file:text-green-700 hover:file:bg-green-200"
                  placeholder="Profile Picture (optional)"
                />
              </div>
            </div>

            {/* Authentication Information Section */}
            <div className="col-span-1 md:col-span-2">
              <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-green-300 to-transparent my-4"></div>
              <div className="text-green-700 text-xl font-bold mb-4 flex items-center">
                <Lock className="mr-2 text-green-600" size={20} />
                Authentication Information
              </div>
            </div>

            <div className="flex flex-col col-span-1 md:col-span-2">
              <div className="relative">
                <Field
                  name="email"
                  type="email"
                  className="p-4 pl-5 border-2 border-green-200 rounded-full w-full h-12 focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-200 transition-all shadow-sm hover:shadow-md"
                  placeholder="Email"
                />
                <Mail className="absolute right-4 top-3 text-gray-400" size={18} />
              </div>
              <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1 ml-4" />
            </div>

            <div className="flex flex-col col-span-1 md:col-span-2">
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
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <ErrorMessage name="password" component="div" className="text-red-500 text-xs mt-1 ml-4" />
            </div>

            <div className="flex flex-col col-span-1 md:col-span-2">
              <div className="relative">
                <Field
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  className="p-4 pl-5 border-2 border-green-200 rounded-full w-full h-12 focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-200 transition-all shadow-sm hover:shadow-md"
                  placeholder="Confirm Password"
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute right-4 top-3 text-gray-500 hover:text-green-600 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-xs mt-1 ml-4" />
            </div>
          </div>

          <div className="flex justify-center mt-8">
            <button
              type="submit"
              className={`border-2 border-green-500 p-3 rounded-full cursor-pointer bg-green-500 hover:bg-green-600 text-white w-40 h-12 font-medium shadow-md hover:shadow-lg transform hover:scale-105 transition-all ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
              disabled={loading}
            >
              {loading ? "Loading..." : "Next >>"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default RegisterForm
