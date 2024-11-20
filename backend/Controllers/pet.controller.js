import Pet from '../Models/pet.models.js';

export const getAllPets = async (req, res, next) => {
  try {
    const pets = await Pet.find();
    res.status(200).json(pets);
  } catch (error) {
    next(error);
  }
};

export const addPet = async (req, res, next) => {
  try {
    const pet = new Pet(req.body);
    await pet.save();
    res.status(201).json(pet);
  } catch (error) {
    next(error);
  }
};

export const updatePet = async (req, res, next) => {
  try {
    const pet = await Pet.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!pet) return res.status(404).json({ message: 'Pet not found' });
    res.status(200).json(pet);
  } catch (error) {
    next(error);
  }
};

export const deletePet = async (req, res, next) => {
  try {
    const pet = await Pet.findByIdAndDelete(req.params.id);
    if (!pet) return res.status(404).json({ message: 'Pet not found' });
    res.status(200).json({ message: 'Pet deleted successfully' });
  } catch (error) {
    next(error);
  }
};


