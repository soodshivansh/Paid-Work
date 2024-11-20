import express from 'express';
import { getAllPets, addPet, updatePet, deletePet } from '../Controllers/pet.controller.js';

const router = express.Router();

router.get('/', getAllPets);
router.post('/addpet', addPet);
router.put('/:id', updatePet);
router.delete('/:id', deletePet);

export default router;
