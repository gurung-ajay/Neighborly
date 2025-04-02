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
import axios from 'axios';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

const RequestForm = ({ refetchRequests }) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [imagePath, setImagePath] = useState('')
    const [imagePreview, setImagePreview] = useState(null)
    const user = useSelector((state) => state.user)

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
    
    

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const values = Object.fromEntries(formData.entries());
    console.log(values);
    console.log(user.user.data._id)
    values.postedBy = user.user.data._id
    const response = await axios.post('http://localhost:9000/request', values)
    if (response.status === 200) {
      console.log('Request created successfully');
      console.log(response.data);
      toast.success(response.data.message);
      setIsDialogOpen(false);
      refetchRequests();
    }
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
            <form className='flex flex-col gap-4' onSubmit={(e) => handleSubmit(e)}>
              <Input 
                type="text" 
                placeholder="Enter your request title" 
                className='p-4 border-2 rounded-2xl'
                required
                maxLength={50}
                name="title"
              />
              <Textarea 
                placeholder="Enter your request description" 
                className="col-span-2 w-[380px] p-4 border-2 rounded-2xl h-20 resize-none"
                required
                maxLength={500}
                name="description"
              />
              <Label>Set request expiry date:</Label>
              <Input 
                type="date" 
                min={new Date().toISOString().split('T')[0]} // today's date
                placeholder="Enter your request date" 
                className="p-4 border-2 rounded-2xl"
                required
                name="expiryDate"
              />
              <Button type="submit" className="p-4 border-2 rounded-2xl">Create Request</Button>
            </form>
          </DialogContent>
        </Dialog>
  )
}

export default RequestForm