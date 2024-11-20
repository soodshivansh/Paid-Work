import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="logo">
          <img src="./assets/paws4home_logo.png" alt="Logo" className="logo-image" />
          <span>Paws4Home</span>
        </div>

        {/* Navigation Links */}
        <ul className="nav-links">
          <li><a href="#adopt">Adopt</a></li>
          <li><a href="#rehome">Rehome</a></li>
          <li><a href="#care-guide">Care Guide</a></li>
          <li><a href="#about-us">About Us</a></li>
        </ul>

        {/* Right Section */}
        <div className="nav-right">
          <button className="notification-btn">
            <i className="bell-icon"></i> {/* Placeholder for a bell icon */}
          </button>
          <a href="#login" className="login-link">Login | Register</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
