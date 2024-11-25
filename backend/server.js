import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import petRoutes from './Routes/pet.routes.js';
import userRoutes from './Routes/user.routes.js';
import profileRoutes from './Routes/profile.routes.js';
import { errorHandler } from './Middlewares/errorHandler.js';
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
app.use("/api/users", profileRoutes); // Add profile routes under /api/users

// Error handling middleware
app.use(errorHandler);

// Start server
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
