import express from "express";
import { getPets, getPetById, createPet, updatePet, deletePet } from "../Controllers/pet.controller.js";
import { upload } from '../config/cloudinary.js';

const router = express.Router();

router.get("/", getPets); 
router.get("/:id", getPetById);
router.post("/", upload.array('photos', 5), createPet); 
router.put("/:id", upload.array('photos', 5), updatePet); 
router.delete("/:id", deletePet); 

export default router;
