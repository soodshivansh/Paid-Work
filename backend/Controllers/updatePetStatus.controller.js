import Pet from '../Models/pet.models.js';

export const updatePetStatus = async (req, res) => {
  const { id, status } = req.body;
  console.log(req.body);
  
  try {
    // Check if the pet exists
    const pet = await Pet.findById(id);

    if (!pet) {
      return res.status(404).json({ msg: "Pet not found" });
    }

    if (status) {
      // If status is true, update the approvedStatus to true
      pet.approvedStatus = true;
      await pet.save();
      return res.status(200).json({ msg: "Pet approved successfully" });
    } else {
      // If status is false, delete the pet data
      await Pet.findByIdAndDelete(id);
      return res.status(200).json({ msg: "Pet data deleted successfully" });
    }
  } catch (err) {
    console.error("Error in createPaymentLink:", err);
    return res.status(500).json({ msg: "Internal server error" });
  }
};
