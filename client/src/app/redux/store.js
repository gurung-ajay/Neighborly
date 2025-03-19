import { configureStore } from '@reduxjs/toolkit'
import registerUserReducer from './registerUserSlice'

export const store = configureStore({
  reducer: {
    registerUser: registerUserReducer,
  },
});