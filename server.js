import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import connectDB from "./config/database.js";

import enquiryRoutes from "./routes/enquiries.js";
import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security
app.use(helmet());

// Body parser
app.use(express.json());

// CORS configuration
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://spacegen-aviation-six.vercel.app",
      "https://www.spacegenaviation.in"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);

// Connect database
connectDB();

// Routes
app.use("/api/v1/enquiries", enquiryRoutes);
app.use("/api/v1/auth", authRoutes);

// Health route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "SpaceGen Backend API Running"
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 SpaceGen Backend running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV}`);
});