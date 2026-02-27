import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/spacegen';
    
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('[DB] MongoDB Connected Successfully');
  } catch (error) {
    console.error('[DB] MongoDB Connection Error:', error.message);
    process.exit(1);
  }
};

export default connectDB;
