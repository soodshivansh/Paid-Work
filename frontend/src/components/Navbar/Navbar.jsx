import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/">
          <div className="logo">
            <img src="./assets/paws4home_logo.png" alt="Logo" className="logo-image" />
            <span>Paws4Home</span>
          </div>
        </Link>

        {/* Navigation Links */}
        <ul className="nav-links">
          <li><Link to="/adopt">Adopt</Link></li>
          <li><Link to="/rehome">Rehome</Link></li>
          <li><Link to="/care-guide">Care Guide</Link></li>
          <li><Link to="/about-us">About Us</Link></li>
        </ul>

        {/* Right Section */}
        <div className="nav-right">
          <button className="notification-btn">
            <i className="bell-icon"></i> {/* Placeholder for a bell icon */}
          </button>
          <Link to="/login" className="login-link">Login | Register</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
