import express from "express";
import { deletePets, deleteUser, pets, users } from "../Controllers/AdminController.js";
import { protect } from "../Middlewares/authMiddleware.js";

const router = express.Router();


router.get('/allUsers', protect, users);

router.get('/allPets', protect,pets);

router.delete('/deletePets/:id',protect,deletePets);
router.delete('/deleteUser/:id',protect,deleteUser);

export default router;