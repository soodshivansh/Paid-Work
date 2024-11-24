import { Schema, model } from "mongoose";

const petSchema = new Schema({
  name: { 
    type: String, 
    required: true 
  },
  breed: { 
    type: String, 
    required: true 
  },
  gender: { 
    type: String, 
    enum: ["Male", "Female"], 
    required: true 
  },
  age: { 
    type: String, 
    required: true 
  },
  color: { 
    type: String, 
    required: true 
  },
  weight: { 
    type: String, 
    required: true 
  },
  height: { type: String, required: true },
  location: {
    city: { 
      type: String, 
      required: true 
    },
    state: { 
      type: String, 
      required: true 
    },
    country: { 
      type: String, 
      required: true 
    },
  },
  vaccinated: { 
    type: Boolean, 
    default: false 
  },
  neutered: { 
    type: Boolean, 
    default: false 
  },
  microchipped: { 
    type: Boolean, 
    default: false 
  },
  houseTrained: { 
    type: Boolean, 
    default: false 
  },
  story: { 
    type: String, 
    required: true 
  },
  photos: [String],
  status: { 
    type: String, 
    enum: ["Available", "Adopted", "Pending"], 
    default: "Available" 
  },
}, { timestamps: true });
``
const Pet = model("Pet", petSchema);
export default Pet;
