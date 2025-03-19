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
      state.name = action.payload.name;
      state.phone = action.payload.phone;
      state.gender = action.payload.gender;
      state.dateOfBirth = action.payload.dateOfBirth;
      state.introduction = action.payload.introduction;
      state.profilePicture = action.payload.profilePicture;
      state.email = action.payload.email;
      state.password = action.payload.password;
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