import mongoose from "mongoose";
import { config } from "../config";

const connectDB = async () => {
  try {
    await mongoose.connect(config.MONGODB_URI);
    console.log("💚 MongoDB connected successfully!");
  } catch (error) {
    console.error("💔 MongoDB connection error:", error);
    process.exit(1); // Sale del proceso con un error
  }
};

export default connectDB;
