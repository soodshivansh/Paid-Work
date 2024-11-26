import React, { useState } from "react";
import { refreshPetsList } from "../../pages/AdoptPage/AdoptPage";
import "./FormStep3.css";

const FormStep3 = ({ onSubmit }) => {
  const [loading, setLoading] = useState(false);
  const [pets, setPets] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await onSubmit(event);
      // Refresh the pets list to show the new pet
      await refreshPetsList(setLoading, setPets);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-step-container">
      <h2 className="form-title">Pet Health Information</h2>
      <div className="health-grid">
        <div className="health-item">
          <label>Is your pet vaccinated? *</label>
          <div className="radio-group">
            <label>
              <input type="radio" name="vaccinated" value="true" required />
              Yes
            </label>
            <label>
              <input type="radio" name="vaccinated" value="false" required />
              No
            </label>
          </div>
        </div>

        <div className="health-item">
          <label>Is your pet neutered/spayed? *</label>
          <div className="radio-group">
            <label>
              <input type="radio" name="neutered" value="true" required />
              Yes
            </label>
            <label>
              <input type="radio" name="neutered" value="false" required />
              No
            </label>
          </div>
        </div>

        <div className="health-item">
          <label>Is your pet microchipped? *</label>
          <div className="radio-group">
            <label>
              <input type="radio" name="microchipped" value="true" required />
              Yes
            </label>
            <label>
              <input type="radio" name="microchipped" value="false" required />
              No
            </label>
          </div>
        </div>

        <div className="health-item">
          <label>Is your pet house trained? *</label>
          <div className="radio-group">
            <label>
              <input type="radio" name="houseTrained" value="true" required />
              Yes
            </label>
            <label>
              <input type="radio" name="houseTrained" value="false" required />
              No
            </label>
          </div>
        </div>
      </div>

      <div className="medical-history">
        <label>Medical History (if any)</label>
        <textarea 
          placeholder="Please share any medical conditions, allergies, or special care requirements..."
        />
      </div>
    </form>
  );
};

export default FormStep3;
