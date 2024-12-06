import { Schema, model } from "mongoose";

const rehomerSchema = new Schema({
  // Basic Information
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    validate: {
      validator: function(v) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
      },
      message: props => `${props.value} is not a valid email address!`
    }
  },
  phone: {
    type: String,
  },
    state: {
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
    },
  // Pets listed by this rehomer
  pets: [{
    type: Schema.Types.ObjectId,
    ref: 'Pet'
  }],
  // Documents uploaded by rehomer
  documents: [{
    type: {
      type: String,
      enum: ['vaccination', 'medical_history', 'other'],
    },
    url: {
      type: String,
      validate: {
        validator: function(v) {
          return /^https?:\/\/.*\.(pdf|jpg|jpeg|png)$/.test(v);
        },
        message: props => `${props.value} is not a valid document URL!`
      }
    },
    name: String,
    uploadDate: {
      type: Date,
      default: Date.now
    }
  }],
  // Account status
  status: {
    type: String,
    enum: ['active', 'suspended', 'inactive' , "Draft"],
    default: 'active'
  },
  // Terms agreement
  termsAgreed: {
    type: Boolean,
  },
  termsAgreedDate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const Rehomer = model("Rehomer", rehomerSchema);
export default Rehomer;
