import React from "react";
import "./FormStep2.css";

const FormStep2 = () => {
  return (
    <div className="form-step-container">
      <h2 className="form-title">Basic Pet Information</h2>
      <div className="form-grid">
        <input placeholder="Pet Name *" required />
        <select required>
          <option value="">Pet Type *</option>
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
        </select>
        <input placeholder="Breed *" required />
        <select required>
          <option value="">Gender *</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <input placeholder="Age *" required />
        <input placeholder="Color *" required />
        <select required>
          <option value="">Size *</option>
          <option value="Small">Small</option>
          <option value="Medium">Medium</option>
          <option value="Large">Large</option>
        </select>
        <input placeholder="Weight (kg) *" type="number" step="0.1" required />
        <input placeholder="Height (cm) *" type="number" step="0.1" required />
      </div>
      <div className="story-section">
        <label>Tell us your pet's story *</label>
        <textarea 
          placeholder="Share your pet's personality, habits, and why they need a new home..."
          required
        />
      </div>
    </div>
  );
};

export default FormStep2;
