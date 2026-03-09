import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;

    if (!mongoURI && process.env.NODE_ENV === "production") {
      throw new Error("❌ MONGODB_URI not found in environment variables");
    }

    const finalURI = mongoURI || "mongodb://localhost:27017/spacegen";

    console.log("[DB] Connecting to MongoDB...");
    await mongoose.connect(finalURI, {
      serverSelectionTimeoutMS: 5000, // Fail fast (5s) instead of hanging
    });

    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    if (process.env.NODE_ENV === "production") {
      console.error("[DB] Critical: Connection failed in production. Application will exit.");
      process.exit(1);
    }
  }
};

export default connectDB;