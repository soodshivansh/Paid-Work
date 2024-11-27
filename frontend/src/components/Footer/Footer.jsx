import React from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import "./Footer.css";

const Footer = () => {
  const location = useLocation();
  const isUpdateProfilePage = location.pathname === '/update-profile';

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
      className={`footer ${isUpdateProfilePage ? 'transparent-footer' : ''}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={footerVariants}
    >
      <div className="footer-container">
        {/* Brand Section */}
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <img src="./assets/paws4home_logo.png" alt="Paws4Home Logo" className="footer-logo-image" />
            <span>Paws4Home</span>
          </Link>
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

        {/* Contact Section */}
        <div className="footer-section">
          <h4>Contact Us</h4>
          <ul className="contact-info">
            <li>
              <FaMapMarkerAlt />
              <span>Chitkara Univeristy, Rajpura, Punjab 140401</span>
            </li>
            <li>
              <FaPhone />
              <span>+91 9876543211</span>
            </li>
            <li>
              <FaEnvelope />
              <span>info@paws4home.com</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p>&copy; 2023 Paws4Home. All rights reserved.</p>
      </div>
    </motion.footer>
  );
};

export default Footer;
