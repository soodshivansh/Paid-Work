import { Schema, model } from "mongoose";

const petSchema = new Schema({
  name: { 
    type: String, 
    required: true 
  },
  type: {
    type: String,
    enum: ['dog', 'cat'],
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
  size: {
    type: String,
    enum: ["Small", "Medium", "Large"],
    required: true
  },
  weight: { 
    type: String, 
    required: true 
  },
  height: { 
    type: String, 
    required: true 
  },
  images: [{
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        // Basic URL validation
        return /^https?:\/\/.*\.cloudinary\.com\/.*$/.test(v);
      },
      message: props => `${props.value} is not a valid Cloudinary URL!`
    }
  }],
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
    pincode: {
      type: String,
      required: true,
      validate: {
        validator: function(v) {
          return /^[1-9][0-9]{5}$/.test(v);
        },
        message: props => `${props.value} is not a valid PIN code!`
      }
    }
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
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  adoptedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  adoptionDate: {
    type: Date,
    default: null
  }
}, { 
  timestamps: true 
});

const Pet = model("Pet", petSchema);
export default Pet;
