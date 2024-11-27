import React from "react";
import { FaHome, FaMapMarkerAlt, FaCity, FaGlobe } from "react-icons/fa";
import "../FormSteps/FormSteps.css";

const FormStep2 = () => {
  return (
    <div className="form-step-container">
      <h2 className="form-title">
        <FaHome style={{ marginRight: '12px' }} />
        Address Information
      </h2>

      <div className="form-info" style={{ marginBottom: '30px' }}>
        <p style={{ fontSize: '1.1rem', color: '#666', lineHeight: '1.6', textAlign: 'center' }}>
          Please provide your current residential address details.
        </p>
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label className="required">
            <FaHome style={{ marginRight: '8px' }} />
            Street Address
          </label>
          <input 
            type="text"
            name="streetAddress"
            placeholder="Enter your street address"
            required
          />
        </div>

        <div className="form-group">
          <label>
            <FaHome style={{ marginRight: '8px' }} />
            Apartment/Unit
          </label>
          <input 
            type="text"
            name="apartment"
            placeholder="Apartment, suite, unit (if applicable)"
          />
        </div>

        <div className="form-group">
          <label className="required">
            <FaCity style={{ marginRight: '8px' }} />
            City
          </label>
          <input 
            type="text"
            name="city"
            placeholder="Enter your city"
            required
          />
        </div>

        <div className="form-group">
          <label className="required">
            <FaMapMarkerAlt style={{ marginRight: '8px' }} />
            State/Province
          </label>
          <input 
            type="text"
            name="state"
            placeholder="Enter your state"
            required
          />
        </div>

        <div className="form-group">
          <label className="required">
            <FaGlobe style={{ marginRight: '8px' }} />
            Country
          </label>
          <input 
            type="text"
            name="country"
            placeholder="Enter your country"
            required
          />
        </div>

        <div className="form-group">
          <label className="required">
            <FaMapMarkerAlt style={{ marginRight: '8px' }} />
            ZIP/Postal Code
          </label>
          <input 
            type="text"
            name="zipCode"
            placeholder="Enter your ZIP code"
            required
          />
        </div>
      </div>

      <div className="form-group" style={{ marginTop: '20px' }}>
        <label className="required">
          <FaHome style={{ marginRight: '8px' }} />
          Type of Residence
        </label>
        <div className="radio-group">
          <label>
            <input type="radio" name="residenceType" value="house" required />
            <span>House</span>
          </label>
          <label>
            <input type="radio" name="residenceType" value="apartment" required />
            <span>Apartment</span>
          </label>
          <label>
            <input type="radio" name="residenceType" value="condo" required />
            <span>Condo</span>
          </label>
          <label>
            <input type="radio" name="residenceType" value="other" required />
            <span>Other</span>
          </label>
        </div>
      </div>

      <div className="form-group">
        <label className="required">
          <FaHome style={{ marginRight: '8px' }} />
          Housing Status
        </label>
        <div className="radio-group">
          <label>
            <input type="radio" name="housingStatus" value="own" required />
            <span>Own</span>
          </label>
          <label>
            <input type="radio" name="housingStatus" value="rent" required />
            <span>Rent</span>
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
          <FaHome style={{ 
            marginRight: '10px',
            color: '#6c63ff'
          }} />
          If you're renting, you may need to provide landlord approval for pet ownership.
        </p>
      </div>
    </div>
  );
};

export default FormStep2;
