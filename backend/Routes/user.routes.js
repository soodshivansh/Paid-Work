import express from "express";
import {
  registerUser,
  authUser,
  getUserProfile,
  updateUserProfile,
  changePassword,
  adminLogin,
} from "../Controllers/user.controller.js";
import { protect } from "../Middlewares/authMiddleware.js";
import { upload } from '../config/cloudinary.js';

const router = express.Router();

router.post("/", upload.single('profilePicture'), registerUser);
router.post("/login", authUser);
router.post("/admin/login", adminLogin);
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, upload.single('profilePicture'), updateUserProfile);
router.put("/change-password", protect, changePassword);

export default router;
