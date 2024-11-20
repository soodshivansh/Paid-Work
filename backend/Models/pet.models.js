import { Schema, model } from 'mongoose';

const petSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Pet's name is required"],
      trim: true,
    },
    species: {
      type: String,
      enum: ['Dog', 'Cat', 'Bird', 'Rabbit', 'Other'],
      required: [true, 'Species is required'],
    },
    breed: {
      type: String,
      trim: true,
    },
    age: {
      value: {
        type: Number,
        required: [true, 'Age is required'],
        min: 0,
      },
      unit: {
        type: String,
        enum: ['Years', 'Months'],
        default: 'Years',
      },
    },
    gender: {
      type: String,
      enum: ['Male', 'Female'],
      required: [true, 'Gender is required'],
    },
    size: {
      type: String,
      enum: ['Small', 'Medium', 'Large'],
    },
    vaccinated: {
      type: Boolean,
      default: false,
    },
    neutered: {
      type: Boolean,
      default: false,
    },
    medicalHistory: {
      type: String,
      default: 'No known medical conditions',
    },
    status: {
      type: String,
      enum: ['Available', 'Adopted', 'Pending'],
      default: 'Available',
    },
    adoptionFee: {
      type: Number,
      min: 0,
    },
    adoptionRequirements: {
      type: String,
    },
    currentLocation: {
      type: {
        city: { type: String, required: true },
        state: { type: String, required: true },
        country: { type: String, required: true },
      },
      required: true,
    },
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    color: {
      type: [String], 
    },
    temperament: {
      type: [String], 
      enum: ['Friendly', 'Shy', 'Playful', 'Aggressive', 'Calm', 'Energetic'],
    },
    photos: {
      type: [String], 
      validate: {
        validator: function (v) {
          return v.length > 0;
        },
        message: 'At least one photo is required',
      },
    },  
    tags: {
      type: [String],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, 
  }
);

const Pet = model('Pet', petSchema);
export default Pet;
