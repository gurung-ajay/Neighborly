import mongoose from "mongoose";
const dbConnect = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/user');
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error(error);
    }

}

export default dbConnect;