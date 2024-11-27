import React from 'react';
import './About.css';

const About = () => {
    const slogans = [
        {
            text: "Every Pet Deserves a Loving Home",
            description: "We believe in creating perfect matches between pets and families."
        },
        {
            text: "Paws Today, Love Forever",
            description: "Experience the unconditional love that only a pet can bring to your life."
        },
        {
            text: "Where Hearts and Paws Connect",
            description: "Building bridges between loving homes and pets in need."
        },
        {
            text: "Give Love, Get Love",
            description: "Open your heart and home to a furry friend who will love you unconditionally."
        }
    ];

    return (
        <div className="about-container">
            <section className="hero-section">
                <h1>About <span>paws4home</span></h1>
                <p className="mission-statement">
                    Dedicated to connecting loving homes with pets in need, creating happiness one adoption at a time.
                </p>
            </section>

            <section className="image-section">
                <div className="image-container">
                    <img 
                        src="https://images.unsplash.com/photo-1570018144715-43110363d70a" 
                        alt="Person bonding with cat" 
                        className="about-image" 
                    />
                    <div className="image-caption">
                        "Creating bonds that last a lifetime"
                    </div>
                </div>
                <div className="image-container">
                    <img 
                        src="https://images.unsplash.com/photo-1589941013453-ec89f33b5e95" 
                        alt="German Shepherd" 
                        className="about-image" 
                    />
                    <div className="image-caption">
                        "Loyalty and love in their purest form"
                    </div>
                </div>
            </section>

            <section className="slogan-section">
                <h2>Our Beliefs</h2>
                <div className="slogan-grid">
                    {slogans.map((slogan, index) => (
                        <div key={index} className="slogan-card">
                            <h3>{slogan.text}</h3>
                            <p>{slogan.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="mission-section">
                <h2>Our Mission</h2>
                <p>
                    At Paws4Home, we believe that every pet deserves a loving home and every home deserves 
                    the joy that a pet brings. Our platform serves as a bridge between caring individuals 
                    and pets in need, facilitating meaningful connections that last a lifetime.
                </p>
                <p>
                    We're committed to promoting responsible pet ownership, supporting animal welfare, 
                    and creating a community where both pets and their humans can thrive together.
                </p>
            </section>
        </div>
    );
};

export default About;
