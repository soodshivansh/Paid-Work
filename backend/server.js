import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import petRoutes from './Routes/pet.routes.js';
import userRoutes from './Routes/user.routes.js';
import profileRoutes from './Routes/profile.routes.js';
import rehomingRoutes from './routes/rehoming.routes.js';
import { errorHandler } from './Middlewares/errorHandler.js';
import { handleUploadError } from './services/upload.service.js';
import { handleError } from './utils/error.js';
import cors from "cors";
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Get directory name in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads', 'user');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
  console.log(`Created uploads directory at: ${uploadsDir}`);
}

// Middleware
app.use(express.json());

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const corsOptions = {
  origin: "*", 
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
};

app.use(cors(corsOptions));

// Log all incoming requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Routes
app.use('/api/pets', petRoutes);
app.use("/api/users", userRoutes);
app.use("/api/users", profileRoutes);
app.use("/api/rehoming", rehomingRoutes);

// Error handling middleware
app.use(handleUploadError); // Handle file upload errors
app.use(handleError); // Handle general errors
app.use(errorHandler);

// Start server
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
