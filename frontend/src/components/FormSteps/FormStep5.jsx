import React from "react";
import "./FormStep5.css";

const FormStep5 = () => {
  return (
    <div className="form-step-container">
      <h2 className="form-title">Location Details</h2>
      <div className="location-grid">
        <input 
          placeholder="City *" 
          required 
        />
        <input 
          placeholder="State *" 
          required 
        />
        <input 
          placeholder="Country *" 
          required 
        />
        <input 
          placeholder="Pincode *" 
          pattern="[1-9][0-9]{5}"
          title="Please enter a valid 6-digit pincode"
          required 
        />
      </div>
      <p className="location-note">
        * This information helps potential adopters know if they can provide a home for your pet in their area.
      </p>
    </div>
  );
};

export default FormStep5;
