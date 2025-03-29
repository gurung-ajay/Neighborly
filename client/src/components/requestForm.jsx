import React, { useState, useEffect } from 'react'
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { DialogFooter } from "@/components/ui/dialog";
import { Textarea } from './ui/textarea';

const RequestForm = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [imagePath, setImagePath] = useState('')
    const [imagePreview, setImagePreview] = useState(null)

    // Cleanup when dialog closes
    useEffect(() => {
          if (!isDialogOpen) {
              // Clean up the image preview URL
              if (imagePreview) {
                  URL.revokeObjectURL(imagePreview)
              }
              // Reset the image state
              setImagePath('')
              setImagePreview(null)
          }
      }, [isDialogOpen])
    
  const handleImageChange = (e) => {
      const file = e.target.files[0]
      if (file) {
          // Create a preview URL
          const preview = URL.createObjectURL(file)
          setImagePreview(preview)
          
          // Store the image path (this will be the path where the image is stored on your server)
          setImagePath(`/uploads/${file.name}`)
      }
  }

  const handleSubmit = async (e) => {
      e.preventDefault()
      // Here you would send the imagePath to your MongoDB server
      // The actual image file should be uploaded to your server's storage
      console.log('Submitting image path:', imagePath)
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen} >
          <DialogTrigger asChild>
          <Button className={"z-999 absolute top-[90%] left-[45%]"} onClick={() => setIsDialogOpen(true)}>Create a request</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] z-999 absolute">
            <DialogHeader>
              <DialogTitle>Create a request</DialogTitle>
              <DialogDescription>
                Write your request details here.
              </DialogDescription>
            </DialogHeader>
            {/* <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input id="name" value="Pedro Duarte" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input id="username" value="@peduarte" className="col-span-3" />
              </div>
            </div> */}
            <form className='flex flex-col gap-4'>
              <Input 
                type="text" 
                placeholder="Enter your request title" 
                className='p-4 border-2 rounded-2xl'
                required
                maxLength={50}
              />
              <Textarea 
                placeholder="Enter your request description" 
                className="col-span-2 w-[380px] p-4 border-2 rounded-2xl h-20 resize-none"
                required
                maxLength={500}
              />
              <div className="flex flex-col gap-2">
                <Label>Upload your image (optional)</Label>
                <Input 
                  type='file' 
                  accept="image/*" 
                  onChange={handleImageChange} 
                  className="border-2 rounded-2xl"
                />
                {imagePreview && (
                  <div className="mt-2">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="max-w-[200px] rounded-lg"
                    />
                  </div>
                )}
              </div>              
              <Label>Set request expiry date:</Label>
              <Input 
                type="date" 
                min={new Date().toISOString().split('T')[0]} // today's date
                placeholder="Enter your request date" 
                className="p-4 border-2 rounded-2xl"
                required
              />
            </form>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
  )
}

export default RequestForm