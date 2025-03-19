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
    enum: ['male', 'female', 'other'],
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  introduction: {
    type: String,
    maxlength: 200,
  },
  profilePicture: {
    type: String,
    trim: true,
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
  home_address: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
});

const User = mongoose.models.User || mongoose.model('User', UserSchema); // Check if model already exists

export default User;