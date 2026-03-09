import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;

    if (!mongoURI) {
      if (process.env.NODE_ENV === "production") {
        throw new Error(
          "MONGODB_URI is not defined. Please set it in Render Environment Variables"
        );
      }
      console.warn(
        "[DB] MONGODB_URI not found, using localhost for development"
      );
    }

    const finalURI = mongoURI || "mongodb://127.0.0.1:27017/spacegen";

    await mongoose.connect(finalURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ MongoDB Connected Successfully");

    mongoose.connection.on("error", (err) => {
      console.error("❌ MongoDB Error:", err);
    });

  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);

    if (process.env.NODE_ENV === "production") {
      process.exit(1);
    }
  }
};

export default connectDB;