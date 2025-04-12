import EditProfileForm from '@/components/editProfileForm'
import React from 'react'

const EditProfile = () => {
    return (
        <div className="h-screen w-screen flex justify-center items-center">
            <div className="w-1/2 h-4/5 flex justify-center items-center flex-col rounded-2xl shadow-2xl">
                <div className="text-4xl font-bold m-4">Edit Profile</div>
                <EditProfileForm />
            </div>
        </div>
    );
};

export default EditProfile