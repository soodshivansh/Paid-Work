import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import petRoutes from './Routes/pet.routes.js';
import { errorHandler } from './Middlewares/errorHandler.js';

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api/pets', petRoutes);

// Error handling middleware
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
