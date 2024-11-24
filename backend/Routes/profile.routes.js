import express from 'express';
import { protect } from '../Middlewares/authMiddleware.js';
import { updateProfile, changePassword } from '../Controllers/profile.controller.js';

const router = express.Router();

router.put('/profile', protect, updateProfile);
router.put('/change-password', protect, changePassword);

export default router;
