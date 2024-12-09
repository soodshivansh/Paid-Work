import Pet from "../Models/pet.models.js";
import Rehomer from "../Models/rehomer.models.js";
import { createError } from "../utils/error.js";

// get path
const getRelativePath = (filename) => {
  if (!filename) return undefined;
  if (filename.startsWith('http')) return filename;
  return path.join('/uploads/multiplePhotos/', path.basename(filename)).replace(/\\/g, '/');
};

// Initialize rehoming process
export const initializeRehoming = async (req, res, next) => {
  try {
    const { termsAgreed } = req.body;
    const user = req.user; // This comes from the protect middleware
    console.log(user);

    if (!user) {
      return next(createError(401, "User not found"));
    }

    // Check if rehomer already exists
    let rehomer = await Rehomer.findOne({ email: user.email });

    if (!rehomer) {
      // Split the name into first and last name
      const nameParts = user.name.split(" ");
      const firstName = nameParts[0];
      const lastName =
        nameParts.length > 1 ? nameParts.slice(1).join(" ") : " ";

      // Create new rehomer using logged-in user's information
      rehomer = new Rehomer({
        email: user.email,
        firstName: firstName,
        lastName: lastName,
        phone: user.phone || "",
        state: user.state || "",
        pincode: user.zipCode || "",
        termsAgreed,
        termsAgreedDate: new Date(),
        status: "active",
      });
      console.log(rehomer);

      try {
        await rehomer.save();
      } catch (saveError) {
        if (saveError.name === "ValidationError") {
          const validationErrors = Object.values(saveError.errors).map(
            (err) => err.message
          );
          return next(
            createError(
              400,
              `Please complete your profile with required information: ${validationErrors.join(
                ", "
              )}`
            )
          );
        }
        throw saveError;
      }
    } else {
      // Update terms agreement if needed
      rehomer.termsAgreed = termsAgreed;
      rehomer.termsAgreedDate = new Date();
      await rehomer.save();
    }

    res.status(201).json({
      success: true,
      rehomerId: rehomer._id,
      rehomerDetails: {
        name: `${rehomer.firstName} ${rehomer.lastName}`,
        email: rehomer.email,
        phone: rehomer.phone,
        state: rehomer.state,
        pincode: rehomer.pincode,
      },
      message: "Rehoming process initialized successfully",
    });
  } catch (err) {
    next(err);
  }
};

// Update rehomer information
export const updateRehomerInfo = async (req, res, next) => {
  try {
    const { phone, state, pincode } = req.body;
    const rehomer = await Rehomer.findOne({ email: req.user.email });

    if (!rehomer) {
      return next(createError(404, "Rehomer not found"));
    }

    if (phone) rehomer.phone = phone;
    if (state) rehomer.state = state;
    if (pincode) rehomer.pincode = pincode;

    await rehomer.save();

    res.status(200).json({
      success: true,
      rehomerDetails: {
        name: `${rehomer.firstName} ${rehomer.lastName}`,
        email: rehomer.email,
        phone: rehomer.phone,
        state: rehomer.state,
        pincode: rehomer.pincode,
      },
      message: "Rehomer information updated successfully",
    });
  } catch (err) {
    next(err);
  }
};

// Get rehomer profile
export const getRehomerProfile = async (req, res, next) => {
  try {
    const rehomer = await Rehomer.findOne({ email: req.user.email });

    if (!rehomer) {
      return next(createError(404, "Rehomer not found"));
    }

    res.status(200).json({
      success: true,
      rehomerDetails: {
        name: `${rehomer.firstName} ${rehomer.lastName}`,
        email: rehomer.email,
        phone: rehomer.phone,
        state: rehomer.state,
        pincode: rehomer.pincode,
        pets: rehomer.pets,
      },
    });
  } catch (err) {
    next(err);
  }
};

// Update pet information
export const updatePetInfo = async (req, res, next) => {
  try { 
    const { petId } = req.params;
    const petData = req.body;
    const rehomer = await Rehomer.findOne({ email: req.user.email });

    if (!rehomer) {
      return next(createError(404, "Rehomer not found"));
    }

    const pet = await Pet.findById(petId);
    if (!pet) {
      return next(createError(404, "Pet not found"));
    }

    // Verify the pet belongs to this rehomer
    if (!rehomer.pets.includes(petId)) {
      return next(createError(403, "Not authorized to update this pet"));
    }

    Object.assign(pet, petData);
    await pet.save();

    res.status(200).json({
      success: true,
      pet,
      message: "Pet information updated successfully",
    });
  } catch (err) {
    next(err);
  }
};

// Add document to rehomer
export const addDocument = async (req, res, next) => {
  try {
    const { type, url, name } = req.body;
    const rehomer = await Rehomer.findOne({ email: req.user.email });

    if (!rehomer) {
      return next(createError(404, "Rehomer not found"));
    }

    rehomer.documents.push({
      type,
      url,
      name,
      uploadDate: new Date(),
    });

    await rehomer.save();

    res.status(201).json({
      success: true,
      document: rehomer.documents[rehomer.documents.length - 1],
      message: "Document added successfully",
    });
  } catch (err) {
    next(err);
  }
};

// Get all documents
export const getDocuments = async (req, res, next) => {
  try {
    const rehomer = await Rehomer.findOne({ email: req.user.email });

    if (!rehomer) {
      return next(createError(404, "Rehomer not found"));
    }

    res.status(200).json({
      success: true,
      documents: rehomer.documents,
    });
  } catch (err) {
    next(err);
  }
};

// Update pet information (for each step)
export const updatePetInfoStep = async (req, res, next) => {
  try {
    console.log(req.body);
    const { rehomerId, step, petData } = req.body;
    // Validate rehomer exists
    const rehomer = await Rehomer.findById(rehomerId);
    if (!rehomer) {
      return next(createError(404, "Rehomer not found"));
    }
    console.log("rehomer are here" + rehomer);

    // If pet doesn't exist yet (first pet info update), create it
    let pet;
    if (!petData.petId) {
      pet = new Pet({
        rehomer: rehomerId,
        status: "Draft", // Will be changed to "Available" on final submission
      });
    } else {
      pet = await Pet.findById(petData.petId);
      if (!pet) {
        return next(createError(404, "Pet not found"));
      }
    }

    console.log(JSON.stringify(pet));

    // Update pet information based on the current step
    switch (step) {
      case 2: // Primary Questions
        pet.type = petData.type;
        pet.neutered = petData.neutered;
        pet.rehomingReason = petData.rehomingReason;
        pet.timeAvailable = petData.timeAvailable;
        break;

      case 3: // Pet's Images
        // pet.images = petData.images;
        // break;
        // console.log("Sauabh fiole upload",req.files);
        console.log("Sauabh fiole upload",pet.images);
        console.log("Pet Data  fiole upload",petData.images);
        

        if (req.files && req.files.length > 0) {
          pet.images = req.files.map(file => ({
            path: getRelativePath(file.filename),
            filename: file.originalname
          }));
        } else {
          pet.images = petData.images;
        }
        break;

      case 4: // Characteristics
        Object.assign(pet, {
          name: petData.name,
          age: petData.age,
          size: petData.size,
          gender: petData.gender,
          breed: petData.breed,
          color: petData.color,
        });
        break;

      case 5: // Key Facts
        Object.assign(pet, {
          vaccinated: petData.vaccinated,
          microchipped: petData.microchipped,
          houseTrained: petData.houseTrained,
          goodWithDogs: petData.goodWithDogs,
          goodWithCats: petData.goodWithCats,
          goodWithKids: petData.goodWithKids,
          specialNeeds: petData.specialNeeds,
          behavioralIssues: petData.behavioralIssues,
        });
        break;

      case 6: // Location
        pet.location = petData.location;
        break;

      case 7: // Pet's Story
        Object.assign(pet, {
          personality: petData.personality,
          dailyRoutine: petData.dailyRoutine,
          idealHome: petData.idealHome,
        });
        break;

      case 8: // Documents
        pet.documents = petData.documents;
        break;

      default:
        return next(createError(400, "Invalid step"));
    }

    await pet.save();

    // If this is the first save, add pet to rehomer's pets array
    if (!petData.petId) {
      rehomer.pets.push(pet._id);
      await rehomer.save();
    }

    res.status(200).json({
      success: true,
      petId: pet._id,
      message: "Pet information updated successfully",
    });
  } catch (err) {
    next(err);
  }
};

// Finalize rehoming process
export const finalizeRehoming = async (req, res, next) => {
  try {
    const { rehomerId, petId } = req.body;

    // Validate rehomer and pet exist
    const rehomer = await Rehomer.findById(rehomerId);
    if (!rehomer) {
      return next(createError(404, "Rehomer not found"));
    }

    const pet = await Pet.findById(petId);
    if (!pet) {
      return next(createError(404, "Pet not found"));
    }

    // Validate all required fields are filled
    if (!pet.validateSync()) {
      // Update pet status to Available
      pet.status = "Available";
      await pet.save();

      // TODO: Send confirmation email to rehomer

      res.status(200).json({
        success: true,
        message: "Rehoming process completed successfully",
        pet: pet,
      });
    } else {
      return next(createError(400, "Please complete all required fields"));
    }
  } catch (err) {
    next(err);
  }
};

// Get all available pets for adoption
export const getAvailablePets = async (req, res, next) => {
  try {
    const pets = await Pet.find({ status: "Available" })
      .populate({
        path: "rehomer",
        select: "firstName lastName email phone profilePicture",
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: pets.length,
      pets,
    });
  } catch (err) {
    next(err);
  }
};

// Get single pet details
export const getPetDetails = async (req, res, next) => {
  try {
    const pet = await Pet.findById(req.params.id).populate({
      path: "rehomer",
      select: "firstName lastName email phone profilePicture",
    });

    if (!pet) {
      return next(createError(404, "Pet not found"));
    }

    // If user is logged in, include contact information
    const contactInfo = req.user
      ? {
          phone: pet.rehomer.phone,
          email: pet.rehomer.email,
        }
      : null;

    res.status(200).json({
      success: true,
      pet: {
        ...pet.toObject(),
        contactInfo,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const uploadPetImages= async (req, res, next) => {
  try {
    const images = req.files.map(file => ({
      path: `${file.filename}`,
      filename:file.originalname
    }));

    // Assuming you have the petId in the request body
    const { petId } = req.body;

    // Find the pet and update its images field
    const pet = await Pet.findById(petId);
    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }

    pet.images.push(...images);
    await pet.save();

    res.status(200).json({ images });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

}