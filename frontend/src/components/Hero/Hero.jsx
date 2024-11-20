import React from "react";
import "./Hero.css";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-container">
        {/* Left Content */}
        <div className="hero-content">
          <h1>
            Give a New Life to <br />
            <span className="highlight">Furry Friends</span>
          </h1>
          <p>
            Pet adoption and rehoming are both vital aspects of animal welfare, offering hope
            and a fresh start to pets in need. Open your heart and your home to a shelter pet.
          </p>
          <div className="buttons">
            <button className="btn-primary">Adopt Now</button>
            <button className="btn-secondary">Rehome Now</button>
          </div>
        </div>

        {/* Right Content (Image) */}
        <div className="hero-image">
          <img
            src={"./assets/dogsandcats.jpg"}
            alt="Cat and Dog"
            className="image"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
