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

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(express.json());

const corsOptions = {
  origin: "http://localhost:3000", 
  methods: ["GET", "POST", "PUT", "DELETE"],
};

app.use(cors(corsOptions));

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
