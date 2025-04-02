"use client";
import React from "react";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import axios from "axios";
import { resetFormData } from "@/app/redux/features/register/registerUserSlice";

const RegisterLocationPage = () => {
  const [Loading, setLoading] = React.useState(false);
  const registerData = useSelector((state) => state.registerUser);
  const router = useRouter();
  const dispatch = useDispatch();

  const MapForm = useMemo(
    () =>
      dynamic(() => import("@/components/map-form"), {
        loading: () => <p>A map is loading</p>,
        ssr: false,
      }),
    []
  );
  
  const handleSubmit = async () => {
    if (registerData.home_address.lat !== 0 && registerData.home_address.lng !== 0) {
      setLoading(true);
      try {
      const response = await axios.post('/api/auth/register', registerData);
      if (response.status === 201 || response.status === 200) {
          console.log('User registered successfully');
          toast.success(response.data.message);
          router.push('/login');
      }
      } catch (error) {
        console.error('Registration error:', error);
        toast.error(error.response.data.message);
      } finally {
        dispatch(resetFormData());
        setLoading(false);
      }
    }

}

  return (
    <div className="flex h-screen items-center justify-center bg-white">
      <div className="flex flex-col items-center justify-center shadow-2xl p-10 w-1/2">
        <div className="text-black text-4xl justify-center items-center flex m-4 font-bold">
          Register Home Location
        </div>
        <p className="">Please find your home in the map below and click to set the marker.</p><p>Then press submit button.</p>
        <p className="text-sm text-gray-500">For better user experience, please be as precise as possible.</p>
        <div className="w-[610] h-[310] border-8 flex items-center justify-center m-2">
          <MapForm />
        </div>
        <button
          type="submit"
          className={`border p-4 rounded-full cursor-pointer m-2 bg-black text-white w-40 ${Loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={handleSubmit}
        >
          {Loading ? 'Loading...' : 'Submit'}
        </button>
      </div>
    </div>
  );
};

export default RegisterLocationPage;
