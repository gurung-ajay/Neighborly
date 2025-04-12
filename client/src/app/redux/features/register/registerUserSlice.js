import { createSlice } from "@reduxjs/toolkit";

export const registerUserSlice = createSlice({
  name: "registerUser",
  initialState: {
    name: "",
    phone: "",
    gender: "",
    dateOfBirth: "",
    introduction: "",
    profilePicture: "",
    email: "",
    password: "",
    home_address: {
      lat: 0,
      lng: 0
    }
  },
  reducers: {
    addFormData: (state, action) => {
      const payload = action.payload;
      if (payload.name) state.name = payload.name;
      if (payload.phone) state.phone = payload.phone;
      if (payload.gender) state.gender = payload.gender;
      if (payload.dateOfBirth) state.dateOfBirth = payload.dateOfBirth;
      if (payload.introduction) state.introduction = payload.introduction;
      if (payload.profilePicture) state.profilePicture = payload.profilePicture;
      if (payload.email) state.email = payload.email;
      if (payload.password) state.password = payload.password;
      console.log(state);
    },
    addHomeAddress: (state, action) => {
      state.home_address.lat = action.payload.lat;
      state.home_address.lng = action.payload.lng;
    },
    resetFormData: (state) => {
      state.name = "";
      state.phone = "";
      state.gender = "";
      state.dateOfBirth = "";
      state.introduction = "";
      state.profilePicture = "";
      state.email = "";
      state.password = "";
      state.home_address = {
        lat: 0,
        lng: 0
      }
    }
  }
})

export const { addFormData, addHomeAddress, resetFormData } = registerUserSlice.actions;
export default registerUserSlice.reducer;