import mongoose from "mongoose";

const MONGO_URI = "mongodb+srv://bachewarbhushan:t0u9fJRCDo2bklwx@cluster0.iogqgw0.mongodb.net/agri-tech?retryWrites=true&w=majority";

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB Connected...");
    } catch (error) {
        console.error("MongoDB Connection Failed:", error);
        process.exit(1);
    }
};

export default connectDB;
