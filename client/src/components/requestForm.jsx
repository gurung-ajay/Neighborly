"use client"

import { useState, useEffect } from "react"
import { Button } from "./ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import axios from "axios"
import { toast } from "sonner"
import { useSelector } from "react-redux"
import { MapPin, Calendar, MessageSquare, Send, HelpCircle } from "lucide-react"

const RequestForm = ({ refetchRequests }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [imagePath, setImagePath] = useState("")
  const [imagePreview, setImagePreview] = useState(null)
  const [loading, setLoading] = useState(false)
  const user = useSelector((state) => state.user)

  // Cleanup when dialog closes
  useEffect(() => {
    if (!isDialogOpen) {
      // Clean up the image preview URL
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview)
      }
      // Reset the image state
      setImagePath("")
      setImagePreview(null)
    }
  }, [isDialogOpen])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const formData = new FormData(e.target)
      const values = Object.fromEntries(formData.entries())
      console.log(values)
      console.log(user.user.data._id)
      values.postedBy = user.user.data._id
      const response = await axios.post("http://localhost:9000/request", values)

      if (response.status === 200) {
        console.log("Request created successfully")
        console.log(response.data)
        toast.success(response.data.message)
        setIsDialogOpen(false)
        refetchRequests()
      }
    } catch (error) {
      console.error("Error creating request:", error)
      toast.error("Failed to create request")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          className="z-[999] absolute bottom-10 right-10 bg-green-500 hover:bg-green-600 text-white font-medium px-6 py-6 rounded-full shadow-lg transform hover:scale-105 transition-all border-2 border-white flex items-center gap-2"
          onClick={() => setIsDialogOpen(true)}
        >
          <HelpCircle size={20} />
          <span>Create Request</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[450px] border-2 border-green-200 rounded-3xl p-0 overflow-hidden bg-white/95 shadow-xl">
        {/* Decorative elements */}
        <div className="absolute top-4 left-4 w-8 h-8 bg-yellow-300 rounded-full opacity-30"></div>
        <div className="absolute bottom-4 right-4 w-6 h-6 bg-blue-300 rounded-full opacity-30"></div>

        <DialogHeader className="bg-green-500 p-5 text-white">
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Create a Neighborly Request
          </DialogTitle>
          <DialogDescription className="text-white/90 mt-1">
            Let your neighbors know what you need help with
          </DialogDescription>
        </DialogHeader>

        <form className="flex flex-col gap-4 p-5" onSubmit={(e) => handleSubmit(e)}>
          <div className="space-y-2">
            <Label htmlFor="title" className="text-green-700 font-medium flex items-center gap-1">
              <MessageSquare size={16} />
              Request Title
            </Label>
            <Input
              id="title"
              type="text"
              placeholder="What do you need help with?"
              className="p-4 pl-5 border-2 border-green-200 rounded-full w-full focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-200 transition-all shadow-sm hover:shadow-md"
              required
              maxLength={50}
              name="title"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-green-700 font-medium flex items-center gap-1">
              <MessageSquare size={16} />
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Provide details about your request..."
              className="p-4 border-2 border-green-200 rounded-xl w-full focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-200 transition-all shadow-sm hover:shadow-md resize-none min-h-[100px]"
              required
              maxLength={500}
              name="description"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="expiryDate" className="text-green-700 font-medium flex items-center gap-1">
              <Calendar size={16} />
              Help Needed By
            </Label>
            <Input
              id="expiryDate"
              type="date"
              min={new Date().toISOString().split("T")[0]} // today's date
              className="p-4 pl-5 border-2 border-green-200 rounded-full w-full focus:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-200 transition-all shadow-sm hover:shadow-md"
              required
              name="expiryDate"
            />
          </div>

          <div className="mt-2 text-sm text-gray-600 bg-green-50 p-3 rounded-lg">
            <p className="flex items-center">
              <MapPin className="mr-1 text-green-500" size={16} />
              Your request will be visible to neighbors in your community
            </p>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className={`mt-2 bg-green-500 hover:bg-green-600 text-white font-medium py-4 px-4 rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-all flex items-center justify-center gap-2 ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            {loading ? (
              "Creating..."
            ) : (
              <>
                <Send size={18} /> Create Neighborly Request
              </>
            )}
          </Button>

          {/* Cartoonish houses at bottom */}
          <div className="flex justify-center mt-2 opacity-70">
            <div className="relative scale-50">
              <div className="w-12 h-12 bg-red-400 rounded-t-lg"></div>
              <div className="w-12 h-8 bg-red-500"></div>
              <div className="absolute top-0 left-0 right-0 h-6 bg-red-300 transform -translate-y-3 rotate-45 origin-bottom-left"></div>
              <div className="absolute top-0 right-0 h-6 w-6 bg-red-300 transform -translate-y-3 rotate-45 origin-bottom-right"></div>
              <div className="absolute bottom-0 left-3 w-3 h-4 bg-yellow-200"></div>
              <div className="absolute top-4 right-3 w-2 h-2 bg-blue-200"></div>
            </div>

            <div className="relative mx-3 scale-50">
              <div className="w-14 h-14 bg-blue-400 rounded-t-lg"></div>
              <div className="w-14 h-10 bg-blue-500"></div>
              <div className="absolute top-0 left-0 right-0 h-7 bg-blue-300 transform -translate-y-4 rotate-45 origin-bottom-left"></div>
              <div className="absolute top-0 right-0 h-7 w-7 bg-blue-300 transform -translate-y-4 rotate-45 origin-bottom-right"></div>
              <div className="absolute bottom-0 left-4 w-3 h-5 bg-yellow-200"></div>
              <div className="absolute top-6 right-4 w-3 h-3 bg-green-200"></div>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default RequestForm
