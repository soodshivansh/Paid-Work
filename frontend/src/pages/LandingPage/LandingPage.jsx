import React, { useState, useEffect } from "react";
import axios from "axios";
import Hero from "../../components/Hero/Hero";
import Card from "../../components/Card/Card";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./LandingPage.css";
import ReviewAndFAQ from "../../components/ReviewandFAQ/ReviewandFAQ";

const LandingPage = () => {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/pets");
        // Get only the first 4 pets for the landing page
        setPets(response.data.slice(0, 4));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching pets:", error);
        setError("Failed to load pets");
        setLoading(false);
      }
    };

    fetchPets();
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const scaleIn = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <div className="landing-page">
      <Hero />
      
      <motion.section 
        className="pets-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
      >
        <motion.h1
          variants={scaleIn}
          style={{
            fontSize: "2.5rem",
            fontWeight: "800",
            color: "#362B85",
            fontFamily: "'Montserrat', sans-serif",
            textAlign: "center",
            margin: "30px 0",
          }}
        >
          Take a Look at Some of Our Pets
        </motion.h1>

        <motion.div 
          className="card-container"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {loading ? (
            <div className="loading">Loading pets...</div>
          ) : error ? (
            <div className="error">{error}</div>
          ) : (
            pets.map((pet, index) => (
              <motion.div
                key={pet._id}
                variants={fadeInUp}
                custom={index}
              >
                <Card pet={pet} />
              </motion.div>
            ))
          )}
        </motion.div>
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Link to="/adopt">
            <button className="see-more-button">See More</button>
          </Link>
        </motion.div>
      </motion.section>

      <motion.section 
        className="how-it-works"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
      >
        <motion.h1
          variants={scaleIn}
        >
          Adopt or Rehome a pet in just 3 easy steps!
        </motion.h1>

        <motion.div 
          className="steps-container"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {[1, 2, 3].map((step, index) => (
            <motion.div 
              key={step}
              className="step"
              variants={fadeInUp}
              custom={index}
            >
              <motion.div 
                className="step-box"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <i className={`fa fa-${index === 0 ? 'user' : index === 1 ? 'home' : 'heart'} icon`}></i>
                <span className="step-number">{step}</span>
                <p>
                  {index === 0 ? 'Set up your profile in minutes' :
                   index === 1 ? "Describe your home and routine so rehomer can see if it's the right fit" :
                   'Connect with pet owners and find your perfect match'}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInUp}
      >
        <ReviewAndFAQ />
      </motion.section>
    </div>
  );
};

export default LandingPage;
