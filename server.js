import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import { connectDB } from './config/database.js';
import enquiryRoutes from './routes/enquiries.js';
import authRoutes from './routes/auth.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ---------------- SECURITY MIDDLEWARE ---------------- //

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

// ---------------- CORS CONFIGURATION ---------------- //

const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',').map(origin => origin.trim())
  : [
    'https://spacegen-aviation-six.vercel.app',
    'https://spacegen-aviation-utd3.vercel.app',
    'https://www.spacegenaviation.in',
    'http://localhost:3000',
    'http://localhost:3001'
  ];

app.use(
  cors({
    origin: function (origin, callback) {

      // allow requests with no origin (like mobile apps or Postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = `CORS policy does not allow access from origin: ${origin}`;
        return callback(new Error(msg), false);
      }

      return callback(null, true);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  })
);

// Handle preflight requests
app.options('*', cors());

// ---------------- BODY PARSER ---------------- //

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ---------------- DATABASE CONNECTION ---------------- //

connectDB();

// ---------------- API PREFIX ---------------- //

const API_PREFIX = '/api/v1';

// ---------------- ROOT ROUTE ---------------- //

app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to SpaceGen Aviation API 🚀',
    documentation: 'https://spacegen-backend.onrender.com/api/v1',
    status: 'online',
    timestamp: new Date().toISOString()
  });
});

// ---------------- API ROUTES ---------------- //

app.use(`${API_PREFIX}/auth`, authRoutes);
app.use(`${API_PREFIX}/enquiries`, enquiryRoutes);

// ---------------- DATABASE DEBUG ---------------- //

app.get(`${API_PREFIX}/debug-db`, (req, res) => {
  const isConnected = mongoose.connection.readyState === 1;

  res.json({
    connected: isConnected,
    connectionState: mongoose.connection.readyState,
    status: isConnected ? 'Healthy' : 'Disconnected',
    environment: process.env.NODE_ENV || 'development'
  });
});

// ---------------- HEALTH CHECK ---------------- //

app.get(`${API_PREFIX}`, (req, res) => {
  res.json({
    success: true,
    message: 'SpaceGen API v1 is running 🚀',
    timestamp: new Date().toISOString()
  });
});

// ---------------- 404 HANDLER ---------------- //

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// ---------------- ERROR HANDLER ---------------- //

app.use(errorHandler);

// ---------------- START SERVER ---------------- //

app.listen(PORT, () => {
  console.log(`🚀 SpaceGen Backend running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app;