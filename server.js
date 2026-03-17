import express from "express";
import cors from "cors";
import helmet from "helmet";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import Admin from "./models/Admin.js";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

import enquiryRoutes from "./routes/enquiries.js";
import authRoutes from "./routes/auth.js";
import contentRoutes from "./routes/content.js";
import Content from "./models/Content.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, "../public/uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Static files
app.use("/uploads", express.static(uploadDir));

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
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true
  })
);

// Connect database
connectDB().then(async () => {
  // Initialize admin if missing
  const adminCount = await Admin.countDocuments();
  if (adminCount === 0) {
    console.log('Creating default admin user...');
    await Admin.create({
      username: process.env.ADMIN_USERNAME || 'admin',
      password: process.env.ADMIN_PASSWORD || 'spacegen@2026',
      email: 'admin@spacegen.com'
    });
    console.log('✅ Default admin created');
  }

  // Initialize content if missing
  const defaultContent = [
    {
      section: 'hero',
      data: {
        title: 'Aviation Programme',
        subtitle: 'For School Students',
        image: '/about-hero.png'
      }
    },
    {
      section: 'about',
      data: {
        title: 'About SpaceGen',
        description: 'SpaceGen Aviation stands at the forefront of the global aviation industry...',
        description2: 'With a fleet of 75 aircraft, our training programs...',
        image: '/hero-iit.png'
      }
    },
    {
      section: 'programs',
      data: {
        title: 'Aviation Adventure',
        subtitle: 'Join the most exciting aviation school for kids and future pilots!',
        programs: [
          {
            level: 'Level 1',
            title: 'Foundation Program',
            subtitle: 'Perfect for beginners',
            duration: '40 Hours',
            target: 'Class 4th - 12th',
            price: '₹15,000',
            features: ['Fun Pilot Training Games!', 'Exciting In-Person Labs'],
            image: '/img2 (2).jpeg'
          }
        ]
      }
    },
    {
      section: 'features',
      data: {
        title: 'Become a Young Space Expert!',
        subtitle: 'Experience 21 elite modules including workshops...',
        features: [
          'Youngest Aviation Masters',
          'Global Recognition',
          'Hands-on Experience'
        ],
        benefits: [
          'Expert Mentorship',
          'Modern Training Tools',
          'Career Guidance'
        ],
        stats: [
          { value: '75+', label: 'Training Aircraft' },
          { value: '15+', label: 'Training Locations' },
          { value: '60+ Hrs', label: 'Sessions & Classes' }
        ]
      }
    },
    {
      section: 'gallery',
      data: {
        title: 'OUR SPACE ADVENTURES',
        subtitle: 'Check out our amazing students and cool aircraft in action! See what it\'s like to be part of the SpaceGen family.',
        images: [
          { url: '/img9.jpg', title: 'Flight Training', description: 'Expert instruction in modern aircraft.' },
          { url: '/img14.jpg', title: 'Aviation Academy', description: 'Learn to fly with state-of-the-art facilities.' },
          { url: '/img15.jpg', title: 'Modern Fleet', description: 'Training with the latest aviation technology.' },
          { url: '/img16.jpeg', title: 'Cockpit View', description: 'Hands-on experience in high-performance aircraft.' },
          { url: '/img17.jpeg', title: 'Aerodynamics', description: 'Explore the science of flight.' },
          { url: '/img18.jpeg', title: 'Graduation Day', description: 'Celebrating the success of our students.' },
          { url: '/img19.jpeg', title: 'Advanced Simulator', description: 'Practicing complex maneuvers safely.' },
          { url: '/img20.jpeg', title: 'Maintenance Hangar', description: 'Keeping our fleet in top condition.' },
          { url: '/img21.jpeg', title: 'Pilot Briefing', description: 'Preparation for every training flight.' },
          { url: '/img22.jpeg', title: 'Solo Flight', description: 'A major milestone in every pilot\'s journey.' },
          { url: '/img23.jpeg', title: 'Aerial Photography', description: 'Stunning views from above.' },
          { url: '/img24.jpeg', title: 'Night Training', description: 'Learning the skills for 24/7 operations.' },
          { url: '/img25.jpeg', title: 'Cross-Country Navigation', description: 'Flying to new horizons.' },
          { url: '/img26.jpeg', title: 'Aviation Theory', description: 'Mastering the principles of flight.' },
          { url: '/img27.jpeg', title: 'Safety First', description: 'Rigorous safety standards and training.' },
          { url: '/img28.jpeg', title: 'Student Community', description: 'Building friendships that last a lifetime.' },
          { url: '/img29.jpeg', title: 'Career Guidance', description: 'Preparing for a professional airline career.' },
          { url: '/img30.jpeg', title: 'Engine Inspection', description: 'Understanding aircraft systems.' },
          { url: '/img31.jpeg', title: 'ATC Communication', description: 'Mastering radio procedures.' },
          { url: '/img32.jpeg', title: 'Meteorology', description: 'Understanding weather for safe flying.' },
          { url: '/img33.jpeg', title: 'Flight Planning', description: 'Precise preparation for every mission.' },
          { url: '/img34.jpeg', title: 'Helicopter Training', description: 'Versatile pilot training options.' },
          { url: '/img35.jpeg', title: 'Global Aviation', description: 'Connecting with the world of flight.' },
          { url: '/img36.jpeg', title: 'Innovation in Flight', description: 'Exploring the future of aviation.' },
          { url: '/img37.jpeg', title: 'Aviation Leadership', description: 'Training the next generation of commanders.' },
          { url: '/img38.jpeg', title: 'Precision Landing', description: 'Developing expert handling skills.' },
          { url: '/img39.jpeg', title: 'Instrument Rating', description: 'Mastering flight by reference to instruments.' },
          { url: '/img40.jpeg', title: 'Academy Campus', description: 'Our beautiful location for learning.' },
          { url: '/img41.jpeg', title: 'Passion for Flight', description: 'Where dreams take to the skies.' },
          { url: '/img2 (2).jpeg', title: 'Inauguration', description: 'The beginning of excellence.' }
        ]
      }
    }
  ];

  for (const item of defaultContent) {
    const exists = await Content.findOne({ section: item.section });
    if (!exists) {
      console.log(`Initializing default content for section: ${item.section}`);
      await Content.create(item);
    }
  }
});

// Routes
app.use("/api/v1/enquiries", enquiryRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/content", contentRoutes);

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