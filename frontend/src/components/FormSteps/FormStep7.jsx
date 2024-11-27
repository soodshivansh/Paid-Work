import React from "react";
import { FaCheck, FaUser, FaHome, FaPaw, FaUsers, FaHistory, FaHeart } from "react-icons/fa";
import "../FormSteps/FormSteps.css";

const FormStep7 = ({ formData }) => {
  return (
    <div className="form-step-container">
      <h2 className="form-title">
        <FaCheck style={{ marginRight: '12px' }} />
        Adoption Application Review
      </h2>

      <div className="form-info" style={{ marginBottom: '30px' }}>
        <p style={{ fontSize: '1.1rem', color: '#666', lineHeight: '1.6', textAlign: 'center' }}>
          Please review your application details before submitting.
        </p>
      </div>

      <div className="confirmation-sections">
        <div className="confirmation-section">
          <h3>
            <FaUser style={{ marginRight: '8px' }} />
            Personal Information
          </h3>
          <div className="confirmation-content">
            <p><strong>Name:</strong> {formData?.name || 'Not provided'}</p>
            <p><strong>Email:</strong> {formData?.email || 'Not provided'}</p>
            <p><strong>Phone:</strong> {formData?.phone || 'Not provided'}</p>
          </div>
        </div>

        <div className="confirmation-section">
          <h3>
            <FaHome style={{ marginRight: '8px' }} />
            Address Details
          </h3>
          <div className="confirmation-content">
            <p><strong>Street:</strong> {formData?.streetAddress || 'Not provided'}</p>
            <p><strong>City:</strong> {formData?.city || 'Not provided'}</p>
            <p><strong>State:</strong> {formData?.state || 'Not provided'}</p>
            <p><strong>ZIP Code:</strong> {formData?.zipCode || 'Not provided'}</p>
          </div>
        </div>

        <div className="confirmation-section">
          <h3>
            <FaPaw style={{ marginRight: '8px' }} />
            Home Environment
          </h3>
          <div className="confirmation-content">
            <p><strong>Residence Type:</strong> {formData?.residenceType || 'Not provided'}</p>
            <p><strong>Housing Status:</strong> {formData?.housingStatus || 'Not provided'}</p>
            <p><strong>Yard:</strong> {formData?.hasYard ? 'Yes' : 'No'}</p>
            <p><strong>Fenced:</strong> {formData?.hasFence ? 'Yes' : 'No'}</p>
          </div>
        </div>

        <div className="confirmation-section">
          <h3>
            <FaUsers style={{ marginRight: '8px' }} />
            Household Members
          </h3>
          <div className="confirmation-content">
            <p><strong>Total Members:</strong> {formData?.householdSize || 'Not provided'}</p>
            <p><strong>Children Present:</strong> {formData?.hasChildren ? 'Yes' : 'No'}</p>
            <p><strong>All Members Agree:</strong> {formData?.allAgree || 'Not provided'}</p>
          </div>
        </div>

        <div className="confirmation-section">
          <h3>
            <FaHistory style={{ marginRight: '8px' }} />
            Pet Experience
          </h3>
          <div className="confirmation-content">
            <p><strong>Previous Pets:</strong> {formData?.hadPetsBefore ? 'Yes' : 'No'}</p>
            <p><strong>Current Pets:</strong> {formData?.currentlyHasPets ? 'Yes' : 'No'}</p>
            <p><strong>Adoption Reason:</strong> {formData?.adoptionReason || 'Not provided'}</p>
          </div>
        </div>
      </div>

      <div className="terms-section" style={{ marginTop: '30px' }}>
        <div className="form-group">
          <label className="required">
            <FaCheck style={{ marginRight: '8px' }} />
            Terms & Conditions
          </label>
          <div className="checkbox-group">
            <label>
              <input type="checkbox" name="termsAgreed" required />
              <span>I confirm that all information provided is accurate and complete</span>
            </label>
            <label>
              <input type="checkbox" name="responsibilityAgreed" required />
              <span>I understand the responsibilities of pet ownership</span>
            </label>
          </div>
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
          Thank you for completing your adoption application. We will review your information and contact you soon.
        </p>
      </div>

      <style jsx>{`
        .confirmation-sections {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        
        .confirmation-section {
          background: white;
          border-radius: 12px;
          padding: 20px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }
        
        .confirmation-section h3 {
          color: #6c63ff;
          margin: 0 0 16px 0;
          display: flex;
          align-items: center;
          font-size: 1.1rem;
        }
        
        .confirmation-content {
          display: grid;
          gap: 8px;
        }
        
        .confirmation-content p {
          margin: 0;
          color: #444;
        }
        
        .confirmation-content strong {
          color: #333;
        }
        
        @media (max-width: 768px) {
          .confirmation-section {
            padding: 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default FormStep7;
