import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { connectDB } from './config/database.js';
import enquiryRoutes from './routes/enquiries.js';
import authRoutes from './routes/auth.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet());

const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',').map(origin => origin.trim())
  : [
    'https://spacegen-aviation-six.vercel.app',
    'https://spacegen-aviation-utd3.vercel.app',
    'http://localhost:3000',
    'http://localhost:3001'
  ];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

const API_PREFIX = '/api/v1';

// Main root route for accessibility/health Check
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Welcome to SpaceGen Aviation API 🚀',
    documentation: 'https://spacegen-backend.onrender.com/api/v1',
    status: 'online',
    timestamp: new Date().toISOString()
  });
});

// Routes
app.use(`${API_PREFIX}/auth`, authRoutes);
app.use(`${API_PREFIX}/enquiries`, enquiryRoutes);

// Database connection check route
app.get(`${API_PREFIX}/debug-db`, (req, res) => {
  const isConnected = mongoose.connection.readyState === 1;
  res.json({
    connected: isConnected,
    connectionState: mongoose.connection.readyState,
    status: isConnected ? 'Healthy' : 'Disconnected',
    env: process.env.NODE_ENV
  });
});

// Health check
app.get(`${API_PREFIX}`, (req, res) => {
  res.json({
    success: true,
    message: 'SpaceGen API v1 is running 🚀',
    timestamp: new Date().toISOString(),
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`[SpaceGen Backend] Server running on port ${PORT}`);
  console.log(`[SpaceGen Backend] Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app;
