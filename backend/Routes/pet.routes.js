import express from "express";
import { getPets, getPetById, createPet, updatePet, deletePet, getPetsAdmin } from "../Controllers/pet.controller.js";
// import { upload } from '../config/cloudinary.js';
import upload from "../config/multerMulitple.js"
const router = express.Router();

router.get("/", getPets); 
router.get("/adminPets",getPetsAdmin)
router.get("/:id", getPetById);
router.post("/", upload, createPet); 
router.put("/:id", upload, updatePet); 
router.delete("/:id", deletePet); 

export default router;
