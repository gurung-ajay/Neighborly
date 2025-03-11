'use client';
import RegisterForm from '@/components/registerForm';
import React from 'react';

const Register = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-white">
      <div className="flex flex-col items-center justify-center shadow-2xl p-10 w-1/2">
        <div className="text-black text-4xl justify-center items-center flex m-4 font-bold">
          Register
        </div>
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;