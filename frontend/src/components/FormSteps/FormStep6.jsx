import React from "react";
import { FaPaw, FaHistory, FaHeart } from "react-icons/fa";
import "../FormSteps/FormSteps.css";

const FormStep6 = () => {
  return (
    <div className="form-step-container">
      <h2 className="form-title">
        <FaHistory style={{ marginRight: '12px' }} />
        Pet History
      </h2>

      <div className="form-info" style={{ marginBottom: '30px' }}>
        <p style={{ fontSize: '1.1rem', color: '#666', lineHeight: '1.6', textAlign: 'center' }}>
          Tell us about your experience with pets and any current or previous pet ownership.
        </p>
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label className="required">
            <FaPaw style={{ marginRight: '8px' }} />
            Have you had pets before?
          </label>
          <div className="radio-group">
            <label>
              <input type="radio" name="hadPetsBefore" value="yes" required />
              <span>Yes</span>
            </label>
            <label>
              <input type="radio" name="hadPetsBefore" value="no" required />
              <span>No</span>
            </label>
          </div>
        </div>

        <div className="form-group">
          <label className="required">
            <FaPaw style={{ marginRight: '8px' }} />
            Current Pets
          </label>
          <div className="radio-group">
            <label>
              <input type="radio" name="currentlyHasPets" value="yes" required />
              <span>Yes</span>
            </label>
            <label>
              <input type="radio" name="currentlyHasPets" value="no" required />
              <span>No</span>
            </label>
          </div>
        </div>
      </div>

      <div className="form-group">
        <label>
          <FaPaw style={{ marginRight: '8px' }} />
          Current Pet Details
        </label>
        <textarea 
          name="currentPets"
          placeholder="If you have current pets, please describe them (species, age, temperament)..."
          rows="3"
        />
      </div>

      <div className="form-group">
        <label>
          <FaHistory style={{ marginRight: '8px' }} />
          Previous Pet Experience
        </label>
        <textarea 
          name="previousPets"
          placeholder="Tell us about your previous pets and your experience caring for them..."
          rows="3"
        />
      </div>

      <div className="form-group">
        <label className="required">
          <FaHeart style={{ marginRight: '8px' }} />
          Reason for Adoption
        </label>
        <textarea 
          name="adoptionReason"
          placeholder="Please share your reasons for wanting to adopt a pet..."
          rows="3"
          required
        />
      </div>

      <div className="form-group">
        <label className="required">
          <FaPaw style={{ marginRight: '8px' }} />
          Pet Care Knowledge
        </label>
        <div className="checkbox-group">
          <label>
            <input type="checkbox" name="petCareKnowledge" value="feeding" required />
            <span>Feeding & Nutrition</span>
          </label>
          <label>
            <input type="checkbox" name="petCareKnowledge" value="exercise" required />
            <span>Exercise & Activity</span>
          </label>
          <label>
            <input type="checkbox" name="petCareKnowledge" value="medical" required />
            <span>Basic Medical Care</span>
          </label>
          <label>
            <input type="checkbox" name="petCareKnowledge" value="training" required />
            <span>Training & Behavior</span>
          </label>
        </div>
      </div>

      <div className="info-box" style={{ 
        background: 'rgba(108, 99, 255, 0.05)',
        padding: '20px',
        borderRadius: '15px',
        marginTop: '30px'
      }}>
        <p style={{ 
          color: '#666',
          fontSize: '0.95rem',
          margin: 0,
          display: 'flex',
          alignItems: 'center'
        }}>
          <FaHeart style={{ 
            marginRight: '10px',
            color: '#6c63ff'
          }} />
          Your pet history helps us ensure a successful adoption match.
        </p>
      </div>
    </div>
  );
};

export default FormStep6;
