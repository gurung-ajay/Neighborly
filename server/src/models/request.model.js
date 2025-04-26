import mongoose from "mongoose";

const RequestSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    trim: true,
  },
  expiryDate: {
    type: Date,
    required: true,
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  helpOfferAcceptedOf: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  requestStatus: {
    type: String,
    enum: ['pending', 'helpOfferAccepted', 'completed'],
    default: 'pending',
  }
}, {
  timestamps: true
});

const Request = mongoose.model('Request', RequestSchema);

export default Request