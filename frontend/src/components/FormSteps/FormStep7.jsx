import React from "react";
import "./FormStep7.css";

const FormStep7 = () => {
  return (
    <div className="form-step-container">
      <h2 className="form-title">Confirmation</h2>
      <p className="confirmation-instructions">
        Please review your details below before submitting. Make sure all the information is correct.
      </p>
      
      <div className="review-section">
        <div className="review-item">
          <strong>Roommate Details:</strong>
          <p>Adults: 2, Children: 1, Youngest child: Toddler</p>
        </div>
        <div className="review-item">
          <strong>Visiting Children:</strong>
          <p>Yes</p>
        </div>
        <div className="review-item">
          <strong>Other Animals:</strong>
          <p>Dog, 3 years, Male, Neutered</p>
        </div>
        <div className="review-item">
          <strong>Allergies:</strong>
          <p>No allergies</p>
        </div>
      </div>

      <div className="form-buttons">
        <button type="button" className="edit-button">Edit</button>
        <button type="submit" className="submit-button">Submit</button>
      </div>
    </div>
  );
};

export default FormStep7;
