import express from "express";
import { deletePets, deleteUser, pets, users } from "../Controllers/AdminController.js";
import { protect } from "../Middlewares/authMiddleware.js";

const router = express.Router();


router.get('/allUsers', users);

router.get('/allPets', pets);

router.delete('/deletePets/:id',protect,deletePets);
router.delete('/deleteUser/:id', deleteUser);

export default router;