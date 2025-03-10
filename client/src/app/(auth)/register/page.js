'use client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';


const SignupSchema = Yup.object().shape({
  name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
  phone: Yup.string()
    .matches(/^[0-9]+$/, 'Must be only digits')
    .min(10, 'Must be exactly 10 digits')
    .max(10, 'Must be exactly 10 digits')
    .required('Required'),
  gender: Yup.string().required('Required'),
  dateOfBirth: Yup.date().required('Required'),
  introduction: Yup.string().max(200, 'Too Long!'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(8, 'Password must be at least 8 characters').required('Required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Required'),
});


const Register = () => {
  const router = useRouter();
  const [Loading, setLoading] = React.useState(false);
  
  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await axios.post(`http://localhost:3000/user/register`, values);
      if (response.status === 200) {
        console.log('User registered successfully');
        toast.success(response.data.message);
        router.push('/login');
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex h-screen items-center justify-center bg-white">
      <div className="flex flex-col items-center justify-center shadow-2xl p-10 w-1/2">
        <div className="text-black text-4xl justify-center items-center flex m-4 font-bold">
          Register
        </div>

        <Formik
          initialValues={{
            name: '',
            phone: '',
            gender: '',
            dateOfBirth: '',
            introduction: '',
            email: '',
            password: '',
            confirmPassword: '',
          }}
          validationSchema={SignupSchema}
          onSubmit={handleSubmit}
        >

          {({ errors, touched, setFieldValue }) => (
            <Form className="flex justify-center items-center flex-col">
              <div className="grid grid-cols-2 gap-4">
                
                <div className="flex flex-col">
                  <Field
                    name="name"
                    className="p-4 border-2 rounded-full w-60 h-8"
                    placeholder="Name"
                  />
                  <ErrorMessage name="name" component="div" className="text-red-500" />
                </div>

                <div className="flex flex-col">
                  <Field
                    name="phone"
                    className="p-4 border-2 rounded-full w-60 h-8"
                    placeholder="Phone"
                  />
                  <ErrorMessage name="phone" component="div" className="text-red-500" />
                </div>

                <div className="flex flex-col">
                  <Field name="gender">
                    {({ field }) => (
                      <Select
                        onValueChange={(value) => setFieldValue(field.name, value)}
                        defaultValue={field.value}
                        className="p-4 border-2 rounded-full w-60"
                      >
                        <SelectTrigger className="p-4 border-2 rounded-full w-60">
                          <SelectValue placeholder="Gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  </Field>
                  <ErrorMessage name="gender" component="div" className="text-red-500" />
                </div>

                <div className="flex flex-col">
                  <Field
                    name="dateOfBirth"
                    type="date"
                    className="p-4 border-2 rounded-full w-60 h-8"
                    placeholder="Date of Birth"
                  />
                  <ErrorMessage name="dateOfBirth" component="div" className="text-red-500" />
                </div>

                <div className="flex flex-col col-span-2">
                  <Field
                    name="introduction"
                    as={Textarea}
                    className="col-span-2 p-4 border-2 rounded-2xl h-20 resize-none"
                    placeholder="Introduce yourself to the community"
                    rows={4}
                  />
                  <ErrorMessage name="introduction" component="div" className="text-red-500" />
                </div>

                <hr className="col-span-2 w-full m-2" />

                <div className="flex flex-col col-span-2">
                  <Field
                    name="email"
                    type="email"
                    className="col-span-2 p-4 border-2 rounded-full h-8"
                    placeholder="Email"
                  />
                  <ErrorMessage name="email" component="div" className="text-red-500" />
                </div>

                <div className="flex flex-col col-span-2">
                  <Field
                    name="password"
                    type="password"
                    className="col-span-2 p-4 border-2 rounded-full h-8"
                    placeholder="Password"
                  />
                  <ErrorMessage name="password" component="div" className="text-red-500" />
                </div>

                <div className="flex flex-col col-span-2">
                  <Field
                    name="confirmPassword"
                    type="password"
                    className="col-span-2 p-4 border-2 rounded-full h-8"
                    placeholder="Confirm Password"
                  />
                  <ErrorMessage name="confirmPassword" component="div" className="text-red-500" />
                </div>

              </div>

              <button
                type="submit"
                className={`border p-4 rounded-full cursor-pointer m-4 bg-black text-white w-40 ${Loading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {Loading ? 'Loading...' : 'Submit'}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Register;