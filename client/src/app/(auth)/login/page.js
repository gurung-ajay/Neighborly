'use client';
import { Input } from '@/components/ui/input';
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Login = () => {
  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required'),
  });

  return (
    <div className="flex h-screen items-center justify-center bg-white">
      <div className="flex flex-col items-center justify-center shadow-2xl p-20 w-1/2">
        <div className="text-black text-4xl justify-center items-center flex m-2">
          Login
        </div>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={LoginSchema}
          onSubmit={(values) => {
            console.log(values);
            // Handle login submission here
          }}
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
                className="border p-4 rounded-full m-2 bg-gray-400 w-40"
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;