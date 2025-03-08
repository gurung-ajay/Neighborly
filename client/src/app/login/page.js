import { Input } from '@/components/ui/input'
import React from 'react'

const Login = () => {
  return (
    <div className='flex h-screen items-center justify-center bg-white'>
        <div className='flex flex-col items-center justify-center shadow-2xl p-20 w-1/2'>
            <div className='text-black text-4xl justify-center items-center flex m-2'>Login</div>
            <div className='justify-center items-center flex flex-col'>
                <Input className='p-4 m-2 border-2 rounded-full w-60' placeholder="Email"/>
                <Input className='p-4 m-2 border-2 rounded-full w-60' placeholder="Password"/>
                <button className='border p-4 rounded-full m-2 bg-gray-400 w-40'>Submit</button>
            </div>
        </div>
    </div>
  )
}

export default Login