import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './WriteReview.css';

const WriteReview = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        rating: 5,
        story: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Here you can add API call to submit the review
        // For now, we'll just show a success message
        
        toast.success('Thank you for your review!');
        navigate('/'); // Navigate back to home page
    };

    return (
        <div className="write-review-container">
            <h2>Write Your Review</h2>
            <form onSubmit={handleSubmit} className="review-form">
                <div className="form-group">
                    <label htmlFor="name">Your Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Enter your name"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="rating">Rating:</label>
                    <select
                        id="rating"
                        name="rating"
                        value={formData.rating}
                        onChange={handleChange}
                        required
                    >
                        <option value="5">5 Stars ★★★★★</option>
                        <option value="4">4 Stars ★★★★☆</option>
                        <option value="3">3 Stars ★★★☆☆</option>
                        <option value="2">2 Stars ★★☆☆☆</option>
                        <option value="1">1 Star ★☆☆☆☆</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="story">Your Experience:</label>
                    <textarea
                        id="story"
                        name="story"
                        value={formData.story}
                        onChange={handleChange}
                        required
                        placeholder="Share your experience with Paws4Home..."
                        rows="5"
                    ></textarea>
                </div>

                <button type="submit" className="submit-review-btn">
                    Submit Review
                </button>
            </form>
        </div>
    );
};

export default WriteReview;
