import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaPaw, FaMapMarkerAlt, FaPhone, FaEnvelope, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import "./Footer.css";

const Footer = () => {
  const footerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <motion.footer 
      className="footer"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={footerVariants}
    >
      <div className="footer-container">
        {/* Brand Section */}
        <div className="footer-brand">
          <div className="footer-logo">
            <FaPaw className="footer-logo-icon" />
            <span>Paws4Home</span>
          </div>
          <p className="footer-description">
            Finding loving homes for pets in need. Join us in making a difference 
            in the lives of animals looking for their forever families.
          </p>
          <div className="social-links">
            <motion.a href="#" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}><FaFacebook /></motion.a>
            <motion.a href="#" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}><FaTwitter /></motion.a>
            <motion.a href="#" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}><FaInstagram /></motion.a>
            <motion.a href="#" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}><FaLinkedin /></motion.a>
          </div>
        </div>

        {/* Quick Links Section */}
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <motion.li whileHover={{ x: 5 }}><Link to="/adopt">Adopt a Pet</Link></motion.li>
            <motion.li whileHover={{ x: 5 }}><Link to="/rehome">Rehome a Pet</Link></motion.li>
            <motion.li whileHover={{ x: 5 }}><Link to="/care-guide">Pet Care Guide</Link></motion.li>
            <motion.li whileHover={{ x: 5 }}><Link to="/about-us">About Us</Link></motion.li>
          </ul>
        </div>

        {/* Help Section */}
        <div className="footer-section">
          <h4>Help & Support</h4>
          <ul>
            <motion.li whileHover={{ x: 5 }}><Link to="/adopt-faqs">Adoption FAQs</Link></motion.li>
            <motion.li whileHover={{ x: 5 }}><Link to="/rehoming-faqs">Rehoming FAQs</Link></motion.li>
            <motion.li whileHover={{ x: 5 }}><Link to="/terms">Terms of Service</Link></motion.li>
            <motion.li whileHover={{ x: 5 }}><Link to="/privacy">Privacy Policy</Link></motion.li>
          </ul>
        </div>

        {/* Contact Section */}
        <div className="footer-section">
          <h4>Contact Us</h4>
          <div className="contact-info">
            <FaMapMarkerAlt className="contact-icon" />
            <span>Chitkara University, Rajpura</span>
          </div>
          <div className="contact-info">
            <FaPhone className="contact-icon" />
            <span>+91 9876543210</span>
          </div>
          <div className="contact-info">
            <FaEnvelope className="contact-icon" />
            <span>support@paws4home.com</span>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>&copy; 2024 Paws4Home. All rights reserved.</p>
          <div className="footer-bottom-links">
            <Link to="/terms">Terms</Link>
            <Link to="/privacy">Privacy</Link>
            <Link to="/cookies">Cookies</Link>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
