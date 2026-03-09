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
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

const API_PREFIX = '/api/v1';

// Routes
app.use(`${API_PREFIX}/auth`, authRoutes);
app.use(`${API_PREFIX}/enquiries`, enquiryRoutes);

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
