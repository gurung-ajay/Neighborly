import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
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
    unique: true, // Ensures email uniqueness
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.models.User || mongoose.model('User', UserSchema); // Check if model already exists

export default User;