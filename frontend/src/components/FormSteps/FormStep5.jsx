import React from "react";
import "./FormStep5.css";

const FormStep5 = () => {
  return (
    <div className="form-step-container">
      <h2 className="form-title">Roommate Details</h2>
      <div className="roommate-grid">
        <div className="roommate-item">
          <label>Number of adults *</label>
          <input type="number" placeholder="0" />
        </div>
        <div className="roommate-item">
          <label>Number of children *</label>
          <input type="number" placeholder="0" />
        </div>
        <div className="roommate-item">
          <label>Age of youngest child</label>
          <select>
            <option value="">Pick a value</option>
            <option value="infant">Infant</option>
            <option value="toddler">Toddler</option>
            <option value="teen">Teen</option>
          </select>
        </div>
      </div>
      <div className="extra-info">
        <label>Any visiting children?</label>
        <div className="radio-group">
          <input type="radio" id="yes" name="visiting-children" />
          <label htmlFor="yes">Yes</label>
          <input type="radio" id="no" name="visiting-children" />
          <label htmlFor="no">No</label>
        </div>
        <label>Do you have any flatmates or lodgers?</label>
        <div className="radio-group">
          <input type="radio" id="flatmate-yes" name="flatmates" />
          <label htmlFor="flatmate-yes">Yes</label>
          <input type="radio" id="flatmate-no" name="flatmates" />
          <label htmlFor="flatmate-no">No</label>
        </div>
      </div>
    </div>
  );
};

export default FormStep5;
