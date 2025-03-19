import React from 'react'
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().required('Required'),
});

const LoginForm = () => {
  const router = useRouter();
  const [Loading, setLoading] = React.useState(false);

  const onSubmit = async (values) => {
    setLoading(true);
    console.log(values);
    try{
      const response = await axios.post('/api/auth/login', values)
      if (response.status === 200) {
        console.log('User logged in successfully');
        toast.success(response.data.message);
        router.push('/map');
      }
    } catch (error) {
      console.error('Login error:', error.response.data.message);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
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
    </div>
  )
}

export default LoginForm