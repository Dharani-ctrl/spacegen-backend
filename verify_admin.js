import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Admin from './models/Admin.js';
import bcryptjs from 'bcryptjs';

dotenv.config();

const verify = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to DB');

    const admin = await Admin.findOne({ username: 'admin' }).select('+password');
    if (!admin) {
      console.log('Admin user NOT FOUND');
    } else {
      console.log('Admin user found:', admin.username);
      const isMatch = await bcryptjs.compare('spacegen@2026', admin.password);
      console.log('Password "spacegen@2026" match:', isMatch);

      const isMatchEnv = await bcryptjs.compare(process.env.ADMIN_PASSWORD, admin.password);
      console.log('Password from env match:', isMatchEnv);
    }

    await mongoose.disconnect();
  } catch (err) {
    console.error(err);
  }
};

verify();
