import Pet from '../Models/pet.models.js';
import { upload } from '../config/cloudinary.js';

export const getPets = async (req, res) => {
  try {
    const { breed, _id, limit = 10, ...otherFilters } = req.query;
    let query = { approvedStatus: true }; // Ensure only approved pets are fetched

    // Add breed filter if provided
    if (breed) {
      query.breed = breed;
    }

    // Exclude specific pet ID if provided
    if (_id && _id.$ne) {
      query._id = { $ne: _id.$ne };
    }

    // Add other filters
    Object.keys(otherFilters).forEach(key => {
      if (otherFilters[key]) {
        query[key] = otherFilters[key];
      }
    });

    const pets = await Pet.find(query)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    res.status(200).json(pets);
  } catch (error) {
    console.error('Error in getPets:', error);
    res.status(500).json({ message: 'Error fetching pets', error: error.message });
  }
};
export const getPetsAdmin = async (req, res) => {
  try {
    const { breed, _id, limit = 10, ...otherFilters } = req.query;
    let query = { approvedStatus: false }; // Ensure only approved pets are fetched

    // Add breed filter if provided
    if (breed) {
      query.breed = breed;
    }

    // Exclude specific pet ID if provided
    if (_id && _id.$ne) {
      query._id = { $ne: _id.$ne };
    }

    // Add other filters
    Object.keys(otherFilters).forEach(key => {
      if (otherFilters[key]) {
        query[key] = otherFilters[key];
      }
    });

    const pets = await Pet.find(query)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    res.status(200).json(pets);
  } catch (error) {
    console.error('Error in getPets:', error);
    res.status(500).json({ message: 'Error fetching pets', error: error.message });
  }
};

export const getPetById = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) return res.status(404).json({ message: "Pet not found" });
    res.status(200).json(pet);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createPet = async (req, res) => {
  try {
    const petData = req.body;
    
    // Handle image uploads
    if (req.files && req.files.length > 0) {
      petData.images = req.files.map(file => file.path);
    }

    const pet = new Pet(petData);
    const savedPet = await pet.save();
    res.status(201).json(savedPet);
  } catch (error) {
    console.error('Error in createPet:', error);
    res.status(500).json({ message: error.message });
  }
};

export const updatePet = async (req, res) => {
  try {
    const petData = req.body;
    
    // Handle image uploads for updates
    if (req.files && req.files.length > 0) {
      petData.images = req.files.map(file => file.path);
    }

    const updatedPet = await Pet.findByIdAndUpdate(
      req.params.id,
      petData,
      { new: true, runValidators: true }
    );

    if (!updatedPet) {
      return res.status(404).json({ message: "Pet not found" });
    }

    res.status(200).json(updatedPet);
  } catch (error) {
    console.error('Error in updatePet:', error);
    res.status(500).json({ message: error.message });
  }
};

export const deletePet = async (req, res) => {
  try {
    const deletedPet = await Pet.findByIdAndDelete(req.params.id);
    if (!deletedPet) return res.status(404).json({ message: "Pet not found" });
    res.status(200).json({ message: "Pet deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
