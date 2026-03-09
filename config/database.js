import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;

    if (!mongoURI) {
      if (process.env.NODE_ENV === 'production') {
        throw new Error('MONGODB_URI is not defined. Please set it in your Render environment variables.');
      }
      console.warn('[DB] MONGODB_URI not found, falling back to localhost for development');
    }

    const finalURI = mongoURI || 'mongodb://localhost:27017/spacegen';

    await mongoose.connect(finalURI);

    console.log('[DB] MongoDB Connected Successfully');
  } catch (error) {
    console.error('[DB] MongoDB Connection Error:', error.message);
    if (process.env.NODE_ENV === 'production') {
      console.error('[DB] Application will now exit to allow Render to restart (ensure MONGODB_URI is correct)');
      process.exit(1);
    }
  }
};

export default connectDB;
