import mongoose from "mongoose";

const HelpOfferSchema = new mongoose.Schema({
    offeredBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    offeredForRequest: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Request',
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending'
    }
}, {
    timestamps: true
});

const HelpOffer = mongoose.model('HelpOffer', HelpOfferSchema);

export default HelpOffer