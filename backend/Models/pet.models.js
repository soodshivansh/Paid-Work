import { Schema, model } from "mongoose";

const petSchema = new Schema({
  name: { 
    type: String, 
  },
  approvedStatus: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    enum: ['dog', 'cat'],
  },
  breed: { 
    type: String, 
  },
  gender: { 
    type: String, 
    enum: ["male", "female"], 
  },
  age: { 
    type: String, 
  },
  color: { 
    type: String, 
  },
  size: {
    type: String,
    enum: ["small", "medium", "large"],
  },
  weight: { 
    type: String, 
  },
  height: { 
    type: String, 
  },
  images: [{
    type: Array,
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
    },
    state: { 
      type: String, 
    },
    country: { 
      type: String, 
    },
    pincode: {
      type: String,
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
  },
  photos: [String],
  status: { 
    type: String, 
    enum: ["Available", "Adopted", "Pending" , "Draft"], 
    default: "Available" 
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
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
