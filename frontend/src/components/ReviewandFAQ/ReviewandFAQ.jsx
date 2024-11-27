import React from "react";
import { Link } from "react-router-dom";
import "./ReviewandFAQ.css";

const reviews = [
  {
    name: "Reshab Kumar",
    rating: 5,
    story: "Adopting through Paws4Home was the best decision I made. The process was smooth, and now I have a loving furry friend.",
  },
  {
    name: "Harshita",
    rating: 4,
    story: "The platform made rehoming my pet stress-free. I found a loving family quickly, and I couldn’t be happier.",
  },
  {
    name: "Aditya",
    rating: 5,
    story: "Amazing experience! The FAQs were super helpful, and the steps were so clear. Highly recommend this platform.",
  },
];

const ReviewAndFAQ = () => {
  return (
    <section className="review-and-faq">
      {/* Review Section */}
      <div className="review-section">
        <h2  style={{
          fontSize: "2.5rem",
          fontWeight: "800",
          color: "#362B85",
          fontFamily: "'Montserrat', sans-serif",
          textAlign: "center", // Optional for centering
          margin: "30px 0",
            }}>What Our Users Say</h2>
        <div className="review-container">
          {reviews.map((review, index) => (
            <div key={index} className="review-box">
              <h3>{review.name}</h3>
              <div className="stars">
                {"★".repeat(review.rating)}
                {"☆".repeat(5 - review.rating)}
              </div>
              <p>{review.story}</p>
            </div>
          ))}
        </div>
        <Link to="/write-review">
          <button className="write-review-button">Write a Review</button>
        </Link>
      </div>

      {/* FAQ Section */}
      <div className="faq-section">
        <h2  style={{
            fontSize: "2.5rem",
            fontWeight: "800",
            color: "#362B85",
            fontFamily: "'Montserrat', sans-serif",
            textAlign: "center", // Optional for centering
            margin: "30px 0",
          }}>Frequently Asked Questions</h2>
        <div className="faq-container">
          <Link to="/faq/adoption" className="faq-box">
            FAQ for Adoption
          </Link>
          <Link to="/faq/rehoming" className="faq-box">
            FAQ for Rehoming
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ReviewAndFAQ;
