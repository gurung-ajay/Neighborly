import React from 'react'
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
    const [isDialogOpen, setIsDialogOpen] = React.useState(false)
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
              <Input type="text" placeholder="Enter your request title" className='p-4 border-2 rounded-2xl'/>
              <Textarea placeholder="Enter your request description" className="col-span-2 w-[380px] p-4 border-2 rounded-2xl h-20 resize-none" />
              <Label>Set request expiry date:</Label>
              <Input type="date" placeholder="Enter your request date" className="p-4 border-2 rounded-2xl"/>
            </form>
            <DialogFooter>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
  )
}

export default RequestForm