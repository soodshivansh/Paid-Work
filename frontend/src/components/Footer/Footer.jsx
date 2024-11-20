import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Section 1: How Can We Help */}
        <div className="footer-section">
          <h4>How Can We Help?</h4>
          <ul>
            <li><a href="/adopt">Adopt a Pet</a></li>
            <li><a href="/rehoming">Rehome a Pet</a></li>
            <li><a href="/adopt-faqs">Adopt FAQs</a></li>
            <li><a href="/rehoming-faqs">Rehome FAQs</a></li>
          </ul>
        </div>

        {/* Section 2: Contact Us */}
        <div className="footer-section">
          <h4>Contact Us</h4>
          <div className="contact-info">
            <i className="fa fa-map-marker"></i>
            <span>Chitkara University, Rajpura</span>
          </div>
          <div className="contact-info">
            <i className="fa fa-phone"></i>
            <span>+91 9876543210</span>
          </div>
          <div className="contact-info">
            <i className="fa fa-envelope"></i>
            <span>abcdefg@gmail.com</span>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="footer-bottom">
        &copy; 2024 Paws4Home.com
      </div>
    </footer>
  );
};

export default Footer;
