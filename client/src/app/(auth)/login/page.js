'use client';
import { Input } from '@/components/ui/input';
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Image from 'next/image';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});

const Login = () => {
  const router = useRouter();
  const [Loading, setLoading] = React.useState(false);

  const onSubmit = async (values) => {
    setLoading(true);
    console.log(values);
    try{
      const response = await axios.post('http://localhost:9000/user/login', values)
      if (response.status === 200) {
        console.log('User logged in successfully');
        toast.success(response.data.message);
        router.push('/');
      }
    } catch (error) {
      console.error('Login error:', error.response.data.message);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex h-screen items-center justify-center bg-white">
      
      <div className="flex flex-col items-center justify-center shadow-2xl p-20 w-1/2 border-2 rounded-2xl">
        <Image src="/logo.png" alt="Logo" width={647} height={185} className="mb-12 rounded shadow-xl w-[200] h-[70]"/>
        {/* <div className="text-black text-4xl justify-center items-center flex m-2">
          Login
        </div> */}
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={LoginSchema}
          onSubmit={onSubmit}
        >
          {({ errors, touched }) => (
            <Form className="justify-center items-center flex flex-col">
              <div className="flex flex-col">
                <Field
                  name="email"
                  type="email"
                  className="p-4 m-2 border-2 rounded-full w-60 h-8"
                  placeholder="Email"
                />
                <ErrorMessage name="email" component="div" className="text-red-500" />
              </div>
              <div className="flex flex-col">
                <Field
                  name="password"
                  type="password"
                  className="p-4 m-2 border-2 rounded-full w-60 h-8"
                  placeholder="Password"
                />
                <ErrorMessage name="password" component="div" className="text-red-500" />
              </div>
              <button
                type="submit"
                className={`border p-4 rounded-full cursor-pointer m-2 bg-black text-white w-40 ${Loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {Loading ? 'Loading...' : 'Login'}
              </button>
            </Form>
          )}
        </Formik>
        <hr className="w-1/2" />
        <div className="flex text-sm justify-center items-center m-2 space-x-2">
          <div>Don't have an account?</div> <div onClick={() => router.push('/register')} className="cursor-pointer text-sm underline">Register</div>
        </div>
      </div>
    </div>
  );
};

export default Login;