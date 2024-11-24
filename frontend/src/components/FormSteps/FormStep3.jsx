import React from "react";
import "./FormStep3.css";

const FormStep3 = () => {
  return (
    <div className="form-step-container">
    <h2 className="form-title">Home Details</h2>
    <div className="form-content-wrapper">
      <p className="form-question">Do you have a garden? *</p>
      <div className="radio-section">
        <label>
          <input type="radio" name="garden" />
          Yes
        </label>
        <label>
          <input type="radio" name="garden" />
          No
        </label>
      </div>
      <div className="dropdown-section">
        <select>
          <option>Please describe your living/home situation *</option>
        </select>
        <select>
          <option>Can you describe your household setting *</option>
        </select>
        <select>
          <option>Can you describe the household's typical activity level *</option>
        </select>
      </div>
      </div>
    </div>
  );
};

export default FormStep3;
