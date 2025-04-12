"use client"
import React, { useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useDispatch, useSelector } from 'react-redux';
import { addFormData } from '@/app/redux/features/register/registerUserSlice';
import { Input } from './ui/input';

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


const EditProfileForm = () => {
    const router = useRouter();
    const [Loading, setLoading] = React.useState(false);
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user); // Now 'user' is defined within the component's scope

    const handleSubmit = async (values) => {
        console.log('handleSubmit called', values);
        try {
            
            setLoading(true);
            console.log(values);
            await dispatch(addFormData(values));
            router.push('/register_location');
        } finally {
            setLoading(false);
        }
    }

    const initialValues = {
        name: user?.user?.data?.name || '',
        phone: user?.user?.data?.phone || '',
        gender: user?.user?.data?.gender || '',
        dateOfBirth: user?.user?.data?.dateOfBirth || '',
        introduction: user?.user?.data?.introduction || '',
        email: user?.user?.data?.email || '',
        password: '',
        confirmPassword: '',
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={SignupSchema}
            onSubmit={handleSubmit}
        >

            {({ errors, touched, setFieldValue }) => (
                <Form className="flex justify-center items-center flex-col">
                    <div className="grid grid-cols-2 gap-4">
                        <hr className="col-span-2 m-2" />
                        <div className="text-black text-lg font-bold col-span-2">
                            Personal Information
                        </div>

                        <div className="flex flex-col">
                            <label className="text-sm text-gray-500">Name</label>
                            <Field
                                name="name"
                                className="p-4 border-2 rounded-full w-60 h-8"
                                placeholder="Name"
                            />
                            <ErrorMessage name="name" component="div" className="text-red-500" />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm text-gray-500">Phone</label>
                            <Field
                                name="phone"
                                className="p-4 border-2 rounded-full w-60 h-8"
                                placeholder="Phone"
                            />
                            <ErrorMessage name="phone" component="div" className="text-red-500" />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-sm text-gray-500">Gender</label>
                            <Field name="gender">
                                {({ field }) => (
                                    <Select
                                        onValueChange={(value) => setFieldValue(field.name, value)}
                                        defaultValue={field.value}
                                        className="p-4 border-2 rounded-full w-60"
                                        value={field.value}
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
                            <label className="text-sm text-gray-500">Date of Birth</label>
                            <Field
                                name="dateOfBirth"
                                type="date"
                                className="p-4 border-2 rounded-full w-60 h-8"
                                placeholder="Date of Birth"
                            />
                            <ErrorMessage name="dateOfBirth" component="div" className="text-red-500" />
                        </div>

                        <div className="flex flex-col col-span-2">
                            <label className="text-sm text-gray-500">Email</label>
                            <Field
                                name="email"
                                type="email"
                                className="col-span-2 p-4 border-2 rounded-full h-8"
                                placeholder="Email"
                            />
                            <ErrorMessage name="email" component="div" className="text-red-500" />
                        </div>

                        <div className="flex flex-col col-span-2">
                            <label className="text-sm text-gray-500">Introduction</label>
                            <Field
                                name="introduction"
                                as={Textarea}
                                className="col-span-2 w-[500px] p-4 border-2 rounded-2xl h-20 resize-none"
                                placeholder="Introduce yourself to the community"
                                rows={4}
                            />
                            <ErrorMessage name="introduction" component="div" className="text-red-500" />
                        </div>


                    </div>

                    <button
                        type="submit"
                        className={`border p-4 rounded-full cursor-pointer m-4 mt-10 bg-black text-white w-40 ${Loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {Loading ? 'Loading...' : 'Next >>'}
                    </button>
                </Form>
            )}
        </Formik>
    )
}

export default EditProfileForm