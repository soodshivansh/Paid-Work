import React from "react";
import "./FormStep6.css";

const FormStep6 = () => {
  return (
    <div className="form-step-container">
      <h2 className="form-title">Other Animals</h2>
      <div className="form-group">
        <label>Does anyone in the household have any allergies to pets?</label>
        <textarea placeholder="Please specify or leave blank" />
      </div>
      <div className="form-group">
        <label>Are there any other animals at your home? *</label>
        <div className="radio-group">
          <input type="radio" id="animals-yes" name="other-animals" />
          <label htmlFor="animals-yes">Yes</label>
          <input type="radio" id="animals-no" name="other-animals" />
          <label htmlFor="animals-no">No</label>
        </div>
      </div>
      <div className="form-group">
        <label>If yes, please state their species, age, and gender:</label>
        <textarea placeholder="e.g., Dog, 2 years, Male" />
      </div>
      <div className="form-group">
        <label>If yes, are they neutered?</label>
        <div className="radio-group">
          <input type="radio" id="neutered-yes" name="neutered" />
          <label htmlFor="neutered-yes">Yes</label>
          <input type="radio" id="neutered-no" name="neutered" />
          <label htmlFor="neutered-no">No</label>
        </div>
      </div>
    </div>
  );
};

export default FormStep6;
