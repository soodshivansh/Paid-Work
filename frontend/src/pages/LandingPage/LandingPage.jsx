import React from "react";
import Hero from "../../components/Hero/Hero";
import Card from "../../components/Card/Card";
import { Link } from "react-router-dom";
import "./LandingPage.css";
import ReviewAndFAQ from "../../components/ReviewandFAQ/ReviewandFAQ";

const LandingPage = ({ pets }) => {
  const featuredPets = pets.slice(0, 4); // Display the first 4 pets on the landing page

  return (
    <div>
      <Hero />
      <section className="pets-section">
      <h1
  style={{
    fontSize: "2.5rem",
    fontWeight: "800",
    color: "#27496d",
    fontFamily: "'Montserrat', sans-serif",
    textAlign: "center", // Optional for centering
    margin: "30px 0",
  }}
>
  Take a Look at Some of Our Pets
</h1>

        <div className="card-container">
          {featuredPets.map((pet) => (
            <Card key={pet.id} pet={pet} />
          ))}
        </div>
        <Link to="/adopt">
          <button className="see-more-button">See More</button>
        </Link>
      </section>

      <section className="how-it-works">
      <h1
  style={{
    fontSize: "2.5rem",
    fontWeight: "800",
    color: "#27496d",
    fontFamily: "'Montserrat', sans-serif",
    textAlign: "center", // Optional for centering
    margin: "30px 0",
  }}
>
  Adopt or Rehome a pet in just 3 easy steps!
</h1>

<div className="how-it-works">
  <div className="steps-container">
    <div className="step">
      <div className="step-box">
      <i className="fa fa-user icon" style={{ fontSize: "2.5rem", color: "#6c63ff" }}></i>

        <span className="step-number">1</span>
        <p style={{
                fontSize: "1.1 rem",
                fontWeight: "500",
                fontFamily: "'Montserrat', sans-serif",
            }}>Set up your profile in minutes</p>
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
            }}>Describe your home and routine so rehomer can see if it's the right fit</p>
      </div>
    </div>
    <div className="step">
      <div className="step-box">
      <i className="fa fa-search icon" style={{ fontSize: "2.5rem", color: "#6c63ff" }}></i>
        <span className="step-number">3</span>
        <p style={{
                fontSize: "1.1 rem",
                fontWeight: "500",
                fontFamily: "'Montserrat', sans-serif",
            }}>Start your search!</p>
      </div>
    </div>
  </div>
</div>


      </section>
      <ReviewAndFAQ />
    </div>
  );
};

export default LandingPage;
