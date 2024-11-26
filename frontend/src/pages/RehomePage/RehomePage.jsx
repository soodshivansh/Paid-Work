import React from "react";
import Lottie from "lottie-react";
import { useNavigate } from "react-router-dom";
import petlove from "../../assets/petlove.json";
import "./RehomePage.css";

const RehomePage = () => {
  const navigate = useNavigate();

  const handleRehomeClick = () => {
    navigate('/choose-to-rehome');
  };

  return (
    <div className="rehome-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-text">
          <h1 style={{
                fontSize: "2.5rem",
                fontWeight: "800",
                color: "#27496d",
                fontFamily: "'Montserrat', sans-serif",
                margin: "30px 0",
            }}>Rehome Your Pet With Love & Care</h1>
          <h3 style={{
                fontSize: "1.5rem",
                fontWeight: "500",
                fontFamily: "'Montserrat', sans-serif",
                margin: "30px 0",
            }}>
            Your pet deserves a safe and loving home. We’re here to make the
            process easy, transparent, and stress-free for you.
          </h3>
        </div>
        <div className="hero-image">
          <Lottie
            animationData={petlove}
            loop={true}
            style={{ width: "100%", maxWidth: "500px" }}
          />
        </div>
      </section>

      {/* How It Works Section */}
      <div className="how-it-works">
        <h2 style={{
                fontSize: "2.5rem",
                fontWeight: "800",
                color: "#27496d",
                fontFamily: "'Montserrat', sans-serif",
                margin: "30px 0",
            }}>How It Works</h2>
        <div className="steps-container">
          <div className="step">
            <div className="step-box">
              <i className="fa fa-user icon" style={{ fontSize: "2.5rem", color: "#6c63ff" }}></i>
              <span className="step-number">1</span>
              <p style={{
                fontSize: "1.1 rem",
                fontWeight: "500",
                fontFamily: "'Montserrat', sans-serif",
            }}>Create a detailed profile for your pet</p>
            </div>
          </div>
          <div className="step">
            <div className="step-box">
              <i className="fa fa-home icon" style={{ fontSize: "2.5rem", color: "#6c63ff" }}></i>
              <span className="step-number">2</span>
              <p style={{
                fontSize: "1.1 rem",
                fontWeight: "500",
                fontFamily: "'Montserrat', sans-serif",
            }}>Connect with loving adopters!</p>
            </div>
          </div>
          <div className="step">
            <div className="step-box">
              <i className="fa fa-handshake icon" style={{ fontSize: "2.5rem", color: "#6c63ff" }}></i>
              <span className="step-number">3</span>
              <p style={{
                fontSize: "1.1 rem",
                fontWeight: "500",
                fontFamily: "'Montserrat', sans-serif",
            }}>Ensure a perfect match for your pet</p>
            </div>
          </div>
        </div>
      </div>

      {/* Safety and Trust Section */}
      <section className="safety-section">
        <h2 style={{
                fontSize: "2.5rem",
                fontWeight: "800",
                color: "#27496d",
                fontFamily: "'Montserrat', sans-serif",
                margin: "30px 0",
            }}>Your Pet's Safety, Our Priority</h2>
        <p style={{
                fontSize: "1.5rem",
                fontWeight: "500",
                fontFamily: "'Montserrat', sans-serif",
                marginLeft: "380px",
            }}>
          We prioritize your pet's well-being and ensure a smooth and secure
          rehoming experience. You can count on us to find the best possible
          match for your furry friend.
        </p>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <h2 style={{
                fontSize: "2.5rem",
                fontWeight: "800",
                color: "#27496d",
                fontFamily: "'Montserrat', sans-serif",
                margin: "30px 0",
            }}>Ready to Rehome Your Pet?</h2>
        <p style={{
                fontSize: "1.5rem",
                fontWeight: "500",
                fontFamily: "'Montserrat', sans-serif",
                margin: "30px 0",
            }}>Click the button below to get started with the rehoming process.</p>
        <button className="cta-button" onClick={handleRehomeClick}>Rehome My Pet</button>
      </section>
    </div>
  );
};
export default RehomePage;