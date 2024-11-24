import React from "react";
import "./FormStep1.css";

const FormStep1 = () => {
  return (
    <div className="form-step-container">
      <div className="profile-section">
        <img
          src="/path-to-profile-picture.jpg"
          alt="User Profile"
          className="profile-picture"
        />
        <div>
          <p className="profile-username">Email/Username</p>
          <p className="profile-email">SamantaSmith@gmail.com</p>
        </div>
      </div>
      <p className="form-info">
        To apply for Adopt a pet you need to complete some fields. Click Start...
      </p>
      <div className="terms-section">
        <input type="checkbox" id="terms" />
        <label htmlFor="terms" className="terms-text">
          I have read and agree to the <a href="#">Terms</a> and{" "}
          <a href="#">Privacy Policy</a>?
        </label>
      </div>
    </div>
  );
};

export default FormStep1;
