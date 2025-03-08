'use client'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import React from 'react'

const Register = () => {
  return (
    <div className='flex h-screen items-center justify-center bg-white'>
        <div className='flex flex-col items-center justify-center shadow-2xl p-10 w-1/2'>
            <div className='text-black text-4xl justify-center items-center flex m-4'>Register</div>
            
            <form method="post" className='flex justify-center items-center flex-col'>
                <div className='grid grid-cols-2 gap-4'>
                    <Input className='p-4 border-2 rounded-full w-60' placeholder="Name"/>
                    <Input className='p-4 border-2 rounded-full w-60' placeholder="Phone"/>
                    <Select className='p-4 border-2 rounded-full w-60'>
                        <SelectTrigger className='p-4 border-2 rounded-full w-60'>
                            <SelectValue placeholder="Gender" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                    </Select>
                    <Input className='p-4 border-2 rounded-full w-60' type="date" placeholder="Date of Birth"/>
                    <Textarea className='col-span-2 p-4 border-2 rounded-2xl h-20 resize-none' placeholder="Introduce yourself to the community" rows={4} />
                    <hr className='col-span-2 w-full m-2'/>
                    <Input className='col-span-2 p-4 border-2 rounded-full' placeholder="Email"/>
                    <Input className='col-span-2 p-4 border-2 rounded-full' placeholder="Password"/>
                    <Input className='col-span-2 p-4 border-2 rounded-full' placeholder="Confirm Password"/>
                </div>
                <button className='border p-4 rounded-full m-4 bg-gray-400 w-40'>Submit</button>
            </form>
        </div>
    </div>
  )
}

export default Register