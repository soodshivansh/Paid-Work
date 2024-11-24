import express from "express";
import { getPets, getPetById, createPet, updatePet, deletePet } from "../Controllers/pet.controller.js";

const router = express.Router();

router.get("/", getPets); 
router.get("/:id", getPetById); 
router.post("/", createPet); 
router.put("/:id", updatePet); 
router.delete("/:id", deletePet); 

export default router;
