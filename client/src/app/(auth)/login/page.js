'use client';
import React from 'react';
import Image from 'next/image';
import LoginForm from '@/components/loginForm';
import { useRouter } from 'next/navigation';

const Login = () => {
  const router = useRouter()
  return (
    <div className="flex h-screen items-center justify-center bg-white">
      <div className="flex flex-col items-center justify-center shadow-2xl p-20 w-1/2 border-2 rounded-2xl">
        <Image src="/logo.png" alt="Logo" width={647} height={185} className="mb-12 rounded shadow-xl w-[220] h-[70]"/>
        <LoginForm />
        <hr className="w-1/2" />
        <div className="flex text-sm justify-center items-center m-2 space-x-2">
          <div>Don't have an account?</div> <div onClick={() => router.push('/register')} className="cursor-pointer text-sm underline">Register</div>
        </div>
      </div>
    </div>
  );
};

export default Login;