import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import UserMenu from "./UserMenu";

const Navbar = ({ handleLoginPopup, user, setUser }) => {
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
            <i className="bell-icon"></i>
          </button>
          {user ? (
            <UserMenu user={user} setUser={setUser} />
          ) : (
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              onClick={handleLoginPopup}
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
