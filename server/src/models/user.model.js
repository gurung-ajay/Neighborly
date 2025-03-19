import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ['male', 'female', 'other'], // Assuming these are the only gender options
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  introduction: {
    type: String,
    maxlength: 200,
  },
  email: {
    type: String,
    required: true,
    unique: true, 
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  // TODO: Add field for user address location
  home_address: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
});

const User = mongoose.models.User || mongoose.model('User', UserSchema); // Check if model already exists

export default User;