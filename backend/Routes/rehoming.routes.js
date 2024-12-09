import express from 'express';
import {
  initializeRehoming,
  updateRehomerInfo,
  getRehomerProfile,
  updatePetInfo,
  addDocument,
  getDocuments,
  updatePetInfoStep,
  finalizeRehoming,
  getAvailablePets,
  getPetDetails,
  uploadPetImages
} from '../controllers/rehoming.controller.js';
import { protect } from '../Middlewares/authMiddleware.js';
import upload from '../config/multerMulitple.js';

const router = express.Router();

// Protected routes - require authentication
router.post('/initialize', protect, initializeRehoming);
router.put('/update-info', protect, updateRehomerInfo);
router.get('/profile', protect, getRehomerProfile);
router.put('/pet/:petId', protect, updatePetInfo);
router.post('/document', protect, addDocument);
router.get('/documents', protect, getDocuments);
router.post('/update-pet-step', protect,upload, updatePetInfoStep);
router.post('/finalize', protect, finalizeRehoming);
router.post('/upload/images',protect,upload,uploadPetImages);

// Public routes
router.get('/available-pets', getAvailablePets);
router.get('/pet/:id', getPetDetails);

export default router;
