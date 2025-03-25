import { combineReducers, configureStore } from '@reduxjs/toolkit'
import registerUserReducer from './features/register/registerUserSlice'
import userReducer from './features/user/userSlice';
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({ 
  registerUser: registerUserReducer,
  user: userReducer
})

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
