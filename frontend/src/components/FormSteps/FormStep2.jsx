import React from "react";
import "./FormStep2.css";

const FormStep2 = () => {
  return (
    <div className="form-step-container">
    <h2 className="form-title"> Address Details</h2>
      <p className="form-note">
        Please note, all these details must be complete in order to apply for adopt a pet.
      </p>
      <div className="address-grid">
        <input placeholder="Address line 1 *" />
        <input placeholder="Address line 2" />
        <input placeholder="Postcode *" />
        <input placeholder="Town *" />
      </div>
      <div className="telephone-section">
        <p className="form-note">Telephone Number (either a landline or mobile number)*</p>
        <input placeholder="Landline Telephone" />
        <div className="mobile-section">
          <input placeholder="Mobile" />
          {/* <button>Send Verification Code</button> */}
        </div>
      </div>
    </div>
  );
};

export default FormStep2;
